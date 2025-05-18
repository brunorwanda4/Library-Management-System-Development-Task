import axios from "axios";
import { useEffect, useState } from "react";
import { BsPeopleFill, BsPlus } from "react-icons/bs";
import DeleteMember from "../components/delete-member";
import { NavLink } from "react-router-dom";

const Members = () => {
  const [members, setMembers] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    let intervalId;

    const fetchData = async () => {
      try {
        const res = await axios.get("http://localhost:3012/members");
        if (res.data) {
          setMembers(res.data);
          setError("");
        }
      } catch (error) {
        const err = error.response?.data?.message || "Server error!";
        setError(err);
      }
    };
    fetchData();
    intervalId = setInterval(fetchData, 1000);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="c">
      <div className="flex justify-between items-center mb-10">
        <h1 className="flex space-x-2 items-center font-bold text-3xl">
          <BsPeopleFill /> <span>Members</span>
        </h1>
        <NavLink to={"/admin/members/add"} className="btn btn-secondary">
          <BsPlus /> Add Members
        </NavLink>
      </div>

      {error && <div className="alert alert-error">😔 {error}</div>}

      <table className="table table-zebra">
        <thead>
          <tr>
            <th>Id</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {members.map((item) => (
            <tr key={item.memberId}>
              <td>{item.memberId}</td>
              <td>{item.firstName}</td>
              <td>{item.lastName}</td>
              <td>{item.email}</td>
              <td>{item.phone}</td>
              <td className="flex flex-row gap-2">
                <DeleteMember member={item} />
                <NavLink
                  to={`/admin/members/edit/${item.memberId}`}
                  className="btn btn-sm btn-warning"
                >
                  Edit
                </NavLink>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Members;
