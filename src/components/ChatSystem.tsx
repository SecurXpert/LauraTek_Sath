import { useState, useEffect, useMemo, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Send, Paperclip, X, Reply, Search, Phone, MoreVertical, Copy, FileText, Download, Edit, Trash2, ExternalLink, FileCode, Calendar, Menu, ArrowLeft } from 'lucide-react';
import { BASE_URL } from '@/api/instance';
import Sidebar from '@/components/sidebar';
import Profileheader from '@/components/ui/Profileheader';
import ChatSidebar from './ui/chat/ChatSidebar';
import ChatInput from './ui/chat/ChatInput';
import CourseContextSidebar from './ui/chat/CourseContextSidebar';
interface Message {
  id: number | string;
  sender_role: 'student' | 'trainer' | 'system';
  content?: string;
  ciphertext?: string;
  iv?: string;
  message_type: 'text' | 'image' | 'file';
  file_url?: string;
  file_name?: string;
  created_at: string;
  updated_at?: string;
  is_edited?: boolean | number;
  reply_to_message_id?: number | string;
}

interface ThreadInfo {
  id: string | number;
  course_id: number;
  trainer_name?: string;
}

interface UserCourse {
  course_id: number;
  course_title: string;
  course_image: string;
  description: string;
  duration: number;
  progress: number;
  completed: boolean;
  instructor_name?: string;
}

const API_BASE = BASE_URL;
const WS_BASE = BASE_URL.replace(/^http/, 'ws');

