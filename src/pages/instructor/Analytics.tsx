import { useState } from "react";
import { useAnalyticsMetrics } from "@/components/instructor/Analytics/useAnalyticsMetrics";
import { useAnalyticsCharts } from "@/components/instructor/Analytics/useAnalyticsCharts";
import { AnalyticsHeader } from "@/components/instructor/Analytics/AnalyticsHeader";
import { MetricCards } from "@/components/instructor/Analytics/MetricCards";
import { StudentActivityChart } from "@/components/instructor/Analytics/StudentActivityChart";
import { StudentPerformanceTable } from "@/components/instructor/Analytics/StudentPerformanceTable";
import { TopPerformingCourses } from "@/components/instructor/Analytics/TopPerformingCourses";
import { QuizAnalyticsCard } from "@/components/instructor/Analytics/QuizAnalyticsCard";

const Analytics = () => {
  const [dateRange, setDateRange] = useState("");

  const {
    activeStudentsCount,
    totalEnrolledStudents,
    liveClassesCount,
    totalQuizzesCount,
    averageScore,
    topicPerformance
  } = useAnalyticsMetrics(dateRange);

  const {
    mainChartData,
    studentPerformanceData,
    topCoursesData
  } = useAnalyticsCharts(dateRange);

  return (
    <div className="min-h-screen bg-[#F8FAFC] p-4 md:p-6 lg:p-8 w-full max-w-[1600px] mx-auto">
      <AnalyticsHeader dateRange={dateRange} setDateRange={setDateRange} />
      <MetricCards activeStudentsCount={activeStudentsCount} liveClassesCount={liveClassesCount} />
      <StudentActivityChart totalEnrolledStudents={totalEnrolledStudents} mainChartData={mainChartData} />
      <StudentPerformanceTable studentPerformanceData={studentPerformanceData} />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
        <TopPerformingCourses topCoursesData={topCoursesData} />
        <QuizAnalyticsCard totalQuizzesCount={totalQuizzesCount} averageScore={averageScore} topicPerformance={topicPerformance} />
      </div>
    </div>
  );
};

export default Analytics;
