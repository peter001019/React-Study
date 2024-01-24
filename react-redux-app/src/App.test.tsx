import React from "react";
import { render, screen } from "@testing-library/react";
import App from "./App";
import { createStore } from "redux";
import counter from "./reducers";

const store = createStore(counter);

test("renders learn react link", () => {
  render(
    <App
      value={store.getState()}
      onIncrement={() => store.dispatch({ type: "INCREMENT" })}
      onDecrement={() => store.dispatch({ type: "DECREMENT" })}
    />
  );
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
