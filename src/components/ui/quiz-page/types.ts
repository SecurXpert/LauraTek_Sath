export interface Question {
  id: number;
  question_text: string;
  option_a: string;
  option_b: string;
  option_c: string;
  option_d: string;
}

export interface Result {
  id: number;
  quiz_id: number;
  score: number;
  total_questions: number;
  time_taken: number;
  submitted_at: string;
  percentage: number;
}
