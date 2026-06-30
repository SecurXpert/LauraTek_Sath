import { useEffect, useState, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import AceEditor from "react-ace";
import axios from "axios";
import { toast } from "sonner";
import {
  Loader2,
  Clock,
  Play,
  Code2,
  FileText,
  Camera,
  User,
  ArrowLeft,
} from "lucide-react";
import Devlogo from "../assests/Devlogo.png";
import { Skeleton } from "@/components/ui/skeleton";
import CompilerSkeleton from "./compiler-page/CompilerSkeleton";
import EmptyState from "./compiler-page/EmptyState";
import SuccessModal from "./compiler-page/SuccessModal";
import CompilerHeader from "./compiler-page/CompilerHeader";
import QuestionSidebar from "./compiler-page/QuestionSidebar";
import QuestionPanel from "./compiler-page/QuestionPanel";
axios.interceptors.request.use((config) => {
  const token = localStorage.getItem("userToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
 
import "ace-builds/src-noconflict/mode-python";
import "ace-builds/src-noconflict/mode-java";
import "ace-builds/src-noconflict/mode-php";
import "ace-builds/src-noconflict/theme-monokai"; // Dark theme
 
export default function OnlineCompiler() {
  const location = useLocation();
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(location.search);
  const initialExamId = location.state?.examId || searchParams.get("exam_id") || searchParams.get("question_id") || searchParams.get("examId") || localStorage.getItem("examId") || "";
  const initialCourseId = location.state?.course_id || searchParams.get("course_id") || localStorage.getItem("course_id") || "12";
  const [examId, setExamId] = useState(initialExamId);
  const [courseId, setCourseId] = useState(initialCourseId);

  useEffect(() => {
    if (courseId) {
      localStorage.setItem("course_id", courseId);
    }
  }, [courseId]);
  const token = localStorage.getItem("userToken") || localStorage.getItem("access_token");
 
  const [questions, setQuestions] = useState<any[]>([]);
  const [activeIdx, setActiveIdx] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [language, setLanguage] = useState("python");
  const [output, setOutput] = useState("");
  const [customInput, setCustomInput] = useState("");
  const [loading, setLoading] = useState(true);
  const [examTitle, setExamTitle] = useState("Coding Exam");
  const [userId, setUserId] = useState("");
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const [cameraError, setCameraError] = useState(false);
  const [fileName, setFileName] = useState(".java");
  const [cameraRetryCount, setCameraRetryCount] = useState(0);
 
  const ws = useRef<WebSocket | null>(null);
  const outputEndRef = useRef<HTMLDivElement>(null);
  const editorRef = useRef<any>(null);
 
  const currentQuestion = questions[activeIdx];
  const [examStartedAt, setExamStartedAt] = useState<number | null>(null);
 
  // Add these state variables at the top with your other useState
  const [duration, setDuration] = useState<number>(0); // Total duration in minutes
  const [timeLeft, setTimeLeft] = useState<number>(0); // Remaining seconds
  const [isTimeUp, setIsTimeUp] = useState(false);
  const TIMER_STORAGE_KEY = `exam_timer_${examId}_${userId}`;
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [isSubmitPopupOpen, setIsSubmitPopupOpen] = useState(false);
  const [outputs, setOutputs] = useState<Record<number, string>>({});
  const [testResultsMap, setTestResultsMap] = useState<Record<number, any[]>>(
    {},
  );
  const [testResults, setTestResults] = useState<any[] | null>(null);
 
  const [isAlreadySubmitted, setIsAlreadySubmitted] = useState(false);
  const [isRunning, setIsRunning] = useState(false);
  const buildPayload = (extra: Record<string, any> = {}) => {
    const currentCode = answers[activeIdx] || "";
 
    const payload: any = {
      code: currentCode.trim(),
      language,
      ...extra,
    };
 
    if (language === "java") {
      payload.file_name = fileName?.trim() || ".java";
    }
 
    return payload;
  };
 
  // Add this useEffect inside your OnlineCompiler component (anywhere after the other useEffects)
 
  const handleTimeUp = async () => {
    localStorage.removeItem(TIMER_STORAGE_KEY);
    toast.warning("Time's up! Submitting your answers...");
    await submitCode(true);
    toast.error("Exam time ended. Redirecting...");
    // setTimeout(() => navigate("/dashboard/compiler"), 3000);
  };
 

 
  // Now add the anti-tab-switching useEffect (safe to reference handleTimeUp)
  useEffect(() => {
    let tabSwitchCount = 0;
 
    const handleVisibilityChange = () => {
      if (document.hidden) {
        tabSwitchCount++;
 
        if (tabSwitchCount === 1) {
          toast.warning(
            "Warning: Switching tabs is not allowed during the exam!",
          );
        } else if (tabSwitchCount >= 2) {
          toast.error(
            "Multiple tab switches detected. Auto-submitting exam for security reasons.",
          );
          handleTimeUp(); // Now this works — no initialization error
        }
      }
    };
 
    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        (e.ctrlKey || e.metaKey) &&
        (e.key === "t" || e.key === "n" || e.key === "w")
      ) {
        e.preventDefault();
        toast.error("Opening new tabs is disabled during the exam.");
        toast.warning(
          "This attempt has been recorded. Exam will auto-submit on repeated violation.",
        );
        tabSwitchCount++;
 
        if (tabSwitchCount >= 2) {
          toast.error("Violation detected. Auto-submitting your exam.");
          handleTimeUp();
        }
      }
    };
 
    const handleAuxClick = (e: MouseEvent) => {
      if (e.button === 1 || (e.ctrlKey && e.button === 0)) {
        e.preventDefault();
        toast.error("Opening links in new tabs is disabled.");
        tabSwitchCount++;
        if (tabSwitchCount >= 2) {
          toast.error("Violation detected. Auto-submitting your exam.");
          handleTimeUp();
        }
      }
    };
 
    const handleContextMenu = (e: MouseEvent) => {
      if (e.ctrlKey || e.shiftKey) {
        e.preventDefault();
        toast.error("Right-click actions are restricted during the exam.");
      }
    };
 
    const handlePopState = () => {
      window.history.pushState(null, "", window.location.href);
      toast.warning("Back navigation is disabled during the exam. Please submit your exam to exit.");
    };

    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      e.preventDefault();
      e.returnValue = "Are you sure you want to leave? Your exam progress will be lost.";
    };

    window.history.pushState(null, "", window.location.href);
    window.addEventListener("popstate", handlePopState);
    window.addEventListener("beforeunload", handleBeforeUnload);

    document.addEventListener("visibilitychange", handleVisibilityChange);
    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("auxclick", handleAuxClick);
    document.addEventListener("contextmenu", handleContextMenu);
 
    return () => {
      window.removeEventListener("popstate", handlePopState);
      window.removeEventListener("beforeunload", handleBeforeUnload);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("auxclick", handleAuxClick);
      document.removeEventListener("contextmenu", handleContextMenu);
    };
  }, []);
 

 
  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
  };

  useEffect(() => {
    let isMounted = true;
    if (!loading && questions.length > 0 && !showSuccessModal && !cameraError) {
      const startCamera = async () => {
        try {
          const stream = await navigator.mediaDevices.getUserMedia({
            video: true,
          });
          if (!isMounted) {
            stream.getTracks().forEach((track) => track.stop());
            return;
          }
          streamRef.current = stream;
          if (videoRef.current) {
            videoRef.current.srcObject = stream;
            videoRef.current.play().catch(e => console.error("Error playing video:", e));
          }
        } catch (err) {
          console.error("Camera access denied or not available", err);
          if (isMounted) {
            setCameraError(true);
            toast.error("Camera access is required for proctoring. Please allow it in your browser.");
          }
        }
      };
 
      startCamera();
    }
 
    return () => {
      isMounted = false;
      stopCamera();
    };
  }, [loading, questions.length, showSuccessModal, cameraRetryCount, cameraError]);
 
  // Auto-submit when time is up
  // const handleTimeUp = async () => {
  //   localStorage.removeItem(TIMER_STORAGE_KEY);
  //   toast.warning("Time's up! Submitting your answers...");
  //   await submitCode();
  //   toast.error("Exam time ended. Redirecting...");
  //   setTimeout(() => navigate("//dashboard/compiler"), 3000);
  // };
  // Format seconds → MM:SS
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };
  useEffect(() => {
    if (!duration || !userId || !examId) return;
 
    const TIMER_STORAGE_KEY = `exam_timer_${examId}_${userId}`;
    const totalSeconds = duration * 60;
 
    // Load or initialize start time
    let saved = localStorage.getItem(TIMER_STORAGE_KEY);
    let startedAt: number;
 
    if (saved) {
      startedAt = JSON.parse(saved).startedAt;
    } else {
      startedAt = Date.now();
      localStorage.setItem(TIMER_STORAGE_KEY, JSON.stringify({ startedAt }));
    }
 
    // Function to calculate remaining time
    const updateTime = () => {
      const elapsed = Math.floor((Date.now() - startedAt) / 1000);
      const remaining = Math.max(totalSeconds - elapsed, 0);
      setTimeLeft(remaining);
 
      if (remaining <= 0) {
        setIsTimeUp(true);
        handleTimeUp();
        return false; // stop interval
      }
      return true;
    };
 
    // Initial update so timer shows correct value immediately
    if (!updateTime()) return;
 
    // Start interval
    const timer = setInterval(() => {
      if (!updateTime()) clearInterval(timer);
    }, 1000);
 
    // Cleanup on unmount
    return () => clearInterval(timer);
  }, [duration, userId, examId]);
 
  // Decode JWT
  useEffect(() => {
    if (!token) {
      toast.error("Please login");
      // navigate("/"); // Removed to prevent redirecting during testing
      return;
    }
    try {
      const payload = JSON.parse(atob(token.split(".")[1]));
      console.log("=== JWT PAYLOAD ===", payload);
      const extractedId = String(
        payload.user_id ||
          payload.id ||
          payload.candidate_id ||
          payload.sub ||
          payload.email ||
          "",
      );
      console.log("Extracted userId:", extractedId);
      setUserId(extractedId);
    } catch (err) {
      console.error("Invalid token", err);
    }
  }, [token, navigate]);
 
  // Fetch exam
  useEffect(() => {
    console.log("=== COMPILER MOUNTED / TOKEN CHANGED ===", { token });
    if (!token) {
      toast.warning("Testing mode: No token found.");
    }
    fetchExamDetails();
  }, [token]);

  const fetchExamDetails = async () => {
    console.log("-> fetchExamDetails called");
    try {
      setLoading(true);
      
      const targetExamId = examId || localStorage.getItem("examId") || "2";
      console.log(`-> Fetching questions from /exam/get/details for examId: ${targetExamId}`);
      
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/exam/get/details`,
        { 
          params: { exam_id: targetExamId },
          headers: { Authorization: `Bearer ${token}` },
          timeout: 30000 
        }
      );
      
      const data = res.data;
      console.log("-> /exam/get/details response:", data);

      if (data && data.questions) {
        const questionsList = Object.entries(data.questions).map(([key, item]: [string, any]) => {
          const details = item.details || (typeof item.question === 'object' ? item.question : null) || item.question_bank || item || {};
          return {
            exam_question_index: key,
            exam_question_id: item.id || item.exam_question_id || parseInt(key),
            question_bank_id: String(item.question_bank_id || key),
            score: item.score || details.score || 10,
            title: details.title || item.title || "Untitled",
            question: details.question || (typeof item.question === 'string' ? item.question : null) || "No description provided",
            description: details.description || item.description || "",
            sample_inputs: details.sample_inputs || item.sample_inputs || "",
            sample_outputs: details.sample_outputs || item.sample_outputs || "",
            test_cases: details.test_cases || [],
            suggestion: details.suggestion || [],
            duration: data.duration || 60,
          };
        });

        setQuestions(questionsList);
        if (questionsList.length > 0) {
          setExamTitle(data.title || "Coding Exam");
          setDuration(data.duration || 60);
          setExamId(String(data.id));
          localStorage.setItem("examId", String(data.id));
        }
        toast.success(`Loaded ${questionsList.length} question(s)`);
      } else {
        console.error("Unexpected response format:", data);
        toast.error("Failed to load questions. Format unexpected.");
      }
    } catch (err: any) {
      console.error("-> Fetch exam error:", err);
      toast.error("Failed to load questions. Please check console.");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    if (currentQuestion) {
      // Only set boilerplate if no answer exists for this question
      if (!answers[activeIdx]) {
        setAnswers((prev) => ({
          ...prev,
          [activeIdx]: getBoilerplate(currentQuestion.title),
        }));
      }
      setCustomInput(currentQuestion.sample_inputs || "");
    }
  }, [currentQuestion, language, activeIdx]);
 
  const getBoilerplate = (title: string) => {
    const templates: Record<string, string> = {
      python: `# ${title}\n\n# Write your code here\n`,
      java: `// ${title}\npublic class Main {\n    public static void main(String[] args) {\n        // Write your code here\n    }\n}`,
      php: `<?php\n// ${title}\n// Write your code here\n?>`,
    };
    return templates[language] || "";
  };
 
  useEffect(() => {
    if (language === "java") {
      setFileName(".java");
    } else {
      setFileName("");
    }
  }, [language]);
 
  useEffect(() => {
    if (language !== "java") return;
 
    const currentCode = answers[activeIdx] || "";
 
    const match = currentCode.match(/public\s+class\s+([A-Za-z_]\w*)/);
 
    if (match && match[1]) {
      const detectedName = match[1] + ".java";
 
      if (fileName !== detectedName) {
        setFileName(detectedName);
      }
    } else {
      // If class name removed, reset cleanly
      if (fileName !== "") {
        setFileName("");
      }
    }
  }, [answers, activeIdx, language]);
 
  // Auto-scroll output
  useEffect(() => {
    outputEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [output]);
 
  // REST API Run Locally
  const runSimpleCompilation = async () => {
    // remove test case results so console mode returns
    setTestResultsMap((prev) => {
      const updated = { ...prev };
      delete updated[activeIdx];
      return updated;
    });

    const currentCode = answers[activeIdx] || "";
    if (!currentCode.trim()) {
      toast.error("Write some code first");
      return;
    }

    setIsRunning(true);
    setOutputs((prev) => ({
      ...prev,
      [activeIdx]: "⏳ Executing...",
    }));

    try {
      const payload = {
        user_input: customInput || "",
        code: currentCode.trim(),
      };

      const currentUser = userId || "S0001";

      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/interpreter/execute-programe?language=${language}&current_user=${currentUser}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(payload),
        },
      );

      const data = await response.json();
      if (!response.ok) throw new Error(data.detail?.[0]?.msg || data.message || "Execution failed");

      let outputText = "";
      if (data.error) {
        outputText = `❌ Error:\n${data.error}`;
      } else {
        outputText = data.output || "No output returned";
      }
      if (data.execution_time !== undefined) {
        outputText += `\n\n⏱ Execution time: ${data.execution_time}s`;
      }

      setOutputs((prev) => ({
        ...prev,
        [activeIdx]: outputText,
      }));
    } catch (err: any) {
      setOutputs((prev) => ({
        ...prev,
        [activeIdx]: `❌ Error: ${err.message}`,
      }));
      toast.error("Failed to execute code");
    } finally {
      setIsRunning(false);
    }
  };
 
  const sendInput = () => {
    if (!ws.current || ws.current.readyState !== WebSocket.OPEN) {
      toast.warning("Program not running!");
      return;
    }
    if (!customInput.trim()) return;
    ws.current.send(customInput.trim() + "\n");
    appendOutput(`→ ${customInput.trim()}\n`);
    setCustomInput("");
  };
 
  const appendOutput = (text: string) => {
    setOutputs((prev) => ({
      ...prev,
      [activeIdx]: (prev[activeIdx] || "") + text,
    }));
  };
  // Save code to local storage
  const saveCode = () => {
    const currentCode = answers[activeIdx] || "";
    const saveData = {
      examId,
      questionIndex: activeIdx,
      code: currentCode,
      language,
      timestamp: new Date().toISOString(),
    };
 
    const storageKey = `saved_code_${examId}_${activeIdx}_${userId}`;
    localStorage.setItem(storageKey, JSON.stringify(saveData));
    toast.success("Code saved successfully!");
  };
 
  useEffect(() => {
    return () => ws.current?.close();
  }, []);
 
  // Run Test Cases & Submit (unchanged)
  const runTestCases = async () => {
    const currentCode = answers[activeIdx] || "";
    if (!currentQuestion || !currentCode.trim()) {
      toast.error("Write some code first");
      return;
    }

    const currentUser = userId || "S0001";
    // Fix: Prioritize actual examId over question index to send correct exam_id query param (e.g., 12 instead of 3)
    const currentExamId = examId || localStorage.getItem("examId") || "";

    const payload = JSON.stringify([
      {
        exam_question_id: currentQuestion.exam_question_id,
        code: currentCode.trim(),
      },
    ]);
 
    console.log("=== DEBUG: Test Cases API Call ===");
    console.log("Current Question:", currentQuestion);
    console.log("Question Bank ID:", currentQuestion.question_bank_id);
    console.log("Exam Question Index:", currentQuestion.exam_question_index);
    console.log(
      "Final exam_question_id:",
      parseInt(currentQuestion.exam_question_index),
    );
    console.log("Payload:", payload);
    console.log(
      "API URL:",
      `${import.meta.env.VITE_API_URL}/interpreter/test_cases?language=${language}&current_user=${currentUser}&exam_id=${currentExamId}`,
    );
 
    setOutput("Running test cases...");
 
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/interpreter/test_cases?language=${language}&current_user=${currentUser}&exam_id=${currentExamId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: payload,
        },
      );
      const data = await response.json();
 
      console.log("=== DEBUG: Test Cases API Response ===");
      console.log("Response status:", response.status);
      console.log("Response data:", data);
      console.log("Data type:", typeof data);
      console.log("Is array?", Array.isArray(data));
      if (Array.isArray(data) && data.length > 0) {
        console.log("First test structure:", data[0]);
        console.log("First test has result?", "result" in data[0]);
        if ("result" in data[0]) {
          console.log("Result structure:", data[0].result);
        }
      }
 
      if (!response.ok) throw new Error(data.message || "Test failed");
 
      setTestResultsMap((prev) => ({
        ...prev,
        [activeIdx]: data,
      }));
      setOutput(""); // clear old text
      const allPassed = data.every((test: any) =>
        test.result?.every((r: any) => r.success),
      );
      toast.success(
        allPassed ? "All test cases passed!" : "Some test cases failed",
      );
    } catch (err: any) {
      setOutput(`Error: ${err.message}`);
      toast.error("Failed to run test cases");
    }
  };
 
  const submitCode = async (isAutoSubmit = false) => {
    // Check if at least one question has code written
    const hasAnyAnswer = questions.some((_, idx) => (answers[idx] || "").trim() !== "");
    if (!questions.length || (!hasAnyAnswer && !isAutoSubmit)) {
      toast.error("Please write some code before submitting.");
      return;
    }
 
    toast.custom(
      (t) => (
        <div className="bg-white rounded-lg shadow-2xl p-6 max-w-sm mx-auto border border-gray-200">
          <h3 className="text-lg font-bold text-gray-900 mb-2">Submit Exam?</h3>
          <p className="text-sm text-gray-600 mb-6">
            This will end your exam and submit all answers.
          </p>
 
          <div className="flex gap-3 justify-end">
            <button
              onClick={() => {
                toast.dismiss(t);
              }}
              className="px-5 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg font-medium transition"
            >
              Cancel
            </button>
 
            <button
              onClick={async () => {
                toast.dismiss(t);
  
                toast.loading("Submitting your exam...", {
                  id: "submit-loading",
                });
                const submitUser = userId || "S0001";
                // Fix: Prioritize actual examId over question index to send correct exam_id
                const submitExamId = examId || localStorage.getItem("examId") || "";
                
                // Submit all answers
                const allAnswersPayload = questions.map((q, idx) => ({
                  exam_question_id: q.exam_question_id,
                  code: (answers[idx] || "").trim(),
                }));
                const payload = JSON.stringify(allAnswersPayload);
 
                console.log("=== DEBUG: Submit API Call ===");
                console.log("Payload:", payload);
                console.log(
                  "API URL:",
                  `${import.meta.env.VITE_API_URL}/interpreter/submit?language=${language}&exam_id=${submitExamId}&current_user=${submitUser}`,
                );
 
                try {
                  const response = await fetch(
                    `${import.meta.env.VITE_API_URL}/interpreter/submit?language=${language}&exam_id=${submitExamId}&current_user=${submitUser}`,
                    {
                      method: "POST",
                      headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                      },
                      body: payload,
                    },
                  );
 
                  const data = await response.json();
                  if (!response.ok) {
                    const errorMsg = data.detail || data.message || "Submission failed";
                    if (String(errorMsg).toLowerCase().includes("already submitted")) {
                      localStorage.removeItem(TIMER_STORAGE_KEY);
                      toast.dismiss("submit-loading");
                      toast.success("Exam already submitted.");
                      setShowSuccessModal(true);
                      return;
                    }
                    throw new Error(errorMsg);
                  }
 
                  // Clean up timer on successful submit
                  localStorage.removeItem(TIMER_STORAGE_KEY);
                  toast.dismiss("submit-loading");
                  setShowSuccessModal(true);
                } catch (err: any) {
                  toast.error(err.message || "Submission failed", {
                    id: "submit-loading",
                  });
                }
              }}
              className="px-6 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-bold transition shadow-lg"
            >
              Yes, Submit
            </button>
          </div>
        </div>
      ),
      { id: "submit-exam-toast", duration: Infinity },
    );
  };
 
  if (loading) {
    return <CompilerSkeleton />;
  }
 
  if (!currentQuestion) {
    return <EmptyState />;
  }
 
  return (
    <div className="min-h-screen md:h-screen bg-[#f5f6fb] flex flex-col md:overflow-hidden">
      {/* HEADER */}
      <CompilerHeader
        examTitle={examTitle}
        activeIdx={activeIdx}
        questionsLength={questions.length}
        cameraError={cameraError}
        setCameraError={setCameraError}
        setCameraRetryCount={setCameraRetryCount}
        videoRef={videoRef}
      />
 
      {/* MAIN */}
      <div
        className="
          flex-1
          flex flex-col
          md:grid
          md:min-h-0
          md:grid-cols-[60px_1fr]
          lg:grid-cols-[70px_1fr_1.2fr]
          md:grid-rows-[1fr_1.5fr]
          lg:grid-rows-1
        "
      >
        {/* LEFT SIDEBAR (QNS) */}
        <QuestionSidebar
          questionsLength={questions.length}
          activeIdx={activeIdx}
          setActiveIdx={setActiveIdx}
        />
 
        {/* LEFT PANEL (QUESTION) */}
        <QuestionPanel currentQuestion={currentQuestion} />
 
        {/* RIGHT PANEL */}
        <div className="flex flex-col bg-[#0f172a] h-[600px] md:h-auto md:min-h-0 md:flex-1 md:col-start-2 lg:col-auto">
          {/* LANGUAGE */}
          {/* LANGUAGE + FILE NAME */}
          <div className="bg-white p-3 flex items-center gap-4 flex-wrap">
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="px-3 py-2 border rounded"
            >
              <option value="python">Python 3.10</option>
              <option value="java">Java</option>
              <option value="php">PHP</option>
            </select>
 
            {language === "java" && (
              <input
                type="text"
                value={fileName}
                onChange={(e) => setFileName(e.target.value)}
                className="px-3 py-2 border rounded w-56"
                placeholder=".java"
              />
            )}

            {/* Run Code Button 
            <button
              onClick={runSimpleCompilation}
              disabled={isRunning}
              className={`ml-auto flex items-center gap-2 px-4 py-2 rounded-lg font-semibold text-sm transition-all ${
                isRunning
                  ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                  : "bg-green-500 hover:bg-green-600 text-white shadow-md hover:shadow-lg"
              }`}
            >
              {isRunning ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Running...
                </>
              ) : (
                <>
                  <Play className="w-4 h-4" />
                  Run Code
                </>
              )}
            </button>
            */}

            {/* POST indicator */}
            <span className="text-[10px] font-mono text-gray-400 hidden sm:inline">
              POST /interpreter/execute-programe
            </span>
          </div>
 
          {/* EDITOR */}
          <div className="flex-1 min-h-0">
            <AceEditor
              mode={language}
              theme="monokai"
              value={answers[activeIdx] || ""}
              onChange={(newCode) => {
                setAnswers((prev) => ({ ...prev, [activeIdx]: newCode }));
              }}
              width="100%"
              height="100%"
              fontSize={14}
              showPrintMargin={false}
              setOptions={{ tabSize: 4 }}
            />
          </div>
 
          {/* OUTPUT */}
          <div className="h-[150px] sm:h-[180px] bg-white text-gray-800 border-t p-3 sm:p-4 overflow-auto text-xs sm:text-sm shrink-0">
            <p className="text-sm font-semibold mb-2">Output & Console</p>
            {testResultsMap[activeIdx] ? (
              <div className="space-y-4">
                {testResultsMap[activeIdx].map((test: any, index: number) => (
                  <div
                    key={index}
                    className="bg-gray-900 border border-gray-700 rounded-lg p-4 text-xs"
                  >
                    <div className="flex justify-between items-center mb-2">
                      <p className="font-bold text-white">
                        Test Case {index + 1}
                      </p>
                      <span
                        className={`px-2 py-1 rounded text-[10px] font-bold ${
                          test.result?.every((r: any) => r.success)
                            ? "bg-green-600 text-white"
                            : "bg-red-600 text-white"
                        }`}
                      >
                        {test.result?.every((r: any) => r.success)
                          ? "PASSED"
                          : "FAILED"}
                      </span>
                    </div>
 
                    <div className="space-y-2 text-green-400">
                      {test.result?.map((result: any, resultIndex: number) => (
                        <div
                          key={resultIndex}
                          className="border-t border-gray-700 pt-2"
                        >
                          <div className="text-xs text-gray-400 mb-1">
                            Sub-test {resultIndex + 1}
                          </div>
 
                          <div>
                            <span className="text-gray-400">
                              actual_inputs:
                            </span>
                            <pre className="whitespace-pre-wrap break-words">
                              {JSON.stringify(
                                result.actual_inputs || test.actual_inputs,
                                null,
                                2,
                              )}
                            </pre>
                          </div>
 
                          <div>
                            <span className="text-gray-400">
                              expected_outputs:
                            </span>
                            <pre className="whitespace-pre-wrap break-words">
                              {JSON.stringify(
                                result.expected_outputs ||
                                  test.expected_outputs,
                                null,
                                2,
                              )}
                            </pre>
                          </div>
 
                          <div>
                            <span className="text-gray-400">
                              actual_outputs:
                            </span>
                            <pre className="whitespace-pre-wrap break-words">
                              {JSON.stringify(
                                result.actual_outputs || test.actual_outputs,
                                null,
                                2,
                              )}
                            </pre>
                          </div>
 
                          <div>
                            <span className="text-gray-400">
                              execution_time:
                            </span>
                            <pre>
                              {JSON.stringify(
                                result.execution_time || test.execution_time,
                                null,
                                2,
                              )}
                            </pre>
                          </div>
 
                          {!result.success && (
                            <div>
                              <span className="text-red-400">error:</span>
                              <pre className="text-red-400 whitespace-pre-wrap break-words">
                                {result.error || "Test failed"}
                              </pre>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <pre>{outputs[activeIdx] || "Run your code to see results"}</pre>
            )}{" "}
            <div ref={outputEndRef} />
          </div>
 
          {/* INPUT + BUTTONS */}
          <div className="bg-white p-4 shrink-0">
            <div className="flex flex-wrap justify-end gap-2">
              <button
                onClick={runSimpleCompilation}
                className="px-3 sm:px-5 py-2 text-sm sm:text-base bg-green-500 text-white rounded-lg"
              >
                Run Code
              </button>
 
              <button
                onClick={runTestCases}
                className="px-5 py-2 text-sm sm:text-base bg-gray-200 rounded-lg"
              >
                Run Test Cases
              </button>
 
              <button
                onClick={submitCode}
                className="px-6 py-2 text-sm sm:text-base bg-purple-600 text-white rounded-lg"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
      {showSuccessModal && (
        <SuccessModal setShowSuccessModal={setShowSuccessModal} />
      )}
    </div>
  );
}
