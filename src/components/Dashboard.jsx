import React, { useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import {
  FaUser,
  FaUserPlus,
  FaClipboardList,
  FaBars,
  FaTimes,
} from "react-icons/fa";
import { FaFileWaveform } from "react-icons/fa6";
import { RiLogoutBoxLine } from "react-icons/ri";
import { FaUserDoctor } from "react-icons/fa6";

const Dashboard = ({ setIsAdmin }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsAdmin(false);
    navigate("/");
  };

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <div
        className={`${
          isSidebarOpen ? "w-56" : "w-16"
        } bg-teal-500 text-white p-4 shadow-lg transition-all duration-300`}
      >
        <div className="flex justify-between items-center">
          {isSidebarOpen ? (
            <h2 className="text-lg font-bold mb-4 text-center">Dashboard</h2>
          ) : null}
          <button
            onClick={toggleSidebar}
            className="text-white focus:outline-none"
          >
            {isSidebarOpen ? (
              <FaTimes className="text-xl" />
            ) : (
              <FaBars className="text-xl" />
            )}
          </button>
        </div>
        <nav>
          <ul>
            <li className="mb-3">
              <Link
                to="patients"
                className="block p-2 rounded hover:bg-teal-600 transition duration-300 text-sm"
              >
                {isSidebarOpen ? (
                  "Patients"
                ) : (
                  <FaUser className="text-2xl font-bold" />
                )}
              </Link>
            </li>
            <li className="mb-3">
              <Link
                to="add-patient"
                className="block p-2 rounded hover:bg-teal-600 transition duration-300 text-sm"
              >
                {isSidebarOpen ? (
                  "Add Patient"
                ) : (
                  <FaUserPlus className="text-2xl font-bold" />
                )}
              </Link>
            </li>
            <li className="mb-3">
              <Link
                to="authform"
                className="block p-2 rounded hover:bg-teal-600 transition duration-300 text-sm"
              >
                {isSidebarOpen ? (
                  "Prior Authorization Form"
                ) : (
                  <FaFileWaveform className="text-2xl font-bold" />
                )}
              </Link>
            </li>
            <li className="mb-3">
              <Link
                to="authform-list"
                className="block p-2 rounded hover:bg-teal-600 transition duration-300 text-sm"
              >
                {isSidebarOpen ? (
                  "Prior Authorization List"
                ) : (
                  <FaClipboardList className="text-2xl font-bold" />
                )}
              </Link>
            </li>
            <li className="mb-3">
              <button
                onClick={handleLogout}
                className="block w-full text-left p-2 rounded hover:bg-teal-600 transition duration-300 text-sm"
              >
                {isSidebarOpen ? (
                  "Logout"
                ) : (
                  <RiLogoutBoxLine className="text-2xl font-bold" />
                )}
              </button>
            </li>
          </ul>
        </nav>
      </div>

      <div className=" flex-1 p-6 bg-gray-100">
        <h1 className="text-3xl font-bold text-center italic mb-6 text-teal-700 p-2">
          <span className="flex justify-center items-center gap-2">
            Patient Health Dashboard <FaUserDoctor />
          </span>
        </h1>
        <Outlet />
      </div>
    </div>
  );
};

export default Dashboard;
