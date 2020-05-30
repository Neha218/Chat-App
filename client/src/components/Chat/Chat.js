import React, { useState, useEffect } from "react";
// useState and useEffects are hooks components used for lifecycle

import queryString from "query-string";
// queryString is to access the data from url

import io from "socket.io-client";
import "./Chat.css";
import InfoBar from "../InfoBar/InfoBar";
import Input from "../Input/Input";
import Messages from "../Messages/Messages";
import TextContainer from "../TextContainer/TextContainer";

let socket;

const Chat = ({ location }) => {
  const [name, setName] = useState("");
  const [room, setRoom] = useState("");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [users, setUsers] = useState([]);
  const ENDPOINT = "https://chat-nb.herokuapp.com/"; // this port is the one which we are using for the server

  // useEffect is alternative to componentDidMount and componentDidUpdate
  useEffect(() => {
    // following lines - to retrive data that user entered while joining
    // location comes from react-router and with this we get url
    /*
    Alternative to following- below instead of data, name and room separate vaiables are used
    const data = queryString.parse(location.search);
    console.log(location.search); // this gives query parameters from the url insted of the complete url
    console.log(data); // this gives json of the query parameter values
    */
    const { name, room } = queryString.parse(location.search);
    // when we get our first connection, we will pass endpoint to the server
    socket = io(ENDPOINT);
    setName(name);
    setRoom(room);
    socket.emit("join", { name, room }, () => {}); // this is to emit events. This means on join. And we are going to use this on server side in index.js
    return () => {
      socket.emit("disconnect");
      socket.off();
    };
  }, [ENDPOINT, location.search]);

  useEffect(() => {
    socket.on("message", message => {
      setMessages(messages => [...messages, message]); // spread all other messages and add one message on it
    });
    socket.on("roomData", ({ users }) => {
      setUsers(users);
    });
  }, []);

  // function for sending messages
  const sendMessage = event => {
    event.preventDefault(); // when key is pressed it is going to refresh while page. To avoid, this line is used
    if (message) {
      socket.emit("sendMessage", message, () => setMessage(""));
    }
  };

  console.log(message, messages);

  return (
    <div className="outerContainer">
      <div className="container">
        <InfoBar room={room} />
        <Messages messages={messages} name={name} />
        <Input
          message={message}
          setMessage={setMessage}
          sendMessage={sendMessage}
        />
      </div>
      <TextContainer users={users} />
    </div>
  );
};

export default Chat;
