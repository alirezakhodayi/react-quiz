import { useEffect, useReducer } from "react";
import { Error, Header, Loader, Main, StartScreen } from "./components";
import type { IQuestion } from "./types";

interface IState {
  questions: IQuestion[];
  status: "loading" | "error" | "ready" | "active" | "finished";
}

type TAction =
  | { type: "dataRecived"; payload: IQuestion[] }
  | { type: "dataFailed" };

const initialState: IState = {
  questions: [],
  status: "loading",
};

function reducer(state: IState, action: TAction) {
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

    default:
      throw new Error("Action unknown");
  }
}

function App() {
  const [{ questions, status }, dispatch] = useReducer(reducer, initialState);

  const numQuestion = questions.length;

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
        {status === "ready" && <StartScreen numQuestions={numQuestion} />}
      </Main>
    </div>
  );
}

export default App;
