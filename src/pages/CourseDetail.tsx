import React, { useEffect, useState, useRef } from "react";
import { VITE_API_URL } from "@/services/api/api";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
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
import { ChevronLeft, ChevronRight } from "lucide-react";
import { submitQuiz ,getquizes} from "@/services/apiservices";
import certificate from "@/assets/certificate.jpg";
import { getUserRoleFromToken } from "@/lib/jwtUtils";
import NotFound from "./NotFound";
import iot from "@/assets/iot.png";
import embeddedlinux from "@/assets/embeddedlinux.png";
import embeddedsystems from "@/assets/embeddedsystems.png";
import printing from "@/assets/3dprinting.png";
import building from "@/assets/buildinginformationmodeling.png"
import Construction from "@/assets/constructionplanning.png";
import industrial from "@/assets/industrialautomation.png";
import evtechnology from "@/assets/evtechnology.png";
import productdesign from "@/assets/productdesign.png";
import solar from "@/assets/solarsystemdesign.png";
import structural from "@/assets/structuraldesign.png";
import power from "@/assets/powersystemsimulation.png";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
/* ================= GUEST QUIZ API METHODS ================= */

const GUEST_BASE_URL = `${VITE_API_URL}/guest`;

const getGuestQuizzes = async (token: string) => {
  const res = await fetch(`${GUEST_BASE_URL}/quizzes`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) throw new Error("Failed to fetch guest quizzes");
  return res.json();
};

