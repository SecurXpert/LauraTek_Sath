import React, { useState } from 'react';
import { FileText, ArrowRight, ChevronDown, ChevronUp, CheckCircle2, BarChart2, XCircle } from 'lucide-react';
import { useNavigate, Navigate, useLocation } from 'react-router-dom';

const GuestQuizResults = () => {
  const location = useLocation();
  // As requested, commenting out this page and directly showing the detailed results (screen shot img 2)
  return <Navigate to="/guest/quiz-results/details" state={location.state} replace />;
  

};

export default GuestQuizResults;
