import React, { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import {
  BsGrid,
  BsPeople,
  BsPeopleFill,
  BsPerson,
  BsList,
  BsX,
} from "react-icons/bs";
import { FaBook, FaPeopleArrows } from "react-icons/fa";
import { IoIosLogOut } from "react-icons/io";
import useAuth from "../hooks/useAuth";

const Sidebar = () => {
  const location = useLocation();
  const { logout, user } = useAuth();
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const isActive = (path) => location.pathname === path;

  const toggleMobileMenu = () => {
    setIsMobileOpen(!isMobileOpen);
  };

  return (
    <>
      {/* Mobile menu button */}
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <button onClick={toggleMobileMenu} className="btn btn-square btn-sm">
          {isMobileOpen ? <BsX size={24} /> : <BsList size={24} />}
        </button>
      </div>

      {/* Sidebar */}
      <aside
        className={`fixed lg:static flex flex-col justify-between px-2 space-y-4 py-2 w-80 h-screen bg-base-100 border-r shadow-xl border-r-base-content/20 transform transition-transform duration-300 ease-in-out ${
          isMobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        } z-40`}
      >
        <div>
          <h2 className="font-bold text-2xl flex space-x-2 items-center p-2">
            <span>Library</span> <span className="text-secondary">MS</span>
          </h2>
          <div className="space-y-2 mt-4">
            <NavLink
              to={"/admin/dashboard"}
              className={`btn justify-start w-full ${
                isActive("/admin/dashboard") ? "btn-secondary" : "btn-ghost"
              }`}
              onClick={() => setIsMobileOpen(false)}
            >
              <BsGrid size={20} /> <span className="ml-2">Dashboard</span>
            </NavLink>
            <NavLink
              to={"/admin/loans"}
              className={`btn justify-start w-full ${
                isActive("/admin/loans") ? "btn-secondary" : "btn-ghost"
              }`}
              onClick={() => setIsMobileOpen(false)}
            >
              <FaPeopleArrows size={20} /> <span className="ml-2">Loans</span>
            </NavLink>
            <NavLink
              to={"/admin/members"}
              className={`btn justify-start w-full ${
                isActive("/admin/members") ? "btn-secondary" : "btn-ghost"
              }`}
              onClick={() => setIsMobileOpen(false)}
            >
              <BsPeopleFill size={20} /> <span className="ml-2">Members</span>
            </NavLink>
            <NavLink
              to={"/admin/medias"}
              className={`btn justify-start w-full ${
                isActive("/admin/medias") ? "btn-secondary" : "btn-ghost"
              }`}
              onClick={() => setIsMobileOpen(false)}
            >
              <FaBook size={20} /> <span className="ml-2">Medias</span>
            </NavLink>
            <NavLink
              to={"/admin/users"}
              className={`btn justify-start w-full ${
                isActive("/admin/users") ? "btn-secondary" : "btn-ghost"
              }`}
              onClick={() => setIsMobileOpen(false)}
            >
              <BsPeople size={20} /> <span className="ml-2">Users</span>
            </NavLink>
          </div>
        </div>
        <div>
          <NavLink
            to={"/admin/profile"}
            className={`btn items-center justify-start w-full ${
              isActive("/admin/profile") ? "btn-secondary" : "btn-ghost"
            }`}
            onClick={() => setIsMobileOpen(false)}
          >
            <BsPerson size={20} />
            <span className="ml-2 capitalize font-medium">
              {user?.username}
            </span>
          </NavLink>
          <button
            onClick={() => {
              logout();
              setIsMobileOpen(false);
            }}
            className="btn text-error btn-ghost w-full justify-start"
          >
            <IoIosLogOut size={20} /> <span className="ml-2">Logout</span>
          </button>
        </div>
      </aside>

      {/* Overlay for mobile */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 bg-black/50 bg-opacity-50 z-30 lg:hidden"
          onClick={() => setIsMobileOpen(false)}
        />
      )}
    </>
  );
};

export default Sidebar;
