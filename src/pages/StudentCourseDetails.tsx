import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  Calendar, 
  Book, 
  Play, 
  FileText, 
  Code, 
  CheckCircle, 
  Star, 
  Clock, 
  Users,
  Award,
  ChevronDown,
  ChevronUp,
  ChevronRight,
  Play as PlayIcon,
  Terminal,
  Video
} from "lucide-react";
import Sidebar from '../components/sidebar';
import learn from '../assets/learn.jpg';
import Profileheader from '../components/ui/StudentProfileDashboard';

// Mock data for courses (same as in MyCourses)
const courses = [
  {
    id: 1,
    title: 'Introduction to React',
    author: 'John Doe',
    description: 'Learn the fundamentals of React for building dynamic web applications.',
    image: learn,
    status: 'inProgress',
    weeksToComplete: 4,
    views: 1200,
    rating: 4.5,
    progress: 60,
  },
  {
    id: 2,
    title: 'Advanced JavaScript',
    author: 'Jane Smith',
    description: 'Deep dive into JavaScript with modern ES6+ features and patterns.',
    image: learn,
    status: 'completed',
    weeksToComplete: 6,
    views: 850,
    rating: 4.8,
    progress: 100,
  },
  {
    id: 3,
    title: 'Python for Beginners',
    author: 'Alice Johnson',
    description: 'Get started with Python programming for data science and automation.',
    image: learn,
    status: 'notStarted',
    weeksToComplete: 5,
    views: 600,
    rating: 4.2,
    progress: 0,
  },
  {
    id: 4,
    title: 'Web Development',
    author: 'Bob Wilson',
    description: 'Comprehensive course covering HTML, CSS, and JavaScript.',
    image: learn,
    status: 'inProgress',
    weeksToComplete: 8,
    views: 2000,
    rating: 4.7,
    progress: 25,
  },
  {
    id: 5,
    title: 'Data Science with R',
    author: 'Emma Brown',
    description: 'Explore data analysis and visualization using R.',
    image: learn,
    status: 'notStarted',
    weeksToComplete: 7,
    views: 450,
    rating: 4.3,
    progress: 0,
  },
  {
    id: 6,
    title: 'UI/UX Design',
    author: 'Michael Lee',
    description: 'Learn the principles of designing user-friendly interfaces.',
    image: learn,
    status: 'completed',
    weeksToComplete: 3,
    views: 1800,
    rating: 4.9,
    progress: 100,
  },
];

