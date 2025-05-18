import axios from "axios";
import { useEffect, useState } from "react";
import { BsPeople, BsPeopleFill, BsPlus } from "react-icons/bs";
import DeleteMember from "../components/delete-member";
import { NavLink } from "react-router-dom";

const Members = () => {
  const [members, setMembers] = useState([]);
  const [error, setError] = useState("");
  useEffect(() => {
    const fetchData = async () => {
      try {
        const req = await axios.get("http://localhost:3012/members");
        if (req.data) {
          setMembers(req.data);
        }
      } catch (error) {
        const err = error.response?.data?.message || "Server error!";
        setError(err);
      }
    };

    fetchData();
  }, []);
  return (
    <div className=" c">
      <div className=" flex justify-between items-center mb-10">
        <h1 className=" flex space-x-2 items-center font-bold text-3xl">
          <BsPeopleFill /> <span>Members</span>
        </h1>
        <NavLink to={"/admin/members/add"} className=" btn btn-secondary">
          <BsPlus /> Add Members
        </NavLink>
      </div>
      {error && <div className=" alert alert-error"> 😔 {error} </div>}
      <table className=" table table-zebra">
        <tHead>
          <tr>
            <td>Id</td>
            <td>First Name</td>
            <td>Last Name</td>
            <td>email</td>
            <td>Phone</td>
            <td>Action</td>
          </tr>
        </tHead>
        <tbody>
          {members.map((item) => {
            return (
              <tr>
                <td>{item.memberId}</td>
                <td>{item.firstName}</td>
                <td>{item.lastName}</td>
                <td>{item.email}</td>
                <td>{item.phone}</td>
                <td className=" flex flex-row gap-2 space-x-2">
                  <DeleteMember member={item} />
                  <NavLink
                    to={`/admin/members/edit/${item.memberId}`}
                    className="  btn btn-sm btn-warning"
                  >
                    Edit
                  </NavLink>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Members;
