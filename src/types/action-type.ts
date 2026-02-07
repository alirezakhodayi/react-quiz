import type { IQuestion } from "./question-interface";

export type TAction =
  | { type: "dataRecived"; payload: IQuestion[] }
  | { type: "dataFailed" }
  | { type: "start" }
  | { type: "newAnswer"; payload: number }
  | { type: "nextQuestion" }
  | { type: "finish" };
