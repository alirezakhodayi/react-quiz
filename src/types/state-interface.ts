import type { IQuestion } from "./question-interface";

export interface IState {
  questions: IQuestion[];
  status: "loading" | "error" | "ready" | "active" | "finished";
  index: number;
  answer: null | number;
  points: number;
}
