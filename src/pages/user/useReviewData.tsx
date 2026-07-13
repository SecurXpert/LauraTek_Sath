import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { VITE_API_URL } from "@/services/api/api";

export function useReviewData() {
  const { courseId, trainerId } = useParams();

  const [rating, setRating] = useState<number>(0);
  const [comments, setComments] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [courses, setCourses] = useState<any[]>([]);
  const [instructors, setInstructors] = useState<any[]>([]);
  const [selectedCourse, setSelectedCourse] = useState<string>(courseId || "");
  const [selectedTrainer, setSelectedTrainer] = useState<string>(trainerId || "");
  
  const [isCourseOpen, setIsCourseOpen] = useState(false);
  const [isTrainerOpen, setIsTrainerOpen] = useState(false);

  const getCourseTitle = (id: string) => {
    const c = courses.find(c => String(c.id || c.course_id) === id);
    return c ? (c.course_title || c.title || c.course_name || c.name || `Course ${id}`) : `Course ${id}`;
  };

  const getInstructorName = (id: string) => {
    const i = instructors.find(inst => String(inst.id || inst.instructor_id || inst.trainer_id) === id);
    return i ? (i.name || i.instructor_name || i.trainer_name || i.first_name || `Instructor ${id}`) : `Instructor ${id}`;
  };

  const API_BASE_URL = VITE_API_URL;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("access_token");
        if (!token) return;
        
        const headers = { Authorization: `Bearer ${token}` };

        const [coursesRes, instructorsRes] = await Promise.all([
          fetch(`${API_BASE_URL}/dashboard/my-courses`, { headers }),
          fetch(`${API_BASE_URL}/dashboard/my-instructors`, { headers })
        ]);

        if (coursesRes.ok) {
          const coursesData = await coursesRes.json();
          const coursesArray = Array.isArray(coursesData) ? coursesData : (coursesData.data || coursesData.courses || []);
          setCourses(coursesArray);
        }

        if (instructorsRes.ok) {
          const instructorsData = await instructorsRes.json();
          const instructorsArray = Array.isArray(instructorsData) ? instructorsData : (instructorsData.data || instructorsData.instructors || []);
          setInstructors(instructorsArray);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    
    fetchData();
  }, [API_BASE_URL]);

  const submitReview = async () => {
    if (isSubmitting) return;
    
    if (!selectedCourse || !selectedTrainer) {
      alert("Please select both a course and an instructor.");
      return;
    }

    try {
      setIsSubmitting(true);
      const response = await fetch(
        `${API_BASE_URL}/courses/${selectedCourse}/trainer/${selectedTrainer}/review`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
          body: JSON.stringify({
            rating,
            comment: comments,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to submit review");
      }

      const data = await response.json();
      console.log("Review Submitted:", data);
      alert("Review submitted successfully");
      setComments("");
      setRating(0);
      setSelectedCourse("");
      setSelectedTrainer("");
    } catch (error) {
      console.error(error);
      alert("Failed to submit review");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCommentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    let allowedChars = e.target.value.replace(/[^a-zA-Z\s.,'?\n-]/g, "");
    const lines = allowedChars.split('\n');
    if (lines.length > 5) {
      allowedChars = lines.slice(0, 5).join('\n');
    }
    if (allowedChars.length > 100) {
      allowedChars = allowedChars.slice(0, 100);
    }
    setComments(allowedChars);
  };

  return {
    rating, setRating,
    comments, setComments,
    isSubmitting,
    courses,
    instructors,
    selectedCourse, setSelectedCourse,
    selectedTrainer, setSelectedTrainer,
    isCourseOpen, setIsCourseOpen,
    isTrainerOpen, setIsTrainerOpen,
    getCourseTitle,
    getInstructorName,
    submitReview,
    handleCommentChange
  };
}
