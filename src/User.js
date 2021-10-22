import React from "react";
import { useState, useEffect, useContext } from "react";
import "./User.css";
import { UsersContext } from "./UsersContext";
import { useHistory } from "react-router-dom";

function User({ match }) {
  //for enabling editing container and button
  const [edit, setEdit] = useState({
    divEdit: false,
    buttonName: "Enable Edit",
  });

  // for updating the user-information
  const [editUser, setEditUser] = useState({ name: "", imgSrc: "" });

  let history = useHistory();
  const [users, setUsers] = useContext(UsersContext);
  const [user, setUser] = useState([]);

  //get particular user
  useEffect(() => {
    const fetchDataUser = async () => {
      const res = await fetch(
        `https://611f264a9771bf001785c738.mockapi.io/users/${match.params.id}`
      );
      const user = await res.json();
      // console.log(user);
      setUser(user);
    };
    fetchDataUser();
    
  });

  //delete user
  const deleteUser = async (id) => {
    await fetch(`https://611f264a9771bf001785c738.mockapi.io/users/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
     
    });

    let newUsers = [...users];
    newUsers = newUsers.filter((user) => user.id !== id);
    setUsers(newUsers);
    history.push("/");
  };

  // enabling edit-user-container and changing button name
  const handleEdit = () => {
    if (edit.divEdit) {
      setEdit((prev) => ({
        ...prev,
        divEdit: false,
        buttonName: "Enable Edit",
      }));
    } else {
      setEdit((prev) => ({
        ...prev,
        divEdit: true,
        buttonName: "Disable Edit",
      }));
    }
  };

  //setting input for updating users
  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditUser((prev) => ({ ...prev, [name]: value }));
  };

  //PUT request
  const updateUser = async (id) => {
    const res = await fetch(
      `https://611f264a9771bf001785c738.mockapi.io/users/${id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: editUser.name, avatar: editUser.imgSrc }),
      }
    );
    const data = await res.json();

    //displaying data on front-end after updating and moving to homepage
    let newUsers = [...users];
    let index = newUsers.findIndex((user) => user.id === id);
    newUsers[index] = data;
    setUsers(newUsers);
    history.push("/");
  };

  return (
    <div className="User">
      <h2> {user.name} </h2>
      <p>
        <img src={user.avatar} alt="img" />
      </p>
      <button onClick={() => deleteUser(user.id)} className="btn">
        Delete
      </button>
      <button onClick={handleEdit} className="btn">
        {edit.buttonName}
      </button>

      {edit.divEdit && (
        <div className="update-user-container">
          <input
            onChange={handleChange}
            name="name"
            value={editUser.name}
            placeholder="Enter your name"
          /><br></br><br></br>
          <input
            onChange={handleChange}
            name="imgSrc"
            value={editUser.imgSrc}
            placeholder="Enter image source"
          /><br></br><br></br>
          <button className="btn" onClick={() => updateUser(user.id)}>Update </button><br></br><br></br>
        </div>
      )}
    </div>
  );
}

export default User;