const getGuestQuizById = async (quizId: number, token: string) => {
  const res = await fetch(`${GUEST_BASE_URL}/quiz/${quizId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) throw new Error("Failed to fetch quiz questions");
  return res.json();
};

const submitGuestQuiz = async (payload: any, token: string) => {
  const res = await fetch(`${GUEST_BASE_URL}/submit`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!res.ok) throw new Error("Failed to submit quiz");
  return res.json();
};
const getFullAttendance = async (token: string) => {
  try {
    const response = await axios.get(
      `${GUEST_BASE_URL}/attendance/my-attendance`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching full attendance:", error);
    throw error;
  }
};
/* ================= ATTENDANCE API METHODS ================= */
// GET today's attendance
const getTodayAttendance = async (token: string) => {
  try {
    const response = await axios.get(`${GUEST_BASE_URL}/attendance/today`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching today's attendance:", error);
    throw error;
  }
};
// POST check-in
const checkIn = async (token: string) => {
  try {
    const response = await axios.post(`${GUEST_BASE_URL}/attendance/check-in`, {}, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error checking in:", error);
    throw error;
  }
};
// PUT check-out
const checkOut = async (token: string) => {
  try {
    const response = await axios.put(`${GUEST_BASE_URL}/attendance/check-out`, {}, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error checking out:", error);
    throw error;
  }
};
const courseData = {
  // Numeric ID mappings for my-courses navigation
  "1": {
    title: "UI/UX Design",
    image: webDevCourse,
    description: "Designed to build industry-ready professionals skilled in both design principles and front-end development.",
    duration: "12 weeks",
    level: "Beginner",
    instructor: "S. Vamsi",
    weeklyTopics: ["Figma", "Canva", "Design systems & UI kits", "HTML5", "CSS3", "Bootstrap", "JavaScript (ES6+)", "React", "Final Project"],
    projects: ["Wireframe", "UI Mockup", "Personal Portfolio Website", "Todo Application with React", "E-commerce"],
    learningOutcomes: [
      "Figma – Create wireframes, prototypes, and high-fidelity designs",
      "Canva – Design visual assets, icons, and simple UI mockups",
      "Design systems, UI kits, and reusable components",
      "HTML5 – Structure clean, semantic web pages",
      "CSS3 – Design beautiful, responsive layouts",
      "Bootstrap – Use pre-built components for mobile-first UI",
      "JavaScript (ES6+) – Add interactivity with modern JS",
      "React – Build interactive UIs with components and hooks"
    ],
    projectDetails: [
      { content: "A personal portfolio website showcasing skills and projects.", technologies: ["React", "Tailwind CSS", "Node.js"], description: "Portfolio website" },
      { content: "A todo application with state management.", technologies: ["React", "Redux", "Express.js"], description: "Todo application" },
      { content: "E-commerce backend API with authentication.", technologies: ["Node.js", "MongoDB", "Express.js"], description: "E-commerce API" },
      { content: "Social media app with real-time features.", technologies: ["React", "Firebase", "Node.js"], description: "Social media app" }
    ]
  },
  "2": {
    title: "ReactJS",
    image: react,
    description: "Master the art of building interactive UIs, managing dynamic data flows, and deploying cross-platform apps using ReactJS.",
    duration: "16 weeks",
    level: "Intermediate",
    instructor: "Dr. Michael Chen",
    weeklyTopics: ["JSX", "Components", "Hooks", "State Management", "React Native"],
    projects: ["UI code using JSX", "Local state with useState", "Modern web and mobile app development", "External APIs"],
    learningOutcomes: [
      "Writing clean UI code using JSX",
      "Building reusable functional components",
      "Managing component lifecycle and side effects",
      "Routing with React Router",
      "Fetching data with APIs and handling async operations",
      "Using core components like View, Text, ScrollView",
      "Deploying apps to Android and iOS simulators",
      "Optimizing performance and using native modules"
    ],
    projectDetails: [
      { content: "Data visualization dashboard.", technologies: ["Python", "Dash", "Pandas"], description: "Interactive dashboard" },
      { content: "Predictive model for sales forecasting.", technologies: ["Python", "Scikit-learn", "Pandas"], description: "Sales prediction model" },
      { content: "Customer segmentation analysis.", technologies: ["Python", "Scikit-learn", "Matplotlib"], description: "Customer segmentation" },
      { content: "Neural network classifier.", technologies: ["Python", "TensorFlow", "Keras"], description: "Neural network" }
    ]
  },
  "3": {
    title: "Python Developer",
    image: python,
    description: "From writing clean Python scripts to creating full-fledged backend systems, you'll master backend logic and API integration.",
    duration: "8 weeks",
    level: "Beginner",
    instructor: "Emma Rodriguez",
    weeklyTopics: ["Python Basics", "Loops, Functions, and OOPs", "Exception handling", "MySQL", "API Integration", "FastAPI", "Async I/O"],
    projects: ["Calculator", "Web Scraper", "Weather App", "URL Shortener"],
    learningOutcomes: [
      "Build foundation in syntax, data types, control flow, OOPs",
      "Design, query, and manage relational databases",
      "Understand REST principles and API design",
      "Building fast APIs using Pydantic and async programming",
      "JSON data formats and Swagger documentation",
      "Handle concurrent tasks with async programming"
    ],
    projectDetails: [
      { content: "SEO audit report.", technologies: ["SEMrush", "Google Analytics"], description: "SEO report" },
      { content: "Social media campaign.", technologies: ["Hootsuite", "Canva", "Instagram"], description: "Social media campaign" },
      { content: "Email marketing funnel.", technologies: ["Mailchimp", "Google Analytics"], description: "Email funnel" },
      { content: "Google Ads campaign.", technologies: ["Google Ads", "Google Analytics"], description: "PPC campaign" }
    ]
  },
  // Original string key mappings
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
  },
  "Additive Manufacturing & 3D Printing": {
 
  title: "Additive Manufacturing & 3D Printing",
 
  image: printing,
 
  description: "Designed to train students in modern 3D printing, design workflows, and prototyping skills used in today’s manufacturing industry.",
 
  duration: "4 weeks",
 
  level: "Beginner to Intermediate",
 
  instructor: "L kishore",
 
  weeklyTopics: [
 
    " Product Design & CAD Modeling",
 
    "GD&T and Material Selection",
 
    "Additive Manufacturing Processes (FDM, SLA, SLS)",
 
    "Slicing, 3D Printing & Final Prototype",
 
   
 
   
 
  ],
 
  projects: [
 
    "3D CAD Model Design using SolidWorks or Creo",
 
    "Functional Prototype Creation using FDM Printing",
 
    "Material Testing with Plastics, Alloys, and Composites",
 
    "Miniature Mechanical Part Design & Print",
 
    "STL File Preparation and Slicing Optimization",
 
    "End-to-End Product Design and 3D Printing Project"
 
  ],
 
  learningOutcomes: [
 
    "Complete workflow of product design to 3D printing",
 
    "Hands-on experience with SolidWorks/Creo for CAD modeling",
 
    "Understanding GD&T and its role in manufacturing",
 
    "Material selection for functional prototyping (plastics, alloys, composites)",
 
    "Fundamentals of additive manufacturing processes (FDM, SLA, SLS)",
    "Converting designs into STL format and mastering slicing techniques"
 
  ],
 
  projectDetails: [
 
    {
 
      content: "Design a 3D printable phone stand using parametric modeling, ensuring strength and stability while minimizing material usage.",
 
      technologies: ["Fusion 360", "Cura", "PLA/ABS"],
 
      description: "A parametric, fully 3D-printable desktop accessory."
 
    },
 
    {
 
      content: "Create a functional mechanical gear system demonstrating motion transfer using AM principles.",
 
      technologies: ["SolidWorks", "FDM Printer"],
 
      description: "A working prototype showing rotational mechanics."
 
    },
 
    {
 
      content: "Design and fabricate a small architectural model for real estate or visualization purposes.",
 
      technologies: ["SLA Printing", "Resin Materials"],
 
      description: "A detailed 3D printed miniature structure."
 
    },
 
    {
 
      content: "Develop a lightweight drone frame optimized for additive manufacturing and strength.",
 
      technologies: ["Fusion 360", "Topology Optimization Tools"],
 
      description: "A lightweight structural component for drone prototyping."
 
    }
 
  ]
 
} ,
"EV Technology & Powertrain Systems": {
  title: "EV Technology & Powertrain Systems",
  image: evtechnology,
  description: "Designed to train students in modern electric vehicle architecture, powertrain components, and simulation workflows used in today’s EV industry.",
  duration: "4 weeks",
  level: "Intermediate",
  instructor: "L Kishore",
  weeklyTopics: [
    "EV Architecture & Vehicle Layout",
    " Motor Technologies: BLDC & PMSM",
    " Battery Basics & Powertrain Integration",
    "MATLAB Modeling & Final Project",
   
  ],
  projects: [
    "EV Architecture Mapping & Component Layout",
    "Motor Performance Study (BLDC vs PMSM)",
    "Battery Pack Modeling & Thermal Case Analysis",
    "Powertrain Integration Mini-Project (Motor + Battery + Transmission)",
    "MATLAB Simulation for EV Subsystem (Drive Cycle, SOC, Power Flow)",
    "EV Safety & Standards Compliance Case Study",
    "Final Project: Simulated EV Subsystem + Technical Report",
 
  ],
  learningOutcomes: [
    "Complete foundation of EV architecture and key subsystems",
    "Understanding of BLDC & PMSM motors (concept level + application)",
    "Battery basics, BMS role, and thermal issue handling",
    "Powertrain integration: linking motor, battery, and transmission",
    "Hands-on MATLAB EV modeling (torque, power, SOC, acceleration)",
    "Overview of EV safety, standards, and system-level best practices"
  ],
  projectDetails: [
    {
      content: "Create a simulated lithium-ion battery pack and analyze charging cycles, thermal behavior, and BMS functions.",
      technologies: ["MATLAB/Simulink", "LTspice"],
      description: "A realistic simulation of EV battery behavior."
    },
    {
      content: "Design a BLDC motor controller prototype with PWM-based speed control logic.",
      technologies: ["Arduino", "MOSFET Drivers"],
      description: "A functional low-voltage motor controller."
    },
    {
      content: "Develop a full EV powertrain architecture including battery, inverter, motor, and drivetrain flow.",
      technologies: ["Simulink", "EV Powertrain Models"],
      description: "A high-level system architecture for electric vehicles."
    },
    {
      content: "Simulate the regenerative braking process to optimize energy recovery.",
      technologies: ["Simulink", "CAN Data Models"],
      description: "Energy optimization during braking cycles."
    }
  ]
} ,
"Product Design & Prototyping": {
  title: "Product Design & Prototyping",
  image: productdesign,
  description: "Designed to build professionals skilled in product design, EV simulation, and core manufacturing workflows.",
  duration: "4 weeks",
  level: "Beginner to Intermediate",
  instructor: "L.KISHORE",
  weeklyTopics: [
    "Product Design & 3D Printing Basics",
    "Functional Testing & Design Validation",
    " EV Powertrain Simulation",
    "Manufacturing Optimization & Final Deliverables",
   
  ],
  projects: [
    "Product Design to 3D Print",
    "Functional Prototype Testing",
    "EV Powertrain Simulation",
    "Manufacturing Workflow Optimization",
    "Final CAD, Demo & Report Creation"
  ],
  learningOutcomes: [
    "End-to-end product design, 3D printing, and functional testing",
    "Basics of EV powertrain modeling and simulation",
    "Understanding motor–battery interactions and drive-cycle behavior",
    "Fundamentals of manufacturing workflow analysis and optimization",
    "Preparing professional engineering deliverables: CAD, prototype demo, reports, and presentations"
  ],
  projectDetails: [
    {
      content: "Create a user-centric consumer product using design thinking, identifying pain points and improving user experience.",
      technologies: ["Figma", "Fusion 360"],
      description: "A practical ergonomic product tailored to user needs."
    },
    {
      content: "Design a wearable concept with comfort, usability, and manufacturability considerations.",
      technologies: ["SolidWorks", "TPU Materials"],
      description: "A flexible, ergonomic wearable prototype."
    },
    {
      content: "Develop a durable enclosure for an electronic gadget, focusing on heat vents, mounting, and assembly.",
      technologies: ["ABS/PLA", "FDM Printing"],
      description: "A strong and functional electronic casing."
    },
    {
      content: "Build a complete mechanical assembly model demonstrating joints and part interactions.",
      technologies: ["SolidWorks Assembly", "3D Printing"],
      description: "A real prototype demonstrating mechanical motion."
    }
  ]
},
"Building Information Modeling (BIM)": {
  title: "Building Information Modeling (BIM)",
  image: building,
  description: "Created to develop job-ready talent in BIM design, Revit architecture, structural modeling, and project documentation.",
 
  duration: "4 weeks",
  level: "Beginner to Advanced",
  instructor: "L.KISHORE",
  weeklyTopics: [
    " BIM Basics & Revit Introduction",
    "Architectural Modeling",
    " Structural Modeling & LOD Progression",
    " 2D to 3D Conversion & Quantity Take-off",
   
  ],
  projects: [
    "2D Plan to 3D BIM Conversion",
    "Revit Architecture Modeling",
    "Structural Elements Modeling",
    "LOD 100–300 Model Development",
    "Basic Quantity Take-off (BOQ) Creation"
  ],
  learningOutcomes: [
    "Core BIM concepts and Revit fundamentals",
    "Creating architectural and structural 3D models",
    "Converting 2D drawings into detailed BIM models",
    "Developing LOD 100–300 building elements",
    "Performing basic quantity take-off and BOQ extraction"
  ],
  projectDetails: [
    {
      content: "Build a complete BIM model for a residential structure, covering architectural, structural, and basic MEP layouts.",
      technologies: ["Revit", "AutoCAD"],
      description: "A fully modeled residential building showing accurate layouts and components."
    },
    {
      content: "Coordinate structural, mechanical, electrical, and plumbing systems to identify overlaps and resolve conflicts.",
      technologies: ["Revit MEP", "Navisworks"],
      description: "A coordinated BIM model with resolved clashes and optimized design layout."
    },
    {
      content: "Run clash detection workflows and generate detailed coordination reports.",
      technologies: ["Navisworks Manage", "BIM 360"],
      description: "A clash-free model with documented issue tracking."
    },
    {
      content: "Simulate construction phases and generate 4D timelines aligned with project schedules.",
      technologies: ["Navisworks Timeliner", "MS Project"],
      description: "A visual simulation of construction sequencing using BIM data."
    },
    {
      content: "Extract accurate quantities and create cost-estimation sheets using model-based data.",
      technologies: ["Revit Schedules", "Excel"],
      description: "A detailed cost estimation report generated directly from BIM models."
    }
  ]
},
"ETABS & STAAD for Structural Design": {
  title: "ETABS & STAAD for Structural Design",
  image: structural,
  description: "Designed to train students in structural analysis, ETABS/STAAD modeling, and core building design fundamentals.",
  duration: "4 weeks",
  level: "Beginner to Advanced",
  instructor: "L.KISHORE",
  weeklyTopics: [
    " Structural Load Basics",
    "ETABS Modeling & Analysis",
    " Design of Beams, Columns & Slabs",
    "STAAD Modeling & Final Report",
   
  ],
  projects: [
    "Load calculation and structural layout planning",
    "ETABS modeling for a small building",
    "Beam, column, and slab design analysis",
    "STAAD modeling for steel or concrete frames",
    "Final structural model with design report"
  ],
  learningOutcomes: [
    "Basics of structural loads and behaviour",
    "ETABS modeling and building analysis",
    "STAAD modeling for steel and concrete frames",
    "Design of beams, columns, and slabs",
    "Preparing a structural design report with calculations"
 
  ],
  projectDetails: [
    {
      content: "Model and analyze a complete residential building, defining loads, geometry, and structural components.",
      technologies: ["ETABS", "IS Codes"],
      description: "A detailed G+5 residential building model with analysis and design reports."
    },
    {
      content: "Design a steel industrial shed including trusses, rafters, purlins, and connections.",
      technologies: ["STAAD Pro", "Steel Design Codes"],
      description: "A fully optimized steel shed model with connection detailing."
    },
    {
      content: "Perform seismic analysis using response spectrum and time-history methods.",
      technologies: ["ETABS", "STAAD Pro"],
      description: "A seismic-resistant building model designed to handle lateral loads effectively."
    },
    {
      content: "Design reinforced concrete frames, slabs, and shear walls with full reinforcement detailing.",
      technologies: ["ETABS Concrete Design", "AutoCAD"],
      description: "A concrete structural system designed with full reinforcement drawings."
    },
    {
      content: "Design isolated, combined, and raft foundations based on soil bearing and structural loads.",
      technologies: ["STAAD Foundation", "Excel"],
      description: "A practical foundation design package for real-world structural applications."
    }
  ]
} ,
"Construction Planning & Primavera": {
  title: "Construction Planning & Primavera",
  image: Construction,
  description: "Learn core project scheduling skills using WBS, Primavera, critical path analysis, and resource planning for real construction projects.",
  duration: "4 weeks",
  level: "Beginner to Intermediate",
  instructor: "L.KISHORE",
  weeklyTopics: [
    "WBS & Project Breakdown",
    "Primavera Basics",
    "Critical Path & Resource Allocation",
    "Time–Cost Planning & Final Schedule",
   
  ],
  projects: [
    "WBS creation for a building project",
    "Primavera activity sequencing",
    "Critical path identification",
    "Resource and cost allocation",
    "Final project schedule linked to BIM model (concept)"
  ],
  learningOutcomes: [
    "Creating WBS for construction projects",
    "Primavera basics for scheduling",
    "Activity sequencing & critical path analysis",
    "Allocating resources, time, and cost",
    "Developing a complete project schedule"
  ],
  projectDetails: [
    {
      content: "Build a full construction project schedule including WBS, activities, dependencies, and milestones.",
      technologies: ["Primavera P6"],
      description: "A complete project plan demonstrating real-world construction workflows."
    },
    {
      content: "Develop an activity network with logical relationships and perform timeline optimization.",
      technologies: ["Primavera P6", "CPM Tools"],
      description: "A well-structured activity sequence showing accurate project flow."
    },
    {
      content: "Create a cost- and resource-loaded schedule including manpower, equipment, and materials.",
      technologies: ["Primavera P6", "Excel"],
      description: "A detailed, resource-optimized schedule ready for execution."
    },
    {
      content: "Analyze project delays, identify impacts on the critical path, and prepare mitigation strategies.",
      technologies: ["Primavera P6", "Delay Analysis Tools"],
      description: "A practical demonstration of schedule risk and impact assessment."
    },
    {
      content: "Monitor project progress and prepare performance dashboards using EVM metrics.",
      technologies: ["Primavera P6", "Excel"],
      description: "A real-time progress monitoring report with earned value analytics."
    }
  ]
} ,
"Solar PV System Design": {
  title: "Solar PV System Design",
  image:solar,
  description: "Gain foundational skills in power systems and solar PV design through load assessment, plant sizing, and basic MATLAB simulation.",
  duration: "4 weeks",
  level: "Beginner to Intermediate",
  instructor: "L.KISHORE",
  weeklyTopics: [
    "Power Systems Basics",
    " Solar PV Components & Working",
    " Load Assessment & Plant Sizing",
    " Layout Planning & MATLAB Basics",
   
  ],
  projects: [
    "Load assessment for a small facility",
    "Solar PV component selection",
    "Plant sizing and layout planning",
    "Basic MATLAB simulation of electrical parameters",
    "Final solar plant design calculation sheet"
  ],
  learningOutcomes: [
    "Basics of power generation and solar PV systems",
    "Assessing electrical load and sizing solar plants",
    "Planning solar layouts and selecting components",
    "Running simple MATLAB simulations for electrical analysis",
    "Creating a complete solar plant design sheet"
  ],
  projectDetails: [
    {
      content: "Design a complete residential PV system based on load demand, panel sizing, and inverter selection.",
      technologies: ["Helioscope", "PV*SOL"],
      description: "A fully sized rooftop residential solar system with accurate power calculations."
    },
    {
      content: "Develop a commercial rooftop PV layout with string configuration and orientation optimization.",
      technologies: ["AutoCAD", "SketchUp"],
      description: "A professional rooftop design with panel placement and shading considerations."
    },
    {
      content: "Perform shadow analysis and simulate system performance under various environmental conditions.",
      technologies: ["Helioscope", "PVsyst"],
      description: "A performance-optimized PV system with detailed generation reports."
    },
    {
      content: "Create a hybrid PV system combining solar panels with battery backup and grid interaction.",
      technologies: ["PVsyst", "Lithium Battery Tools"],
      description: "A reliable hybrid energy solution designed for uninterrupted power supply."
    },
    {
      content: "Prepare technical documentation including system drawings, cable sizing, and bill of quantities.",
      technologies: ["Excel", "AutoCAD Electrical"],
      description: "A complete technical package suitable for real solar installation projects."
    }
  ]
} ,
"PLC & Industrial Automation": {
  title: "PLC & Industrial Automation",
  image: industrial,
  description: "Learn the basics of industrial automation through sensors, PLC programming, motor control, and simple SCADA monitoring workflows.",
  duration: "4 weeks",
  level: "Beginner to Intermediate",
  instructor: "L.KISHORE",
  weeklyTopics: [
    "Sensors, Actuators & PLC Basics",
    " Ladder Logic Development",
    " Motor Control & Automation Sequences",
    " PLC Demo & Final Logic Execution",
   
  ],
  projects: [
    "Sensor and actuator integration",
    "PLC ladder logic creation",
    "Motor control using PLC",
    "Basic automation sequence design",
    "Final PLC logic demo"
  ],
  learningOutcomes: [
    "Working with sensors and actuators",
    "PLC hardware setup and ladder logic",
    "Motor control fundamentals",
    "Designing simple automation sequences",
    "Creating and testing PLC-based logic demos"
  ],
  projectDetails: [
    {
      content: "Program a PLC to control motor operations including start/stop logic, interlocks, and safety conditions.",
      technologies: ["Siemens TIA Portal", "Allen-Bradley RSLogix"],
      description: "A fully functional motor control automation setup."
    },
    {
      content: "Develop an automated conveyor control system using sensors and PLC logic.",
      technologies: ["PLC Ladder Logic", "Proximity Sensors"],
      description: "A conveyor automation model simulating real manufacturing workflows."
    },
    {
      content: "Design an HMI interface and link it with a PLC for real-time tank level monitoring and alarms.",
      technologies: ["WinCC", "FactoryTalk View"],
      description: "A user-friendly HMI panel with live data visualization."
    },
    {
      content: "Build a sensor-based sorting system using PLC logic, actuators, and input modules.",
      technologies: ["Photoelectric Sensors", "PLC I/O Modules"],
      description: "An automated sorting station replicating industrial material handling."
    },
    {
      content: "Create a complete mini automation project combining PLC, HMI, sensors, and safety logic.",
      technologies: ["SCADA", "Industrial PLC"],
      description: "A comprehensive industrial automation solution suitable for real deployment."
    }
  ]
} ,
"Power System Simulation (MATLAB)": {
  title: "Power System Simulation (MATLAB)",
  image: power,
  description: "Learn the basics of power system modeling, fault analysis, and solar-grid simulation using MATLAB/Simulink.",
 
  duration: "4 weeks",
  level: "Intermediate",
  instructor: "L.KISHORE",
  weeklyTopics: [
    " Generator, Load & Fault Modeling",
    "Power Flow & Short-Circuit Basics",
    " Solar-Grid Connection in Simulink",
    " Power Quality & Final Simulation Model",
   
  ],
  projects: [
    "Modeling generators, loads, and faults",
    "Power flow and short-circuit analysis",
    "Solar plant grid connection in Simulink",
    "Power quality evaluation",
    "Final solar–grid simulation model"
  ],
  learningOutcomes: [
    "Modeling of generators, loads, and fault conditions",
    "Performing power flow and short-circuit analysis",
    "Building solar-grid connection models in Simulink",
    "Understanding basic power quality issues",
    "Developing a complete solar–grid simulation model"
  ],
  projectDetails: [
    {
      content: "Model a complete power system with transmission lines, loads, and transformers.",
      technologies: ["MATLAB", "Simulink"],
      description: "A single-line diagram converted into a working simulation model."
    },
    {
      content: "Perform load flow analysis and evaluate voltage drops, line losses, and system efficiency.",
      technologies: ["MATLAB Power System Toolbox"],
      description: "A detailed load flow study showing system health and optimization."
    },
    {
      content: "Simulate symmetrical and unsymmetrical faults and assess relay coordination.",
      technologies: ["Simulink Fault Blocks", "PSCAD Concepts"],
      description: "A complete fault and protection study with current and voltage waveforms."
    },
    {
      content: "Conduct transient stability analysis for generators under sudden disturbances.",
      technologies: ["Simulink", "MATLAB Scripts"],
      description: "A stability study showing rotor angle, speed, and system response."
    },
    {
      content: "Integrate solar/wind energy into a grid model and analyze system performance.",
      technologies: ["Simscape Electrical", "Simulink"],
      description: "A renewable-integrated grid simulation with power flow balancing."
    }
  ]
} ,
"Embedded Systems": {
  title: "Embedded Systems",
  image: embeddedsystems,
  description: "Learn embedded system basics, microcontroller programming, and real-time interfacing through hands-on sensor projects.",
  duration: "4 weeks",
  level: "Beginner to Intermediate",
  instructor: "L.KISHORE",
  weeklyTopics: [
    "Embedded Foundations & C Basics",
    " Microcontroller Architecture & GPIO",
    " Timers, UART, I2C & SPI Interfaces",
    " Real-Time Concepts & Sensor Mini Project",
   
  ],
  projects: [
    "Embedded C programming exercises",
    "Microcontroller GPIO and timer tasks",
    "UART, I2C, and SPI communication demos",
    "Sensor interfacing mini project",
    "Final embedded system prototype"
  ],
  learningOutcomes: [
    "Basics of embedded systems and microcontrollers",
    "Writing C programs for embedded applications",
    "Using GPIO, timers, UART, I2C, and SPI",
    "Real-time system fundamentals",
    "Building and testing a sensor-based embedded project"
  ],
  projectDetails: [
    {
      content: "Program a microcontroller to blink LEDs and control a DC motor with timers and GPIO pins.",
      technologies: ["Arduino", "STM32", "C/C++"],
      description: "A simple embedded system demonstrating digital output control."
    },
    {
      content: "Design a temperature and humidity monitoring system with real-time data display.",
      technologies: ["Arduino", "DHT11/DHT22 Sensor", "LCD Display"],
      description: "A practical sensor-based embedded project with data visualization."
    },
    {
      content: "Build an automated home lighting system controlled via switches and sensors.",
      technologies: ["ESP32", "Relay Modules", "Sensors"],
      description: "A real-world home automation project demonstrating embedded control."
    },
    {
      content: "Develop a small robot that detects obstacles and navigates autonomously.",
      technologies: ["Arduino", "Ultrasonic Sensors", "DC Motors"],
      description: "An embedded robotic project integrating sensors, actuators, and control logic."
    },
    {
      content: "Implement an IoT-enabled smart device that sends sensor data to the cloud and can be controlled remotely.",
      technologies: ["ESP32", "MQTT Protocol", "ThingSpeak/Cloud Platforms"],
      description: "A connected embedded system demonstrating IoT integration."
    }
  ]
} ,
"Internet of Things (IoT)": {
  title: "Internet of Things (IoT)",
  image: iot,
  description: "Learn IoT basics through sensor interfacing, wireless communication, and cloud-based monitoring.",
  duration: "4 weeks",
  level: "Beginner to Intermediate",
  instructor: "L.KISHORE",
  weeklyTopics: [
    "IoT Basics & Sensor Interfacing",
    "Wi-Fi/BLE Connectivity",
    " MQTT & Cloud Dashboard Setup",
    "IoT Security & Final System Build",
   
  ],
  projects: [
    "Sensor interfacing setup",
    "Wi-Fi/BLE communication demo",
    "MQTT-based data transfer",
    "Cloud dashboard with live monitoring",
    "Complete end-to-end IoT system build"
  ],
  learningOutcomes: [
    "Basics of IoT and sensor integration",
    "Wi-Fi/BLE and MQTT communication",
    "Cloud dashboard creation and data logging",
    "Fundamentals of IoT security",
    "Building a complete IoT monitoring system"
  ],
  projectDetails: [
    {
      content: "Design a home automation system that controls lights, fans, and appliances via a mobile app.",
      technologies: ["ESP32", "MQTT", "Blynk App"],
      description: "A practical IoT project demonstrating smart home automation."
    },
    {
      content: "Develop a weather monitoring system to measure temperature, humidity, and pressure and upload data to the cloud.",
      technologies: ["Arduino/ESP8266", "DHT11/DHT22 Sensors", "ThingSpeak"],
      description: "A real-time IoT weather station with cloud data visualization."
    },
    {
      content: "Implement an IoT-based energy monitoring system to track electricity usage and optimize consumption.",
      technologies: ["Raspberry Pi", "Current Sensors", "Node-RED"],
      description: "An IoT energy management project for households or offices."
    },
    {
      content: "Create a wearable health monitoring device that collects heart rate and oxygen levels and sends alerts.",
      technologies: ["Arduino/ESP32", "Pulse Oximeter Sensor", "Cloud Dashboard"],
      description: "A connected health monitoring system for personal health tracking."
    },
    {
      content: "Develop an industrial IoT prototype to monitor machines, track production, and send predictive maintenance alerts.",
      technologies: ["Raspberry Pi", "Industrial Sensors", "IoT Cloud Platforms"],
      description: "A complete IIoT solution demonstrating industrial monitoring and automation."
    }
  ]
} ,
"Embedded Linux": {
  title: "Embedded Linux",
  image: embeddedlinux,
  description: "Learn embedded Linux fundamentals, cross-compiling, and deploying basic applications.",
  duration: "4 weeks",
  level: "Intermediate to Advanced",
  instructor: "L.KISHORE",
  weeklyTopics: [
    " Embedded Linux Basics & Filesystem",
    " Shell Commands & Boot Process",
    "Cross-Compilation & Device Interaction",
    "Application Deployment & Final Demo",
   
  ],
  projects: [
    "Linux command-line practice",
    "Cross-compiled application build",
    "Boot process exploration",
    "Device interaction test (GPIO/serial)",
    "Final embedded Linux app deployment"
  ],
  learningOutcomes: [
    "Core concepts of embedded Linux",
    "Working with the Linux file system and shell",
    "Understanding the boot process",
    "Cross-compiling applications",
    "Interacting with basic hardware devices",
    "Deploying apps on embedded platforms"
  ],
  projectDetails: [
    {
      content: "Set up an embedded Linux board and understand its boot process from bootloader to user-space.",
      technologies: ["Raspberry Pi/BeagleBone", "U-Boot", "Yocto"],
      description: "A practical setup of a Linux-based embedded system from scratch."
    },
    {
      content: "Develop kernel modules and device drivers for sensors or custom hardware interfaces.",
      technologies: ["Linux Kernel Modules", "C Programming"],
      description: "Hands-on experience creating device drivers and integrating them into Linux."
    },
    {
      content: "Interface peripherals using GPIO, SPI, and I2C protocols for real-world hardware control.",
      technologies: ["Raspberry Pi GPIO", "SPI/I2C Libraries"],
      description: "A project connecting external devices to an embedded Linux system."
    },
    {
      content: "Implement real-time task scheduling and manage priority-based processes using PREEMPT_RT patch.",
      technologies: ["Real-Time Linux", "POSIX Threads"],
      description: "A real-time embedded application demonstrating timing-critical functionality."
    },
    {
      content: "Deploy a complete embedded Linux system with integrated applications and peripheral drivers.",
      technologies: ["Yocto", "Buildroot", "Cross-Compilation Tools"],
      description: "A fully functional embedded Linux system ready for deployment."
    }
  ]
}
 
 
};
 const IT_COURSES = [
  "web-development",
  "ReactJS",
  "Python",
  "Java Developer",
  "Node.js Developer",
  "SQL & Database Management",
  "Cloud + DevOps Program",
  "Java fullStack Developer"
];

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
    const navigate = useNavigate();
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
  const [currentQuizId, setCurrentQuizId] = useState<number | null>(null);
  const [answers, setAnswers] = useState<{ question_id: number; selected_option: string }[]>([]);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [score, setScore] = useState(0);
  const [quizStartTime, setQuizStartTime] = useState<number | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [filteredQuizzes, setFilteredQuizzes] = useState<
    { id: number; title: string; completed: boolean; locked?: boolean }[]
  >([]);
  const [userRole, setUserRole] = useState<string>('guest');
  const tabsListRef = useRef<HTMLDivElement>(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);
  const [isCheckedIn, setIsCheckedIn] = useState(false);
  const [checkInTime, setCheckInTime] = useState<Date | null>(null);
  const [totalTime, setTotalTime] = useState<string>('00:00:00');
  const [attendanceRecords, setAttendanceRecords] = useState<Array<{ date: string; checkIn: string; checkOut: string; duration: string }>>([]);

  const course = courseData[id as keyof typeof courseData];

  useEffect(() => {
    const token = localStorage.getItem('access_token');
    setIsRegistered(!!token);
    
    // Check user role
    const role = getUserRoleFromToken();
    setUserRole(role);
    
const fetchQuizzes = async () => {
  try {
    const token = localStorage.getItem("access_token");

    if (!token) {
      console.log("No token found");
      setFilteredQuizzes([]);
      return;
    }

    const res = await fetch(
      `${VITE_API_URL}/guest/quizzes`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (!res.ok) {
      console.log("GET quizzes failed:", res.status);
      throw new Error("Failed");
    }

    const data = await res.json();
    console.log("Guest quizzes:", data);

    const normalize = (value: unknown) =>
      String(value ?? "")
        .toLowerCase()
        .replace(/\s+/g, " ")
        .trim();

    const courseTitle = normalize(course?.title);
    const courseId = normalize(id);

    const filtered = Array.isArray(data)
      ? data.filter((quiz: any) => {
          const quizTitle = normalize(quiz?.title);
          if (!quizTitle) return false;
          if (courseTitle && quizTitle.includes(courseTitle)) return true;
          if (courseId && quizTitle.includes(courseId)) return true;
          return false;
        })
      : [];

    const mapped = filtered.map((quiz: any) => ({
      id: quiz.id,
      title: quiz.title,
      completed: false,
    }));

    setFilteredQuizzes(mapped);

  } catch (err) {
    console.error("Error fetching quizzes:", err);
    setFilteredQuizzes([]);
  }
};

    fetchQuizzes();
    if (token) {
      fetchQuizResults();
      // Fetch attendance data when component mounts
      fetchTodayAttendanceStatus();
      fetchAttendanceRecords();
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

  // Timer effect for tracking total time when checked in
  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isCheckedIn && checkInTime) {
      interval = setInterval(() => {
        const now = new Date();
        const diff = now.getTime() - checkInTime.getTime();
        const hours = Math.floor(diff / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);
        
        setTotalTime(
          `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
        );
      }, 1000);
    }
    
    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [isCheckedIn, checkInTime]);

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

  const handleCheckIn = async () => {
    const token = localStorage.getItem('access_token');
    if (!token) {
      console.error('No token found');
      return;
    }

    try {
      const response = await checkIn(token);
      console.log('Check-in successful:', response);
      
      // Update local state
      const now = new Date();
      setCheckInTime(now);
      setIsCheckedIn(true);
      setTotalTime('00:00:00');
      
      // Refresh attendance records
      fetchAttendanceRecords();
    } catch (error) {
      console.error('Check-in failed:', error);
      // Optionally show error message to user
    }
  };

  const handleCheckOut = async () => {
    const token = localStorage.getItem('access_token');
    if (!token) {
      console.error('No token found');
      return;
    }

    try {
      const response = await checkOut(token);
      console.log('Check-out successful:', response);
      
      // Update local state and create record
      if (checkInTime) {
        const now = new Date();
        const checkOutTime = now.toLocaleTimeString();
        const checkInTimeStr = checkInTime.toLocaleTimeString();
        const date = now.toLocaleDateString();
        
        const newRecord = {
          date,
          checkIn: checkInTimeStr,
          checkOut: checkOutTime,
          duration: totalTime
        };
        
        setAttendanceRecords(prev => [...prev, newRecord]);
        setIsCheckedIn(false);
        setCheckInTime(null);
        setTotalTime('00:00:00');
        
        // Refresh attendance records
        fetchAttendanceRecords();
      }
    } catch (error) {
      console.error('Check-out failed:', error);
      // Optionally show error message to user
    }
  };