export default function ChatSystem() {
  const navigate = useNavigate();
  const location = useLocation();
  const [thread, setThread] = useState<ThreadInfo | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [ws, setWs] = useState<WebSocket | null>(null);
  const [wsStatus, setWsStatus] = useState('Disconnected');
  const [wsReady, setWsReady] = useState(false);
  const [keyReady, setKeyReady] = useState(false);
  const [threadKey, setThreadKey] = useState<CryptoKey | null>(null);
  const [replyingTo, setReplyingTo] = useState<Message | null>(null);
  const [editingMessage, setEditingMessage] = useState<Message | null>(null);
  const [pendingFile, setPendingFile] = useState<File | null>(null);
  const [pendingFilePreview, setPendingFilePreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [sendError, setSendError] = useState<string | null>(null);

  const [selectMode, setSelectMode] = useState(false);
  const selectedIdsRef = useRef<Set<number | string>>(new Set());

  const threadKeyRef = useRef<CryptoKey | null>(null);
  const threadIdRef = useRef<string | number | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const decryptedIdsRef = useRef<Set<string | number>>(new Set());
  const blobUrlByMessageIdRef = useRef<Map<string | number, string>>(new Map());
  const fetchingBlobsRef = useRef<Map<string | number, Promise<string | null>>>(new Map());

  const [contextMenu, setContextMenu] = useState<{
    msg: Message;
    x: number;
    y: number;
    isMe: boolean;
    placeholder: boolean;
  } | null>(null);

  const [userCourses, setUserCourses] = useState<UserCourse[]>([]);
  const [selectedCourse, setSelectedCourse] = useState<UserCourse | null>(null);
  const [coursesLoading, setCoursesLoading] = useState(true);

  const getToken = () => localStorage.getItem('access_token') || localStorage.getItem('token') || '';

  const importAesKey = async (base64Key: string): Promise<CryptoKey> => {
    const keyBytes = Uint8Array.from(atob(base64Key), (c) => c.charCodeAt(0));
    if (keyBytes.length !== 32) throw new Error(`Invalid key length: ${keyBytes.length}`);
    return crypto.subtle.importKey('raw', keyBytes, 'AES-GCM', false, ['encrypt', 'decrypt']);
  };

  const bytesToB64 = (bytes: Uint8Array) => btoa(String.fromCharCode(...bytes));

  const b64ToBytes = (b64: string) => {
    try {
      return Uint8Array.from(atob(b64), (c) => c.charCodeAt(0));
    } catch {
      return new Uint8Array();
    }
  };

  const encryptText = async (plainText: string, key: CryptoKey) => {
    const data = new TextEncoder().encode(plainText);
    const iv = crypto.getRandomValues(new Uint8Array(12));
    const encrypted = await crypto.subtle.encrypt({ name: 'AES-GCM', iv }, key, data);
    return {
      iv: bytesToB64(iv),
      ciphertext: bytesToB64(new Uint8Array(encrypted)),
    };
  };

  const decryptText = async (ciphertextB64: string, ivB64: string, key: CryptoKey) => {
    try {
      const iv = b64ToBytes(ivB64);
      const ct = b64ToBytes(ciphertextB64);
      const dec = await crypto.subtle.decrypt({ name: 'AES-GCM', iv }, key, ct);
      return new TextDecoder().decode(dec);
    } catch (err) {
      console.error('Decryption failed:', err);
      return '[decryption failed]';
    }
  };

  const apiFetch = async (path: string, options: RequestInit = {}) => {
    const token = getToken();
    if (!token) throw new Error('No authentication token found');
    const res = await fetch(API_BASE + path, {
      ...options,
      headers: {
        Authorization: `Bearer ${token}`,
        ...options.headers,
      },
    });
    if (!res.ok) {
      const errorText = await res.text().catch(() => '');
      throw new Error(errorText || `HTTP ${res.status}`);
    }
    return res.json();
  };

  const apiFetchJson = async (
    path: string,
    options: {
      method?: string;
      headers?: Record<string, string>;
      body?: any;
      signal?: AbortSignal;
    } = {}
  ) => {
    const body = options.body;
    const headers: Record<string, string> = {
      ...(options.headers || {}),
    };
    const isForm = body instanceof FormData;
    if (body !== undefined && !isForm) {
      headers['Content-Type'] = 'application/json';
    }

    const requestInit: RequestInit = {
      method: options.method,
      headers,
      signal: options.signal,
      body: body === undefined ? undefined : isForm ? body : JSON.stringify(body),
    };

    return apiFetch(path, requestInit);
  };

  const isDeletedForEveryoneText = (content?: string) => {
    const c = (content || '').toLowerCase();
    return c.includes('this message was deleted') || c.includes('deleted for everyone');
  };

  const needsDecryption = (msg: Message) => {
    if (!msg.ciphertext || !msg.iv) return false;
    const c = (msg.content || '').toLowerCase();
    if (!msg.content) return true;
    if (c.includes('encrypted') || c.includes('loading') || c.includes('decrypt')) return true;
    if (c.includes('key not ready') || c.includes('decryption failed')) return true;
    return false;
  };

  const loadHistory = async (threadId: string | number) => {
    const rows = await apiFetch(`/chat/thread/${threadId}/messages?limit=50`);
    decryptedIdsRef.current.clear();
    const list: Message[] = Array.isArray(rows) ? rows : [];
    const filtered = list.filter(
      (m) =>
        !((m.content || '').includes('[Deleted for me]'))
    );

    const normalized = filtered.map((m) => {
      const content = m.content || '';
      const isDeletedEveryoneText =
        content.includes('[This message was deleted]') || content.includes('[This message was deleted for everyone]');
      if (isDeletedEveryoneText) {
        return { ...m, sender_role: 'student' as const };
      }
      return m;
    });

    normalized.sort((a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime());
    setMessages(normalized);
  };

  const uploadFile = async (threadId: string | number, file: File) => {
    const formData = new FormData();
    formData.append('upload', file);

    const res = await fetch(`${API_BASE}/chat/thread/${threadId}/upload`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
      body: formData,
    });

    if (!res.ok) {
      const errText = await res.text().catch(() => '');
      throw new Error(errText || `Upload failed: ${res.status}`);
    }

    return res.json(); // expected: { file_url, file_name?, ... }
  };

  useEffect(() => {
    if (!threadKey) return;

    let cancelled = false;
    (async () => {
      const targets: Message[] = [];
      for (const m of messages) {
        if (!needsDecryption(m)) continue;
        if (decryptedIdsRef.current.has(m.id)) continue;
        targets.push(m);
        decryptedIdsRef.current.add(m.id);
      }

      if (targets.length === 0) return;

      const resolved = await Promise.all(
        targets.map(async (m) => ({
          id: m.id,
          content: await decryptText(m.ciphertext!, m.iv!, threadKey),
        }))
      );

      if (cancelled) return;
      const byId = new Map(resolved.map((r) => [r.id, r.content] as const));
      setMessages((prev) =>
        prev.map((m) => {
          const content = byId.get(m.id);
          if (!content) return m;
          return { ...m, content, ciphertext: undefined, iv: undefined };
        })
      );
    })();

    return () => {
      cancelled = true;
    };
  }, [messages, threadKey]);

  useEffect(() => {
    threadKeyRef.current = threadKey;
  }, [threadKey]);

  // Fetch user courses on mount
  useEffect(() => {
    const fetchUserCourses = async () => {
      setCoursesLoading(true);
      try {
        const token = getToken();
        if (!token) {
          console.error('No access token found');
          return;
        }
        const res = await fetch(`${API_BASE}/dashboard/my-courses`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (!res.ok) {
          throw new Error(`Failed to fetch courses: ${res.status}`);
        }
        const data = await res.json();
        // Map API response to UserCourse interface
        const mappedCourses: UserCourse[] = data.map((item: any) => ({
          course_id: item.course_id,
          course_title: item.course_title,
          course_image: item.course_image,
          description: item.description,
          duration: item.duration,
          progress: item.progress,
          completed: item.completed,
          instructor_name: item.instructor_name || 'Instructor',
        }));
        setUserCourses(mappedCourses);

        if (location.state?.selectedInstructorName) {
          const targetInstructor = location.state.selectedInstructorName;
          const matchingCourse = mappedCourses.find(c => 
            c.instructor_name === targetInstructor || 
            c.instructor_name?.toLowerCase().includes(targetInstructor.toLowerCase())
          );
          if (matchingCourse) {
            setSelectedCourse(matchingCourse);
          }
        }
      } catch (err: any) {
        console.error('Error fetching user courses:', err);
        setSendError('Failed to load courses: ' + err.message);
      } finally {
        setCoursesLoading(false);
      }
    };

    fetchUserCourses();
  }, []);

  useEffect(() => {
    if (!selectedCourse) return;

    let mounted = true;
    let socket: WebSocket | null = null;

    (async () => {
      setLoading(true);
      try {
        const threadData = await apiFetch(`/chat/thread/student/${selectedCourse.course_id}`, { method: 'POST' });
        if (!mounted) return;
        setThread(threadData);
        threadIdRef.current = threadData.id;

        await loadHistory(threadData.id);

        socket = new WebSocket(`${WS_BASE}/ws/chat/${threadData.id}?token=${encodeURIComponent(getToken())}`);

        socket.onopen = () => {
          console.log('[WS] Connected');
          setWsStatus('Connected');
          setWsReady(true);

          socket.send(
            JSON.stringify({
              type: 'request_thread_key',
              thread_id: threadData.id,
            })
          );
        };

        socket.onmessage = async (e) => {
          try {
            const data = JSON.parse(e.data);
            console.log('[WS RECEIVED]', data);

            if (data.type === 'error') {
              console.error('[SERVER ERROR]', data);
            }

            if (data.type === 'thread_key_init' && data.key) {
              const key = await importAesKey(data.key);
              setThreadKey(key);
              setKeyReady(true);
              console.log('[KEY] Encryption key ready');
              return;
            }

            if (data.type === 'message') {
              let msg: Message = { ...data };
              console.log('[TIMESTAMP DEBUG] Server timestamp:', msg.created_at, 'Parsed:', new Date(msg.created_at).toString());

              const currentKey = threadKeyRef.current;
              if (msg.ciphertext && msg.iv && currentKey) {
                msg.content = await decryptText(msg.ciphertext, msg.iv, currentKey);
                msg.ciphertext = undefined;
                msg.iv = undefined;
              } else if (msg.ciphertext && msg.iv && !currentKey) {
                msg.content = '[key not ready]';
              }

              setMessages((prev) => {
                const idx = prev.findIndex((m) => {
                  if (typeof m.id !== 'string' || !m.id.startsWith('temp-') || m.sender_role !== 'student') return false;
                  if (m.message_type === 'text') return m.content === msg.content && (!msg.message_type || msg.message_type === 'text');
                  if (msg.file_url && (m as any)._match_url === msg.file_url) return true;
                  if (msg.file_name && m.file_name === msg.file_name) return true;
                  return m.message_type === msg.message_type;
                });

                if (idx !== -1) {
                  const newList = [...prev];
                  newList[idx] = { ...msg, id: msg.id };
                  return newList;
                }

                return [...prev, msg];
              });
            }

            if (data.type === 'delete_everyone') {
              setMessages((prev) =>
                prev.map((m) =>
                  m.id === data.message_id
                    ? {
                        ...m,
                        content: '[This message was deleted]',
                        message_type: 'text',
                        ciphertext: undefined,
                        iv: undefined,
                        file_url: undefined,
                        file_name: undefined,
                      }
                    : m
                )
              );
            }
          } catch (err) {
            console.error('[WS] Processing error:', err);
          }
        };

        socket.onclose = (event) => {
          console.log('[WS CLOSED]', {
            code: event.code,
            reason: event.reason || '(no reason provided)',
            wasClean: event.wasClean,
            time: new Date().toLocaleTimeString(),
          });
          setWsStatus('Disconnected');
          setWsReady(false);
        };

        socket.onerror = (event) => {
          console.error('[WS ERROR]', event);
        };

        setWs(socket);
      } catch (err: any) {
        console.error('Chat init failed:', err);
        setSendError('Failed to load chat: ' + err.message);
      } finally {
        if (mounted) setLoading(false);
      }
    })();

    return () => {
      mounted = false;
      socket?.close();
    };
  }, [selectedCourse]);

  useEffect(() => {
    let cancelled = false;
    const toPrefetch = messages.filter(
      (m) =>
        !!m.file_url &&
        !m.file_url.startsWith('blob:') &&
        !blobUrlByMessageIdRef.current.has(m.id) &&
        (m.message_type === 'image' || m.message_type === 'file')
    );

    if (toPrefetch.length === 0) return;

    (async () => {
      for (const msg of toPrefetch) {
        if (cancelled) return;
        await resolveProtectedBlobUrl(msg);
      }
      if (cancelled) return;
      setMessages((prev) => prev.map((m) => ({ ...m })));
    })();

    return () => {
      cancelled = true;
    };
  }, [messages]);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.shiftKey && e.key.toLowerCase() === 's') {
        e.preventDefault();
        setSelectMode((v) => {
          const next = !v;
          if (!next) selectedIdsRef.current.clear();
          setSendError(next ? 'Select mode enabled (click messages). Ctrl+Shift+H to hide selected.' : null);
          return next;
        });
        return;
      }

      if (e.ctrlKey && e.shiftKey && e.key.toLowerCase() === 'h') {
        e.preventDefault();
        const threadId = threadIdRef.current;
        const ids = Array.from(selectedIdsRef.current);
        if (!threadId) return;
        if (ids.length === 0) {
          setSendError('No messages selected.');
          return;
        }

        (async () => {
          try {
            await apiFetchJson(`/chat/thread/${threadId}/hide_placeholders`, {
              method: 'POST',
              body: ids,
            });
            selectedIdsRef.current.clear();
            setSelectMode(false);
            await loadHistory(threadId);
            setSendError(null);
          } catch (err: any) {
            setSendError('Hide failed: ' + err.message);
          }
        })();
      }

      if (e.key === 'Escape') {
        if (selectMode) {
          selectedIdsRef.current.clear();
          setSelectMode(false);
          setSendError(null);
        }
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [selectMode]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'auto' });
  }, [messages.length, loading]);

  const sendMessage = async () => {
    if (!ws || ws.readyState !== WebSocket.OPEN || !wsReady) {
      setSendError('WebSocket not connected');
      return;
    }

    if (!thread?.id) {
      setSendError('Thread not ready');
      return;
    }

    if (loading) return;

    setSendError(null);

    if (editingMessage) {
      const threadId = threadIdRef.current;
      const text = input.trim();
      if (!threadId) {
        setSendError('Thread not ready');
        return;
      }
      if (!text) return;
      if (!keyReady || !threadKey) {
        setSendError('Waiting for encryption key...');
        return;
      }

      try {
        setLoading(true);
        const enc = await encryptText(text, threadKey);
        await apiFetchJson(`/chat/message/${editingMessage.id}/edit`, {
          method: 'POST',
          body: { iv: enc.iv, ciphertext: enc.ciphertext, tag: null },
        });
        setEditingMessage(null);
        setInput('');
        await loadHistory(threadId);
      } catch (err: any) {
        setSendError('Edit failed: ' + err.message);
      } finally {
        setLoading(false);
      }
      return;
    }

    if (pendingFile) {
      try {
        setLoading(true);
        const isImage = pendingFile.type.startsWith('image/');
        const finalFileName = pendingFile.name;
        const tempId = `temp-${Date.now()}`;
        const replyId = replyingTo?.id;

        const optimisticMsg: Message = {
          id: tempId,
          sender_role: 'student',
          content: isImage ? '[Image]' : `[File: ${finalFileName}]`,
          file_url: URL.createObjectURL(pendingFile),
          file_name: finalFileName,
          message_type: isImage ? 'image' : 'file',
          created_at: new Date().toISOString(),
        } as Message;

        setMessages((prev) => [...prev, optimisticMsg]);
        setPendingFile(null);
        setPendingFilePreview(null);
        if (fileInputRef.current) fileInputRef.current.value = '';
        setReplyingTo(null);

        const uploadResult = await uploadFile(thread.id, pendingFile);

        setMessages((prev) => prev.map(m => m.id === tempId ? { ...m, _match_url: uploadResult.file_url } : m));

        ws.send(
          JSON.stringify({
            type: 'message',
            thread_id: thread.id,
            message_type: isImage ? 'image' : 'file',
            file_url: uploadResult.file_url,
            file_name: uploadResult.file_name || finalFileName,
            ...(replyId && { reply_to_message_id: replyId }),
          })
        );
      } catch (err: any) {
        setSendError('File upload/send failed: ' + err.message);
      } finally {
        setLoading(false);
      }
      return;
    }

    const text = input.trim();
    if (!text) return;
    if (!keyReady || !threadKey) {
      setSendError('Waiting for encryption key...');
      return;
    }

    try {
      const enc = await encryptText(text, threadKey);
      const payload = {
        type: 'message',
        thread_id: thread.id,
        message_type: 'text',
        iv: enc.iv,
        ciphertext: enc.ciphertext,
        ...(replyingTo && { reply_to_message_id: replyingTo.id }),
      };

      ws.send(JSON.stringify(payload));

      const tempId = `temp-${Date.now()}`;
      const now = new Date();
      console.log('[TIMESTAMP DEBUG] Optimistic timestamp:', now.toISOString(), 'Local:', now.toString());
      const optimisticMsg: Message = {
        id: tempId,
        sender_role: 'student',
        content: text,
        created_at: now.toISOString(),
        message_type: 'text',
      };

      setMessages((prev) => [...prev, optimisticMsg]);
      setInput('');
      setReplyingTo(null);
    } catch (err: any) {
      console.error('[ENCRYPT] Failed:', err);
      setSendError('Encryption failed');
    }
  };

  const resolveProtectedBlobUrl = async (msg: Message) => {
    if (!msg.file_url) return null;
    const existing = blobUrlByMessageIdRef.current.get(msg.id);
    if (existing) return existing;

    const inFlight = fetchingBlobsRef.current.get(msg.id);
    if (inFlight) return inFlight;

    const token = getToken();
    if (!token) return null;

    const fetchPromise = (async () => {
      try {
        const res = await fetch(`${API_BASE}${msg.file_url}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!res.ok) throw new Error(res.statusText);
        const blob = await res.blob();
        const url = URL.createObjectURL(blob);
        blobUrlByMessageIdRef.current.set(msg.id, url);
        return url;
      } catch (err) {
        return null;
      } finally {
        fetchingBlobsRef.current.delete(msg.id);
      }
    })();

    fetchingBlobsRef.current.set(msg.id, fetchPromise);
    return fetchPromise;
  };

  useEffect(() => {
    return () => {
      for (const url of blobUrlByMessageIdRef.current.values()) {
        try {
          URL.revokeObjectURL(url);
        } catch {
          // ignore
        }
      }
      blobUrlByMessageIdRef.current.clear();
    };
  }, []);

  useEffect(() => {
    if (!contextMenu) return;
    const onDown = () => setContextMenu(null);
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setContextMenu(null);
    };
    window.addEventListener('mousedown', onDown);
    window.addEventListener('scroll', onDown, true);
    window.addEventListener('keydown', onKey);
    return () => {
      window.removeEventListener('mousedown', onDown);
      window.removeEventListener('scroll', onDown, true);
      window.removeEventListener('keydown', onKey);
    };
  }, [contextMenu]);

  const onMessageContextMenu = async (e: React.MouseEvent, msg: Message) => {
    e.preventDefault();

    if (selectMode) {
      const set = selectedIdsRef.current;
      if (set.has(msg.id)) set.delete(msg.id);
      else set.add(msg.id);
      setSendError(`Selected: ${set.size}`);
      return;
    }

    const isMe = msg.sender_role === 'student';
    const placeholder = isDeletedForEveryoneText(msg.content);
    setContextMenu({ msg, x: e.clientX, y: e.clientY, isMe, placeholder });
  };

  const tokenMemo = useMemo(() => getToken(), []);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Handle course selection
  const handleSelectCourse = (course: UserCourse) => {
    setSelectedCourse(course);
    // Clear previous messages when switching courses
    setMessages([]);
    setThread(null);
    setThreadKey(null);
    setKeyReady(false);
    setWsReady(false);
    setSendError(null);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  // Course files data
  const courseFiles = [
    { id: 1, name: 'React Hooks Cheatsheet', type: 'pdf', size: '245 KB' },
    { id: 2, name: 'Sample Projects Repository', type: 'code', size: 'GitHub' },
  ];

  // Course assignments data
  const courseAssignments = [
    { id: 1, name: 'Build a Todo App', due: 'Due in 3 days', status: 'pending' },
    { id: 2, name: 'React Router Implementation', due: 'Due in 1 week', status: 'completed' },
  ];

  const [activeContextTab, setActiveContextTab] = useState<'files' | 'assignments'>('files');

  return (
    <div className="fixed inset-0 w-full h-full flex bg-gray-50 gap-2 md:gap-4 lg:gap-6 overflow-hidden">
      {/* Sidebar Navigation */}
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 pr-2 md:pr-4 lg:pr-6 overflow-hidden">
        {/* Profile Header */}
        <Profileheader onMenuClick={() => setSidebarOpen(true)} />

        {/* Chat Container */}
        <div className="flex-1 flex overflow-hidden bg-white rounded-2xl md:rounded-3xl shadow-sm border border-gray-200 mb-2 md:mb-4 lg:mb-6">
          <ChatSidebar
            selectedCourse={selectedCourse}
            userCourses={userCourses}
            coursesLoading={coursesLoading}
            handleSelectCourse={handleSelectCourse}
            onBack={() => navigate(-1)}
          />

          {/* Chat Main Area */}
          <div className={`
            ${selectedCourse ? 'flex' : 'hidden'} 
            md:flex flex-1 flex-col bg-white min-w-0
          `}>
            {/* Chat Header */}
            <div className="h-14 md:h-16 lg:h-20 border-b border-gray-200 flex items-center justify-between px-3 md:px-6 lg:px-8">
              <div className="flex items-center gap-3">
                {/* Back Button (Mobile only) */}
                <button 
                  onClick={() => setSelectedCourse(null)}
                  className="md:hidden p-2 -ml-2 text-gray-500 hover:text-gray-700"
                >
                  <ArrowLeft className="w-5 h-5" />
                </button>

                <div className="relative">
                  <img
                    src={selectedCourse?.course_image || 'https://ui-avatars.com/api/?name=Course&background=0D8ABC&color=fff'}
                    alt={selectedCourse?.course_title || 'Select a course'}
                    className="w-8 h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 rounded-full object-cover"
                  />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 text-sm md:text-base lg:text-lg">{selectedCourse?.course_title || 'Select a course'}</h3>
                </div>
              </div>
              <div className="flex items-center gap-1">
                {/* <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                  <Paperclip className="w-5 h-5 text-gray-500" />
                </button> */}
                {/* <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                  <Calendar className="w-5 h-5 text-gray-500" />
                </button> */}
                {/* <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                  <MoreVertical className="w-5 h-5 text-gray-500" />
                </button> */}
              </div>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-3 md:p-6 lg:p-8 space-y-4 md:space-y-6 lg:space-y-8 bg-gray-50">
              {!selectedCourse && (
                <div className="flex flex-col items-center justify-center h-full text-gray-400">
                  <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mb-4">
                    <Search className="w-8 h-8 text-gray-400" />
                  </div>
                  <p className="text-lg font-medium">Select a course to start chatting</p>
                  <p className="text-sm mt-1">Choose from your assigned courses on the left</p>
                </div>
              )}
              {selectedCourse && loading && (
                <div className="text-center py-10 text-gray-400">Loading chat...</div>
              )}
              {selectedCourse && !loading && messages.map((msg, index) => {
                  const isMe = msg.sender_role === 'student' || isDeletedForEveryoneText(msg.content);
                  const showAvatar = index === 0 || messages[index - 1]?.sender_role !== msg.sender_role;

                  return (
                    <div
                      key={msg.id}
                      className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}
                    >
                      {!isMe && showAvatar && (
                        <img
                          src={selectedCourse?.course_image || 'https://ui-avatars.com/api/?name=Instructor&background=0D8ABC&color=fff'}
                          alt="Instructor"
                          className="w-8 h-8 rounded-full object-cover mr-2 mt-1"
                        />
                      )}
                    {!isMe && !showAvatar && <div className="w-8 mr-2" />}

                      <div
                        onContextMenu={(e) => onMessageContextMenu(e, msg)}
                        onClick={() => {
                          if (!selectMode) return;
                          const set = selectedIdsRef.current;
                          if (set.has(msg.id)) set.delete(msg.id);
                          else set.add(msg.id);
                          setSendError(`Selected: ${set.size}`);
                        }}
                        className={`max-w-[85%] md:max-w-[75%] lg:max-w-[70%] xl:max-w-[65%] ${isMe ? 'ml-6 md:ml-12' : ''}`}
                      >
                      {/* Code block message */}
                      {msg.content?.includes('```') || msg.content?.includes('useState') ? (
                        <div className="bg-gray-900 rounded-xl overflow-hidden">
                          <div className="flex items-center justify-between px-4 py-2 bg-gray-800 border-b border-gray-700">
                            <span className="text-xs text-gray-400">javascript</span>
                            <button
                              onClick={() => copyToClipboard(msg.content || '')}
                              className="flex items-center gap-1 text-xs text-gray-400 hover:text-white transition-colors"
                            >
                              <Copy className="w-3 h-3" />
                              Copy
                            </button>
                          </div>
                          <pre className="p-4 text-sm text-green-400 overflow-x-auto">
                            <code>{msg.content?.replace(/```/g, '').trim()}</code>
                          </pre>
                        </div>
                      ) : msg.message_type === 'image' && msg.file_url ? (
                        <img
                          src={
                            msg.file_url.startsWith('blob:')
                              ? msg.file_url
                              : blobUrlByMessageIdRef.current.get(msg.id) || `${API_BASE}${msg.file_url}`
                          }
                          alt="Shared image"
                          className="max-w-full rounded-xl cursor-pointer shadow-sm"
                          onLoad={() => {
                            if (!msg.file_url || msg.file_url.startsWith('blob:')) return;
                            if (blobUrlByMessageIdRef.current.has(msg.id)) return;
                            if (!tokenMemo) return;
                            resolveProtectedBlobUrl(msg).then((url) => {
                              if (!url) return;
                              setMessages((prev) => prev.map((m) => (m.id === msg.id ? { ...m } : m)));
                            });
                          }}
                          onClick={async () => {
                            const url = msg.file_url.startsWith('blob:')
                              ? msg.file_url
                              : (await resolveProtectedBlobUrl(msg)) || `${API_BASE}${msg.file_url}`;
                            window.open(url, '_blank');
                          }}
                        />
                      ) : msg.message_type === 'file' && msg.file_url ? (
                        <div className="flex items-center gap-3 p-4 bg-white border border-gray-200 rounded-xl shadow-sm">
                          <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                            <FileText className="w-5 h-5 text-blue-600" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-gray-900 truncate">{msg.file_name || 'File'}</p>
                            <p className="text-xs text-gray-500">PDF Document</p>
                          </div>
                          <button
                            onClick={async () => {
                              try {
                                const token = getToken();
                                const res = await fetch(`${API_BASE}${msg.file_url}`, {
                                  headers: { Authorization: `Bearer ${token}` },
                                });
                                if (!res.ok) throw new Error(res.statusText);
                                const blob = await res.blob();
                                const url = URL.createObjectURL(blob);
                                window.open(url, '_blank');
                              } catch (err: any) {
                                setSendError('File download failed: ' + err.message);
                              }
                            }}
                            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                          >
                            <Download className="w-4 h-4 text-gray-600" />
                          </button>
                        </div>
                      ) : (
                        <div
                          className={`px-4 py-3 sm:px-5 sm:py-3.5 text-[15px] break-words whitespace-pre-wrap ${
                            isMe
                              ? 'bg-gradient-to-r from-[#2B44FF] to-[#A82BFF] text-white rounded-[24px] rounded-br-[8px] shadow-sm'
                              : 'bg-white text-gray-700 border border-gray-100 rounded-[24px] rounded-bl-[8px] shadow-sm'
                          }`}
                          style={{ wordBreak: 'break-word' }}
                        >
                          {msg.reply_to_message_id && (
                            <div className={`p-2 rounded-lg mb-2 border-l-[3px] flex flex-col ${isMe ? 'bg-black/10 border-white/60' : 'bg-gray-50 border-[#2B44FF]'}`}>
                              <span className={`text-[12px] font-bold mb-0.5 ${isMe ? 'text-white/90' : 'text-[#2B44FF]'}`}>
                                Replying to message
                              </span>
                              <span className={`text-[12px] line-clamp-1 ${isMe ? 'text-white/80' : 'text-gray-500'}`}>
                                {messages.find(m => m.id === msg.reply_to_message_id)?.content || `#${msg.reply_to_message_id}`}
                              </span>
                            </div>
                          )}
                          
                          {msg.content ?? '[encrypted or loading...]'}
                        </div>
                      )}

                      <div className={`flex items-center gap-2 mt-1.5 text-[11px] text-gray-400 ${isMe ? 'justify-end' : 'justify-start'}`}>
                        {(() => {
                          let date: Date;
                          // Handle timestamp - if it doesn't have 'Z' or timezone offset, treat as UTC
                          const timestamp = msg.created_at;
                          if (timestamp && !timestamp.includes('Z') && !timestamp.includes('+') && !timestamp.includes('-', 10)) {
                            // Append 'Z' to treat as UTC
                            date = new Date(timestamp + 'Z');
                          } else {
                            date = new Date(timestamp);
                          }
                          const localDate = isNaN(date.getTime()) ? new Date() : date;
                          const displayTime = localDate.toLocaleTimeString([], {
                            hour: '2-digit',
                            minute: '2-digit',
                            hour12: true,
                          });
                          const isEdited = msg.is_edited || (msg.updated_at && new Date(msg.updated_at).getTime() - new Date(msg.created_at).getTime() > 1000);
                          
                          return (
                            <div className="flex items-center gap-1.5">
                              {isEdited && <span className="italic">Edited</span>}
                              <span>{displayTime}</span>
                            </div>
                          );
                        })()}
                        {typeof msg.id === 'string' && msg.id.startsWith('temp-') && (
                          <span className="text-yellow-500">• sending…</span>
                        )}
                        {msg.reply_to_message_id && isMe && (
                          <div className="flex items-center gap-1.5 ml-1">
                            <Reply className="w-[12px] h-[12px] cursor-pointer hover:text-gray-600 transition-colors" onClick={(e) => {
                              e.stopPropagation();
                              setReplyingTo(msg);
                              setEditingMessage(null);
                            }} />
                            <Trash2 className="w-[12px] h-[12px] text-red-300 hover:text-red-500 cursor-pointer transition-colors" onClick={async (e) => {
                              e.stopPropagation();
                              const threadId = threadIdRef.current;
                              if (!threadId) return;
                              try {
                                await apiFetchJson(`/chat/message/${msg.id}/delete/everyone`, { method: 'POST' });
                                setMessages((prev) =>
                                  prev.map((m) =>
                                    m.id === msg.id
                                      ? {
                                          ...m,
                                          content: '[This message was deleted]',
                                          message_type: 'text',
                                          ciphertext: undefined,
                                          iv: undefined,
                                        }
                                      : m
                                  )
                                );
                              } catch (err) {
                                console.error(err);
                              }
                            }} />
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )
              })}

              {sendError && (
                <div className="text-center text-amber-600 py-3 text-sm bg-amber-50 rounded-lg">
                  {sendError}
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            <ChatInput
              selectedCourse={selectedCourse}
              pendingFile={pendingFile}
              pendingFilePreview={pendingFilePreview}
              setPendingFile={setPendingFile}
              setPendingFilePreview={setPendingFilePreview}
              fileInputRef={fileInputRef}
              replyingTo={replyingTo}
              setReplyingTo={setReplyingTo}
              input={input}
              setInput={setInput}
              sendMessage={sendMessage}
              loading={loading}
              keyReady={keyReady}
              wsReady={wsReady}
            />
          </div>

          {/* Context Menu */}
          {contextMenu && (
            <div
              className="fixed z-50"
              style={{
                [contextMenu.isMe ? 'right' : 'left']: contextMenu.isMe ? window.innerWidth - contextMenu.x : contextMenu.x,
                top: contextMenu.y
              }}
              onMouseDown={(e) => e.stopPropagation()}
              onContextMenu={(e) => e.preventDefault()}
            >
              <div className="bg-white border border-gray-200 rounded-lg shadow-xl overflow-hidden w-36 sm:w-40">
                {!contextMenu.placeholder && (
                  <>
                    <button
                      type="button"
                      className="w-full text-left px-3 py-1.5 sm:py-2 text-xs sm:text-sm hover:bg-gray-50 text-gray-700 transition-colors"
                      onClick={() => {
                        setReplyingTo(contextMenu.msg);
                        setEditingMessage(null);
                        setContextMenu(null);
                      }}
                    >
                      Reply
                    </button>

                    {contextMenu.isMe && (
                      <button
                        type="button"
                        className="w-full text-left px-3 py-1.5 sm:py-2 text-xs sm:text-sm hover:bg-gray-50 text-gray-700 transition-colors"
                        onClick={() => {
                          setEditingMessage(contextMenu.msg);
                          setReplyingTo(null);
                          setInput(contextMenu.msg.content || '');
                          setContextMenu(null);
                        }}
                      >
                        Edit
                      </button>
                    )}

                    {contextMenu.isMe && (
                      <button
                        type="button"
                        className="w-full text-left px-3 py-1.5 sm:py-2 text-xs sm:text-sm hover:bg-gray-50 text-red-600 transition-colors"
                        onClick={async () => {
                          const threadId = threadIdRef.current;
                          const msg = contextMenu.msg;
                          setContextMenu(null);
                          if (!threadId) return;
                          try {
                            await apiFetchJson(`/chat/message/${msg.id}/delete/everyone`, { method: 'POST' });
                            setMessages((prev) =>
                              prev.map((m) =>
                                m.id === msg.id
                                  ? {
                                      ...m,
                                      content: '[This message was deleted]',
                                      message_type: 'text',
                                      ciphertext: undefined,
                                      iv: undefined,
                                      file_url: undefined,
                                      file_name: undefined,
                                    }
                                  : m
                              )
                            );
                          } catch (err: any) {
                            setSendError('Delete failed: ' + err.message);
                          }
                        }}
                      >
                        Delete for Everyone
                      </button>
                    )}

                    <button
                      type="button"
                      className="w-full text-left px-3 py-1.5 sm:py-2 text-xs sm:text-sm hover:bg-gray-50 text-gray-700 transition-colors"
                      onClick={async () => {
                        const threadId = threadIdRef.current;
                        const msg = contextMenu.msg;
                        setContextMenu(null);
                        if (!threadId) return;
                        try {
                          await apiFetchJson(`/chat/message/${msg.id}/delete/me`, { method: 'POST' });
                          setMessages((prev) => prev.filter((m) => m.id !== msg.id));
                        } catch (err: any) {
                          setSendError('Delete failed: ' + err.message);
                        }
                      }}
                    >
                      Delete for Me
                    </button>
                  </>
                )}

                {contextMenu.placeholder && (
                  <button
                    type="button"
                    className="w-full text-left px-3 py-1.5 sm:py-2 text-xs sm:text-sm hover:bg-gray-50 text-red-600 transition-colors"
                    onClick={async () => {
                      const threadId = threadIdRef.current;
                      const msg = contextMenu.msg;
                      setContextMenu(null);
                      if (!threadId) return;
                      try {
                        await apiFetchJson(`/chat/thread/${threadId}/hide_placeholders`, {
                          method: 'POST',
                          body: [msg.id],
                        });
                        setMessages((prev) => prev.filter((m) => m.id !== msg.id));
                      } catch (err: any) {
                        setSendError('Hide failed: ' + err.message);
                      }
                    }}
                  >
                    Delete
                  </button>
                )}
              </div>
            </div>
          )}

          {/* Status indicators */}
          {/* <div className="fixed bottom-4 right-4 flex gap-2 z-40">
            <div
              className={`text-xs px-3 py-1.5 rounded-full border shadow-sm ${
                wsReady ? 'bg-green-100 text-green-700 border-green-200' : 'bg-red-100 text-red-700 border-red-200'
              }`}
            >
              {wsReady ? 'Connected' : 'Disconnected'}
            </div>
            <div
              className={`text-xs px-3 py-1.5 rounded-full border shadow-sm ${
                keyReady ? 'bg-blue-100 text-blue-700 border-blue-200' : 'bg-amber-100 text-amber-700 border-amber-200'
              }`}
            >
              {keyReady ? 'Secure' : 'Connecting...'}
            </div>
          </div> */}

          <input
            type="file"
            ref={fileInputRef}
            className="hidden"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (!file) return;

              setPendingFile(file);

              if (file.type.startsWith('image/')) {
                setPendingFilePreview(URL.createObjectURL(file));
              } else {
                setPendingFilePreview(null);
              }
            }}
          />

          {/* Course Context Sidebar */}
          <CourseContextSidebar
            selectedCourse={selectedCourse}
            activeContextTab={activeContextTab}
            setActiveContextTab={setActiveContextTab}
            courseFiles={courseFiles}
            courseAssignments={courseAssignments}
          />
        </div>
      </div>
    </div>
  );
}
