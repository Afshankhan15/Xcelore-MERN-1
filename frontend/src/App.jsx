import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Suspense, lazy } from "react";

const Register = lazy(() => import("./Pages/Register"));
const Login = lazy(() => import("./Pages/Login"));
const Admin = lazy(() => import("./Pages/Admin"));
const User = lazy(() => import("./Pages/User"));
const Protected = lazy(() => import("./Components/Protected "));

import { store } from "./Store/store";
import { Provider } from "react-redux";

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route path="/" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route
              path="/admin"
              element={
                <Protected>
                  <Admin />
                </Protected>
              }
            />
            <Route
              path="/user"
              element={
                <Protected>
                  <User />
                </Protected>
              }
            />
          </Routes>
        </Suspense>
      </Router>
    </Provider>
  );
}

export default App;
