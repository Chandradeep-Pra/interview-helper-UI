import React from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import Dashboard from "./components/dashboard/Dashboard";
import Dashboardmobile from "./components/dashboardformobile/Dashboardmobile";
import Landing from "./components/Landing";
import useResponsive from "./hooks/useResponsive";
import AItool from "./components/dashboard/AItool";
import Sidebar from "./components/dashboard/Sidebar";
import Topbar from "./components/dashboard/Topbar";

function App() {
  const breakpoint = useResponsive([600, 900, 1200]);

  return (
    <Router>
      <MainContent breakpoint={breakpoint} />
    </Router>
  );
}

const MainContent = ({ breakpoint }) => {
  const location = useLocation();
  const showSidebarAndTopbar = location.pathname !== '/';

  return (
    <div className="flex flex-row w-full bg-black px-2 py-2 h-[100vh]">
      {/* Conditionally render Sidebar and Topbar */}
      {showSidebarAndTopbar && <Sidebar />}
      <div className="flex flex-col w-full px-2">
        {showSidebarAndTopbar && <Topbar />}
        <div className='h-[100vh] w-[100%]'>
          {breakpoint !== 0 && (
            <Routes>
              <Route path="/" element={<Landing />} />
              <Route path="/aitool" element={<AItool />} />
              <Route path="/dashboard" element={<Dashboard />} />
            </Routes>
          )}
        </div>
      </div>
    </div>
  );
};

export default App;
