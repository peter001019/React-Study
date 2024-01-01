import React, { useState } from "react";

const List = React.memo(
  ({
    todoData,
    setTodoData,
    id,
    title,
    completed,
    provided,
    snapshot,
    handleClick,
  }) => {
    const [isEditing, setisEditing] = useState(false);
    const [editedTitle, seteditedTitle] = useState(title);

    console.log("List Component");

    const handleCompleteChange = (id) => {
      let newTododata = todoData.map((data) => {
        if (data.id === id) {
          data.completed = !data.completed;
        }
        return data;
      });
      setTodoData(newTododata);
      localStorage.setItem("todoData", JSON.stringify(newTododata));
    };

    const handleEditChange = (e) => {
      seteditedTitle(e.target.value);
    };

    const handleSubmit = () => {
      let newTododata = todoData.map((data) => {
        if(data.id === id)
          data.title = editedTitle;
        return data;
      });
      setTodoData(newTododata);
      localStorage.setItem("todoData", JSON.stringify(newTododata));
      setisEditing(false);
    };

    if (isEditing) {
      return (
        <div className="flex items-center justify-between w-full px-4 py-1 my-2 text-gray-600 bg-gray-100 border rounded">
          <div className="items-center">
            <form onSubmit={handleSubmit}>
              <input
                value={editedTitle}
                className="w-full px-3 py-2 mr-4 text-gray-500 rounded"
                onChange={handleEditChange}
              />
            </form>
          </div>
          <div className="items-center">
            <button
              className="float-right px-4 py-2"
              onClick={() => handleClick(id)}
            >
              x
            </button>
            <button
              className="float-right px-4 py-2"
              type="submit"
              onClick={handleSubmit}
            >
              save
            </button>
          </div>
        </div>
      );
    } else {
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
            <span className={completed ? "line-through" : undefined}>
              {title}
            </span>
          </div>
          <div className="items-center">
            <button
              className="float-right px-4 py-2"
              onClick={() => handleClick(id)}
            >
              x
            </button>
            <button
              className="float-right px-4 py-2"
              onClick={() => setisEditing(true)}
            >
              edit
            </button>
          </div>
        </div>
      );
    }
  }
);

export default List;
