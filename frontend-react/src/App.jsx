import React, { useState } from 'react';
import { Route, Routes } from "react-router-dom";
import Welcome from "./components/Welcome";
import UserLogin from "./components/UserLogin";
import AdminLogin from "./components/AdminLogin";
import UserSignup from "./components/UserSignup";
import Dashboard from "./components/Dashboard";

const App = () => {
  const [showSignup, setShowSignup] = useState(true);

  const showUserLogin = () => {
    setShowSignup(false);
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-tr from-slate-500 to-slate-800">
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/login" element={<UserLogin />} />
        <Route path="/admin" element={<AdminLogin />} />
        <Route path="/signup" element={<UserSignup showUserLogin={showUserLogin} />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </div>
  );
};

export default App;
