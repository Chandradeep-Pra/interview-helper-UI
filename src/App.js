import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import Dashboard from "./components/dashboard/Dashboard";
import Landing from "./components/Landing";
import useResponsive from "./hooks/useResponsive";
import AItool from "./components/dashboard/AItool";
import Sidebar from "./components/dashboard/Sidebar";
import Topbar from "./components/dashboard/Topbar";
import Interviewstar from './components/Interviewstar'; // Ensure this path is correct

const MainContent = React.memo(({ breakpoint, sidebarToggle, setSidebarToggle }) => {
  const location = useLocation();
  const isMockInterviewRoute = location.pathname === '/mock-interview';

  return (
    <div className="flex flex-row w-full bg-black  h-[100vh]">
      {/* Show Sidebar and Topbar only if not on the mock interview route */}
      {!isMockInterviewRoute && (
        <>
          <Sidebar toggle={sidebarToggle} setToggle={setSidebarToggle} />
          <div className="flex flex-col w-full px-2">
            <Topbar />
            <div className='h-[100vh] w-[100%]'>
              {breakpoint !== 0 && (
                <Routes>
                  <Route path="/" element={<Landing />} />
                  <Route path="/aitool" element={<AItool />} />
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/mock-interview" element={<Interviewstar />} />
                </Routes>
              )}
            </div>
          </div>
        </>
      )}
      {/* If it's the mock interview route, just render the Interviewstar component */}
      {isMockInterviewRoute && (
        <div className='h-full w-full'>
          <Routes>
            <Route path="/mock-interview" element={<Interviewstar />} />
          </Routes>
        </div>
      )}
    </div>
  );
});

function App() {
  const breakpoint = useResponsive([600, 900, 1200]);
  const [sidebarToggle, setSidebarToggle] = useState(false);

  return (
    <Router>
      <MainContent
        breakpoint={breakpoint}
        sidebarToggle={sidebarToggle}
        setSidebarToggle={setSidebarToggle}
      />
    </Router>
  );
}

export default App;