const handleDownloadFullAttendance = async () => {
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Token missing. Please login again.");
      return;
    }

    const data = await getFullAttendance(token);

    if (!data || data.length === 0) {
      alert("No attendance data found.");
      return;
    }
const formattedData = data.map((item: any) => {
  const checkIn = item.check_in_time
    ? new Date(item.check_in_time).toLocaleString()
    : "Not Available";

  const checkOut = item.check_out_time
    ? new Date(item.check_out_time).toLocaleString()
    : "Not Checked Out";
const duration =
  item.duration_hours !== null && item.duration_hours !== undefined
    ? (item.duration_hours * 60).toFixed(0) + " minutes"
    : "0 minutes";
  return {
    ID: item.id ?? "",
    "Guest ID": item.guest_id ?? "",
    "Check In Time": checkIn,
    "Check Out Time": checkOut,
    "Duration (Hours)": duration,
  };
});

    const worksheet = XLSX.utils.json_to_sheet(formattedData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Full Attendance");

    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });

    const blob = new Blob([excelBuffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });

    saveAs(blob, "Full_Attendance.xlsx");

  } catch (error) {
    console.error("Download failed:", error);
    alert("Failed to download attendance.");
  }
};
  const fetchAttendanceRecords = async () => {
    const token = localStorage.getItem('access_token');
    if (!token) {
      console.error('No token found');
      return;
    }

   
  };

  const fetchTodayAttendanceStatus = async () => {
    const token = localStorage.getItem('access_token');
    if (!token) {
      console.error('No token found');
      return;
    }

    try {
      const todayAttendance = await getTodayAttendance(token);
      console.log('Today\'s attendance:', todayAttendance);
      
      if (todayAttendance && todayAttendance.check_in_time && !todayAttendance.check_out_time) {
        // User is currently checked in
        setCheckInTime(new Date(todayAttendance.check_in_time));
        setIsCheckedIn(true);
        
        // Calculate elapsed time
        const now = new Date();
        const diff = now.getTime() - new Date(todayAttendance.check_in_time).getTime();
        const hours = Math.floor(diff / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);
        
        setTotalTime(
          `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
        );
      }
    } catch (error) {
      console.error('Failed to fetch today\'s attendance:', error);
      // User might not have checked in today, which is fine
    }
  };

  const codingQuestions = [
    {
      id: 1,
      title: "Check Even or Odd",
      question: "Write a program to read an integer and print even or odd.",
      scenario: "Using if-else statement.",
      expectedOutput: "Input: 4 -> Output: Even\nInput: 7 -> Output: Odd"
    }
  ];
const handleQuizClick = async (quizId: number, quizTitle?: string) => {
  const token = localStorage.getItem("access_token");

  if (!token) {
    setRegDialogOpen(true);
    return;
  }

  try {
    setCurrentQuizTitle(quizTitle || "");
    const res = await fetch(
      `${VITE_API_URL}/guest/quiz/${quizId}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (!res.ok) {
      console.log("GET quiz failed:", res.status);
      throw new Error("Failed");
    }

    const data = await res.json();
    console.log("Quiz Questions:", data);

    setQuizQuestions(data);
    setCurrentQuizId(quizId);
    setShowQuizUI(true);
    setAnswers([]);
    setQuizCompleted(false);
    setQuizStartTime(Date.now());

  } catch (err) {
    console.error("Error fetching quiz questions:", err);
    setQuizQuestions([]);
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

  // Use only API-fetched quizzes
  const allAvailableQuizzes = filteredQuizzes;

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
  if (!quizQuestions.length || !quizStartTime) return;

  const token = localStorage.getItem("access_token");
  if (!token) return;

  const timeTaken = Math.round((Date.now() - quizStartTime) / 1000);

  // Transform answers correctly
  const formattedAnswers = quizQuestions.map((question) => {
    const answer = answers.find(ans => ans.question_id === question.id);
    return {
      question_id: question.id,
      selected_option: answer ? answer.selected_option : "", // must be STRING
    };
  });

  const payload = {
    id: currentQuizId, // must be the quiz ID
    answers: formattedAnswers,
    time_taken: timeTaken,
  };

  console.log("Submitting:", payload);

  try {
    const res = await fetch(
      `${VITE_API_URL}/guest/submit`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      }
    );

    const result = await res.json();
    console.log("Submit response:", result);

    if (!res.ok) {
      throw new Error(result.detail || "Submit failed");
    }

    setScore(result.score || 0);
    setQuizCompleted(true);
    fetchQuizResults();

  } catch (error) {
    console.error("Submit error:", error);
  }
};

const getCupInfo = (score: number) => {
  if (score > 3) return { color: '#FFD700', label: 'Diamond Cup' };
  if (score > 2) return { color: '#C0C0C0', label: 'Gold Cup' };
  if (score > 1) return { color: '#b87333', label: 'Silver Cup' };
  if (score > 0) return { color: '#cd7f32', label: 'Bronze Cup' };
  return null;
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" }
  },
  hover: { 
    scale: 1.02,
    boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
    transition: { duration: 0.2 }
  }
};

const motionButtonVariants = {
  hover: { scale: 1.05, transition: { duration: 0.2 } },
  tap: { scale: 0.95 }
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

  if (!course) {
    return <NotFound />;
  }

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
                {userRole !== 'student' && (
                  <Button variant="course" size="lg" onClick={() => setRegOpen(true)} className="w-full sm:w-auto">
                    Enroll Now
                  </Button>
                )}
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
            <Tabs 
              defaultValue="overview" 
              className="w-full"
              onValueChange={(value) => {
                if (value === "quiz-results") {
                  fetchQuizResults();
                }
              }}
            >
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
                    className={`
                      text-[10px] 2xs:text-xs xs:text-xs 2sm:text-sm sm:text-sm md:text-sm px-2 2xs:px-2 xs:px-3 2sm:px-3 sm:px-3 md:px-4 py-1 2xs:py-1.5 xs:py-1.5 2sm:py-2 sm:py-2 md:py-2 whitespace-nowrap flex-shrink-0
                      snap-center rounded-md
                      transition-all duration-200 ease-in-out
                      data-[state=active]:bg-primary data-[state=active]:text-primary-foreground
                      hover:bg-muted hover:text-foreground
                      ${userRole === 'student' ? 'hidden' : ''}
                    `}
                  >
                    Quizzes
                  </TabsTrigger>
                  <TabsTrigger
                    value="quiz-results"
                    className={`
                      text-[10px] 2xs:text-xs xs:text-xs 2sm:text-sm sm:text-sm md:text-sm px-2 2xs:px-2 xs:px-3 2sm:px-3 sm:px-3 md:px-4 py-1 2xs:py-1.5 xs:py-1.5 2sm:py-2 sm:py-2 md:py-2 whitespace-nowrap flex-shrink-0
                      snap-center rounded-md
                      transition-all duration-200 ease-in-out
                      data-[state=active]:bg-primary data-[state=active]:text-primary-foreground
                      hover:bg-muted hover:text-foreground
                      ${userRole === 'student' ? 'hidden' : ''}
                    `}
                  >
                    Quiz Results
                  </TabsTrigger>
   {IT_COURSES.includes(id) && userRole !== 'student' && (
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
)}

 
                  {userRole !== 'student' && (
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
                  )}
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

              {userRole !== 'student' && (
              <TabsContent value="quizzes" className="mt-8">
               <Card>
      <CardHeader>
        <CardTitle>Practice Quizzes</CardTitle>
      </CardHeader>
      <CardContent>
        {!showQuizUI ? (
          <div className="grid gap-4">
            {/* API Quizzes */}
            {filteredQuizzes.length > 0 && filteredQuizzes.map((quiz) => (
              <div
                key={quiz.id}
                className={`p-4 border rounded-lg ${quiz.locked ? 'opacity-50' : 'hover:border-primary cursor-pointer'}`}
                onClick={() => handleQuizClick(quiz.id, quiz.title)}
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
            ))}
            
            {filteredQuizzes.length === 0 && (
              <div className="text-center text-muted-foreground">
                No quizzes available yet.
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
      </CardContent>
    </Card>
  </TabsContent>
)}

             {userRole !== 'student' && (
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
)}

              {IT_COURSES.includes(id) && userRole !== 'student' && (
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
)}

              {userRole !== 'student' && (
              <TabsContent value="attendance" className="mt-8">
                {isRegistered ? (
                  <div className="max-w-4xl mx-auto p-6">
                    <Card className="mb-6">
                      <CardHeader>
                        <CardTitle className="text-2xl font-bold text-center">Attendance Tracking</CardTitle>
                      </CardHeader>
                      <CardContent className="text-center space-y-6">
                        {/* Current Status */}
                        <div className="p-4 bg-gray-50 rounded-lg">
                          <h3 className="text-lg font-semibold mb-2">
                            Status: {isCheckedIn ? (
                              <span className="text-green-600">Checked In</span>
                            ) : (
                              <span className="text-gray-600">Not Checked In</span>
                            )}
                          </h3>
                          {isCheckedIn && (
                            <div className="space-y-2">
                              <p className="text-sm text-gray-600">
                                Check-in Time: {checkInTime?.toLocaleTimeString()}
                              </p>
                              <p className="text-2xl font-mono font-bold text-blue-600">
                                {totalTime}
                              </p>
                            </div>
                          )}
                        </div>

                        {/* Action Buttons */}
                        <div className="flex justify-center gap-4">
                          {!isCheckedIn ? (
                            <Button 
                              onClick={handleCheckIn}
                              className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 text-lg"
                            >
                              Check In
                            </Button>
                          ) : (
                            <Button 
                              onClick={handleCheckOut}
                              className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 text-lg"
                            >
                              Check Out
                            </Button>
                            
                          )}
                         <Button
  onClick={handleDownloadFullAttendance}
  className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 text-lg"
>
  Download Full Attendance
</Button>
                        </div>
                      </CardContent>
                    </Card>

                    {/* Attendance Records */}
                    {attendanceRecords.length > 0 && (
                      <Card>
                        <CardHeader>
                          <CardTitle className="text-xl font-semibold">Attendance History</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="overflow-x-auto">
                            <Table>
                              <TableHeader>
                                <TableRow>
                                  <TableHead>Date</TableHead>
                                  <TableHead>Check In</TableHead>
                                  <TableHead>Check Out</TableHead>
                                  <TableHead>Duration</TableHead>
                                </TableRow>
                              </TableHeader>
                              <TableBody>
                                {attendanceRecords.map((record, index) => (
                                  <TableRow key={index}>
                                    <TableCell>{record.date}</TableCell>
                                    <TableCell>{record.checkIn}</TableCell>
                                    <TableCell>{record.checkOut}</TableCell>
                                    <TableCell className="font-mono">{record.duration}</TableCell>
                                  </TableRow>
                                ))}
                              </TableBody>
                            </Table>
                          </div>
                        </CardContent>
                      </Card>
                    )}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <p className="text-lg text-muted-foreground mb-6">You are not registered yet. Register now to access attendance tracking!</p>
                    <Button variant="course" size="lg" onClick={() => setRegDialogOpen(true)}>
                      Register Now
                    </Button>
                  </div>
                )}
              </TabsContent>
)}

            </Tabs>
          </div>
        </section>
<section className=" bg-muted/30">
  <div className="container mx-auto px-4">
    <h2 className="text-3xl sm:text-4xl font-bold text-center mb-10">Upcoming Batches</h2>
    
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
      {[
        {
          title: "Weekday Batch",
          schedule: "Mon–Fri, 7:00 PM – 9:00 PM",
          start: "Starts: 15 Jan, 2026"
        },
        {
          title: "Weekend Batch",
          schedule: "Sat–Sun, 10:00 AM – 2:00 PM",
          start: "Starts: 20 Jan, 2026"
        },
        {
          title: "Intensive Batch",
          schedule: "Mon–Fri, 9:00 AM – 5:00 PM",
          start: "Starts: 1 Feb, 2026"
        }
      ].map((batch) => (
        <Card 
          key={batch.title}
          className="hover:shadow-xl transition-shadow duration-300 border rounded-2xl overflow-hidden"
        >
          <CardContent className="p-8 text-center space-y-5">
            <h3 className="text-xl font-bold text-foreground">{batch.title}</h3>
            <div className="space-y-3 text-muted-foreground">
              <p className="text-base">{batch.schedule}</p>
              <p className="text-sm font-medium text-primary">{batch.start}</p>
            </div>
            <Button
              variant="course"
              size="lg"
              className="w-full rounded-xl font-semibold"
              onClick={() => setRegOpen(true)}
            >
              Enroll Now
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>

    <Button
      variant="course"
      size="lg"
      className="px-6 py-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-lg font-medium"
      onClick={() => navigate("/dashboard/recording")}
    >
      Watch Now
    </Button>

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
