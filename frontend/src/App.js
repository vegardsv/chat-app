import React, { useState, useEffect, useReducer } from "react";

const io = require("socket.io-client");
const socket = io("http://localhost:3333");

const initialState = [];

function reducer(state, action) {
  switch (action.type) {
    case "add":
      return state.concat(action.payload);
    default:
      throw new Error();
  }
}

const App = () => {
  const [textBox, setTextBox] = useState("");
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    socket.on("yo", payload => {
      dispatch({
        type: "add",
        payload
      });
    });
    return () => socket.close();
  }, []);

  return (
    <div>
      <pre>{JSON.stringify(state, null, 2)}</pre>
      <ul>
        {state.map((x, idx) => (
          <li key={idx}>{x}</li>
        ))}
      </ul>
      <form
        onSubmit={e => {
          e.preventDefault();
          socket.emit("chat message", textBox);
        }}
      >
        <input
          type="text"
          value={textBox}
          onChange={e => setTextBox(e.target.value)}
        />
        <input type="submit" />
      </form>
    </div>
  );
};

export default App;
