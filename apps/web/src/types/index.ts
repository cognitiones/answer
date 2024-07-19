export interface Question {
  id: number;
  title: string;
  description: string;
  type: QuestionType;
  createdAt: Date;
  updatedAt: Date;

  eventloop?: Eventloop;
  programming?: Programming
}

export interface Eventloop {
  choices: Choice[];
  correctAnswer: string;
}

export interface Programming {
  solution: string;
  stem: string;
  submitCheck: string;
}

export interface Choice {
  label: string;
  value: string;
}

type QuestionType = "PROGRAMMING" | "EVENTLOOP" | "PROTOTYPE"