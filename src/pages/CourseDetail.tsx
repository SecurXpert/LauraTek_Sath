import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import RegistrationDialog from "@/components/ui/RegistrationDialog";
import { Getquizes, GetQuizResult } from "@/services/apiservices";
import { FaTrophy } from "react-icons/fa";
import webDevCourse from "@/assets/UIUX Developer.jpg";
import python from "@/assets/python.jpg";
import node from "@/assets/Node.jpg";
import react from "@/assets/react.jpg";
import java from "@/assets/Java .jpg";
import sql from "@/assets/SQL.jpg";
import cloud from "@/assets/cloud.jpg";
import instructorPortrait from "@/assets/instructor-portrait.jpg";
import Contactus from "@/components/ui/contactus";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/theme-monokai";
import Attendance from "@/components/ui/attendance";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { submitQuiz ,getquizes} from "@/services/apiservices";
import certificate from "@/assets/certificate.jpg";

const courseData = {
  "web-development": {
    title: "UI/UX Design",
    image: webDevCourse,
    description: "Designed to build industry-ready professionals skilled in both design principles and front-end development.",
    duration: "12 weeks",
    level: "Beginner",
    instructor: "S. Vamsi",
    weeklyTopics: [
      
      "Figma",
      "Canva",
      "Design systems & UI kits",
      "HTML5",
      "CSS3",
      "Bootstrap",
      "JavaScript (ES6+)",
      "React",
      "Final Project"
    ],
    projects: [
      "Wireframe",
      "UI Mockup",
      "Personal Portfolio Website",
      "Todo Application with React",
      "E-commerce"
    ],
    learningOutcomes: [
      "Figma – Create wireframes, prototypes, and high-fidelity designs; collaborate effectively in design teams.",
      "Canva – Design visual assets, icons, and simple UI mockups with ease.",
      "Design systems, UI kits, and reusable components for scalable design.",
      "HTML5 – Structure clean, semantic web pages with accessibility in mind.",
      "CSS3 – Design beautiful, responsive layouts using Flexbox and Grid.",
      "Bootstrap – Use pre-built components to speed up mobile-first UI development.",
      "JavaScript (ES6+) – Add interactivity with dynamic scripting, DOM manipulation, and modern JS features.",
      "React – Build interactive UIs with components, hooks, and state management."
    ],
    projectDetails: [
      {
        content: "A personal portfolio website showcases your skills, projects, and experiences to potential employers or clients. It typically includes sections like About Me, Projects, Skills, and Contact, with a clean, responsive design. Below is a simple implementation using HTML, CSS, and JavaScript, styled with Tailwind CSS for a modern look.",
        technologies: ["React", "Tailwind CSS", "Node.js"],
        description: "A personal portfolio website to showcase your skills and projects."
      },
      {
        content: "A todo application allows users to create, update, and delete tasks. It typically includes features like user authentication, task categorization, and deadline reminders. Below is a simple implementation using React and Redux.",
        technologies: ["React", "Redux", "Express.js"],
        description: "A todo application with advanced state management."
      },
      {
        content: "An e-commerce backend API handles product listings, shopping cart functionality, and user authentication. It typically includes features like payment processing and order management. Below is a simple implementation using Node.js and MongoDB.",
        technologies: ["Node.js", "MongoDB", "Express.js"],
        description: "A backend API for an e-commerce platform."
      },
      {
        content: "A full-stack social media app allows users to create profiles, post updates, and connect with friends. It typically includes features like real-time chat and notifications. Below is a simple implementation using React and Firebase.",
        technologies: ["React", "Firebase", "Node.js"],
        description: "A full-stack social media app with real-time features."
      }
    ]
  },
  "ReactJS": {
    title: "ReactJS",
    image: react,
    description: "Master the art of building interactive UIs, managing dynamic data flows, and deploying cross-platform apps using ReactJS for web and React Native for mobile",
    duration: "16 weeks",
    level: "Intermediate",
    instructor: "Dr. Michael Chen",
    weeklyTopics: [
      "JSX (JavaScript XML)",
      "Components",
      "Hooks",
      "State Management",
      "React Native"
    ],
    projects: [
      "UI code using JSX",
      "Local state with useState",
      "Modern web and mobile app development",
      "External APIs"
    ],
    learningOutcomes: [
      "Writing clean UI code using JSX",
      "Building reusable functional components",
      "Managing component lifecycle and side effects",
      "Routing with React Router",
      "Fetching data with APIs and handling async operations",
      "Using core components like View, Text, ScrollView, TouchableOpacity",
      "Deploying apps to Android and iOS simulators",
      "Optimizing performance and using native modules"
    ],
    projectDetails: [
      {
        content: "A data visualization dashboard displays key metrics and trends using interactive charts. It helps stakeholders make data-driven decisions. Below is a simple implementation using Python and Dash.",
        technologies: ["Python", "Dash", "Pandas"],
        description: "An interactive dashboard for visualizing data trends."
      },
      {
        content: "A predictive model for sales forecasts future revenue based on historical data. It uses regression techniques to identify patterns. Below is a simple implementation using Python and Scikit-learn.",
        technologies: ["Python", "Scikit-learn", "Pandas"],
        description: "A model to predict sales trends."
      },
      {
        content: "Customer segmentation analysis groups customers based on behavior and demographics. It uses clustering algorithms to identify patterns. Below is a simple implementation using Python and K-means.",
        technologies: ["Python", "Scikit-learn", "Matplotlib"],
        description: "A clustering model for customer segmentation."
      },
      {
        content: "A neural network classifier predicts categories based on input features. It uses deep learning frameworks like TensorFlow. Below is a simple implementation for image classification.",
        technologies: ["Python", "TensorFlow", "Keras"],
        description: "A neural network for classification tasks."
      }
    ]
  },
  "Python": {
    title: "Python Developer",
    image: python,
    description: "From writing clean Python scripts to creating full-fledged backend systems, you’ll master backend logic, data handling, and seamless API integration",
    duration: "8 weeks",
    level: "Beginner",
    instructor: "Emma Rodriguez",
    weeklyTopics: [
      "Python Basics",
      "Loops, Functions, and OOPs",
      "Exception handling",
      "MySQL",
      "API Integration",
      "FastAPI",
      "Async I/O"
    ],
    projects: [
      "Calculator",
      "Web Scraper",
      "Weather App",
      "URL Shortener"
    ],
    learningOutcomes: [
      "Build a strong foundation in syntax, data types, control flow, OOPs, file handling, error management, and advanced Python features like decorators and generators.",
      "Design, query, and manage relational databases, normalize data, write joins, and implement CRUD operations efficiently.",
      "Understand REST principles, work with external APIs, and design your own APIs for web and mobile applications",
      "Building lightning-fast APIs using Pydantic and asynchronous programming. Learning routing, dependency injection, request validation, middleware, and JWT-based authentication",
      "JSON data formats and use built-in API documentation via Swagger for better testing and collaboration.",
      "Handle concurrent tasks and high-performance API requests using asynchronous programming with Python."
    ],
    projectDetails: [
      {
        content: "An SEO audit report identifies opportunities to improve website ranking on search engines. It includes keyword analysis and technical SEO recommendations. Below is a sample structure using tools like SEMrush.",
        technologies: ["SEMrush", "Google Analytics", "Google Search Console"],
        description: "A report to improve website SEO performance."
      },
      {
        content: "A social media campaign promotes a brand or product across platforms like Instagram and Twitter. It includes content creation and scheduling. Below is a sample campaign plan.",
        technologies: ["Hootsuite", "Canva", "Instagram"],
        description: "A campaign to boost social media engagement."
      },
      {
        content: "An email marketing funnel nurtures leads through automated email sequences. It includes welcome emails and conversion-focused content. Below is a sample funnel using Mailchimp.",
        technologies: ["Mailchimp", "Google Analytics"],
        description: "An automated email sequence for lead nurturing."
      },
      {
        content: "A Google Ads campaign drives traffic through targeted ads. It includes keyword selection and ad copy creation. Below is a sample campaign setup.",
        technologies: ["Google Ads", "Google Analytics"],
        description: "A PPC campaign to drive website traffic."
      }
    ]
  },
  "Java Developer": {
    title: "Java Developer",
    image: java,
    description: "From writing clean Python scripts to creating full-fledged backend systems, you’ll master backend logic, data handling, and seamless API integration",
    duration: "8 weeks",
    level: "Beginner",
    instructor: "Emma Rodriguez",
    weeklyTopics: [
      "Java Basics",
      "object-oriented concepts",
      "Spring Boot",
      "REST API Development",
      "Microservices Architecture",
      "Postman Testing"
    ],
    projects: [
      "Microservices-Based E-Commerce Platform",
      "Bug Tracking System",
      "Real-Time Chat & Notification App (WebSocket)",
      "Inventory Management System",
      "IoT Device Monitoring App"
    ],
    learningOutcomes: [
      "object-oriented concepts, data structures, exception handling, collections, multithreading, and file I/O.",
      "production-grade, standalone applications using Spring Boot. Understand dependency injection, annotations, REST controllers, and starter modules.",
      "Endpoints, handle JSON requests/responses, and implement CRUD operations with proper status codes and validations.",
      "Service registration, discovery, inter-service communication. Learning routing, dependency injection, request validation, middleware, and JWT-based authentication",
      "Testing your APIs with structured HTTP requests, validate responses, and simulate different client environments for real-time backend testing."
    ],
    projectDetails: [
      {
        content: "An SEO audit report identifies opportunities to improve website ranking on search engines. It includes keyword analysis and technical SEO recommendations. Below is a sample structure using tools like SEMrush.",
        technologies: ["SEMrush", "Google Analytics", "Google Search Console"],
        description: "A report to improve website SEO performance."
      },
      {
        content: "A social media campaign promotes a brand or product across platforms like Instagram and Twitter. It includes content creation and scheduling. Below is a sample campaign plan.",
        technologies: ["Hootsuite", "Canva", "Instagram"],
        description: "A campaign to boost social media engagement."
      },
      {
        content: "An email marketing funnel nurtures leads through automated email sequences. It includes welcome emails and conversion-focused content. Below is a sample funnel using Mailchimp.",
        technologies: ["Mailchimp", "Google Analytics"],
        description: "An automated email sequence for lead nurturing."
      },
      {
        content: "A Google Ads campaign drives traffic through targeted ads. It includes keyword selection and ad copy creation. Below is a sample campaign setup.",
        technologies: ["Google Ads", "Google Analytics"],
        description: "A PPC campaign to drive website traffic."
      }
    ]
  },
  "Node.js Developer": {
    title: "Node.js Developer",
    image: node,
    description: "Master the JavaScript-powered backend stack and build real-time, event-driven applications",
    duration: "8 weeks",
    level: "Beginner",
    instructor: "Emma Rodriguez",
    weeklyTopics: [
      "Node.js Fundamentals",
      "Express.js",
      "REST API Development",
      "Asynchronous coding: callbacks, promises, async/await",
      "CRUD operations"
    ],
    projects: [
      "Weather API Service",
      "Event Booking System",
      "Inventory Management System",
      "Real-Time Chat Application"
    ],
    learningOutcomes: [
      "asynchronous programming, the event loop, callbacks, promises, and modules to build robust and efficient backend applications",
      "the most popular Node.js framework to create RESTful APIs, manage routes, middleware, and handle server-side logic with ease.",
      "Understand how to build secure and scalable APIs, implement CRUD operations, handle HTTP methods, status codes, and create JSON-based data flows.",
      "Server management, and seamless request/response handling using the Node.js ecosystem."
    ],
    projectDetails: [
      {
        content: "An SEO audit report identifies opportunities to improve website ranking on search engines. It includes keyword analysis and technical SEO recommendations. Below is a sample structure using tools like SEMrush.",
        technologies: ["SEMrush", "Google Analytics", "Google Search Console"],
        description: "A report to improve website SEO performance."
      },
      {
        content: "A social media campaign promotes a brand or product across platforms like Instagram and Twitter. It includes content creation and scheduling. Below is a sample campaign plan.",
        technologies: ["Hootsuite", "Canva", "Instagram"],
        description: "A campaign to boost social media engagement."
      },
      {
        content: "An email marketing funnel nurtures leads through automated email sequences. It includes welcome emails and conversion-focused content. Below is a sample funnel using Mailchimp.",
        technologies: ["Mailchimp", "Google Analytics"],
        description: "An automated email sequence for lead nurturing."
      },
      {
        content: "A Google Ads campaign drives traffic through targeted ads. It includes keyword selection and ad copy creation. Below is a sample campaign setup.",
        technologies: ["Google Ads", "Google Analytics"],
        description: "A PPC campaign to drive website traffic."
      }
    ]
  },
  "SQL & Database Management": {
    title: "SQL & Database Management",
    image: sql,
    description: "most widely used open-source relational database systems. Develop a strong foundation in relational database concepts and SQL query writing",
    duration: "8 weeks",
    level: "Beginner",
    instructor: "Emma Rodriguez",
    weeklyTopics: [
      "SELECT, INSERT, UPDATE, DELETE",
      "aggregate functions & joins",
      "Subqueries",
      "Optimization Techniques"
    ],
    projects: [
      "CRUD Operations (Create, Read, Update, Delete)",
      "Employee Management System",
      "Event Registration Database",
      "Schema Design for E-Commerce"
    ],
    learningOutcomes: [
      "Database structures: tables, fields, keys & Data types and constraints",
      "Writing basic SELECT, INSERT, UPDATE, DELETE statements",
      "Filtering, sorting, and using conditional logic (WHERE, AND, OR, NOT)",
      "aggregate functions, grouping and filtering with GROUP BY and HAVING",
      "Proficiency in writing clear, efficient, and complex SQL queries for real-world business applications."
    ],
    projectDetails: [
      {
        content: "An SEO audit report identifies opportunities to improve website ranking on search engines. It includes keyword analysis and technical SEO recommendations. Below is a sample structure using tools like SEMrush.",
        technologies: ["SEMrush", "Google Analytics", "Google Search Console"],
        description: "A report to improve website SEO performance."
      },
      {
        content: "A social media campaign promotes a brand or product across platforms like Instagram and Twitter. It includes content creation and scheduling. Below is a sample campaign plan.",
        technologies: ["Hootsuite", "Canva", "Instagram"],
        description: "A campaign to boost social media engagement."
      },
      {
        content: "An email marketing funnel nurtures leads through automated email sequences. It includes welcome emails and conversion-focused content. Below is a sample funnel using Mailchimp.",
        technologies: ["Mailchimp", "Google Analytics"],
        description: "An automated email sequence for lead nurturing."
      },
      {
        content: "A Google Ads campaign drives traffic through targeted ads. It includes keyword selection and ad copy creation. Below is a sample campaign setup.",
        technologies: ["Google Ads", "Google Analytics"],
        description: "A PPC campaign to drive website traffic."
      }
    ]
  },
  "Cloud + DevOps Program": {
    title: "Cloud + DevOps Program",
    image: cloud,
    description: "deploying, managing, and automating applications across leading cloud platforms — AWS and Azure — using powerful DevOps tools",
    duration: "8 weeks",
    level: "Beginner",
    instructor: "Malleshwar",
    weeklyTopics: [
      "EC2",
      "S3, IAM",
      "RDS, AWS CLI",
      "CloudWatch & CloudTrail",
      "Elastic Beanstalk",
      "AWS Lambda & CI/CD Pipelines",
      "Jenkins, Kubernetes, Docker",
      "Terraform, Maven"
    ],
    projects: [
      "CI/CD Pipeline with AWS CodePipeline",
      "Serverless Application with AWS Lambda and S3",
      "Kubernetes-Based Scalable Application Deployment",
      "Infrastructure as Code with Terraform",
      "Client-to-Site VPN Setup on AWS"
    ],
    learningOutcomes: [
      "Acquire end-to-end skills in cloud operations, CI/CD automation, containerization, and infrastructure management",
      "Launch virtual servers (EC2), secure storage (S3), and scalable databases (RDS)",
      "Monitor, troubleshoot, and automate cloud environments using CLI, CloudWatch, and Lambda",
      "Set up CI/CD pipelines with AWS Developer Tools",
      "Build and automate pipelines with Jenkins and Write Terraform scripts for infrastructure as code",
      "Create containerized applications using Docker and orchestrate them using Kubernetes."
    ],
    projectDetails: [
      {
        content: "An SEO audit report identifies opportunities to improve website ranking on search engines. It includes keyword analysis and technical SEO recommendations. Below is a sample structure using tools like SEMrush.",
        technologies: ["SEMrush", "Google Analytics", "Google Search Console"],
        description: "A report to improve website SEO performance."
      },
      {
        content: "A social media campaign promotes a brand or product across platforms like Instagram and Twitter. It includes content creation and scheduling. Below is a sample campaign plan.",
        technologies: ["Hootsuite", "Canva", "Instagram"],
        description: "A campaign to boost social media engagement."
      },
      {
        content: "An email marketing funnel nurtures leads through automated email sequences. It includes welcome emails and conversion-focused content. Below is a sample funnel using Mailchimp.",
        technologies: ["Mailchimp", "Google Analytics"],
        description: "An automated email sequence for lead nurturing."
      },
      {
        content: "A Google Ads campaign drives traffic through targeted ads. It includes keyword selection and ad copy creation. Below is a sample campaign setup.",
        technologies: ["Google Ads", "Google Analytics"],
        description: "A PPC campaign to drive website traffic."
      }
    ]
  },
  "Java fullStack Developer": {
    title: "Java fullStack Developer",
    image: java,
    description: "designed to help you build dynamic web applications from the ground up — covering frontend design, backend logic, and database integration using industry-standard Java technologies and deploy modern web applications end-to-end",
    duration: "8 weeks",
    level: "Beginner",
    price: "$399",
    instructor: "Emma Rodriguez",
    weeklyTopics: [
      "HTML5,CSS",
      "Bootstrap, JavaScript",
      "Java Core",
      "Spring Boot",
      "Microservices",
      "MySQL",
    ],
    projects: [
      "TaskTrove",
      "HealthHub",
      "complete E-Commerce Platform",
    ],
    learningOutcomes: [
      "Create user-friendly and responsive web pages and Use modern design principles with HTML5 and CSS3",
      "Add interactivity with JavaScript and DOM manipulation",
      "Write clean Java code following OOP principles and Build APIs and server-side logic using Spring Boot",
      "Handle client requests, data processing, and error handling and Implement microservices architecture for modular app design",
      "Creating and managing relational databases with MySQL",
      "Connect backend applications to databases using Spring Data JPA",
    ],
    projectDetails: [
      {
        content: "An SEO audit report identifies opportunities to improve website ranking on search engines. It includes keyword analysis and technical SEO recommendations. Below is a sample structure using tools like SEMrush.",
        technologies: ["SEMrush", "Google Analytics", "Google Search Console"],
        description: "A report to improve website SEO performance."
      },
      {
        content: "A social media campaign promotes a brand or product across platforms like Instagram and Twitter. It includes content creation and scheduling. Below is a sample campaign plan.",
        technologies: ["Hootsuite", "Canva", "Instagram"],
        description: "A campaign to boost social media engagement."
      },
      {
        content: "An email marketing funnel nurtures leads through automated email sequences. It includes welcome emails and conversion-focused content. Below is a sample funnel using Mailchimp.",
        technologies: ["Mailchimp", "Google Analytics"],
        description: "An automated email sequence for lead nurturing."
      },
      {
        content: "A Google Ads campaign drives traffic through targeted ads. It includes keyword selection and ad copy creation. Below is a sample campaign setup.",
        technologies: ["Google Ads", "Google Analytics"],
        description: "A PPC campaign to drive website traffic."
      }
    ]
  }
};

