import React from "react";
import { useContext } from "react";
import "./Users.css";
import { Link } from "react-router-dom";
import { UsersContext } from "./UsersContext";

function Users() {
  const [users] = useContext(UsersContext);

  let mystyle = { textDecoration: "none" };
  return (
    <div className="Users">
      {users.map((user) => {
        return (
          <Link style={mystyle} to={`/user/${user.id}`}>
            <h3 key={user.id}> {user.name}</h3>
          </Link>
        );
      })}
    </div>
  );
}

export default Users;
