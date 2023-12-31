import React from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import List from "./List";

const Lists = React.memo(({ todoData, setTodoData, handleClick }) => {
  console.log("Lists Component");
  
  const handleEnd = (result) => {
    //result 매개변수에는 source 항목 및 대상 위치와 같은 드래그 이벤트에 대한 정보가 포함됩니다.
    console.log(result);
    //목적지가 없으면(이벤트 취소) 이 함수를 종료합니다.
    if (!result.destination) return;

    //리액트 불변성을 지켜주기 위해 새로운 todoData 생성
    const newTododata = todoData;

    //1. 변경시키는 아이템을 배열에서 지워줍니다.
    //2. return 값으로 지워진 아이템을 잡아줍니다.
    const [reorderedItem] = newTododata.splice(result.source.index, 1);

    //원하는 자리에 reorderedItem을 insert 해줍니다.
    newTododata.splice(result.destination.index, 0, reorderedItem);
    setTodoData(newTododata);
    localStorage.setItem("todoData", JSON.stringify(newTododata));
  };

  return (
    <div>
      <DragDropContext onDragEnd={handleEnd}>
        <Droppable droppableId="to-do">
          {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef}>
              {todoData.map((data, index) => (
                <Draggable
                  key={data.id}
                  draggableId={data.id.toString()}
                  index={index}
                >
                  {(provided, snapshot) => (
                    <List
                      todoData={todoData}
                      setTodoData={setTodoData}
                      id={data.id}
                      title={data.title}
                      completed={data.completed}
                      provided={provided}
                      snapshot={snapshot}
                      handleClick={handleClick}
                    ></List>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  )
});

export default Lists