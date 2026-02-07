interface IProps {
  index: number;
  numQuestions: number;
  points: number;
  maxPossiblePoints: number;
  answer: null | number;
}

function Progress({
  index,
  numQuestions,
  points,
  maxPossiblePoints,
  answer,
}: IProps) {
  return (
    <header className="progress">
      <progress max={numQuestions} value={index + Number(answer !== null)} />
      <p>
        Question <strong>{index + 1}</strong> / {numQuestions}
      </p>
      <p>
        <strong>{points}</strong> / {maxPossiblePoints}
      </p>
    </header>
  );
}

export { Progress };
