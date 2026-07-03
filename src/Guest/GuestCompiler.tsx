import React, { useState, useEffect } from 'react';
import ExamList from './components/Compiler/ExamList';
import CompilerSidebar from './components/Compiler/CompilerSidebar';
import ProblemDescription from './components/Compiler/ProblemDescription';
import CodeEditor from './components/Compiler/CodeEditor';
import ConsoleOutput from './components/Compiler/ConsoleOutput';
import PremiumBanner from './components/Compiler/PremiumBanner';
import { VITE_API_URL } from '../services/api/api';
import Contactus from '../components/ui/contactus';

const GuestCompiler = () => {
  const [selectedProblem, setSelectedProblem] = useState(1);
  const [code, setCode] = useState("def add(a, b):\n    return a + b\n\n# Read input and call your function here\n");
  const [language, setLanguage] = useState("python");
  const [customInput, setCustomInput] = useState("");
  const [output, setOutput] = useState("");
  const [isRunning, setIsRunning] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [testResults, setTestResults] = useState<any>(null);
  const [questionDetails, setQuestionDetails] = useState<any>(null);
  const [isDescOpen, setIsDescOpen] = useState(true);

  const [showCompiler, setShowCompiler] = useState(false);
  const [selectedExamId, setSelectedExamId] = useState<number | null>(null);
  const [exams, setExams] = useState<any[]>([]);
  const [loadingExams, setLoadingExams] = useState(false);
  const [examSearch, setExamSearch] = useState('');
  const [questionSearch, setQuestionSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [contactOpen, setContactOpen] = useState(false);
  const itemsPerPage = 6;

  const fetchExams = async () => {
    try {
      setLoadingExams(true);
      const token = localStorage.getItem('access_token') || '';
      const res = await fetch(`${VITE_API_URL}/guest/exam/get`, {
        headers: { 
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json'
        }
      });
      
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      
      const data = await res.json();
      const examsList = Array.isArray(data) ? data : (data.exams || []);
      setExams(examsList);
    } catch (e) {
      console.error("Error fetching exams:", e);
      setExams([]);
    } finally {
      setLoadingExams(false);
    }
  };

  useEffect(() => {
    if (!showCompiler) {
      fetchExams();
    }
  }, [showCompiler]);

  const [dynamicProblems, setDynamicProblems] = useState<any[]>([
    { id: 1, title: "Add Two Numbers", desc: "Read two numbers and print the addition result.", difficulty: "Easy", tag: "Math", xp: "100 XP", time: "15 min", solved: true },
    { id: 2, title: "Valid Parentheses", desc: "Determine if brackets are correctly matched and...", difficulty: "Easy", tag: "Strings", xp: "100 XP", time: "10 min", solved: false },
    { id: 3, title: "Merge Sorted Lists", desc: "Merge two sorted linked lists into one sorted list.", difficulty: "Easy", tag: "Linked List", xp: "150 XP", time: "20 min", solved: false },
    { id: 4, title: "Maximum Subarray", desc: "Find contiguous subarray with the largest sum.", difficulty: "Medium", tag: "DP", xp: "200 XP", time: "25 min", solved: true },
    { id: 5, title: "Level Order Traversal", desc: "Return level-by-level traversal of a binary tree.", difficulty: "Medium", tag: "Trees", xp: "250 XP", time: "30 min", solved: false },
    { id: 6, title: "Longest Palindrome", desc: "Find the longest palindromic substring in a...", difficulty: "Medium", tag: "Strings", xp: "250 XP", time: "35 min", solved: false },
    { id: 7, title: "Word Ladder", desc: "Shortest transformation sequence between two...", difficulty: "Hard", tag: "Graph", xp: "400 XP", time: "45 min", solved: false },
    { id: 8, title: "Regex Matching", desc: "Implement '.' and '*' pattern regex matching.", difficulty: "Hard", tag: "DP", xp: "500 XP", time: "60 min", solved: false },
  ]);

  const fetchExamQuestions = async (examId: number) => {
    try {
      const res = await fetch(`${VITE_API_URL}/guest/exam/get/details?exam_id=${examId}`, {
        headers: { 'accept': 'application/json' }
      });
      const data = await res.json();
      
      let questionsArray = [];
      if (Array.isArray(data)) {
        questionsArray = data;
      } else if (data && typeof data === 'object') {
        if (data.questions && typeof data.questions === 'object') {
          questionsArray = Object.entries(data.questions).map(([key, item]: [string, any]) => ({
            ...(item.details || item.question || item),
            question_bank_id: item.question_bank_id,
            exam_question_id: item.id || item.exam_question_id || parseInt(key),
            score: item.score
          }));
        } else {
          questionsArray = [data];
        }
      }

      if (questionsArray.length > 0) {
        const mapped = questionsArray.map((q: any, index: number) => ({
          id: q.exam_question_id || q.id || q.question_id || q.question_bank_id || index + 1,
          title: q.title || `Question ${index + 1}`,
          desc: q.description || q.question || "No description",
          sample_inputs: q.sample_inputs,
          difficulty: "Medium",
          tag: "Exam",
          xp: "200 XP",
          time: "30 min",
          solved: false,
          original: q
        }));
        setDynamicProblems(mapped);
        setSelectedProblem(mapped[0].id);
        setQuestionDetails(mapped[0].original);
      } else {
        setDynamicProblems([]);
        setQuestionDetails(null);
      }
    } catch (e) {
      console.error("Failed to fetch exam details", e);
    }
  };

  useEffect(() => {
    if (showCompiler && selectedExamId) {
      fetchExamQuestions(selectedExamId);
    }
  }, [showCompiler, selectedExamId]);

  useEffect(() => {
    if (dynamicProblems.length > 0) {
      const selected = dynamicProblems.find(p => p.id === selectedProblem);
      if (selected) {
        setQuestionDetails(selected.original);
        setCustomInput(selected.original?.sample_inputs || "");
      }
    }
    setOutput("");
    setTestResults(null);
  }, [selectedProblem, dynamicProblems]);

  const handleRunCode = async () => {
    setIsRunning(true);
    setOutput("Running code...");
    setTestResults(null);
    try {
      const res = await fetch(`${VITE_API_URL}/guest/interpreter/execute-programe?language=${language}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user_input: customInput, code: code })
      });
      const data = await res.json();
      if (data.error) {
        setOutput(data.error);
      } else {
        setOutput(data.output || JSON.stringify(data));
      }
    } catch (e) {
      setOutput("Error connecting to server.");
    } finally {
      setIsRunning(false);
    }
  };

  const handleTestCases = async () => {
    setIsRunning(true);
    setOutput("Running test cases...");
    try {
      const examId = selectedExamId || 1;
      const token = localStorage.getItem('access_token');
      let trueGuestId = "";
      if (token) {
        try {
           const payload = JSON.parse(atob(token.split('.')[1]));
           trueGuestId = payload.guest_id || payload.student_id || payload.sub || "";
        } catch(e) {}
      }
      if (!trueGuestId) {
         trueGuestId = localStorage.getItem("guest_id") || "";
      }
      
      const guestId = trueGuestId;
      const problem = dynamicProblems.find((p: any) => p.id === selectedProblem);
      const eqId = problem?.original?.exam_question_id || selectedProblem;
      const qbId = problem?.original?.question_bank_id || selectedProblem;
      const qId = problem?.original?.question_id || qbId;
      
      const res = await fetch(`${VITE_API_URL}/guest/interpreter/test_cases?language=${language}&guest_id=${guestId}&exam_id=${examId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify([{ 
          exam_question_id: eqId, 
          question_id: qId,
          question_bank_id: qbId,
          code: code 
        }])
      });
      const data = await res.json();
      setTestResults(data);
      if (data && data.length > 0) {
          setOutput("Test cases completed. Check Results.");
      } else {
          setOutput(JSON.stringify(data));
      }
    } catch (e) {
      console.error(e);
      setOutput("Error running test cases.");
    } finally {
      setIsRunning(false);
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    setOutput("Submitting code...");
    try {
      const examId = selectedExamId || 1;
      const token = localStorage.getItem('access_token');
      let trueGuestId = "";
      if (token) {
        try {
           const payload = JSON.parse(atob(token.split('.')[1]));
           trueGuestId = payload.guest_id || payload.student_id || payload.sub || "";
        } catch(e) {}
      }
      if (!trueGuestId) {
         trueGuestId = localStorage.getItem("guest_id") || "";
      }
      
      const guestId = trueGuestId;
      const problem = dynamicProblems.find((p: any) => p.id === selectedProblem);
      const eqId = problem?.original?.exam_question_id || selectedProblem;
      const qbId = problem?.original?.question_bank_id || selectedProblem;
      const qId = problem?.original?.question_id || qbId;

      const res = await fetch(`${VITE_API_URL}/guest/interpreter/submit?language=${language}&guest_id=${guestId}&exam_id=${examId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify([{ 
          exam_question_id: eqId, 
          question_id: qId,
          question_bank_id: qbId,
          code: code 
        }])
      });
      const data = await res.json();
      setTestResults(data);
      setOutput("Submission completed successfully. Returning to exams portal...");
      
      // Redirect back to exams portal after 2 seconds
      setTimeout(() => {
        setShowCompiler(false);
      }, 2000);
    } catch (e) {
      console.error(e);
      setOutput("Error submitting code.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const currentProbMeta = dynamicProblems.find(p => p.id === selectedProblem) || dynamicProblems[0] || {};

  if (!showCompiler) {
    return (
      <ExamList 
        exams={exams}
        loadingExams={loadingExams}
        examSearch={examSearch}
        setExamSearch={setExamSearch}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        itemsPerPage={itemsPerPage}
        setSelectedExamId={setSelectedExamId}
        setShowCompiler={setShowCompiler}
        contactOpen={contactOpen}
        setContactOpen={setContactOpen}
      />
    );
  }

  return (
    <div className="px-4 xl:px-8 py-8 w-full max-w-[1600px] mx-auto min-h-screen flex flex-col gap-6">
      <div className="flex flex-col xl:flex-row gap-6 flex-1">
        
        <CompilerSidebar 
          setShowCompiler={setShowCompiler}
          questionSearch={questionSearch}
          setQuestionSearch={setQuestionSearch}
          dynamicProblems={dynamicProblems}
          selectedProblem={selectedProblem}
          setSelectedProblem={setSelectedProblem}
        />

        <div className="flex-1 flex flex-col gap-4 overflow-y-auto h-[calc(100vh-200px)] scrollbar-hide">
          
          <ProblemDescription 
            selectedProblem={selectedProblem}
            questionDetails={questionDetails}
            currentProbMeta={currentProbMeta}
            isDescOpen={isDescOpen}
            setIsDescOpen={setIsDescOpen}
          />

          <CodeEditor 
            language={language}
            setLanguage={setLanguage}
            code={code}
            setCode={setCode}
            customInput={customInput}
            setCustomInput={setCustomInput}
            handleTestCases={handleTestCases}
            handleRunCode={handleRunCode}
            handleSubmit={handleSubmit}
            isRunning={isRunning}
            isSubmitting={isSubmitting}
          />

          <ConsoleOutput 
            output={output}
            testResults={testResults}
          />

        </div>
      </div>

      <PremiumBanner setContactOpen={setContactOpen} />
      <Contactus open={contactOpen} setOpen={setContactOpen} />
    </div>
  );
};

export default GuestCompiler;
