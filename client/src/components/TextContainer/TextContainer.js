import React from "react";
import ScrollToBottom from "react-scroll-to-bottom";

import "./TextContainer.css";

import onlineIcon from "../icons/onlineIcon.png";

const TextContainer = ({ users }) => (
  <div className="textContainer">
    <div>
      <h2>
        Real Time Chat Application{" "}
        <span className="emoj" role="img" aria-label="chat">
          💬
        </span>
      </h2>
      <h4>
        Created with React, Express and Socket.io{" "}
        <span className="emoj" role="img" aria-label="heart">
          🧡
        </span>
      </h4>
      <h4>
        Try it out right now!{" "}
        <span className="arrow" role="img" aria-label="arrow">
          ⬅
        </span>
      </h4>
    </div>
    {users ? (
      <ScrollToBottom>
        <h2>People currently chatting:</h2>
        <div className="activeContainer">
          <h4>
            {users.map(({ name, i }) => (
              <div key={i} className="activeItem">
                {name}
                <img alt="Online Icon" src={onlineIcon} />
              </div>
            ))}
          </h4>
        </div>
      </ScrollToBottom>
    ) : null}
  </div>
);
export default TextContainer;
