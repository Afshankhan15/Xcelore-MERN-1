import React, { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";

function Protected({ children }) {
  const navigate = useNavigate();
  const [authorized, setAuthorized] = useState(null);

  useEffect(() => {
    const checkAuth = async () => {
      const ACCESS_TOKEN = localStorage.getItem("access-token");
      if (!ACCESS_TOKEN) {
        console.log("token missing");
        setAuthorized(false);
        return;
      }
      const decodedToken = jwtDecode(ACCESS_TOKEN);
      const tokenExpiration = decodedToken.exp;
      const userRole = decodedToken.role;
      console.log("userRole", userRole);
      const now = Date.now() / 1000; // divide by 1000 to get date in seconds

      if (tokenExpiration < now) {
        // Token expired
        console.log("Invalid Token");
        setAuthorized(false);
      } else if (userRole === "Admin") {
        console.log("Admin");
        setAuthorized(true);
        navigate("/admin");
      } else if (userRole === "User") {
        console.log("User");
        setAuthorized(true);
        navigate("/user");
      } else {
        setAuthorized(true);
      }
    };

    checkAuth().catch(() => setAuthorized(false));
  }, []);

  useEffect(() => {
    if (authorized === false) {
      navigate("/login");
    }
  }, [authorized, navigate]);

  if (authorized === null) {
    return <div>Loading...</div>; // Or some loading spinner
  }

  return authorized ? children : null;
}

export default Protected;
