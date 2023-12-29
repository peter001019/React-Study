import "./App.css";
import { useState } from 'react';

export default function App() {

  const btnStyle = { //css를 객체로 적용
    color: "#fff",
    border: "none",
    padding: "5px 9px",
    borderRadius: "50%",
    cursor: "pointer",
    float: "right",
  };

  const listStyle = (completed) => { //css를 함수로 적용
    return {
      padding: "10px",
      borderBottom: "1px #ccc dotted",
      textDecoration: completed ? "line-through" : "none",
    };
  };

  const [todoData, setTodoData] = useState([]);
  const [value, setValue] = useState("");
  
  const handleClick = (id) => {
    let newTododata = todoData.filter((data) => data.id !== id);
    setTodoData(newTododata)
  };

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  const handleSubmit = (e) => {
    // form 안에 input을 전송할 때 페이지 리로드 되는 걸 막아줌
    e.preventDefault();

    // 새로운 할 일 데이터
    let newTodo = {
      id: Date.now(),
      title: value,
      completed: false,
    }

    // 원래 있던 할 일에 새로운 할 일 더해주기
    // 입력란에 있던 글씨 지워주기
    setTodoData(prev => [...prev, newTodo]);
    setValue("");
  };

  const handleCompleteChange = (id) => {
    let newTododata = todoData.map((data) => {
      if (data.id === id){
        data.completed = !data.completed;
      }
      return data;
    });
    setTodoData(newTododata);
  };

  return (
    <div className="container">
      <div className="todoBlock">
        <div className="title">
          <h1>할 일 목록</h1>
        </div>
          {todoData.map((data) => (
            <div style={listStyle(data.completed)} key={data.id}>
              <p>
                <input 
                  type="checkbox" 
                  onChange={() => handleCompleteChange(data.id)}
                  defaultChecked={false} 
                />{" "}
                {data.title}
                <button 
                  style={btnStyle} 
                  onClick={() => handleClick(data.id)}
                >
                  x
                </button>
              </p>
            </div>
          ))}
      </div>
      <form style={{ display: 'flex' }} onSubmit={handleSubmit}>
        <input
          type="text"
          name="value"
          style={{ flex: '10', padding: '5px' }}
          placeholder="해야 할 일을 입력하세요."
          value={value}
          onChange={handleChange}
        />
        <input
          type="submit"
          value="입력"
          className="btn"
          style={{ flex: '1' }}
        />
      </form>
    </div>
  );
}