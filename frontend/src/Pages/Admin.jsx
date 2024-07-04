import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import CreateUser from "../Services/CreateUser";
import UpdateUser from "../Services/UpdateUser";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTrashCan,
  faPenToSquare,
  faUserPlus,
  faPowerOff,
  faMagnifyingGlass,
  faArrowLeft,
  faArrowRight,
} from "@fortawesome/free-solid-svg-icons";

import { useDispatch, useSelector } from "react-redux";
import { fetchUsers, deleteUser } from "../Store/action/userActions";

import useDebounce from "../Components/useDebounce";
const Admin = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.UserResponseIndex.users);

  const [IsPopupOpenUser, setIsPopupOpenUser] = useState(false);
  const [IsPopupOpenUpdate, setIsPopupOpenUpdate] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const debouncedSearch = useDebounce(search, 500); // 500ms debounce delay
  const usersPerPage = 5;

  useEffect(() => {
    fetchUserList(debouncedSearch);
  }, [debouncedSearch]);

  const fetchUserList = (search = "") => {
    dispatch(fetchUsers(search));
  };

  const togglePopupUser = () => {
    setIsPopupOpenUser(!IsPopupOpenUser);
  };

  const togglePopupUpdate = (user) => {
    setSelectedUser(user);
    setIsPopupOpenUpdate(!IsPopupOpenUpdate);
  };

  const handleDeleteUser = async (userId) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        await dispatch(deleteUser(userId));
        toast.success("User deleted successfully");
        fetchUserList(debouncedSearch); // Refresh the user list after deletion
      } catch (error) {
        toast.error("Failed to delete user");
      }
    }
  };

  const logoutUser = () => {
    localStorage.removeItem("access-token");
    toast.success("Logged out successfully");
    setTimeout(() => {
      navigate("/login");
    }, 1000);
  };

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < Math.ceil(userData.length / usersPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  // Calculate the users to display on the current page
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = userData.slice(indexOfFirstUser, indexOfLastUser);

  return (
    <div className="font-sans">
      <ToastContainer />
      <div className="w-full bg-slate-200 flex justify-between p-3">
        <h1 className="text-center text-2xl font-bold">Admin Panel</h1>
        <div className="flex gap-2 items-center justify-center">
          <button
            onClick={togglePopupUser}
            className="py-1 px-2 tracking-wide font-semibold border rounded-lg hover:text-white hover:bg-gray-900 transition-all duration-300 ease-in-out"
          >
            <FontAwesomeIcon icon={faUserPlus} />
            {IsPopupOpenUser && (
              <Modal
                isOpen={IsPopupOpenUser}
                onRequestClose={togglePopupUser}
                className="w-full h-full flex justify-center items-center border-none lessThan440:justify-start lessThan440:items-start"
              >
                <CreateUser
                  close={togglePopupUser}
                  fetchUserList={fetchUserList}
                />
              </Modal>
            )}
          </button>
          <p
            onClick={logoutUser}
            className="cursor-pointer py-1 px-2 border rounded-lg hover:text-white hover:bg-gray-900 transition-all duration-300 ease-in-out"
          >
            <FontAwesomeIcon icon={faPowerOff} />
          </p>
        </div>
      </div>

      <div className="w-full flex justify-center items-center my-4">
        <input
          className="border rounded p-2 px-4 w-[50%] pr-14 focus:bg-gray-50"
          placeholder="Search"
          value={search}
          onChange={handleSearchChange}
          type="text"
        />
        <p className="-ml-10">
          {" "}
          <FontAwesomeIcon icon={faMagnifyingGlass} />
        </p>
      </div>

     <div className="w-full md:w-[90%] mx-auto overflow-x-auto">
     <table className="w-full border-collapse border border-gray-300 table-fixed">
        <thead className="border-b border-neutral-200 bg-[#332D2D] font-medium text-white dark:border-white/10">
          <tr>
            <th className="border border-gray-300 px-2 md:px-4 py-2 font-sans break-words">
              First Name
            </th>
            <th className="border border-gray-300 px-2 md:px-4 py-2 font-sans break-words">
              Last Name
            </th>
            <th className="border border-gray-300 px-2 md:px-4 py-2 font-sans break-words">
              Email
            </th>
            <th className="border border-gray-300 px-2 md:px-4 py-2 font-sans break-words">
              Actions
            </th>
          </tr>
        </thead>

        <tbody>
          {currentUsers.map((user, idx) => (
            <tr
              key={idx}
              className={`${
                idx % 2 === 0 ? "bg-gray-100" : "bg-white"
              } hover:bg-gray-200 border-b border-neutral-200 dark:border-white/10 cursor-pointer`}
            >
              <td className="border border-gray-300 px-2 py-2 text-center break-word">
                {user.firstName}
              </td>
              <td className="border border-gray-300 px-2 py-2 text-center break-word">
                {user.lastName}
              </td>
              <td className="border border-gray-300 px-2 py-2 text-center break-words">
                {user.email}
              </td>

              <td className="border border-gray-300 px-2 py-2 text-center break-words">
                <button
                  onClick={() => togglePopupUpdate(user)}
                  className="mr-4"
                  title="Edit"
                >
                  <p className="text-[18px] text-blue-600 cursor-pointer">
                    <FontAwesomeIcon icon={faPenToSquare} />
                  </p>
                </button>
                <button
                  onClick={() => handleDeleteUser(user._id)}
                  className="mr-4"
                  title="Delete"
                >
                  <p className="text-[18px] text-red-600 cursor-pointer">
                    <FontAwesomeIcon icon={faTrashCan} />
                  </p>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
     </div>

      <div className="flex justify-center items-center my-4">
        <button
          onClick={handlePreviousPage}
          disabled={currentPage === 1}
          className="px-4 py-2 mx-1 text-white bg-blue-500 rounded disabled:bg-gray-300"
        >
          <FontAwesomeIcon icon={faArrowLeft} />
        </button>
        <span className="px-4 py-2 mx-1">{currentPage}</span>
        <button
          onClick={handleNextPage}
          disabled={currentPage === Math.ceil(userData.length / usersPerPage)}
          className="px-4 py-2 mx-1 text-white bg-blue-500 rounded disabled:bg-gray-300"
        >
          <FontAwesomeIcon icon={faArrowRight} />
        </button>
      </div>

      {selectedUser && (
        <Modal
          isOpen={IsPopupOpenUpdate}
          onRequestClose={togglePopupUpdate}
          className="w-full h-full flex justify-center items-center border-none lessThan440:justify-start lessThan440:items-start"
        >
          <UpdateUser
            close={togglePopupUpdate}
            fName={selectedUser.firstName}
            lName={selectedUser.lastName}
            updateEmail={selectedUser.email}
            userId={selectedUser._id}
            fetchUserList={fetchUserList}
          />
        </Modal>
      )}
    </div>
  );
};

export default Admin;
