import { useEffect, useReducer } from "react";
import {
  Error,
  FinishScreen,
  Header,
  Loader,
  Main,
  NextButton,
  Progress,
  Question,
  StartScreen,
} from "./components";
import type { IState, TAction } from "./types";

const initialState: IState = {
  questions: [],
  status: "loading",
  index: 0,
  answer: null,
  points: 0,
  highScore: 0,
};

function reducer(state: IState, action: TAction): IState {
  switch (action.type) {
    case "dataRecived":
      return {
        ...state,
        questions: action.payload,
        status: "ready",
      };

    case "dataFailed":
      return {
        ...state,
        status: "error",
      };

    case "start":
      return {
        ...state,
        status: "active",
      };

    case "newAnswer": {
      const question = state.questions.at(state.index);

      return {
        ...state,
        answer: action.payload,
        points:
          action.payload === question?.correctOption
            ? state.points + question.points
            : state.points,
      };
    }

    case "nextQuestion":
      return { ...state, index: state.index + 1, answer: null };

    case "finish":
      return {
        ...state,
        status: "finished",
        highScore:
          state.points > state.highScore ? state.points : state.highScore,
      };

    default:
      throw new Error("Action unknown");
  }
}

function App() {
  const [{ questions, status, index, answer, points, highScore }, dispatch] =
    useReducer(reducer, initialState);

  const numQuestion = questions.length;
  const maxPossiblePoints = questions.reduce(
    (prev, cur) => prev + cur.points,
    0,
  );

  useEffect(function () {
    async function fetchQuestions() {
      try {
        const response = await fetch("http://localhost:8000/questions");

        if (!response.ok) {
          dispatch({ type: "dataFailed" });
          throw new Error("An error happen during fetch questions");
        }

        const data = await response.json();
        dispatch({ type: "dataRecived", payload: data });
      } catch (err: unknown) {
        if (err instanceof Error) console.log(err.message);
      } finally {
        console.log("final");
      }
    }

    fetchQuestions();
  }, []);

  return (
    <div className="app">
      <Header />
      <Main>
        {status === "loading" && <Loader />}
        {status === "error" && <Error />}
        {status === "ready" && (
          <StartScreen numQuestions={numQuestion} dispatch={dispatch} />
        )}
        {status === "active" && (
          <>
            <Progress
              index={index}
              numQuestions={numQuestion}
              points={points}
              maxPossiblePoints={maxPossiblePoints}
              answer={answer}
            />
            <Question
              question={questions[index]}
              dispatch={dispatch}
              answer={answer}
            />
            <NextButton
              dispatch={dispatch}
              answer={answer}
              index={index}
              numQuestions={numQuestion}
            />
          </>
        )}
        {status === "finished" && (
          <FinishScreen
            points={points}
            maxPossiblePoints={maxPossiblePoints}
            highScore={highScore}
          />
        )}
      </Main>
    </div>
  );
}

export default App;
