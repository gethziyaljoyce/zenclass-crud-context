import React, { useState, useContext } from "react";
import { UsersContext } from "./UsersContext";
import "./Create.css";
import { useHistory } from "react-router-dom";

function Create() {
  let history = useHistory();
  const [users, setUsers] = useContext(UsersContext);

  const [newUser, setNewUser] = useState({ name: "", imgSrc: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewUser((prev) => ({ ...prev, [name]: value }));
  };

  const addUser = async () => {
    const res = await fetch(
      "https://611f264e9771bf001785c73e.mockapi.io/users",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: newUser.name, avatar: newUser.imgSrc }),
      }
    );
    const data = await res.json();
    let newUsers = [...users];
    newUsers.push(data);
    setUsers(newUsers);
    history.push("/");
  };

  return (
    <div className="Create">
      <input
        onChange={handleChange}
        name="name"
        value={newUser.name}
        placeholder="Enter your name"
      /><br></br><br></br>
      <input
        onChange={handleChange}
        name="imgSrc"
        value={newUser.imgSrc}
        placeholder="Enter image source"
      /><br></br><br></br>
      <button onClick={addUser}>Add User</button>
    </div>
  );
}

export default Create;