// Define course-to-topics mapping for quiz filtering
const courseTopics = {
  "web-development": ["HTML", "CSS", "Figma","test"],
  "ReactJS": ["React", "Hooks", "Redux"],
  "Python": ["Python", "OOP", "Modules"],
  "Java Developer": ["Java", "Spring", "Hibernate"],
  "Node.js Developer": ["NodeJS", "Express", "APIs"],
  "SQL & Database Management": ["SQL", "Joins", "Normalization"],
  "Cloud + DevOps Program": ["AWS", "Docker", "CI/CD"],
  "Java fullStack Developer": ["JavaScript", "JavaF", "SpringBoot"],
};

const CourseDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [showAllTopics, setShowAllTopics] = useState(false);
  const [quizAttempts, setQuizAttempts] = useState(0);
  const [showRegisterPrompt, setShowRegisterPrompt] = useState(false);
  const [regOpen, setRegOpen] = useState(false);
  const [regDialogOpen, setRegDialogOpen] = useState(false);
  const [code, setCode] = useState('// Write your JavaScript code here\nconsole.log("Hello, World!");');
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState('javascript');
  const [selectedProject, setSelectedProject] = useState<number | null>(null);
  const [isRegistered, setIsRegistered] = useState(false);
  const [showContactDialog, setShowContactDialog] = useState(false);
  type QuizQuestion = {
    id: number;
    question_text: string;
    option_a: string;
    option_b: string;
    option_c: string;
    option_d: string;
    correct_option: string;
  };
  type QuizResult = {
    id: number;
    guest_id: number;
    title: string;
    score: number;
    total_questions: number;
    time_taken: number;
    submitted_at: string;
    badge: string;

  };
  const [showCertificate, setShowCertificate] = useState(false);
  const [quizQuestions, setQuizQuestions] = useState<QuizQuestion[]>([]);
  const [quizResults, setQuizResults] = useState<QuizResult[]>([]);
  const [showQuizUI, setShowQuizUI] = useState(false);
  const [currentQuizTitle, setCurrentQuizTitle] = useState("");
  const [answers, setAnswers] = useState<{ question_id: number; selected_option: string }[]>([]);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [score, setScore] = useState(0);
  const [quizStartTime, setQuizStartTime] = useState<number | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [filteredQuizzes, setFilteredQuizzes] = useState<
    { id: number; title: string; completed: boolean; locked?: boolean }[]
  >([]);
  const tabsListRef = useRef<HTMLDivElement>(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);

  const course = courseData[id as keyof typeof courseData];

  useEffect(() => {
    const token = localStorage.getItem('access_token');
    setIsRegistered(!!token);

    const fetchQuizzes = async () => {
      try {
        const quizzes = await getquizes();
        const courseSpecificTopics = courseTopics[id as keyof typeof courseTopics] || [];
        const filtered = quizzes
          .filter((quiz: { title: string }) =>
            courseSpecificTopics.some((topic) =>
              quiz.title.toLowerCase().includes(topic.toLowerCase())
            )
          )
          .map((quiz: { id: number; title: string }) => ({
            id: quiz.id,
            title: quiz.title,
            completed: false,
            locked: quiz.title.toLowerCase() === "advanced topics",
          }));
        setFilteredQuizzes(filtered);
      } catch (err) {
        console.error('Failed to fetch quizzes:', err);
        setFilteredQuizzes([]);
      }
    };

    fetchQuizzes();
    if (token) {
      fetchQuizResults();
    }
  }, [id]);

  useEffect(() => {
    const checkScroll = () => {
      if (tabsListRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = tabsListRef.current;
        setShowLeftArrow(scrollLeft > 0);
        setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 1);
      }
    };

    const tabsList = tabsListRef.current;
    if (tabsList) {
      tabsList.addEventListener('scroll', checkScroll);
      checkScroll();
      window.addEventListener('resize', checkScroll);
    }

    return () => {
      if (tabsList) {
        tabsList.removeEventListener('scroll', checkScroll);
      }
      window.removeEventListener('resize', checkScroll);
    };
  }, []);

  const scrollTabs = (direction: 'left' | 'right') => {
    if (tabsListRef.current) {
      const scrollAmount = direction === 'left' ? -150 : 150;
      tabsListRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  const fetchQuizResults = async () => {
    try {
      const results = await GetQuizResult();
      setQuizResults(results);
    } catch (err) {
      console.error('Failed to fetch quiz results:', err);
      setQuizResults([]);
    }
  };

  if (!course) {
    return <div>Course not found</div>;
  }

  const codingQuestions = [
    {
      id: 1,
      title: "Check Even or Odd",
      question: "Write a program to read an integer and print even or odd.",
      scenario: "Using if-else statement.",
      expectedOutput: "Input: 4 -> Output: Even\nInput: 7 -> Output: Odd"
    }
  ];

  const handleQuizClick = async (quizId: number, locked: boolean) => {
    const quiz = filteredQuizzes.find((q) => q.id === quizId);
    const token = localStorage.getItem('access_token');
    if (!token) {
      setIsRegistered(false);
      setRegDialogOpen(true);
      return;
    }
    setIsRegistered(true);
    if (quiz && !locked) {
      setCurrentQuizTitle(quiz.title);
      setShowQuizUI(true);
      setAnswers([]);
      setScore(0);
      setQuizCompleted(false);
      setQuizStartTime(Date.now());
      try {
        const res = await Getquizes(quiz.title);
        if (token) {
          setQuizQuestions(res);
        } else {
          setQuizQuestions([]);
        }
      } catch (err) {
        setQuizQuestions([]);
      }
    } else {
      setShowRegisterPrompt(true);
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < quizQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handlePrevQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleQuizOptionSelect = (questionId: number, option: string) => {
    setAnswers((prev) => {
      const existingAnswer = prev.find((ans) => ans.question_id === questionId);
      if (existingAnswer) {
        return prev.map((ans) =>
          ans.question_id === questionId ? { ...ans, selected_option: option } : ans
        );
      }
      return [...prev, { question_id: questionId, selected_option: option }];
    });
  };

  const handleQuizSubmit = async () => {
    if (!quizQuestions.length || !quizStartTime) {
      console.warn('Quiz submission aborted: No questions or start time available');
      return;
    }

    const timeTaken = Math.round((Date.now() - quizStartTime) / 1000);
    const payload = {
      title: currentQuizTitle,
      answers,
      time_taken: timeTaken,
    };

    try {
      const result = await submitQuiz(payload);
      setScore(result.score || 0);
      setQuizCompleted(true);
      await fetchQuizResults();
    } catch (err) {
      console.error('Error submitting quiz:', err);
      setScore(0);
      setQuizCompleted(true);
    }
  };

const getCupInfo = (score: number) => {
  if (score > 3) return { color: '#FFD700', label: 'Diamond Cup' };
  if (score > 2) return { color: '#C0C0C0', label: 'Gold Cup' };
  if (score > 1) return { color: '#b87333', label: 'Silver Cup' };
  if (score > 0) return { color: '#cd7f32', label: 'Bronze Cup' };
  return null;
};

// Function to map badge string to cup details (used in quiz results table)
const getBadgeInfo = (badge: string) => {
  switch (badge) {
    case 'diamond':
      return { color: '#B9F2FF', label: 'Diamond Cup' };
    case 'gold':
      return { color: '#FFD700', label: 'Gold Cup' };
    case 'silver':
      return { color: '#C0C0C0', label: 'Silver Cup' };
    case 'bronze':
      return { color: '#CD7F32', label: 'Bronze Cup' };
    default:
      return null;
  }
};

  const handleClearCode = () => {
    setCode('// Write your JavaScript code here\nconsole.log("Hello, World!");');
    setOutput('');
    setError('');
  };

  const handleRunCode = () => {
    if (selectedLanguage !== 'javascript') {
      setError('Only JavaScript is supported in this demo. Use a backend service like Judge0 for other languages.');
      setOutput('');
      return;
    }
    setOutput('');
    setError('');
    try {
      const logs: string[] = [];
      const originalConsoleLog = console.log;
      console.log = (...args: unknown[]) => {
        logs.push(args.join(' '));
      };
      eval(code);
      console.log = originalConsoleLog;
      setOutput(logs.join('\n') || 'No output');
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unknown error occurred');
      }
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <div className="sticky top-0 z-50 bg-background">
        <Header />
      </div>

      <main className="flex-grow">
        <section className="relative py-12 sm:py-16 md:py-20 bg-gradient-to-r from-course-hero to-primary">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 lg:gap-12 items-center">
              <div className="text-white order-2 lg:order-1">
                <Badge className="mb-3 sm:mb-4 bg-white/20 text-white text-xs sm:text-sm">{course.level}</Badge>
                <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-3 sm:mb-4 leading-tight">{course.title}</h1>
                <p className="text-base sm:text-lg md:text-xl mb-4 sm:mb-6 text-white/90 leading-relaxed">{course.description}</p>
                <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-6 space-y-4 sm:space-y-0 mb-6 sm:mb-8">
                  <div>
                    <span className="block text-xs sm:text-sm text-white/70">Duration</span>
                    <span className="text-base sm:text-lg font-semibold">{course.duration}</span>
                  </div>
                  <div>
                    <span className="block text-xs sm:text-sm text-white/70">Instructor</span>
                    <span className="text-base sm:text-lg font-semibold">{course.instructor}</span>
                  </div>
                </div>
                <Button variant="course" size="lg" onClick={() => setRegOpen(true)} className="w-full sm:w-auto">
                  Enroll Now
                </Button>
                <Contactus open={regOpen} setOpen={setRegOpen} />
              </div>
              <div className="order-1 lg:order-2">
                <img
                  src={course.image}
                  alt={course.title}
                  className="w-full rounded-lg shadow-2xl"
                />
              </div>
            </div>
          </div>
        </section>

        <section className="py-12 sm:py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <Tabs defaultValue="overview" className="w-full">
              <div className="relative">
                <TabsList
                  ref={tabsListRef}
                  className="
                    flex flex-row flex-nowrap overflow-x-auto
                    p-2 bg-white dark:bg-background border border-muted rounded-lg shadow-sm
                    scrollbar-thin scrollbar-thumb-muted scrollbar-track-transparent
                    space-x-2 items-center justify-center
                    touch-pan-x snap-x snap-mandatory
                    relative
                    2xs:max-w-[300px] xs:max-w-[360px] 2sm:max-w-[400px] sm:max-w-[500px] md:max-w-[600px] lg:max-w-none
                  "
                  style={{ WebkitOverflowScrolling: "touch", scrollBehavior: "smooth" }}
                >
                  <TabsTrigger
                    value="overview"
                    className="
                      text-[10px] 2xs:text-xs xs:text-xs 2sm:text-sm sm:text-sm md:text-sm px-2 2xs:px-2 xs:px-3 2sm:px-3 sm:px-3 md:px-4 py-1 2xs:py-1.5 xs:py-1.5 2sm:py-2 sm:py-2 md:py-2 whitespace-nowrap flex-shrink-0
                      snap-center rounded-md
                      transition-all duration-200 ease-in-out
                      data-[state=active]:bg-primary data-[state=active]:text-primary-foreground
                      hover:bg-muted hover:text-foreground
                    "
                  >
                    Overview
                  </TabsTrigger>
                  <TabsTrigger
                    value="projects"
                    className="
                      text-[10px] 2xs:text-xs xs:te
                      xt-xs 2sm:text-sm sm:text-sm md:text-sm px-2 2xs:px-2 xs:px-3 2sm:px-3 sm:px-3 md:px-4 py-1 2xs:py-1.5 xs:py-1.5 2sm:py-2 sm:py-2 md:py-2 whitespace-nowrap flex-shrink-0
                      snap-center rounded-md
                      transition-all duration-200 ease-in-out
                      data-[state=active]:bg-primary data-[state=active]:text-primary-foreground
                      hover:bg-muted hover:text-foreground
                    "
                  >
                    Projects
                  </TabsTrigger>
                  <TabsTrigger
                    value="learning"
                    className="
                      text-[10px] 2xs:text-xs xs:text-xs 2sm:text-sm sm:text-sm md:text-sm px-2 2xs:px-2 xs:px-3 2sm:px-3 sm:px-3 md:px-4 py-1 2xs:py-1.5 xs:py-1.5 2sm:py-2 sm:py-2 md:py-2 whitespace-nowrap flex-shrink-0
                      snap-center rounded-md
                      transition-all duration-200 ease-in-out
                      data-[state=active]:bg-primary data-[state=active]:text-primary-foreground
                      hover:bg-muted hover:text-foreground
                    "
                  >
                    What You'll Learn
                  </TabsTrigger>
                  <TabsTrigger
                    value="certification"
                    className="
                      text-[10px] 2xs:text-xs xs:text-xs 2sm:text-sm sm:text-sm md:text-sm px-2 2xs:px-2 xs:px-3 2sm:px-3 sm:px-3 md:px-4 py-1 2xs:py-1.5 xs:py-1.5 2sm:py-2 sm:py-2 md:py-2 whitespace-nowrap flex-shrink-0
                      snap-center rounded-md
                      transition-all duration-200 ease-in-out
                      data-[state=active]:bg-primary data-[state=active]:text-primary-foreground
                      hover:bg-muted hover:text-foreground
                    "
                  >
                    Certification
                  </TabsTrigger>
                  <TabsTrigger
                    value="topics"
                    className="
                      text-[10px] 2xs:text-xs xs:text-xs 2sm:text-sm sm:text-sm md:text-sm px-2 2xs:px-2 xs:px-3 2sm:px-3 sm:px-3 md:px-4 py-1 2xs:py-1.5 xs:py-1.5 2sm:py-2 sm:py-2 md:py-2 whitespace-nowrap flex-shrink-0
                      snap-center rounded-md
                      transition-all duration-200 ease-in-out
                      data-[state=active]:bg-primary data-[state=active]:text-primary-foreground
                      hover:bg-muted hover:text-foreground
                    "
                  >
                    Weekly Topics
                  </TabsTrigger>
                  <TabsTrigger
                    value="quizzes"
                    className="
                      text-[10px] 2xs:text-xs xs:text-xs 2sm:text-sm sm:text-sm md:text-sm px-2 2xs:px-2 xs:px-3 2sm:px-3 sm:px-3 md:px-4 py-1 2xs:py-1.5 xs:py-1.5 2sm:py-2 sm:py-2 md:py-2 whitespace-nowrap flex-shrink-0
                      snap-center rounded-md
                      transition-all duration-200 ease-in-out
                      data-[state=active]:bg-primary data-[state=active]:text-primary-foreground
                      hover:bg-muted hover:text-foreground
                    "
                  >
                    Quizzes
                  </TabsTrigger>
                  <TabsTrigger
                    value="quiz-results"
                    className="
                      text-[10px] 2xs:text-xs xs:text-xs 2sm:text-sm sm:text-sm md:text-sm px-2 2xs:px-2 xs:px-3 2sm:px-3 sm:px-3 md:px-4 py-1 2xs:py-1.5 xs:py-1.5 2sm:py-2 sm:py-2 md:py-2 whitespace-nowrap flex-shrink-0
                      snap-center rounded-md
                      transition-all duration-200 ease-in-out
                      data-[state=active]:bg-primary data-[state=active]:text-primary-foreground
                      hover:bg-muted hover:text-foreground
                    "
                  >
                    Quiz Results
                  </TabsTrigger>
                  <TabsTrigger
                    value="online-compiler"
                    className="
                      text-[10px] 2xs:text-xs xs:text-xs 2sm:text-sm sm:text-sm md:text-sm px-2 2xs:px-2 xs:px-3 2sm:px-3 sm:px-3 md:px-4 py-1 2xs:py-1.5 xs:py-1.5 2sm:py-2 sm:py-2 md:py-2 whitespace-nowrap flex-shrink-0
                      snap-center rounded-md
                      transition-all duration-200 ease-in-out
                      data-[state=active]:bg-primary data-[state=active]:text-primary-foreground
                      hover:bg-muted hover:text-foreground
                    "
                  >
                    Online Compiler
                  </TabsTrigger>
                  <TabsTrigger
                    value="attendance"
                    className="
                      text-[10px] 2xs:text-xs xs:text-xs 2sm:text-sm sm:text-sm md:text-sm px-2 2xs:px-2 xs:px-3 2sm:px-3 sm:px-3 md:px-4 py-1 2xs:py-1.5 xs:py-1.5 2sm:py-2 sm:py-2 md:py-2 whitespace-nowrap flex-shrink-0
                      snap-center rounded-md
                      transition-all duration-200 ease-in-out
                      data-[state=active]:bg-primary data-[state=active]:text-primary-foreground
                      hover:bg-muted hover:text-foreground
                    "
                  >
                    Attendance
                  </TabsTrigger>
                </TabsList>
                <Button
                  variant="ghost"
                  size="icon"
                  className="
                    absolute left-[-10px] top-1/2 -translate-y-1/2 bg-white dark:bg-background border border-muted rounded-full shadow-sm
                    2xs:flex xs:flex 2sm:flex sm:flex md:flex lg:hidden
                    transition-opacity duration-200
                    z-10
                  "
                  style={{ opacity: showLeftArrow ? 1 : 0, pointerEvents: showLeftArrow ? 'auto' : 'none' }}
                  onClick={() => scrollTabs('left')}
                >
                  <ChevronLeft className="h-4 w-4 2xs:h-5 xs:h-5 2sm:h-5 sm:h-5 md:h-6" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="
                    absolute right-[-10px] top-1/2 -translate-y-1/2 bg-white dark:bg-background border border-muted rounded-full shadow-sm
                    2xs:flex xs:flex 2sm:flex sm:flex md:flex lg:hidden
                    transition-opacity duration-200
                    z-10
                  "
                  style={{ opacity: showRightArrow ? 1 : 0, pointerEvents: showRightArrow ? 'auto' : 'none' }}
                  onClick={() => scrollTabs('right')}
                >
                  <ChevronRight className="h-4 w-4 2xs:h-5 xs:h-5 2sm:h-5 sm:h-5 md:h-6" />
                </Button>
              </div>

              <TabsContent value="overview" className="mt-8">
                <Card>
                  <CardHeader>
                    <CardTitle>Course Overview</CardTitle>
                  </CardHeader>
                  <CardContent className="prose max-w-none">
                    <p>
                      This comprehensive course is designed to take you from beginner to professional level.
                      You'll work on real-world projects, learn industry best practices, and build a portfolio
                      that will help you land your dream job.
                    </p>
                    {isRegistered ? (
                      <>
                        <p className="text-lg text-muted-foreground mb-6">
                          {course.description}
                        </p>
                        <p>
                          Our experienced instructors provide personalized feedback and mentorship throughout
                          your learning journey. Join a community of like-minded learners and get the support
                          you need to succeed.
                        </p>
                      </>
                    ) : (
                      <div className="text-center">
                        <p className="text-lg text-muted-foreground mb-6">
                          Register to unlock the full course overview and start your learning journey!
                        </p>
                        <Button variant="course" size="lg" onClick={() => setRegDialogOpen(true)}>
                          Sign Up to View Overview
                        </Button>
                      </div>
                    )}
                  </CardContent>
                  {!isRegistered && <RegistrationDialog open={regDialogOpen} setOpen={setRegDialogOpen} />}
                  {isRegistered && (
                    <>
                      <Button variant="course" className="mt-6 w-full" size="lg" onClick={() => setRegOpen(true)}>
                        Enroll Now For This Course
                      </Button>
                      <Contactus open={regOpen} setOpen={setRegOpen} />
                    </>
                  )}
                </Card>
              </TabsContent>

              <TabsContent value="projects" className="mt-8">
                <Card>
                  <CardHeader>
                    <CardTitle>Hands-on Projects</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-4">
                      {course.projects.map((project, index) => (
                        <div
                          key={index}
                          className="flex items-center space-x-3 p-4 border rounded-lg cursor-pointer hover:border-primary"
                          onClick={() => {
                            setSelectedProject(index);
                            if (!isRegistered) {
                              setRegDialogOpen(true);
                            }
                          }}
                        >
                          <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-sm">
                            {index + 1}
                          </div>
                          <span className="font-medium">{project}</span>
                        </div>
                      ))}
                    </div>
                    {isRegistered && selectedProject !== null && (
                      <div className="mt-6 p-6 border rounded-lg bg-muted">
                        <h4 className="text-lg font-semibold mb-2">Project Details</h4>
                        <p className="mb-2">{course.projectDetails[selectedProject].description}</p>
                        <div className="mb-2">
                          <span className="font-semibold">Content: </span>{course.projectDetails[selectedProject].content}
                        </div>
                        <div className="mb-4">
                          <span className="font-semibold">Technologies Used: </span>
                          {course.projectDetails[selectedProject].technologies.join(", ")}
                        </div>
                        <div className="flex justify-center">
                          <Button variant="course" onClick={() => setShowContactDialog(true)}>
                            More About This
                          </Button>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
                <RegistrationDialog
                  open={regDialogOpen}
                  setOpen={(open) => {
                    setRegDialogOpen(open);
                    if (!open && selectedProject !== null) {
                      setIsRegistered(true);
                    }
                  }}
                />
                <Contactus open={showContactDialog} setOpen={setShowContactDialog} />
              </TabsContent>

              <TabsContent value="learning" className="mt-8">
                <Card>
                  <CardHeader>
                    <CardTitle>What You'll Learn</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {isRegistered ? (
                      <>
                        <div className="grid gap-3">
                          {course.learningOutcomes.map((outcome, index) => (
                            <div key={index} className="flex items-start space-x-3">
                              <div className="w-5 h-5 rounded-full bg-success text-white flex items-center justify-center text-xs mt-0.5">
                                ✓
                              </div>
                              <span>{outcome}</span>
                            </div>
                          ))}
                        </div>
                        <div className="mt-6 text-muted-foreground">
                          <p>
                            By enrolling, you'll gain hands-on experience, personalized feedback, and access to exclusive resources that will accelerate your learning and career growth.
                          </p>
                          <p className="mt-2">
                            Unlock advanced modules, real-world projects, and direct mentorship from industry experts.
                          </p>
                        </div>
                      </>
                    ) : (
                      <div className="text-center">
                        <p className="text-lg text-muted-foreground mb-6">
                          Register to unlock the full list of learning outcomes and access all course features!
                        </p>
                        <Button variant="course" size="lg" onClick={() => setRegDialogOpen(true)}>
                          Sign Up to View Learning Outcomes
                        </Button>
                      </div>
                    )}
                  </CardContent>
                  {!isRegistered && <RegistrationDialog open={regDialogOpen} setOpen={setRegDialogOpen} />}
                  {isRegistered && (
                    <>
                      <Button variant="course" className="mt-6 w-full" size="lg" onClick={() => setRegOpen(true)}>
                        Enroll Now For This Course
                      </Button>
                      <Contactus open={regOpen} setOpen={setRegOpen} />
                    </>
                  )}
                </Card>
              </TabsContent>

              <TabsContent value="certification" className="mt-8">
                <Card>
                  <CardHeader>
                    <CardTitle>Summer Camp Certification</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {isRegistered ? (
                      <>
                        <div className="bg-instructor p-6 rounded-lg mb-6">
                          <h3 className="text-xl font-semibold mb-4">Industry-Recognized Certificate</h3>
                          <p className="mb-4">
                            Upon successful completion of this course, you'll receive a certificate that's
                            recognized by top tech companies worldwide.
                          </p>
                          <ul className="space-y-2">
                            <li>• Verified completion certificate</li>
                            <li>• LinkedIn badge for your profile</li>
                            <li>• Portfolio review and feedback</li>
                            <li>• Job placement assistance</li>
                          </ul>
                        </div>
                        <div className="bg-muted p-6 rounded-lg mb-6">
                          <h4 className="text-lg font-semibold mb-2">What You'll Gain from the Camp</h4>
                          <ul className="list-disc pl-6 space-y-1">
                            <li>Mastery of in-demand technologies for {course.title}</li>
                            <li>Real-world project experience and portfolio building</li>
                            <li>Direct mentorship from industry professionals</li>
                            <li>Networking opportunities with peers and hiring partners</li>
                            <li>Access to exclusive webinars and workshops</li>
                          </ul>
                        </div>
                      </>
                    ) : (
                      <div className="text-center">
                        <p className="text-lg text-muted-foreground mb-6">
                          Register to unlock certification details and see how this camp can boost your career!
                        </p>
                        <Button variant="course" size="lg" onClick={() => setRegDialogOpen(true)}>
                          Sign Up to View Certification Details
                        </Button>
                      </div>
                    )}
                  </CardContent>
                  {!isRegistered && <RegistrationDialog open={regDialogOpen} setOpen={setRegDialogOpen} />}
                  {isRegistered && (
                    <div className="flex flex-col items-center gap-4">
                      <Button variant="course" className="w-full" size="lg" onClick={() => setRegOpen(true)}>
                        Enroll Now to Get Certificate
                      </Button>
                      <Button
                        variant="outline"
                            size="lg"
                            onClick={() => setShowCertificate(!showCertificate)}
                          >
                            {showCertificate ? "Hide Certificate" : "View Certificate"}
                          </Button>
                          {showCertificate && (
                            <img
                              src={certificate}
                              alt="Certificate"
                              className="w-full max-w-md rounded-lg shadow-md mt-4"
                            />
                          )}
                        </div>
                    
                  )}
                </Card>
                
              </TabsContent>

              <TabsContent value="topics" className="mt-8">
                <Card>
                  <CardHeader>
                    <CardTitle>Weekly Topics</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {isRegistered ? (
                      <>
                        <div className="grid gap-3">
                          {course.weeklyTopics.map((topic, index) => (
                            <div key={index} className="flex items-center space-x-3 p-3 border rounded-lg">
                              <span className="text-sm font-medium text-primary">Week {index + 1}</span>
                              <span>{topic}</span>
                            </div>
                          ))}
                        </div>
                        <div className="mt-6 text-muted-foreground">
                          <p>
                            The course is structured to build your skills week by week, with hands-on assignments and interactive sessions for each topic. By joining, you'll unlock detailed resources, live Q&A, and project-based learning for every module.
                          </p>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="grid gap-3">
                          {course.weeklyTopics.slice(0, 6).map((topic, index) => (
                            <div key={index} className="flex items-center space-x-3 p-3 border rounded-lg">
                              <span className="text-sm font-medium text-primary">Week {index + 1}</span>
                              <span>{topic}</span>
                            </div>
                          ))}
                        </div>
                        <div className="text-center mt-4">
                          <p className="text-lg text-muted-foreground mb-6">
                            Register to unlock all weekly topics and access the full course content!
                          </p>
                          <Button variant="course" size="lg" onClick={() => setRegDialogOpen(true)}>
                            Sign Up to View All Topics
                          </Button>
                        </div>
                      </>
                    )}
                  </CardContent>
                  {!isRegistered && <RegistrationDialog open={regDialogOpen} setOpen={setRegDialogOpen} />}
                  {isRegistered && (
                    <>
                      <Button variant="course" className="mt-6 w-full" size="lg" onClick={() => setRegOpen(true)}>
                        Join This Course
                      </Button>
                      <Contactus open={regOpen} setOpen={setRegOpen} />
                    </>
                  )}
                </Card>
              </TabsContent>

              <TabsContent value="quizzes" className="mt-8">
                <Card>
                  <CardHeader>
                    <CardTitle>Practice Quizzes</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {!showQuizUI ? (
                      <div className="grid gap-4">
                        {filteredQuizzes.length > 0 ? (
                          filteredQuizzes.map((quiz) => (
                            <div
                              key={quiz.id}
                              className={`p-4 border rounded-lg ${quiz.locked ? 'opacity-50' : 'hover:border-primary cursor-pointer'}`}
                              onClick={() => handleQuizClick(quiz.id, quiz.locked || false)}
                            >
                              <div className="flex items-center justify-between">
                                <span className="font-medium">{quiz.title}</span>
                                {quiz.locked ? (
                                  <Badge variant="secondary">Locked</Badge>
                                ) : (
                                  <Badge variant="outline">Available</Badge>
                                )}
                              </div>
                            </div>
                          ))
                        ) : (
                          <div className="text-center text-muted-foreground">
                            No quizzes available for this course.
                          </div>
                        )}
                        {showRegisterPrompt && (
                          <div className="flex flex-col items-center mt-6">
                            <p className="mb-3 text-muted-foreground">Please enroll to unlock more quizzes.</p>
                            <Button variant="course" size="lg" onClick={() => setRegDialogOpen(true)}>
                              Enroll for More Quizzes
                            </Button>
                          </div>
                        )}
                      </div>
                    ) : (
                      quizQuestions.length ? (
                        quizCompleted ? (
                          <div className="text-center mt-8">
    <h3 className="text-2xl font-bold mb-4">Quiz Completed!</h3>
    <p className="text-lg mb-2">Your Score: <span className="font-semibold">{score} / {quizQuestions.length}</span></p>
    {getCupInfo(score) && (
      <div className="flex flex-col items-center mt-4">
        <FaTrophy size={64} color={getCupInfo(score)!.color} />
        <span className="mt-2 text-lg font-semibold" style={{ color: getCupInfo(score)!.color}}>{getCupInfo(score)!.label}</span>
      </div>
    )}
    {!getCupInfo(score) && (
      <span className="text-muted-foreground">Keep practicing to earn a cup!</span>
    )}
    <div className="flex justify-center mt-6">
      <Button variant="ghost" onClick={() => {
        setShowQuizUI(false);
        setQuizCompleted(false);
        setScore(0);
        setAnswers([]);
        setCurrentQuestionIndex(0);
      }}>Back to Quizzes</Button>
    </div>
  </div>
                        ) : (
                          <div className="max-w-xl mx-auto">
                            <h4 className="font-semibold mb-4">{currentQuizTitle}</h4>
                            <div className="mb-6">
                              <h5 className="font-semibold mb-2">Question {currentQuestionIndex + 1}: {quizQuestions[currentQuestionIndex].question_text}</h5>
                              <div className="grid gap-2">
                                {["a", "b", "c", "d"].map((opt) => (
                                  <Button
                                    key={opt}
                                    variant={answers.find((ans) => ans.question_id === quizQuestions[currentQuestionIndex].id)?.selected_option === opt ? "course" : "outline"}
                                    className="w-full text-left"
                                    onClick={() => handleQuizOptionSelect(quizQuestions[currentQuestionIndex].id, opt)}
                                  >
                                    <span className="font-bold mr-2">{opt.toUpperCase()}.</span>
                                    {quizQuestions[currentQuestionIndex][`option_${opt}`]}
                                  </Button>
                                ))}
                              </div>
                            </div>
                            <div className="flex justify-between mt-6">
                              <Button
                                variant="outline"
                                onClick={handlePrevQuestion}
                                disabled={currentQuestionIndex === 0}
                              >
                                Previous
                              </Button>
                              {currentQuestionIndex < quizQuestions.length - 1 ? (
                                <Button
                                  variant="course"
                                  onClick={handleNextQuestion}
                                >
                                  Next
                                </Button>
                              ) : (
                                <Button
                                  variant="course"
                                  onClick={handleQuizSubmit}
                                  disabled={answers.length !== quizQuestions.length}
                                >
                                  Submit Quiz
                                </Button>
                              )}
                            </div>
                            <div className="flex justify-center mt-4">
                              <Button variant="ghost" onClick={() => {
                                setShowQuizUI(false);
                                setAnswers([]);
                                setCurrentQuestionIndex(0);
                              }}>Back to Quizzes</Button>
                            </div>
                          </div>
                        )
                      ) : (
                        <div className="text-center text-muted-foreground">No questions found for this quiz.</div>
                      )
                    )}
                    {!isRegistered && <RegistrationDialog open={regDialogOpen} setOpen={setRegDialogOpen} />}
                  </CardContent>
                </Card>
              </TabsContent>

             <TabsContent value="quiz-results" className="mt-8">
                <Card>
                  <CardHeader>
                    <CardTitle>Quiz Results</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {isRegistered ? (
                      quizResults.length > 0 ? (
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead>ID</TableHead>
                              <TableHead>Title</TableHead>
                              <TableHead>Score</TableHead>
                              <TableHead>Total Questions</TableHead>
                              <TableHead>Time Taken (s)</TableHead>
                              <TableHead>Submitted At</TableHead>
                              <TableHead>Badge</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {quizResults.map((result) => {
                              const badgeInfo = getBadgeInfo(result.badge);
                              return (
                                <TableRow key={result.id}>
                                  <TableCell>{result.id}</TableCell>
                                  <TableCell>{result.title}</TableCell>
                                  <TableCell>{result.score}</TableCell>
                                  <TableCell>{result.total_questions}</TableCell>
                                  <TableCell>{result.time_taken}</TableCell>
                                  <TableCell>{new Date(result.submitted_at).toLocaleString()}</TableCell>
                                  <TableCell>
                                    {badgeInfo ? (
                                      <div className="flex items-center space-x-2">
                                        <FaTrophy size={20} color={badgeInfo.color} />
                                        <span style={{ color: badgeInfo.color }}>{badgeInfo.label}</span>
                                      </div>
                                    ) : (
                                      <span className="text-muted-foreground">No Badge</span>
                                    )}
                                  </TableCell>
                                </TableRow>
                              );
                            })}
                          </TableBody>
                        </Table>
                      ) : (
                        <div className="text-center text-muted-foreground">No quiz results found.</div>
                      )
                    ) : (
                      <div className="text-center">
                        <p className="text-lg text-muted-foreground mb-6">
                          Register to view your quiz results!
                        </p>
                        <Button variant="course" size="lg" onClick={() => setRegDialogOpen(true)}>
                          Sign Up to View Results
                        </Button>
                      </div>
                    )}
                  </CardContent>
                  {!isRegistered && <RegistrationDialog open={regDialogOpen} setOpen={setRegDialogOpen} />}
                </Card>
              </TabsContent>

              <TabsContent value="online-compiler" className="mt-8">
                <Card>
                  <CardHeader>
                    <CardTitle>Online Compiler</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                      <div className="lg:col-span-1">
                        <h3 className="text-lg font-semibold mb-2">Coding Questions</h3>
                        <Card className="p-4">
                          <h4 className="font-medium text-primary mb-4">Question Number 1: {codingQuestions[0].title}</h4>
                          <div className="space-y-4">
                            <Card className="p-3">
                              <h5 className="text-sm font-semibold text-primary">Question</h5>
                              <p className="text-sm text-muted-foreground">{codingQuestions[0].question}</p>
                            </Card>
                            <Card className="p-3">
                              <h5 className="text-sm font-semibold text-primary">Scenario</h5>
                              <p className="text-sm text-muted-foreground">{codingQuestions[0].scenario}</p>
                            </Card>
                            <Card className="p-3">
                              <h5 className="text-sm font-semibold text-primary">Expected Output</h5>
                              <p className="text-sm text-muted-foreground whitespace-pre-line">{codingQuestions[0].expectedOutput}</p>
                            </Card>
                          </div>
                        </Card>
                      </div>
                      <div className="lg:col-span-3">
                        <h3 className="text-lg font-semibold mb-2">Code Editor</h3>
                        <div className="flex items-center space-x-4 mb-4">
                          <Select value={selectedLanguage} onValueChange={setSelectedLanguage}>
                            <SelectTrigger className="w-[180px]">
                              <SelectValue placeholder="Select Language" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="javascript">JavaScript</SelectItem>
                              <SelectItem value="python">Python</SelectItem>
                              <SelectItem value="java">Java</SelectItem>
                              <SelectItem value="c">C</SelectItem>
                              <SelectItem value="cpp">C++</SelectItem>
                            </SelectContent>
                          </Select>
                          <Button variant="course" onClick={handleRunCode}>Run Code</Button>
                          <Button variant="outline" onClick={handleClearCode}>Clear</Button>
                        </div>
                        <div className="code-editor-container" style={{ width: "980px", height: "500px" }}>
                          <AceEditor
                            mode="javascript"
                            theme="monokai"
                            value={code}
                            onChange={(newCode) => setCode(newCode)}
                            name="code-editor"
                            editorProps={{ $blockScrolling: true }}
                            setOptions={{
                              enableBasicAutocompletion: true,
                              enableLiveAutocompletion: true,
                              enableSnippets: true,
                              showLineNumbers: true,
                              tabSize: 2,
                              fontSize: 14,
                              showPrintMargin: false
                            }}
                            style={{ width: "980px", height: "500px", borderRadius: "0.5rem" }}
                            className="border rounded-lg mb-4"
                          />
                        </div>
                        <h3 className="text-lg font-semibold mb-2">Output</h3>
                        <Card className="w-full min-h-[143px] p-4 bg-muted">
                          {error ? (
                            <pre className="text-red-600 whitespace-pre-wrap">{error}</pre>
                          ) : (
                            <pre className="text-foreground whitespace-pre-wrap">{output || 'Run the code to see output'}</pre>
                          )}
                        </Card>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="attendance" className="mt-8">
                {isRegistered ? (
                  <Attendance />
                ) : (
                  <div className="text-center py-12">
                    <p className="text-lg text-muted-foreground mb-6">You are not registered yet. Register now to access attendance tracking!</p>
                    <Button variant="course" size="lg" onClick={() => setRegDialogOpen(true)}>
                      Register Now
                    </Button>
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </div>
        </section>

        <section className="py-16 bg-muted">
          <div className="container mx-auto px-4">
            <Card>
              <CardContent className="p-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
                  <div className="text-center lg:text-left">
                    <img
                      src={instructorPortrait || "https://via.placeholder.com/128?text=Instructor"}
                      alt={course.instructor}
                      className="w-32 h-32 rounded-full mx-auto lg:mx-0 mb-4 object-cover"
                    />
                  </div>
                  <div className="lg:col-span-2">
                    <h3 className="text-2xl font-bold mb-2">Meet Your Instructor</h3>
                    <h4 className="text-xl text-primary mb-4">{course.instructor}</h4>
                    <p className="text-muted-foreground mb-4">
                      {id === "Cloud + DevOps Program" ? (
                        <>
                          With over 15.5 years of experience in the IT industry, Malleshwar brings a deep and practical understanding of DevOps practices, cloud engineering, and cross-platform infrastructure management. His expertise spans the full DevOps lifecycle — from CI/CD automation and container orchestration to monitoring, IaC, and cloud-native deployment.
                        </>
                      ) : id === "web-development" ? (
                        <>
                          With 7.5 years of professional experience, S. Vamsi has worked across startups and enterprises, crafting user-centric interfaces and developing responsive, modern web applications. He brings a dual mastery in UI/UX design and frontend development, enabling learners to understand both form and function in digital product design.
                        </>
                      ) : (
                        <>Instructor details not available for this course.</>
                      )}
                    </p>
                    <div className="flex flex-wrap space-x-4 text-sm">
                      {id === "Cloud + DevOps Program" ? (
                        <>
                          <span>🎓 DevOps & Multi-Cloud Expert</span>
                          <span>💼 Ex-BFSI, SaaS, EdTech</span>
                          <span>⭐ 15.5+ Years Experience</span>
                          <span>☁️ 7+ Years with AWS</span>
                          <span>🌐 8.5 Years in Multi-Cloud (AWS, Azure, GCP)</span>
                        </>
                      ) : id === "web-development" ? (
                        <>
                          <span>🎓 UI/UX Design & Frontend Development</span>
                          <span>💼 Ex-EdTech, SaaS, E-commerce</span>
                          <span>⭐ 7.5 Years Experience</span>
                          <span>🖌️ Figma, Adobe XD, Illustrator</span>
                          <span>💻 HTML, CSS, JavaScript, React</span>
                        </>
                      ) : (
                        <span>⭐ Details not available</span>
                      )}
                    </div>
                    <p className="text-muted-foreground italic mt-4">
                      {id === "Cloud + DevOps Program"
                        ? `"My goal is to not just teach DevOps tools, but to help you think like a cloud engineer." – Malleshwar`
                        : id === "web-development"
                          ? `"Design is not just how it looks — it's how it works, flows, and converts." – S. Vamsi`
                          : "No quote available."}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Upcoming Batches</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  title: "Weekday Batch",
                  desc: "Mon-Fri, 7PM-9PM",
                  start: "Starts: Jan 15, 2024"
                },
                {
                  title: "Weekend Batch",
                  desc: "Sat-Sun, 10AM-2PM",
                  start: "Starts: Jan 20, 2024"
                },
                {
                  title: "Intensive Batch",
                  desc: "Mon-Fri, 9AM-5PM",
                  start: "Starts: Feb 1, 2024"
                }
              ].map((batch, idx) => (
                <Card className="text-center p-6" key={batch.title}>
                  <CardContent>
                    <h3 className="text-lg font-semibold mb-2">{batch.title}</h3>
                    <p className="text-muted-foreground mb-4">{batch.desc}</p>
                    <p className="font-semibold text-primary mb-4">{batch.start}</p>
                    <Button
                      variant="course"
                      className="w-full"
                      onClick={() => setRegOpen(true)}
                    >
                      Enroll Now
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
            <Contactus open={regOpen} setOpen={setRegOpen} />
          </div>
        </section>
      </main>

      <RegistrationDialog open={regDialogOpen} setOpen={setRegDialogOpen} />
      <Footer />
    </div>
  );
};

export default CourseDetail;