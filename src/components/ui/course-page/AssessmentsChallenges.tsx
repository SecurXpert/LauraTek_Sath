import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Quiz, Course } from "./CourseTypes";

interface AssessmentsChallengesProps {
  course: Course | null;
  quizzes: Quiz[];
  showAllQuizzes: boolean;
  setShowAllQuizzes: (show: boolean) => void;
}

const AssessmentsChallenges: React.FC<AssessmentsChallengesProps> = ({
  course,
  quizzes,
  showAllQuizzes,
  setShowAllQuizzes,
}) => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div className="mb-6">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-9 h-9 bg-[#F97316] rounded-full flex items-center justify-center shadow-sm">
          <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/><path d="M4 22h16"/><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"/><path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"/><path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"/>
          </svg>
        </div>
        <h2 className="text-xl font-bold text-gray-900">Assessments & Challenges</h2>
      </div>
      {/* MCQ Tests */}
      <div className="mb-4">
        <div className="flex items-center justify-between mb-3 w-full max-w-[873.8px]">
          <div className="flex items-center gap-2">
            <svg className="w-4 h-4 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <h2 
              className="font-bold text-[19.86px] leading-[27.8px] tracking-[0px] capitalize text-[#0A0A0A]"
              style={{ fontFamily: 'Inter, sans-serif' }}
            >
              MCQ Tests
            </h2>
          </div>
          {quizzes.length > 3 && (
            <button 
              onClick={() => setShowAllQuizzes(!showAllQuizzes)}
              className="text-[#3B66F5] font-semibold text-sm hover:underline cursor-pointer"
            >
              {showAllQuizzes ? "View Less" : "View All"}
            </button>
          )}
        </div>
        {quizzes.length > 0 ? (
          <div className="w-full max-w-[873.8px]">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[19.86px]">
              {(showAllQuizzes ? quizzes : quizzes.slice(0, 3)).map((quiz) => (
                <div key={quiz.id} className="bg-white rounded-2xl p-5 shadow-[0px_3.97px_5.96px_-3.97px_#0000001A,0px_9.93px_14.89px_-2.98px_#0000001A] border border-gray-50 h-full flex flex-col">
                  <h4 className="font-bold text-gray-900 text-sm mb-2">{quiz.title}</h4>
                  <p className="text-gray-600 text-xs mb-4 line-clamp-2">{quiz.description}</p>

                <div className="space-y-2 mb-4 mt-auto">
<div className="flex items-center text-xs">
<span className="text-gray-500">Duration:</span>
<span className="ml-1 font-medium text-gray-900">
{quiz.timer || 30} min
</span>
</div>
</div>
                <button
                  onClick={() => navigate(`/quiz/${quiz.id}`, { state: { timer: quiz.timer, from: location.state?.from || 'course', courseId: course?.course_id } })}
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-2.5 rounded-full text-[14px] font-semibold flex items-center justify-center gap-2 shadow-sm hover:shadow-md transition-all cursor-pointer"
                >
                  🚀 Start Assessment
                </button>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="w-full max-w-[873.8px] bg-white rounded-2xl p-5 shadow-[0px_3.97px_5.96px_-3.97px_#0000001A,0px_9.93px_14.89px_-2.98px_#0000001A] text-center">
          <p className="text-gray-500 text-sm">No {course?.course_title || "course"} quizzes available.</p>
        </div>
      )}
    </div>
    {/* Coding Challenges  */}
    {false && (
    <div>
      <div className="flex items-center gap-2 mb-3">
        <svg className="w-4 h-4 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
        </svg>
        <h3 className="font-semibold text-gray-900 text-sm">Coding Challenges</h3>
      </div>
      <div className="w-full max-w-[873.8px] h-[348.5px] overflow-y-auto pr-2 custom-scrollbar">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-[19.86px]">
          <div className="bg-white rounded-2xl p-5 shadow-[0px_3.97px_5.96px_-3.97px_#0000001A,0px_9.93px_14.89px_-2.98px_#0000001A] border border-gray-50 h-full flex flex-col">
          <div>
            <span className="px-2 py-0.5 bg-blue-50 text-blue-600 text-[10px] rounded-full mb-2 inline-block">Recommended for you</span>
            <h4 className="font-bold text-gray-900 text-sm mb-2">Build a Todo App with Hooks</h4>
            <div className="flex items-center gap-2 mb-4">
              <span className="px-2 py-0.5 bg-amber-100 text-amber-700 text-[10px] rounded-full">Medium</span>
              <span className="px-2 py-0.5 bg-blue-100 text-blue-700 text-[10px] rounded-full">In Progress</span>
            </div>
          </div>
          <div className="space-y-2 mb-4 flex-grow">
            <div className="flex items-center justify-between text-xs">
              <span className="text-gray-500">Duration:</span>
              <span className="font-medium text-gray-900">2 hours</span>
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className="text-gray-500">Attempts left:</span>
              <span className="font-medium text-gray-900">3</span>
            </div>
          </div>
          <button 
            onClick={() => {
              // Store challenge data in localStorage for the compiler to use
              const challengeData = {
                title: "Build a Todo App with Hooks",
                difficulty: "Medium",
                duration: "2 hours",
                attempts: 3,
                description: "Create a todo application using React Hooks",
                starterCode: `import React, { useState, useEffect } from 'react';

// TODO: Build a Todo App with Hooks
// Requirements:
// 1. Add new todos
// 2. Mark todos as complete
// 3. Delete todos
// 4. Filter todos (all, active, completed)
// 5. Use useState and useEffect hooks

function TodoApp() {
const [todos, setTodos] = useState([]);
const [inputValue, setInputValue] = useState('');
const [filter, setFilter] = useState('all');

// Your code here...

return (
<div className="todo-app">
<h1>Todo App</h1>
{/* Your UI here */}
</div>
);
}

export default TodoApp;`
              };
              localStorage.setItem('codingChallenge', JSON.stringify(challengeData));
              navigate('/compiler');
            }}
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-2.5 rounded-xl text-xs font-medium flex items-center justify-center gap-1 cursor-pointer"
          >
            <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Start Assessment
          </button>
        </div>
      </div>
    </div>
    </div>
    )}
  </div>
  );
};

export default AssessmentsChallenges;
