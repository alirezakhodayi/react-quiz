import type { TAction } from "../types";

interface IProps {
  points: number;
  maxPossiblePoints: number;
  highScore: number;
  dispatch: React.Dispatch<TAction>;
}

function FinishScreen({
  points,
  maxPossiblePoints,
  highScore,
  dispatch,
}: IProps) {
  const percentage = (points / maxPossiblePoints) * 100;

  let emoji;
  if (percentage === 100) emoji = "🥇";
  if (percentage >= 80 && percentage < 100) emoji = "🥈";
  if (percentage >= 50 && percentage < 80) emoji = "🥉";
  if (percentage >= 30 && percentage < 50) emoji = "😐";
  if (percentage >= 0 && percentage < 30) emoji = "🫨";
  if (percentage === 0) emoji = "💩";

  return (
    <>
      <p className="result">
        <span>{emoji}</span> You scored <strong>{points}</strong> out of{" "}
        {maxPossiblePoints} ({Math.ceil(percentage)}%)
      </p>
      <p className="highscore">(Highscore: {highScore} points)</p>
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "restart" })}
      >
        Restart Quiz
      </button>
    </>
  );
}

export { FinishScreen };
