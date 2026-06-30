import { X, Reply, Paperclip, Send, FileText } from "lucide-react";
import React from "react";

interface Course {
  course_id: number;
  course_title: string;
}

interface Message {
  id: string | number;
  content: string;
}

interface ChatInputProps {
  selectedCourse: Course | null;
  pendingFile: File | null;
  pendingFilePreview: string | null;
  setPendingFile: (file: File | null) => void;
  setPendingFilePreview: (url: string | null) => void;
  fileInputRef: React.RefObject<HTMLInputElement>;
  replyingTo: Message | null;
  setReplyingTo: (msg: Message | null) => void;
  input: string;
  setInput: (input: string) => void;
  sendMessage: () => void;
  loading: boolean;
  keyReady: boolean;
  wsReady: boolean;
}

const ChatInput = ({
  selectedCourse,
  pendingFile,
  pendingFilePreview,
  setPendingFile,
  setPendingFilePreview,
  fileInputRef,
  replyingTo,
  setReplyingTo,
  input,
  setInput,
  sendMessage,
  loading,
  keyReady,
  wsReady
}: ChatInputProps) => {
  if (!selectedCourse) return null;

  return (
    <div className="p-3 md:p-4 lg:p-6 bg-white border-t border-gray-200 flex-shrink-0">
      {pendingFile && (
        <div className="mb-3 p-2 md:p-3 bg-gray-50 rounded-lg flex items-center gap-3 text-xs md:text-sm border border-gray-200">
          {pendingFilePreview ? (
            <img
              src={pendingFilePreview}
              alt="preview"
              className="w-8 h-8 md:w-10 md:h-10 object-cover rounded"
            />
          ) : (
            <div className="w-8 h-8 md:w-10 md:h-10 bg-gray-200 rounded flex items-center justify-center flex-shrink-0">
              <FileText className="w-4 h-4 md:w-5 md:h-5 text-gray-500" />
            </div>
          )}
          <div className="flex-1 min-w-0 truncate text-gray-700">{pendingFile.name}</div>
          <button
            onClick={() => {
              setPendingFile(null);
              setPendingFilePreview(null);
              if (fileInputRef.current) fileInputRef.current.value = '';
            }}
            className="text-red-500 hover:text-red-600 p-1 hover:bg-red-50 rounded-full transition-colors flex-shrink-0"
          >
            <X size={18} className="w-4 h-4 md:w-5 md:h-5" />
          </button>
        </div>
      )}

      {replyingTo && (
        <div className="mb-3 px-3 py-2 md:px-4 bg-blue-50 rounded-lg flex items-center gap-2 text-xs md:text-sm border-l-4 border-blue-500">
          <Reply className="w-3 h-3 md:w-4 md:h-4 text-blue-500 flex-shrink-0" />
          <span className="text-gray-600 truncate flex-1 min-w-0">
            Replying to: {replyingTo.content?.slice(0, 60) || 'message'}...
          </span>
          <button
            onClick={() => setReplyingTo(null)}
            className="text-gray-400 hover:text-gray-600 p-1 hover:bg-blue-100 rounded-full transition-colors flex-shrink-0"
          >
            <X size={14} className="w-3 h-3 md:w-4 md:h-4" />
          </button>
        </div>
      )}

      <div className="flex items-center gap-2 md:gap-3 lg:gap-4">
        <button
          onClick={() => fileInputRef.current?.click()}
          className="p-2 md:p-3 lg:p-4 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full transition-colors flex-shrink-0"
          disabled={!!pendingFile || loading}
        >
          <Paperclip size={20} className="w-5 h-5 lg:w-6 lg:h-6" />
        </button>

        <textarea
          value={input}
          onChange={(e) => {
            setInput(e.target.value);
            e.target.style.height = '72px'; // Reset to min height
            const scrollHeight = e.target.scrollHeight;
            e.target.style.height = `${Math.min(scrollHeight, 150)}px`;
          }}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault();
              sendMessage();
              // Reset height after sending
              e.target.style.height = '72px';
            }
          }}
          placeholder={
            !selectedCourse
              ? 'Select a course to start chatting...'
              : loading
              ? 'Loading...'
              : !keyReady
              ? 'Waiting for secure connection...'
              : replyingTo
              ? 'Replying...'
              : pendingFile
              ? 'File selected — press Send'
              : 'Type a message...'
          }
          disabled={loading || !selectedCourse}
          className="flex-1 min-w-0 bg-[#F3F6FA] border-0 rounded-3xl px-5 py-4 text-sm lg:text-base outline-none focus:ring-2 focus:ring-purple-500/20 placeholder:text-gray-400 disabled:opacity-50 resize-none overflow-y-auto leading-relaxed shadow-sm"
          style={{ minHeight: '72px', maxHeight: '150px', height: '72px' }}
        />

        <button
          onClick={sendMessage}
          disabled={loading || !selectedCourse || !wsReady || !keyReady || (!input.trim() && !pendingFile)}
          className="p-2 md:p-3 lg:p-4 bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white rounded-full disabled:opacity-50 disabled:hover:from-purple-600 disabled:hover:to-purple-700 transition-all shadow-md flex-shrink-0"
        >
          <Send size={20} className="w-4 h-4 md:w-5 md:h-5 lg:w-6 lg:h-6" />
        </button>
      </div>
    </div>
  );
};

export default ChatInput;
