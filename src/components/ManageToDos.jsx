import { useCallback, useEffect, useState } from "react";

function ManageToDos({ dispatch }) {
  const [task, setTask] = useState("");

  const handleDispatch = useCallback(() => {
    if (!task) return;
    dispatch({ type: "add-todo", task: task });
  }, [task, dispatch]);

  const handleDeleteAccomplished = useCallback(() => {
    dispatch({ type: "delete-accomplished" });
  }, [dispatch]);

  useEffect(
    function () {
      function callback(e) {
        if (e.code.toLowerCase() === "enter" && task) {
          dispatch({ type: "add-todo", task: task });
        }
      }
      document.addEventListener("keydown", callback);
      return function () {
        document.removeEventListener("keydown", callback);
      };
    },
    [task, dispatch]
  );

  return (
    <div className="add-todo-input">
      <input
        type="text"
        placeholder="Add a TODO..."
        value={task}
        onChange={(e) => setTask(e.target.value)}
      />
      <button onClick={handleDispatch}>Add TODO</button>
      <button onClick={handleDeleteAccomplished}>Delete accomplished</button>
    </div>
  );
}

export default ManageToDos;
