import React from "react";

const List = React.memo(({
  todoData,
  setTodoData,
  id,
  title,
  completed,
  provided,
  snapshot,
}) => {
  const handleClick = (id) => {
    let newTododata = todoData.filter((data) => data.id !== id);
    setTodoData(newTododata);
  };

  const handleCompleteChange = (id) => {
    let newTododata = todoData.map((data) => {
      if (data.id === id) {
        data.completed = !data.completed;
      }
      return data;
    });
    setTodoData(newTododata);
  };
  return (
    <div
      key={id}
      {...provided.draggableProps}
      ref={provided.innerRef}
      {...provided.dragHandleProps}
      className={`${
        snapshot.isDragging ? "bg-gray-400" : "bg-gray-100"
      } flex items-center justify-between w-full px-4 py-1 my-2 text-gray-600 bg-gray-100 border rounded`}
    >
      <div className="items-center">
        <input
          type="checkbox"
          onChange={() => handleCompleteChange(id)}
          defaultChecked={false}
        />{" "}
        <span className={completed ? "line-through" : undefined}>{title}</span>
      </div>
      <div className="items-center">
        <button onClick={() => handleClick(id)}>x</button>
      </div>
    </div>
  );
});

export default List;
