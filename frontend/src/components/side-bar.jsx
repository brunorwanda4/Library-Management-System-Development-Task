import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import { BsBook, BsGrid, BsPeople, BsPeopleFill } from "react-icons/bs";
import { FaBook, FaPeopleArrows } from  "react-icons/fa"
const Sidebar = () => {
  const location = useLocation();

  const isActive = (path) => location.pathname === path;
  return (
    <aside className="">
      <div className=" px-2 space-y-4 py-2 w-64 h-screen bg-base-100 border-r shadow-xl border-r-base-content/20">
        <h2 className=" font-bold text-2xl flex space-x-2 items-center">
          <span>Library</span> {"  "}{" "}
          <span className=" text-secondary">MS</span>
        </h2>
        <div className=" space-y-2">
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
            to={"/admin/medias"}
            className={` btn  justify-start w-full ${
              isActive("/admin/medias") ? " btn-secondary" : " btn-ghost"
            }`}
          >
            <BsPeople size={24} /> Users
          </NavLink>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
