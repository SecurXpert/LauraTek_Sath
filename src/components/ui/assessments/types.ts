export interface Quiz {
  id: number;
  title: string;
  description: string;
  timer?: number;
  subject?: string;
  difficulty?: string;
  questions?: number;
  timeLimit?: string;
  attempts?: number;
  status?: string;
  bestScore?: number;
  progress?: number;
  lastAttempt?: string;
  avgScore?: number;
}

export interface StudentAnalytics {
  student_id: number;
  total_attempts: number;
  average_score: number;
  accuracy_percentage: number;
}
