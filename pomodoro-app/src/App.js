import React from "react";
import { AuthProvider, useAuth } from "./context/AuthContext";
// import Navbar from "./components/Navbar/Navbar";
// import Timer from "./components/Timer/Timer";
// import TaskList from "./components/TaskList/TaskList";
// import Stats from "./components/Stats/Stats";
import Auth from "./components/Auth/Auth";

const AppContent = () => {
  const { isAuthenticated, logout } = useAuth();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* <Navbar /> */}
      <div className="container mx-auto p-4 space-y-8">
        {isAuthenticated ? (
          <>
            {/* <Timer />
            <TaskList />
            <Stats /> */}
            <button
              onClick={logout}
              className="bg-red-500 text-white px-4 py-2 rounded-lg"
            >
              Logout
            </button>
          </>
        ) : (
          <Auth />
        )}
      </div>
    </div>
  );
};

const App = () => {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
};

export default App;