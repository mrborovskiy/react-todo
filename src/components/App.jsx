import ManageToDos from "./ManageToDos";
import "./App.css";
import ToDoList from "./ToDoList";
import { useEffect, useReducer } from "react";

const baseUrl = "http://localhost:8000/todos";

const initialState = {
  todos: [],
  loading: true,
  error: null,
};

function todosReducer(state, action) {
  switch (action.type) {
    case "get-app-data":
      return { ...state, todos: action.todos, loading: false };
    case "get-app-data-error":
      return { ...state, loading: false, error: action.error };
    case "add-todo":
      return {
        ...state,
        todos: [
          ...state.todos,
          { id: crypto.randomUUID(), task: action.task, done: false },
        ],
      };
    case "delete-todo":
      return {
        ...state,
        todos: state.todos.filter((item) => item.id !== action.id),
      };
    case "edit-todo":
      return {
        ...state,
        todos: state.todos.map((item) => {
          if (item.id === action.id) {
            item.task = action.task;
            item.done = action.done;
            return item;
          } else {
            return item;
          }
        }),
      };
    case "delete-accomplished":
      return {
        ...state,
        todos: state.todos.filter((item) => item.done !== true),
      };
    case "todo-status-change":
      return {
        ...state,
        todos: state.todos.map((item) => {
          if (item.id === action.id) {
            item.done = action.done;
            return item;
          } else {
            return item;
          }
        }),
      };

    default:
      break;
  }
}

function App() {
  const [state, dispatch] = useReducer(todosReducer, initialState);

  useEffect(function () {
    fetch(baseUrl)
      .then((res) => res.json())
      .then((data) => dispatch({ type: "get-app-data", todos: data }))
      .catch((e) => dispatch({ type: "get-app-data-error", error: e.message }));
  }, []);

  return (
    <>
      <h1>TODO List App</h1>
      <ManageToDos dispatch={dispatch} />
      {state.todos.length > 0 && (
        <ToDoList todos={state.todos} dispatch={dispatch} />
      )}
      {state.todos.length === 0 && !state.loading && (
        <p>There are no TODOs to do... 🥱</p>
      )}
      {state.loading && <p>Loading... 🔁</p>}
    </>
  );
}

export default App;
