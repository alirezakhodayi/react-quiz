import type { TAction } from "../types";

interface IProps {
  dispatch: React.Dispatch<TAction>;
  answer: null | number;
}

function NextButton({ dispatch, answer }: IProps) {
  if (answer === null) return null;
  return (
    <button
      className="btn btn-ui"
      onClick={() => dispatch({ type: "nextQuestion" })}
    >
      Next
    </button>
  );
}

export { NextButton };
