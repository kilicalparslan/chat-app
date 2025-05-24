import { Navigate, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/pages/Home";
import Signup from "./components/pages/Signup";
import Login from "./components/pages/Login";
import Settings from "./components/pages/Settings";
import Profiles from "./components/pages/Profiles";
import { useAuthStore } from "./store/useAuthStore";
import { useEffect } from "react";
import { Loader } from "lucide-react"

function App() {
  const { authUser, checkAuth, isCheckingAuth } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  console.log({ authUser });
  if(isCheckingAuth && !authUser) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader className="animate-spin size-10"/>
      </div>
    );
  }
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={authUser ? <Home /> : <Navigate to="/login"/>} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/profile" element={<Profiles />} />
      </Routes>
    </div>
  );
}

export default App;
