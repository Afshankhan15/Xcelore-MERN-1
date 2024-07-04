import React, { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { useDispatch } from "react-redux";
import { updateUser } from "../Store/action/userActions";

const UpdateUser = ({
  close,
  fName,
  lName,
  updateEmail,
  userId,
  fetchUserList,
}) => {
  const dispatch = useDispatch(); // Initialize useDispatch hook

  const [firstName, setFirstName] = useState(fName);
  const [lastName, setLastName] = useState(lName);
  const [email, setEmail] = useState(updateEmail);

  const handleUpdateUser = async (e) => {
    e.preventDefault(); // Prevent form submission
    dispatch(updateUser(userId, { firstName, lastName, email }))
      .then(() => {
        const toastId = toast.success("User updated Successfully");
        fetchUserList(); // Call fetchUserList to update the user list
        setTimeout(() => {
          close();
          toast.dismiss(toastId); // Dismiss the toast after closing the modal
        }, 2000);
      })

      .catch((error) => {
        if (error.response && error.response.data && error.response.data.msg) {
          toast.error(error.response.data.msg);
        } else {
          toast.error("An unexpected error occurred");
        }
        console.error("Error updating user:", error);
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
        <h1 className="font-bold text-2xl text-center">Update User</h1>

        {/* Input Div */}
        <form onSubmit={handleUpdateUser}>
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

            <button
              onClick={(e) => e.stopPropagation()}
              type="submit" // Specify type as "submit" to trigger form submission
              className="mt-3 py-4 tracking-wide font-semibold bg-green-600 text-gray-100 border rounded-lg hover:bg-green-700 transition-all duration-300 ease-in-out"
            >
              Update User
            </button>
          </div>
        </form>
        <ToastContainer />
      </div>
    </div>
  );
};

export default UpdateUser;
