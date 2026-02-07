import type { TAction } from "../types";

interface IProps {
  dispatch: React.Dispatch<TAction>;
  answer: null | number;
  index: number;
  numQuestions: number;
}

function NextButton({ dispatch, answer, index, numQuestions }: IProps) {
  if (answer === null) return null;
  if (index < numQuestions - 1)
    return (
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "nextQuestion" })}
      >
        Next
      </button>
    );

  if (index === numQuestions - 1)
    return (
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "finish" })}
      >
        Finish
      </button>
    );
}

export { NextButton };
