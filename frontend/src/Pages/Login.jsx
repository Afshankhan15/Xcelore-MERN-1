import React, { useState } from "react";
import axios from "axios";
import { useNavigate} from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const loginUser = async () => {
    // Simple validation checks
    if (!email || !password) {
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
      const res = await axios.post("http://localhost:4000/api/auth/login", {
        email: email,
        password: password,
      });
      console.log(res);
      if (res.status === 200) {
        toast.success("Login Successfully");
        localStorage.setItem("access-token", res.data.userToken);
        localStorage.setItem("role", res.data.role);
        // localStorage.setItem("user", JSON.stringify(res.data.user));

        setTimeout(() => {
          if (res.data.role === "Admin") {
            navigate("/admin");
          } else if (res.data.role === "User") {
            navigate("/user");
          }
        }, 2000);
      } else {
        toast.error("Something went wrong");
      }
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        if (
          error.response.status === 401 &&
          error.response.data.message === "Invalid password"
        ) {
          toast.error("Password does not match"); // Show specific message for password mismatch
        } else {
          toast.error(error.response.data.message);
        }
      } else {
        toast.error("An unexpected error occurred");
      }
      console.error("Error Login user:", error);
    }
  };

  return (
    <div className="w-full">
      <div className="flex flex-col xs:mx-auto my-4 mt-12 sm:mx-auto p-6 max-w-[380px] px-8 border rounded-lg shadow-xl lessThan440:mx-auto bg-white lessThan440:border-none lessThan440:shadow-none mx-auto">
        <h1 className="font-bold text-2xl text-center">Login</h1>

        {/* Input Div */}
        <div className="flex flex-col gap-4 mt-10">
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

          <button
            onClick={loginUser}
            className="mt-3 py-4 tracking-wide font-semibold bg-lime-600 text-gray-100 border rounded-lg hover:bg-lime-700 transition-all duration-300 ease-in-out"
          >
            Sign In
          </button>
          <ToastContainer />
        </div>
      </div>
    </div>
  );
};

export default Login;
