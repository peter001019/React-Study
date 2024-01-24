import React from "react";
import "./App.css";

type Props = {
  value: any;
  onIncrement: () => void;
  onDecrement: () => void;
};

function App({ value, onIncrement, onDecrement }: Props) {
  return (
    <p>
      Clicked: {value} times <button onClick={onIncrement}>+</button>{" "}
      <button onClick={onDecrement}>-</button>
    </p>
  );
}

export default App;
