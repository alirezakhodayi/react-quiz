import type { IQuestion, TAction } from "../types";

interface IProps {
  question: IQuestion;
  dispatch: React.Dispatch<TAction>;
  answer: null | number;
}
function Options({ question, dispatch, answer }: IProps) {
  const hasAnswered = answer !== null;
  return (
    <div className="options">
      {question.options.map((option, index) => (
        <button
          key={option}
          disabled={answer !== null}
          className={`btn btn-option ${index === answer ? "answer" : ""} ${hasAnswered ? (index === question.correctOption ? "correct" : "wrong") : ""}`}
          onClick={() => dispatch({ type: "newAnswer", payload: index })}
        >
          {option}
        </button>
      ))}
    </div>
  );
}

export default Options;
