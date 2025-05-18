import { useEffect, useState } from "react";
import axios from "axios";
import { BsPeople, BsPlus } from "react-icons/bs";
import { NavLink } from "react-router-dom";
import DeleteUser from "../components/delete-user";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    let intervalId;

    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3012/users");
        if (response.data) {
          setUsers(response.data);
          setError("");
        }
      } catch (err) {
        const message = err.response?.data?.message || "Server error!";
        setError(message);
      }
    };

    fetchData();
    intervalId = setInterval(fetchData, 1000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="p-4 c">
      <div className="flex justify-between items-center mb-6">
        <h1 className="flex items-center gap-2 text-3xl font-bold">
          <BsPeople />
          <span>Users</span>
        </h1>
        <NavLink to="/admin/users/add" className="btn btn-secondary">
          <BsPlus />
          Add Users
        </NavLink>
      </div>

      {error && <div className="alert alert-error mb-4">😔 {error}</div>}

      <div className="overflow-x-auto">
        <table className="table table-zebra w-full">
          <thead>
            <tr>
              <th>Id</th>
              <th>Username</th>
              <th>Role</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.userId}>
                <td>{user.userId}</td>
                <td>{user.userName}</td>
                <td>{user.role}</td>
                <td>
                  <div className="flex gap-2">
                    <DeleteUser user={user} />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Users;