// Expanded Mock MCQs data to 25 questions
const mockMCQs = [
  {
    id: 1,
    question: 'Which of the following is correct about JavaScript?',
    options: ['Option A: First possible answer', 'Option B: Second possible answer', 'Option C: Third possible answer', 'Option D: Fourth possible answer'],
    correct: 0,
  },
  {
    id: 2,
    question: 'What is the virtual DOM?',
    options: ['A real DOM', 'A programming language', 'A React concept for efficient updates', 'A CSS framework'],
    correct: 2,
  },
  {
    id: 3,
    question: 'Which hook is used for state in functional components?',
    options: ['useEffect', 'useState', 'useContext', 'useReducer'],
    correct: 1,
  },
  {
    id: 4,
    question: 'What does JSX stand for?',
    options: ['JavaScript XML', 'JSON Syntax Extension', 'Java Syntax', 'JQuery XML'],
    correct: 0,
  },
  {
    id: 5,
    question: 'Which method is used to update state in class components?',
    options: ['setState', 'updateState', 'changeState', 'modifyState'],
    correct: 0,
  },
  {
    id: 6,
    question: 'What is the purpose of useEffect hook?',
    options: ['To manage state', 'To handle side effects', 'To render components', 'To define props'],
    correct: 1,
  },
  {
    id: 7,
    question: 'In React, props are:',
    options: ['Mutable', 'Immutable', 'Optional', 'Required'],
    correct: 1,
  },
  {
    id: 8,
    question: 'What is a key in React lists?',
    options: ['A unique identifier for elements', 'A styling class', 'A prop name', 'An event handler'],
    correct: 0,
  },
  {
    id: 9,
    question: 'React Router is used for:',
    options: ['State management', 'Navigation', 'Styling', 'API calls'],
    correct: 1,
  },
  {
    id: 10,
    question: 'What does the spread operator do in React?',
    options: ['Copies arrays', 'Passes multiple props', 'Clones components', 'Merges objects'],
    correct: 1,
  },
  {
    id: 11,
    question: 'Context API is used for:',
    options: ['Local state', 'Global state without prop drilling', 'Routing', 'Animation'],
    correct: 1,
  },
  {
    id: 12,
    question: 'What is a component in React?',
    options: ['A function or class that returns JSX', 'A CSS class', 'A JavaScript variable', 'An HTML tag'],
    correct: 0,
  },
  {
    id: 13,
    question: 'Which lifecycle method is called after component updates?',
    options: ['componentDidMount', 'componentDidUpdate', 'componentWillMount', 'render'],
    correct: 1,
  },
  {
    id: 14,
    question: 'What is state in React?',
    options: ['Immutable data', 'Mutable data managed by the component', 'Props from parent', 'Global data'],
    correct: 1,
  },
  {
    id: 15,
    question: 'How do you conditionally render in React?',
    options: ['if statements in JSX', 'ternary operators or &&', 'switch statements', 'All of the above'],
    correct: 3,
  },
  {
    id: 16,
    question: 'What is useContext hook for?',
    options: ['State management', 'Consuming context', 'Side effects', 'Routing'],
    correct: 1,
  },
  {
    id: 17,
    question: 'React fragments are used to:',
    options: ['Group elements without extra nodes', 'Create reusable components', 'Handle events', 'Manage state'],
    correct: 0,
  },
  {
    id: 18,
    question: 'What is prop drilling?',
    options: ['Passing props through multiple levels', 'Drilling into data', 'Event handling', 'Debugging'],
    correct: 0,
  },
  {
    id: 19,
    question: 'useReducer is similar to:',
    options: ['useState', 'Redux', 'useEffect', 'useMemo'],
    correct: 1,
  },
  {
    id: 20,
    question: 'What does React.StrictMode do?',
    options: ['Enables development checks', 'Compiles code', 'Handles errors', 'Optimizes performance'],
    correct: 0,
  },
  {
    id: 21,
    question: 'Keys in React lists help with:',
    options: ['Performance and reconciliation', 'Styling', 'Accessibility', 'SEO'],
    correct: 0,
  },
  {
    id: 22,
    question: 'What is a higher-order component?',
    options: ['A component that wraps another', 'A simple function', 'A state manager', 'A router'],
    correct: 0,
  },
  {
    id: 23,
    question: 'useMemo is used for:',
    options: ['Memoizing values', 'Side effects', 'State updates', 'Context'],
    correct: 0,
  },
  {
    id: 24,
    question: 'Error boundaries catch errors in:',
    options: ['Render phase', 'Event handlers', 'Async code', 'All of the above'],
    correct: 3,
  },
  {
    id: 25,
    question: 'Portals in React allow rendering outside the DOM hierarchy.',
    options: ['True', 'False', 'Only in class components', 'Only in functional'],
    correct: 0,
  },
];

