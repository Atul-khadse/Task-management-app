import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import Welcome from "./components/Welcome";
import UserLogin from "./components/UserLogin";
import AdminLogin from "./components/AdminLogin";
import UserSignup from "./components/UserSignup";
import Dashboard from "./components/Dashboard";

const App = () => {
  const [view, setView] = useState("welcome");
  const [userType, setUserType] = useState("");

  const showUserLogin = () => {
    setUserType("user");
    setView("userLogin");
  };

  const showAdminLogin = () => {
    setUserType("admin");
    setView("adminLogin");
  };

  const showUserSignup = () => {
    setView("userSignup");
  };

  const login = () => {
    if (userType === "user") {
      setView("dashboard");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-tr from-slate-500 to-slate-800">
      <Routes>
        <Route path="/" element={<Welcome showUserLogin={showUserLogin} showAdminLogin={showAdminLogin} />} />
        <Route path="/login" element={<UserLogin login={login} showUserSignup={showUserSignup} />} />
        <Route path="/admin" element={<AdminLogin />} />
        <Route path="/signup" element={<UserSignup showUserLogin={showUserLogin} />} />
        <Route path="/dashboard" element={<Dashboard userType={userType} />} />
      </Routes>
    </div>
  );
};

export default App;
