import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const Register = () => {
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const registerUser = async () => {
    // Simple validation checks
    if (!firstName || !lastName || !email || !password) {
      toast.error("All fields are required");
      return;
    }

    // Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error("Invalid email format");
      return;
    }

    // Password length validation
    if (password.length < 6) {
      toast.error("Password must be at least 6 characters long");
      return;
    }
    try {
      const res = await axios.post("http://localhost:4000/api/auth/register", {
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: password,
      });
      console.log(res);
      if (res.status === 201) {
        toast.success("Admin Registered Successfully");
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      } else {
        toast.error("Something went wrong");
      }
    } catch (error) {
      if (error.response && error.response.data && error.response.data.msg) {
        toast.error(error.response.data.msg);
      } else {
        toast.error("An unexpected error occurred");
      }
      console.error("Error registering user:", error);
    }
  };

  return (
    <div className="w-full">
      <div className="flex flex-col xs:mx-auto my-4 mt-12 sm:mx-auto p-6 max-w-[380px] px-8 border rounded-lg shadow-xl lessThan440:mx-auto bg-white lessThan440:border-none lessThan440:shadow-none mx-auto">
        <h1 className="font-bold text-2xl text-center">Register</h1>

        {/* Input Div */}
        <div className="flex flex-col gap-4 mt-5">
          <input
            className="px-8 py-4 border border-gray-200 rounded-lg bg-gray-100 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            placeholder="First Name"
          />
          <input
            className="px-8 py-4 border border-gray-200 rounded-lg bg-gray-100 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            placeholder="Last Name"
          />
          <input
            className="px-8 py-4 border border-gray-200 rounded-lg bg-gray-100 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
          />
          <input
            className="px-8 py-4 border border-gray-200 rounded-lg bg-gray-100 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
          />

          <div>
            <p className="text-blue-500 hover:text-blue-600 cursor-pointer">
              <span className="underline underline-offset-2">
                Already have an account?{" "}
              </span>
              <Link to="/login" className="text-indigo-700">
                Sign In
              </Link>
            </p>
          </div>

          <button
            onClick={registerUser}
            className="mt-2 py-3 tracking-wide font-semibold bg-indigo-700 text-gray-100 border rounded-lg hover:bg-indigo-500 transition-all duration-300 ease-in-out"
          >
            Sign Up
          </button>
          <ToastContainer />
        </div>
      </div>
    </div>
  );
};

export default Register;
