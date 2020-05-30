import React, { useState } from "react";
import { Link } from "react-router-dom"; // this is to link to our /chat

import "./Join.css";

// hooks are new edition to react based components.
// before function based components were just dummy components. But now with addition to hooks we can actually used state and lifecycle methods inside of them
const Join = () => {
  /*
  Hooks are declred inside of function based components only.
  Hooks are declared as follows.
  For hook paramerters are:
  name -> variable
  setName -> setter function
  "" -> initial value of a variable, in this case name
  */
  const [name, setName] = useState("");
  const [room, setRoom] = useState("");

  return (
    //className is use insted of class because this is js code not actual html
    <div className="joinOuterContainer">
      <div className="joinInnerContainer">
        <h1 className="heading">Join</h1>
        <div>
          <input
            placeholder="Name"
            className="joinInput"
            type="text"
            onChange={event => setName(event.target.value)}
          />
        </div>
        <div>
          <input
            placeholder="Room"
            className="joinInput mt-20"
            type="text"
            onChange={event => setRoom(event.target.value)}
          />
        </div>
        <Link
          onClick={event => (!name || !room ? event.preventDefault() : null)}
          to={`/chat?name=${name}&room=${room}`}
        >
          <button className="button mt-20" type="submit">
            Sign In
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Join;
