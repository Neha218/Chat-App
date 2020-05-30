const users = [];

const addUser = ({ id, name, room }) => {
  /*
    Step1: Change the room name
    Example- room = Java Script
    then change it to room = javascript
    i.e. all lower case with no space
    */
  name = name.trim().toLowerCase();
  room = room.trim().toLowerCase();

  /* 
   check whether the username entered by new user already exist or not
   */
  const existingUser = users.find(
    user => user.room === room && user.name === name
  );

  if (existingUser) {
    return { error: "Username is taken" };
  }

  const user = { id, name, room };
  users.push(user);
  return { user };
};

const removeUser = id => {
  const index = users.findIndex(user => user.id === id);
  if (index != -1) {
    return users.splice(index, 1)[0];
  }
};

const getUser = id => users.find(user => user.id === id);

const getUsersInRoom = room => users.filter(user => user.room === room);

module.exports = { addUser, removeUser, getUser, getUsersInRoom };
