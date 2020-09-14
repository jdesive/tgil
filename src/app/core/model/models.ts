export interface User {
  id?: number;
  username: string;
  lastLogin: Date;
  createdDate: Date;
}

export interface LoginResponse {
  successful: boolean;
  message: string;
  user: User;
}

export interface QuizAnswer {
  id?: number;
  answer: string;
}

export interface QuizQuestion {
  id?: number;
  question: string;
  answers: QuizAnswer[];
  correctAnswer: string;
}

export interface Quiz {
  id?: number;
  name: string;
  dueDate: Date;
  questions: QuizQuestion[];
}

export interface ScoreCard {
  id: number;
  score: number;
  dateTaken: Date;
  quiz: Quiz;
}


/*
*  UI Models
* */
export interface QuizList extends Quiz {
  score?: number;
  scoreDate?: Date;
}
