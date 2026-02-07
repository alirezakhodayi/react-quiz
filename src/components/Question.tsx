import type { IQuestion, TAction } from "../types";
import Options from "./Options";

interface IProps {
  question: IQuestion;
  dispatch: React.Dispatch<TAction>;
  answer: null | number;
}

function Question({ question, dispatch, answer }: IProps) {
  return (
    <div>
      <h4>{question.question}</h4>
      <Options question={question} dispatch={dispatch} answer={answer} />
    </div>
  );
}

export { Question };
