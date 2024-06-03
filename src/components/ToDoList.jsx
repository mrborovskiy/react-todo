import ToDoItem from "./ToDoItem";

function ToDoList({ todos, dispatch }) {
  return (
    <div className="todo-list">
      {todos.map((item) => (
        <ToDoItem key={item.id} todo={item} dispatch={dispatch} />
      ))}
    </div>
  );
}

export default ToDoList;
