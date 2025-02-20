import { useState } from "react";
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
    setView("userSignup"); // Fixed the incorrect view name
  };

  const login = () => {
    if (userType === "user") {
      setView("dashboard");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-tr from-slate-500 to-slate-800">
      {view === "welcome" && <Welcome showUserLogin={showUserLogin} showAdminLogin={showAdminLogin} />}
      {view === "userLogin" && <UserLogin login={login} showUserSignup={showUserSignup} />}
      {view === "userSignup" && <UserSignup showUserLogin={showUserLogin} />} {/* Fixed incorrect reference */}
      {view === "adminLogin" && <AdminLogin />}
      {view === "dashboard" && <Dashboard userType={userType} />}
    </div>
  );
};

export default App;
