import { useEffect } from "react";
import type { TAction } from "../types";

interface IProps {
  secondsRemaining: number;
  dispatch: React.Dispatch<TAction>;
}

function Timer({ secondsRemaining, dispatch }: IProps) {
  const mins = Math.floor(secondsRemaining / 60);
  const seconds = secondsRemaining % 60;

  useEffect(
    function () {
      const id = setInterval(function () {
        dispatch({ type: "tick" });
      }, 1000);

      return () => clearInterval(id);
    },
    [dispatch],
  );

  return (
    <div className="timer">
      {mins < 10 && "0"}
      {mins}:{seconds < 10 && "0"}
      {seconds}
    </div>
  );
}

export { Timer };