// Updated Mock Coding Questions data with examples and hidden test cases
const mockCodingQuestions = [
  {
    id: 1,
    title: 'Reverse a String',
    description: 'Write a function that reverses a given string without using built-in methods.',
    difficulty: 'Easy',
    examples: [
      { input: '"hello"', output: '"olleh"' },
      { input: '"world"', output: '"dlrow"' },
    ],
    testCases: [ // Hidden for verification
      { input: '""', expectedOutput: '""' },
      { input: '"a"', expectedOutput: '"a"' },
      { input: '"abc"', expectedOutput: '"cba"' },
    ],
  },
  {
    id: 2,
    title: 'FizzBuzz',
    description: 'Write a function that returns an array of strings from 1 to n, where multiples of 3 are "Fizz", 5 are "Buzz", both "FizzBuzz".',
    difficulty: 'Medium',
    examples: [
      { input: '3', output: '["1","2","Fizz"]' },
      { input: '5', output: '["1","2","Fizz","4","Buzz"]' },
    ],
    testCases: [ // Hidden
      { input: '15', expectedOutput: '["1","2","Fizz","4","Buzz","Fizz","7","8","Fizz","Buzz","11","Fizz","13","14","FizzBuzz"]' },
      { input: '1', expectedOutput: '["1"]' },
    ],
  },
];

// Mock Live Classes schedule
const mockLiveClasses = [
  { day: 'Monday', time: '10:00 AM - 12:00 PM', topic: 'React Basics' },
  { day: 'Tuesday', time: '10:00 AM - 12:00 PM', topic: 'Components' },
  { day: 'Wednesday', time: '10:00 AM - 12:00 PM', topic: 'State Management' },
  { day: 'Thursday', time: '10:00 AM - 12:00 PM', topic: 'Hooks' },
  { day: 'Friday', time: '10:00 AM - 12:00 PM', topic: 'Routing' },
  { day: 'Saturday', time: '10:00 AM - 12:00 PM', topic: 'Advanced Topics' },
  { day: 'Sunday', time: '10:00 AM - 12:00 PM', topic: 'Review & Practice' },
];

// Mock Resources
const mockResources = [
  { id: 1, title: 'React Documentation', type: 'Docs', link: '#' },
  { id: 2, title: 'Intro to React Video', type: 'Video', link: '#' },
  { id: 3, title: 'React Cheat Sheet', type: 'PDF', link: '#' },
  { id: 4, title: 'Hands-on Exercises', type: 'Exercises', link: '#' },
];

const CourseDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [course, setCourse] = useState<any>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [active, setActive] = useState('My Courses');
  const [currentView, setCurrentView] = useState<'overview' | 'mcqs' | 'coding'>('overview');

  // MCQ specific states
  const [selectedAnswers, setSelectedAnswers] = useState<{ [key: number]: number }>({});
  const [showResults, setShowResults] = useState(false);
  const [score, setScore] = useState(0);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(1800); // 30 minutes in seconds for 25 questions

  // Coding specific states
  const [selectedCodingQuestion, setSelectedCodingQuestion] = useState(mockCodingQuestions[0]);
  const [language, setLanguage] = useState('javascript');
  const [code, setCode] = useState('// Write your code here\nfunction reverseString(str) {\n  // Your implementation\n}\n\n// Example usage:\nconsole.log(reverseString("hello"));');
  const [output, setOutput] = useState('');

  useEffect(() => {
    const foundCourse = courses.find((c) => c.id === parseInt(id || '1'));
    setCourse(foundCourse);
    document.title = `${foundCourse?.title} - LauraTek`;
  }, [id]);

  // Timer effect
  useEffect(() => {
    if (!showResults && currentView === 'mcqs') {
      const timer = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            // Auto submit or something
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [showResults, currentView]);

  if (!course) {
    return <div>Loading...</div>;
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return { bg: 'from-green-500 to-emerald-600', text: 'text-green-800', badge: 'bg-green-100' };
      case 'inProgress': return { bg: 'from-blue-500 to-indigo-600', text: 'text-blue-800', badge: 'bg-blue-100' };
      default: return { bg: 'from-gray-500 to-gray-600', text: 'text-gray-800', badge: 'bg-gray-100' };
    }
  };

  const statusColors = getStatusColor(course.status);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  // MCQ functions
  const handleAnswerSelect = (questionId: number, optionIndex: number) => {
    setSelectedAnswers(prev => ({ ...prev, [questionId]: optionIndex }));
  };

  const handleNext = () => {
    if (currentQuestionIndex < mockMCQs.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    }
  };

  const handleJumpToQuestion = (index: number) => {
    setCurrentQuestionIndex(index);
  };

  const handleSubmit = () => {
    let calculatedScore = 0;
    mockMCQs.forEach((mcq: any) => {
      if (selectedAnswers[mcq.id] === mcq.correct) {
        calculatedScore++;
      }
    });
    setScore(calculatedScore);
    setShowResults(true);
  };

  const resetQuiz = () => {
    setSelectedAnswers({});
    setShowResults(false);
    setScore(0);
    setCurrentQuestionIndex(0);
    setTimeLeft(1800);
  };

  const currentQuestion = mockMCQs[currentQuestionIndex];
  const answeredCount = Object.keys(selectedAnswers).length;
  const formattedTime = new Date(timeLeft * 1000).toISOString().substr(14, 5);

  // Mock functions for coding
  const handleRun = () => {
    setOutput(`Code executed successfully in ${language.toUpperCase()}:\n\n${code}\n\nOutput: Mock execution result (e.g., reversed string: olleh)`);
  };

  const handleCompile = () => {
    setOutput(`Compilation successful in ${language.toUpperCase()}.\nNo errors found.\n\nReady to run.`);
  };

  const handleVerify = () => {
    // Mock verification - in real app, execute against testCases
    const passed = Math.floor(Math.random() * selectedCodingQuestion.testCases.length) + 1;
    const total = selectedCodingQuestion.testCases.length;
    setOutput(`Verification complete!\nPassed: ${passed}/${total} test cases\n\n${passed === total ? 'All tests passed! 🎉' : 'Keep trying!'} `);
  };

  const handleCodeChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCode(e.target.value);
  };

  if (currentView === 'mcqs') {
    return (
      <div className="flex min-h-screen bg-gray-50">
        <Sidebar sidebarOpen={sidebarOpen} setActive={setActive} active={active} />
        <div className="flex-1 px-4 sm:px-6 relative">
          <div className="lg:hidden py-4">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
            >
              {sidebarOpen ? 'Close Menu' : 'Open Menu'}
            </button>
          </div>
          {/* Header with Timer and Monitoring */}
          <div className="flex justify-between items-center bg-white p-4 rounded-lg shadow-sm mb-4">
            <div className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-blue-500" />
              <span className="font-mono text-lg">{formattedTime}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm text-green-600">🟢 Monitoring Active</span>
              <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
            </div>
          </div>
          <motion.div className="py-6" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
            <div className="flex items-center gap-4 mb-6">
              <motion.button
                onClick={() => setCurrentView('overview')}
                className="flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <ArrowLeft className="h-5 w-5" />
                Back to Course
              </motion.button>
            </div>
            {!showResults ? (
              <div className="bg-white rounded-lg shadow-md overflow-hidden max-w-6xl mx-auto">
                {/* Title */}
                <div className="bg-gradient-to-r from-purple-500 to-pink-600 text-white p-4">
                  <h2 className="text-xl font-bold">MCQ Section (25 Questions)</h2>
                </div>
                <div className="p-6 grid grid-cols-1 lg:grid-cols-4 gap-6">
                  {/* Question Grid */}
                  <div className="lg:col-span-1">
                    <h3 className="font-semibold mb-4">Questions</h3>
                    <div className="grid grid-cols-5 gap-1">
                      {mockMCQs.map((_, index) => (
                        <button
                          key={index}
                          onClick={() => handleJumpToQuestion(index)}
                          className={`w-8 h-8 rounded text-xs font-medium transition-all ${
                            index === currentQuestionIndex
                              ? 'bg-blue-500 text-white'
                              : selectedAnswers[index + 1] !== undefined
                              ? 'bg-green-500 text-white'
                              : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
                          }`}
                        >
                          {index + 1}
                        </button>
                      ))}
                    </div>
                  </div>
                  {/* Question Area */}
                  <div className="lg:col-span-3">
                    <div className="flex justify-between items-center mb-6">
                      <h3 className="text-lg font-semibold">Question {currentQuestionIndex + 1} of {mockMCQs.length}</h3>
                      <span className="text-sm text-gray-500">{answeredCount}/{mockMCQs.length} answered</span>
                    </div>
                    <p className="text-gray-800 mb-6">{currentQuestion.question}</p>
                    <div className="space-y-3">
                      {currentQuestion.options.map((option: string, idx: number) => (
                        <label key={idx} className="flex items-start p-3 bg-gray-50 rounded-md border border-gray-200 hover:bg-gray-100 cursor-pointer transition-all">
                          <input
                            type="radio"
                            name={`question-${currentQuestion.id}`}
                            className="mt-0.5 mr-3 h-4 w-4 text-purple-600 focus:ring-purple-500"
                            checked={selectedAnswers[currentQuestion.id] === idx}
                            onChange={() => handleAnswerSelect(currentQuestion.id, idx)}
                          />
                          <span className={`text-sm font-medium ${selectedAnswers[currentQuestion.id] === idx ? 'text-purple-600' : 'text-gray-700'}`}>
                            {String.fromCharCode(65 + idx)}. {option}
                          </span>
                        </label>
                      ))}
                    </div>
                    <div className="flex justify-between items-center mt-8">
                      <motion.button
                        onClick={handlePrev}
                        disabled={currentQuestionIndex === 0}
                        className="px-6 py-2 bg-gray-300 text-gray-700 rounded-md font-semibold disabled:opacity-50"
                        whileHover={{ scale: 1.02 }}
                      >
                        Previous
                      </motion.button>
                      <motion.button
                        onClick={handleNext}
                        disabled={currentQuestionIndex === mockMCQs.length - 1}
                        className="px-6 py-2 bg-blue-500 text-white rounded-md font-semibold disabled:opacity-50"
                        whileHover={{ scale: 1.02 }}
                      >
                        Next
                      </motion.button>
                    </div>
                  </div>
                </div>
                <div className="p-6 bg-green-50 border-t">
                  <motion.button
                    onClick={handleSubmit}
                    className="w-full max-w-md mx-auto bg-green-500 text-white py-3 rounded-lg font-semibold hover:shadow-lg transition-all"
                    whileHover={{ scale: 1.02 }}
                    disabled={timeLeft === 0}
                  >
                    Final Submit
                  </motion.button>
                </div>
              </div>
            ) : (
              <motion.div 
                className="bg-white/80 backdrop-blur-sm rounded-xl shadow-md p-6 border border-white/20 max-w-4xl mx-auto text-center"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >
                <h2 className="text-2xl font-bold mb-6 flex items-center gap-2 justify-center">
                  <FileText className="h-6 w-6" />
                  Results
                </h2>
                <div className="mb-6">
                  <h3 className="text-3xl font-bold text-gray-800 mb-2">Your Score: {score}/{mockMCQs.length}</h3>
                  <p className="text-xl text-gray-600">Percentage: {Math.round((score / mockMCQs.length) * 100)}%</p>
                  {score === mockMCQs.length && <CheckCircle className="h-16 w-16 text-green-500 mx-auto mt-4" />}
                </div>
                <div className="space-y-4 mb-8">
                  {mockMCQs.map((mcq: any) => (
                    <div key={mcq.id} className={`p-4 rounded-lg ${selectedAnswers[mcq.id] === mcq.correct ? 'bg-green-50 border-l-4 border-green-400' : 'bg-red-50 border-l-4 border-red-400'}`}>
                      <div className="flex justify-between mb-2">
                        <span className="font-semibold">Q{mcq.id}: {mcq.question}</span>
                        <span className={`px-2 py-1 text-xs rounded-full ${selectedAnswers[mcq.id] === mcq.correct ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                          {selectedAnswers[mcq.id] === mcq.correct ? 'Correct' : 'Incorrect'}
                        </span>
                      </div>
                      <div className="ml-4 space-y-1 text-sm">
                        {mcq.options.map((option: string, idx: number) => (
                          <div key={idx} className={`flex items-center ${idx === mcq.correct ? 'text-green-700 font-semibold' : idx === selectedAnswers[mcq.id] && idx !== mcq.correct ? 'text-red-700' : 'text-gray-600'}`}>
                            <span className={`w-2 h-2 rounded-full mr-2 ${idx === mcq.correct ? 'bg-green-500' : idx === selectedAnswers[mcq.id] && idx !== mcq.correct ? 'bg-red-500' : 'bg-transparent'}`} />
                            {String.fromCharCode(65 + idx)}. {option}
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
                <motion.button
                  onClick={resetQuiz}
                  className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-2 px-6 rounded-lg font-semibold hover:shadow-lg transition-all"
                  whileHover={{ scale: 1.05 }}
                >
                  Take Quiz Again
                </motion.button>
              </motion.div>
            )}
          </motion.div>
          {/* Proctoring Panel */}
          <div className="fixed bottom-4 right-4 bg-white rounded-lg shadow-lg p-2 w-32 h-32 flex items-center justify-center">
            <Video className="h-20 w-20 text-gray-400" />
            <span className="absolute -bottom-6 text-xs text-gray-500">Live Proctoring</span>
          </div>
        </div>
      </div>
    );
  }

  if (currentView === 'coding') {
    return (
      <div className="flex min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
        <Sidebar sidebarOpen={sidebarOpen} setActive={setActive} active={active} />
        <div className="flex-1 px-4 sm:px-6">
          <div className="lg:hidden py-4">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
            >
              {sidebarOpen ? 'Close Menu' : 'Open Menu'}
            </button>
          </div>
          <motion.div className="py-6" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
            <div className="flex items-center gap-4 mb-6">
              <motion.button
                onClick={() => setCurrentView('overview')}
                className="flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <ArrowLeft className="h-5 w-5" />
                Back to Course
              </motion.button>
              <span className="text-sm text-gray-500">Coding Challenges</span>
            </div>
            <motion.div 
              className="bg-white/80 backdrop-blur-sm rounded-xl shadow-md overflow-hidden border border-white/20"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {/* Coding Questions List */}
              <div className="p-4 bg-gray-50 border-b">
                <h3 className="text-lg font-semibold mb-2">Select Challenge</h3>
                <div className="flex space-x-2">
                  {mockCodingQuestions.map((q) => (
                    <button
                      key={q.id}
                      onClick={() => {
                        setSelectedCodingQuestion(q);
                        setCode(q.id === 1 ? '// Write your code here\nfunction reverseString(str) {\n  // Your implementation\n}\n\n// Example usage:\nconsole.log(reverseString("hello"));' : '// Write your code here\nfunction fizzBuzz(n) {\n  // Your implementation\n}\n\n// Example usage:\nconsole.log(fizzBuzz(3));');
                        setOutput('');
                      }}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${selectedCodingQuestion.id === q.id ? 'bg-blue-500 text-white' : 'bg-white text-gray-700 hover:bg-gray-100'}`}
                    >
                      {q.title} ({q.difficulty})
                    </button>
                  ))}
                </div>
              </div>

              {/* Main Coding Interface */}
              <div className="flex flex-col lg:flex-row h-[70vh]">
                {/* Left: Question & Examples */}
                <div className="lg:w-1/2 p-6 border-r border-gray-200">
                  <h3 className="text-xl font-bold mb-2">{selectedCodingQuestion.title}</h3>
                  <p className="text-gray-600 mb-4">{selectedCodingQuestion.description}</p>
                  <span className="inline-block px-3 py-1 text-xs bg-green-100 text-green-800 rounded-full mb-4">{selectedCodingQuestion.difficulty}</span>
                  
                  <h4 className="font-semibold mb-2 flex items-center gap-1"><FileText className="h-4 w-4" /> Examples</h4>
                  {selectedCodingQuestion.examples.map((ex, idx) => (
                    <div key={idx} className="mb-4 p-3 bg-gray-50 rounded-lg">
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-gray-500">Input:</span>
                        <code className="bg-gray-200 px-2 py-1 rounded text-xs">{ex.input}</code>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">Output:</span>
                        <code className="bg-green-100 px-2 py-1 rounded text-xs">{ex.output}</code>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Right: Editor & Output */}
                <div className="lg:w-1/2 p-6">
                  {/* Controls */}
                  <div className="flex flex-wrap gap-2 mb-4 items-center">
                    <select 
                      value={language} 
                      onChange={(e) => setLanguage(e.target.value)}
                      className="px-3 py-1 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="javascript">JavaScript</option>
                      <option value="python">Python</option>
                      <option value="java">Java</option>
                    </select>
                    <motion.button
                      onClick={handleRun}
                      className="px-4 py-2 bg-green-500 text-white rounded-md text-sm hover:bg-green-600 flex items-center gap-1"
                      whileHover={{ scale: 1.05 }}
                    >
                      <PlayIcon className="h-4 w-4" /> Run
                    </motion.button>
                    <motion.button
                      onClick={handleCompile}
                      className="px-4 py-2 bg-blue-500 text-white rounded-md text-sm hover:bg-blue-600 flex items-center gap-1"
                      whileHover={{ scale: 1.05 }}
                    >
                      <Code className="h-4 w-4" /> Compile
                    </motion.button>
                    <motion.button
                      onClick={handleVerify}
                      className="px-4 py-2 bg-purple-500 text-white rounded-md text-sm hover:bg-purple-600 flex items-center gap-1"
                      whileHover={{ scale: 1.05 }}
                    >
                      <CheckCircle className="h-4 w-4" /> Verify
                    </motion.button>
                  </div>

                  {/* Code Editor */}
                  <div className="border rounded-md mb-4">
                    <textarea
                      value={code}
                      onChange={handleCodeChange}
                      className="w-full h-48 p-3 font-mono text-sm resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-900 text-white rounded-md"
                      placeholder={`Write your ${language} code here...`}
                    />
                  </div>

                  {/* Output */}
                  <div className="border rounded-md p-3 bg-black/90 text-green-400">
                    <h4 className="font-semibold mb-2 flex items-center gap-1 text-white"><Terminal className="h-4 w-4" /> Output</h4>
                    <pre className="text-xs whitespace-pre-wrap overflow-auto max-h-32">{output || 'Output will appear here...'}</pre>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    );
  }

  // Overview view
  return (
    <div className="flex min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      {/* Sidebar */}
      <Sidebar sidebarOpen={sidebarOpen} setActive={setActive} active={active} />

      {/* Main Content */}
      <div className="flex-1 px-4 sm:px-6">
        {/* <Profileheader /> */}
        {/* Mobile Sidebar Toggle */}
        <div className="lg:hidden py-4">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
          >
            {sidebarOpen ? 'Close Menu' : 'Open Menu'}
          </button>
        </div>

        {/* Course Header */}
        <motion.div 
          className="py-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <motion.button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 mb-4 text-gray-600 hover:text-gray-800 transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <ArrowLeft className="h-5 w-5" />
            Back to Courses
          </motion.button>

          <motion.div 
            className="bg-white/80 backdrop-blur-sm rounded-xl shadow-md overflow-hidden border border-white/20 mb-8"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <div className="relative overflow-hidden">
              <img src={course.image} alt={course.title} className="w-full h-64 object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              <div className="absolute bottom-4 left-4 text-white">
                <h1 className="text-3xl font-bold mb-1">{course.title}</h1>
                <p className="text-lg opacity-90">by {course.author}</p>
              </div>
            </div>
            <div className="p-6">
              <p className="text-gray-600 mb-4">{course.description}</p>
              <div className="flex justify-between items-center mb-4">
                <span className={`inline-block px-3 py-1 text-xs font-semibold rounded-full ${statusColors.badge}`}>
                  {course.status === 'completed' ? 'Completed' : course.status === 'inProgress' ? 'In Progress' : 'Not Started'}
                </span>
                <div className="flex items-center gap-2 text-yellow-500">
                  <Star className="h-4 w-4 fill-current" />
                  <span>{course.rating}</span>
                </div>
              </div>
              {/* Progress Bar */}
              <div className="bg-gray-200 rounded-full h-2.5 mb-4">
                <motion.div
                  className={`h-2.5 rounded-full ${statusColors.bg}`}
                  initial={{ width: 0 }}
                  animate={{ width: `${course.progress}%` }}
                  transition={{ duration: 1.5, ease: "easeOut" }}
                />
                <span className="text-xs text-gray-600 ml-2">{course.progress}% Complete</span>
              </div>
              <div className="flex justify-between items-center text-xs text-gray-600">
                <span className="flex items-center gap-1"><Calendar className="h-3 w-3" /> {course.weeksToComplete} weeks</span>
                <span className="flex items-center gap-1"><Users className="h-3 w-3" /> {course.views} views</span>
              </div>
            </div>
          </motion.div>

          {/* Sections */}
          <motion.div 
            className="space-y-8"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {/* Live Classes */}
            <motion.section variants={itemVariants}>
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <Calendar className="h-6 w-6" />
                Live Classes (Every Day)
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-7 gap-4">
                {mockLiveClasses.map((cls, index) => (
                  <motion.div 
                    key={cls.day}
                    className="bg-white/70 backdrop-blur-sm rounded-lg p-4 text-center border border-gray-200/50"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <h3 className="font-semibold text-gray-800">{cls.day}</h3>
                    <p className="text-sm text-gray-600">{cls.time}</p>
                    <p className="text-xs text-blue-600">{cls.topic}</p>
                  </motion.div>
                ))}
              </div>
            </motion.section>

            {/* Resources */}
            <motion.section variants={itemVariants}>
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <Book className="h-6 w-6" />
                Resources
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {mockResources.map((resource) => (
                  <motion.a 
                    key={resource.id}
                    href={resource.link}
                    className="bg-white/70 backdrop-blur-sm rounded-lg p-4 border border-gray-200/50 hover:bg-white transition-all flex items-center gap-3"
                    whileHover={{ scale: 1.02 }}
                  >
                    {resource.type === 'Video' ? <Play className="h-5 w-5 text-red-500" /> : <FileText className="h-5 w-5 text-blue-500" />}
                    <div>
                      <h3 className="font-semibold text-gray-800">{resource.title}</h3>
                      <p className="text-xs text-gray-500">{resource.type}</p>
                    </div>
                  </motion.a>
                ))}
              </div>
            </motion.section>

            {/* Assessments - Buttons only in overview */}
            <motion.section variants={itemVariants}>
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <Award className="h-6 w-6" />
                Assessments
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* MCQs Button */}
                <motion.button
                  onClick={() => setCurrentView('mcqs')}
                  className="bg-gradient-to-r from-purple-500 to-pink-600 text-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all flex flex-col items-center gap-3"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <FileText className="h-8 w-8" />
                  <h3 className="text-xl font-semibold">MCQs (25)</h3>
                  <p className="text-sm opacity-90">Multiple Choice Questions</p>
                  <ChevronRight className="h-5 w-5" />
                </motion.button>

                {/* Coding Questions Button */}
                <motion.button
                  onClick={() => setCurrentView('coding')}
                  className="bg-gradient-to-r from-green-500 to-emerald-600 text-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all flex flex-col items-center gap-3"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Code className="h-8 w-8" />
                  <h3 className="text-xl font-semibold">Coding Questions ({mockCodingQuestions.length})</h3>
                  <p className="text-sm opacity-90">Practice Coding Challenges</p>
                  <ChevronRight className="h-5 w-5" />
                </motion.button>
              </div>
            </motion.section>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default CourseDetails;