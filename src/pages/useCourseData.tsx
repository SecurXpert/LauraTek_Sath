import { useState, useEffect } from "react";
import { VITE_API_URL } from '../services/api/api';
import { useLocation, useParams } from "react-router-dom";
import { toast } from "sonner";
import { 
  Course, Instructor, Quiz, Material, LiveClass, 
  CurriculumItem, Certificate, CertificateResponse 
} from "@/components/ui/course-page/CourseTypes";

export const useCourseData = () => {
  const location = useLocation();
  const { id } = useParams();
  
  const [course, setCourse] = useState<Course | null>(null);
  const [instructor, setInstructor] = useState<Instructor | null>(null);
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const [materials, setMaterials] = useState<Material[]>([]);
  const [liveClasses, setLiveClasses] = useState<LiveClass[]>([]);
  const [curriculum, setCurriculum] = useState<CurriculumItem[]>([]);
  const [hasCertificate, setHasCertificate] = useState(false);
  const [certificateData, setCertificateData] = useState<Certificate | null>(null);
  const [isSaved, setIsSaved] = useState(false);
  const [loading, setLoading] = useState(true);
  const [apiDuration, setApiDuration] = useState(0);
  const [expandedModules, setExpandedModules] = useState<number[]>([]);
  const [progressData, setProgressData] = useState<any>(null);
  const [activeMaterialFilter, setActiveMaterialFilter] = useState("All");
  const [showAllQuizzes, setShowAllQuizzes] = useState(false);
  const [showAllLiveClasses, setShowAllLiveClasses] = useState(false);

  useEffect(() => {
    // Check if course is already saved in localStorage
    const savedCourses = JSON.parse(localStorage.getItem('savedCourses') || '[]');
    if (savedCourses.includes(course?.course_id)) {
      setIsSaved(true);
    }
  }, [course?.course_id]);

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("access_token");
      if (!token) {
        console.error("No access token found");
        setLoading(false);
        return;
      }

      try {
        // Check if course data was passed via navigation state
        const passedCourse = location.state?.course;
        
        // Fetch my-instructors
        const instructorsRes = await fetch(
          `${VITE_API_URL}/dashboard/my-instructors`,
          {
            method: "GET",
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        let courseData: Course | null = null;
        let instructorsData: Instructor[] = [];

        if (passedCourse) {
          // Use the passed course data and map to Course interface
          courseData = {
            course_id: passedCourse.id,
            course_title: passedCourse.title,
            progress: passedCourse.progress,
            completed: passedCourse.status === "completed",
            description: passedCourse.description,
            course_image: passedCourse.image,
            duration: passedCourse.duration,
          };
          setCourse(courseData);
          if (courseData && courseData.duration) {
            setApiDuration(courseData.duration);
          }
        } else {
          // Fallback: Fetch my-courses
          const coursesRes = await fetch(
            `${VITE_API_URL}/dashboard/my-courses`,
            {
              method: "GET",
              headers: { Authorization: `Bearer ${token}` },
            }
          );

          if (coursesRes.ok) {
            const coursesResult = await coursesRes.json();
            const allCourses = Array.isArray(coursesResult) ? coursesResult : [coursesResult];
            
            // Find course by ID from URL or default to first course
            if (id) {
              courseData = allCourses.find((c: any) => c.course_id === Number(id)) || allCourses[0];
            } else {
              courseData = allCourses[0];
            }
            
            setCourse(courseData);
            // Extract duration from API response
            if (courseData && courseData.duration) {
              setApiDuration(courseData.duration);
            }
          }
        }

        if (instructorsRes.ok) {
          instructorsData = await instructorsRes.json();
          // Find instructor that teaches this course
          const matchedInstructor = instructorsData.find((inst) =>
            inst.course_titles?.includes(courseData?.course_title || "")
          );
          setInstructor(matchedInstructor || instructorsData[0] || null);
        }

        // Fetch available quizzes and filter by course title
        const quizzesRes = await fetch(
          `${VITE_API_URL}/dashboard/available-quizzes`,
          {
            method: "GET",
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        if (quizzesRes.ok) {
          const quizzesData = await quizzesRes.json();
          setQuizzes(quizzesData);
        }

        // Fetch course materials using dynamic course_id
        const materialsRes = await fetch(
          `${VITE_API_URL}/courses/${courseData?.course_id || 1}/materials`,
          {
            method: "GET",
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        if (materialsRes.ok) {
          const materialsData = await materialsRes.json();
          setMaterials(materialsData);
        }

        // Fetch upcoming live classes and filter by course title
        const liveClassesRes = await fetch(
          `${VITE_API_URL}/dashboard/upcoming-live-classes`,
          {
            method: "GET",
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        if (liveClassesRes.ok) {
          const liveClassesData = await liveClassesRes.json();
          // Filter live classes by course_id
          const currentCourseId = courseData?.course_id;
          const filteredLiveClasses = liveClassesData.filter((liveClass: LiveClass) =>
            liveClass.course_id === currentCourseId
          );
          setLiveClasses(filteredLiveClasses);
        }

        // Fetch curriculum for the course using dynamic course_id
        const curriculumRes = await fetch(
          `${VITE_API_URL}/courses/${courseData?.course_id || 1}/curriculum`,
          {
            method: "GET",
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        if (curriculumRes.ok) {
          const curriculumData = await curriculumRes.json();
          // Sort by order_index
          const sortedCurriculum = curriculumData.sort((a: CurriculumItem, b: CurriculumItem) => a.order_index - b.order_index);
          setCurriculum(sortedCurriculum);
        }

        // Fetch certificates to check if user has certificate for this course
        const certificatesRes = await fetch(
          `${VITE_API_URL}/student/student/my-certificates`,
          {
            method: "GET",
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        if (certificatesRes.ok) {
          const certificatesResponse: CertificateResponse = await certificatesRes.json();
          const studentId = certificatesResponse.student_id;
          // Check if any certificate matches current course
          const courseCertificate = certificatesResponse.certificates?.find(
            (cert: Certificate) => cert.course_name === courseData?.course_title
          );
          setHasCertificate(!!courseCertificate);
          setCertificateData(courseCertificate || null);

          // Fetch course progress using studentId and courseId
          if (studentId && courseData?.course_id) {
            const progressRes = await fetch(
              `${VITE_API_URL}/courses/students/${studentId}/courses/${courseData.course_id}/progress`,
              {
                method: "GET",
                headers: { Authorization: `Bearer ${token}` },
              }
            );
            if (progressRes.ok) {
              const pData = await progressRes.json();
              setProgressData(pData);
            }
          }
        }
      } catch (error) {
        console.error("Error fetching course data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [location.state, id]);

  const handleDownload = async (materialId: number, title: string) => {
    const token = localStorage.getItem("access_token");
    if (!token) {
      alert("Please sign in to download files.");
      return;
    }

    try {
      const res = await fetch(`${VITE_API_URL}/courses/${course?.course_id || 1}/materials/${materialId}/download`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      if (!res.ok) throw new Error("Failed to download");
      
      const contentType = res.headers.get('content-type') || '';
      
      const downloadBlob = (blobData: Blob, cType: string, fileTitle: string, urlToExtractExt?: string) => {
        const url = window.URL.createObjectURL(blobData);
        const link = document.createElement("a");
        link.href = url;
        
        let fileName = `${fileTitle.replace(/\s+/g, "_") || "material"}`;
        if (!fileName.includes('.')) {
          if (cType.includes('pdf')) fileName += '.pdf';
          else if (cType.includes('zip')) fileName += '.zip';
          else if (cType.includes('image/jpeg')) fileName += '.jpg';
          else if (cType.includes('image/png')) fileName += '.png';
          else if (cType.includes('video/mp4')) fileName += '.mp4';
          else if (urlToExtractExt) {
            const urlExt = urlToExtractExt.split('.').pop()?.split('?')[0];
            if (urlExt && urlExt.length <= 4 && /^[a-zA-Z0-9]+$/.test(urlExt)) {
              fileName += `.${urlExt}`;
            } else {
              fileName += '.pdf';
            }
          } else {
            fileName += '.pdf';
          }
        }
        
        link.setAttribute("download", fileName);
        document.body.appendChild(link);
        link.click();
        link.remove();
        window.URL.revokeObjectURL(url);
        toast.success("Downloaded successfully!");
      };

      if (contentType.includes('application/json')) {
        const data = await res.json();
        const urlToOpen = data.url || (typeof data === 'string' ? data : null);
        if (urlToOpen && (urlToOpen.startsWith('http://') || urlToOpen.startsWith('https://'))) {
          try {
            const fileRes = await fetch(urlToOpen);
            const fetchedContentType = fileRes.headers.get('content-type') || '';
            const blob = await fileRes.blob();
            downloadBlob(blob, fetchedContentType, title, urlToOpen);
            return;
          } catch (err) {
            const link = document.createElement("a");
            link.href = urlToOpen;
            // Removed target="_blank" to prevent new tab flickering
            let fileName = `${title.replace(/\s+/g, "_") || "material"}`;
            link.setAttribute("download", fileName);
            document.body.appendChild(link);
            link.click();
            link.remove();
            toast.success("Downloaded successfully!");
            return;
          }
        }
      }

      const blob = await res.blob();
      downloadBlob(blob, contentType, title);

    } catch (err: any) {
      console.error(err);
      toast.error("Download failed.");
    }
  };

  const toggleModule = (moduleId: number) => {
    setExpandedModules(prev => 
      prev.includes(moduleId) 
        ? prev.filter(id => id !== moduleId)
        : [...prev, moduleId]
    );
  };

  const handleToggleAllModules = () => {
    if (expandedModules.length === curriculum.length && curriculum.length > 0) {
      setExpandedModules([]);
    } else {
      setExpandedModules(curriculum.map(item => item.id));
    }
  };

  return {
    course,
    instructor,
    quizzes,
    materials,
    liveClasses,
    curriculum,
    hasCertificate,
    certificateData,
    isSaved,
    loading,
    apiDuration,
    expandedModules,
    progressData,
    activeMaterialFilter,
    setActiveMaterialFilter,
    showAllQuizzes,
    setShowAllQuizzes,
    showAllLiveClasses,
    setShowAllLiveClasses,
    handleDownload,
    toggleModule,
    handleToggleAllModules,
  };
};
