import { useState, useEffect, useCallback } from "react";
import { VITE_API_URL } from '../services/api/api';
import { useNavigate, useLocation } from "react-router-dom";
import { Question, Result } from "@/components/ui/quiz-page/types.tsx";

export function useQuizData(id: string | undefined) {
  const navigate = useNavigate();
  const location = useLocation();
  const quizTimer = location.state?.timer || 30;

  const isResultMode = new URLSearchParams(location.search).get("view") === "result";

  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState(false);
  const [answers, setAnswers] = useState<{ [key: number]: string }>({});
  const [savedQuestions, setSavedQuestions] = useState<number[]>([]);
  const [markedQuestions, setMarkedQuestions] = useState<number[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [startTime, setStartTime] = useState<number>(0);
  const [timeLeft, setTimeLeft] = useState(quizTimer * 60);
  const [results, setResults] = useState<Result[]>([]);

  const fetchQuestions = useCallback(async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("access_token");
      const res = await fetch(
        `${VITE_API_URL}/dashboard/quiz-view/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await res.json();
      setQuestions(data);
      setStartTime(Date.now());
    } catch (err) {
      console.error("Error loading quiz:", err);
    } finally {
      setLoading(false);
    }
  }, [id]);

  const fetchResults = useCallback(async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("access_token");
      const res = await fetch(
        `${VITE_API_URL}/quiz/results`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await res.json();
      const filteredResults = data.filter((r: Result) => r.quiz_id === Number(id));
      setResults(filteredResults);
    } catch (err) {
      console.error("Error fetching results:", err);
    } finally {
      setLoading(false);
    }
  }, [id]);

  const handleSubmit = useCallback(async () => {
    try {
      const token = localStorage.getItem("access_token");
      const timeTaken = Math.floor((Date.now() - startTime) / 1000);

      const formattedAnswers = Object.keys(answers).map((questionId) => ({
        question_id: Number(questionId),
        selected_option: answers[Number(questionId)],
      }));

      const payload = {
        quiz_id: Number(id),
        answers: formattedAnswers,
        time_taken: timeTaken,
      };

      await fetch(`${VITE_API_URL}/quiz/submit`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      alert("Quiz submitted successfully ✅");

      if (location.state?.courseId) {
        navigate(`/course1/${location.state.courseId}`, { state: { from: location.state?.from } });
      } else {
        navigate('/assessments');
      }

      await fetchResults();
    } catch (error) {
      console.error("Submit error:", error);
      alert("Error submitting quiz");
    }
  }, [id, answers, startTime, fetchResults, navigate, location.state]);

  useEffect(() => {
    if (isResultMode) {
      fetchResults();
    } else {
      fetchQuestions();
    }
  }, [id, isResultMode, fetchQuestions, fetchResults]);

  useEffect(() => {
    if (!isResultMode && timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(timer);
    } else if (!isResultMode && timeLeft === 0) {
      handleSubmit();
    }
  }, [isResultMode, timeLeft, handleSubmit]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleOptionSelect = (questionId: number, option: string) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: option,
    }));
  };

  const handleMarkForReview = (questionId: number) => {
    setMarkedQuestions((prev) =>
      prev.includes(questionId)
        ? prev.filter((id) => id !== questionId)
        : [...prev, questionId]
    );
  };

  const handleNext = () => {
    const currentQuestion = questions[currentQuestionIndex];
    if (currentQuestion && answers[currentQuestion.id] && !savedQuestions.includes(currentQuestion.id)) {
      setSavedQuestions((prev) => [...prev, currentQuestion.id]);
    }
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    }
  };

  const handlePrevious = () => {
    const currentQuestion = questions[currentQuestionIndex];
    if (currentQuestion && answers[currentQuestion.id] && !savedQuestions.includes(currentQuestion.id)) {
      setSavedQuestions((prev) => [...prev, currentQuestion.id]);
    }
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prev) => prev - 1);
    }
  };

  const navigateToQuestion = (index: number) => {
    const currentQuestion = questions[currentQuestionIndex];
    if (currentQuestion && answers[currentQuestion.id] && !savedQuestions.includes(currentQuestion.id)) {
      setSavedQuestions((prev) => [...prev, currentQuestion.id]);
    }
    setCurrentQuestionIndex(index);
  };

  const answeredCount = savedQuestions.length;
  const notAnsweredCount = questions.length - answeredCount;
  const markedCount = markedQuestions.length;

  return {
    isResultMode,
    questions,
    loading,
    answers,
    savedQuestions, setSavedQuestions,
    markedQuestions,
    currentQuestionIndex,
    timeLeft,
    results,
    formatTime,
    handleOptionSelect,
    handleMarkForReview,
    handleNext,
    handlePrevious,
    navigateToQuestion,
    handleSubmit,
    answeredCount,
    notAnsweredCount,
    markedCount
  };
}
