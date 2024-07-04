import React, { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

import { useDispatch } from "react-redux";
import { createUser } from "../Store/action/userActions";

const CreateUser = ({ close, fetchUserList }) => {
  const dispatch = useDispatch();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const token = localStorage.getItem("access-token");

  const validateInputs = () => {
    if (!firstName || !lastName || !email || !password) {
      toast.error("All fields are required");
      return false;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      toast.error("Invalid email format");
      return false;
    }

    // Password length validation
    if (password.length < 6) {
      toast.error("Password must be at least 6 characters long");
      return;
    }
    return true;
  };

  const handleCreateUser = async (e) => {
    e.preventDefault(); // Prevent form submission
    if (!validateInputs()) {
      return;
    }
    dispatch(createUser({ firstName, lastName, email, password }))
      .then(() => {
        toast.success("User created Successfully");
        fetchUserList(); // Call fetchUserList to update the user list
        setTimeout(() => {
          close();
        }, 2000);
      })
      .catch((error) => {
        if (error.response && error.response.data && error.response.data.msg) {
          toast.error(error.response.data.msg);
        } else {
          toast.error("An unexpected error occurred");
        }
        console.error("Error creating user:", error);
      });
  };

  // Close modal only when clicking on the close icon
  const handleClose = (e) => {
    e.stopPropagation(); // Prevent propagation to parent elements
    close(); // Call the close function passed via props
  };

  return (
    <div className="w-full" onClick={(e) => e.stopPropagation()}>
      <div className="flex flex-col xs:mx-auto my-4 mt-12 sm:mx-auto p-6 max-w-[380px] px-8 border rounded-lg shadow-xl lessThan440:mx-auto bg-white lessThan440:border-none lessThan440:shadow-none mx-auto">
        <p onClick={handleClose} className="text-xl cursor-pointer text-right">
          <FontAwesomeIcon icon={faTimes} />
        </p>
        <h1 className="font-bold text-2xl text-center">Create User</h1>

        {/* Input Div */}
        <form onSubmit={handleCreateUser}>
          <div className="flex flex-col gap-4 mt-8">
            <input
              className="px-8 py-4 border border-gray-200 rounded-lg bg-gray-100 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              placeholder="First Name"
              onClick={(e) => e.stopPropagation()}
            />
            <input
              className="px-8 py-4 border border-gray-200 rounded-lg bg-gray-100 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              placeholder="Last Name"
              onClick={(e) => e.stopPropagation()}
            />
            <input
              className="px-8 py-4 border border-gray-200 rounded-lg bg-gray-100 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              onClick={(e) => e.stopPropagation()}
            />
            <input
              className="px-8 py-4 border border-gray-200 rounded-lg bg-gray-100 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              onClick={(e) => e.stopPropagation()}
            />

            <button
              onClick={(e) => e.stopPropagation()}
              type="submit" // Specify type as "submit" to trigger form submission
              className="mt-3 py-4 tracking-wide font-semibold bg-purple-600 text-gray-100 border rounded-lg hover:bg-purple-700 transition-all duration-300 ease-in-out"
            >
              Create User
            </button>
          </div>
        </form>
        <ToastContainer />
      </div>
    </div>
  );
};

export default CreateUser;
