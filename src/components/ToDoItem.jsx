import { useState } from "react";

function ToDoItem({ todo, dispatch }) {
  const [editable, setEditable] = useState(false);
  const [editedTask, setEditedTask] = useState(todo.task);

  function handleDelete() {
    dispatch({ type: "delete-todo", id: todo.id });
  }

  function handleStatusChange() {
    dispatch({ type: "todo-status-change", id: todo.id, done: !todo.done });
  }

  const staticTask = (
    <>
      <input
        type="checkbox"
        checked={todo.done}
        onChange={handleStatusChange}
      />
      <p>{todo.task}</p>
      <button onClick={() => setEditable(true)}>Edit ✏️</button>
      <button onClick={handleDelete}>Delete 🗑️</button>
    </>
  );

  function handleEdit() {
    setEditable(false);
    dispatch({
      type: "edit-todo",
      id: todo.id,
      task: editedTask,
      done: todo.done,
    });
  }

  const editableTask = (
    <>
      <input
        type="checkbox"
        checked={todo.done}
        onChange={handleStatusChange}
      />
      <input
        type="text"
        value={editedTask}
        onChange={(e) => setEditedTask(e.target.value)}
      />
      <button onClick={handleEdit}>Save</button>
      <button onClick={handleDelete}>Delete 🗑️</button>
    </>
  );

  return (
    <div className="todo-item">{editable ? editableTask : staticTask}</div>
  );
}

export default ToDoItem;
