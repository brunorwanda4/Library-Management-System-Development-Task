import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import { BsGrid, BsPeople, BsPeopleFill } from "react-icons/bs";
import { FaBook, FaPeopleArrows } from "react-icons/fa";
import { IoIosLogOut } from "react-icons/io";
import useAuth from "../hooks/useAuth";
// import useAuth from "../hooks/useAuth";

const Sidebar = () => {
  const location = useLocation();
  const { logout } = useAuth();

  const isActive = (path) => location.pathname === path;

  return (
    <aside className=" flex flex-col justify-between px-2 space-y-4 py-2 w-96 h-screen bg-base-100 border-r shadow-xl border-r-base-content/20">
      <div className=" ">
        <h2 className=" font-bold text-2xl flex space-x-2 items-center">
          <span>Library</span> {"  "}{" "}
          <span className=" text-secondary">MS</span>
        </h2>
        <div className=" space-y-2 mt-4">
          <NavLink
            to={"/admin/dashboard"}
            className={` btn  justify-start w-full ${
              isActive("/admin/dashboard") ? " btn-secondary" : " btn-ghost"
            }`}
          >
            <BsGrid size={24} /> Dashboard
          </NavLink>
          <NavLink
            to={"/admin/loans"}
            className={` btn  justify-start w-full ${
              isActive("/admin/loans") ? " btn-secondary" : " btn-ghost"
            }`}
          >
            <FaPeopleArrows size={24} /> Loans
          </NavLink>
          <NavLink
            to={"/admin/members"}
            className={` btn  justify-start w-full ${
              isActive("/admin/members") ? " btn-secondary" : " btn-ghost"
            }`}
          >
            <BsPeopleFill size={24} /> Members
          </NavLink>
          <NavLink
            to={"/admin/medias"}
            className={` btn  justify-start w-full ${
              isActive("/admin/medias") ? " btn-secondary" : " btn-ghost"
            }`}
          >
            <FaBook size={24} /> Medias
          </NavLink>
          <NavLink
            to={"/admin/users"}
            className={` btn  justify-start w-full ${
              isActive("/admin/users") ? " btn-secondary" : " btn-ghost"
            }`}
          >
            <BsPeople size={24} /> Users
          </NavLink>
        </div>
      </div>
      <button
        onClick={logout}
        className=" btn text-error btn-ghost w-full justify-start"
      >
        <IoIosLogOut size={24} /> Logout{" "}
      </button>
    </aside>
  );
};

export default Sidebar;
