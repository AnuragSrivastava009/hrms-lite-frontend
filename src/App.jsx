// import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
// import EmployeeList from "./pages/EmployeeList";
// import Attendance from "./pages/Attendance";

// export default function App() {
//   return (
//     <BrowserRouter>
//       <nav style={{ padding: 16, borderBottom: "1px solid #ddd" }}>
//         <Link to="/" style={{ marginRight: 16 }}>Employees</Link>
//         <Link to="/attendance">Attendance</Link>
//       </nav>

//       <Routes>
//         <Route path="/" element={<EmployeeList />} />
//         <Route path="/attendance" element={<Attendance />} />
//       </Routes>
//     </BrowserRouter>
//   );
// }



import { BrowserRouter, Routes, Route, Link, useLocation } from "react-router-dom";
import EmployeeList from "./pages/EmployeeList";
import Attendance from "./pages/Attendance";

const navStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Mono:wght@300;400;500&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  body {
    background: #0c0f0a;
    color: #e8f0e4;
  }

  .app-nav {
    position: sticky;
    top: 0;
    z-index: 100;
    background: rgba(12, 15, 10, 0.85);
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
    border-bottom: 1px solid #2a3326;
    padding: 0 32px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 60px;
  }

  .app-nav-logo {
    display: flex;
    align-items: center;
    gap: 10px;
    text-decoration: none;
  }

  .app-nav-logo-mark {
    width: 28px;
    height: 28px;
    background: #a8ff78;
    border-radius: 6px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: 'Syne', sans-serif;
    font-weight: 800;
    font-size: 13px;
    color: #0c0f0a;
    letter-spacing: -0.5px;
    flex-shrink: 0;
  }

  .app-nav-logo-text {
    font-family: 'Syne', sans-serif;
    font-weight: 700;
    font-size: 15px;
    color: #e8f0e4;
    letter-spacing: -0.3px;
  }

  .app-nav-logo-text span {
    color: #5a6b54;
    font-weight: 400;
  }

  .app-nav-links {
    display: flex;
    align-items: center;
    gap: 4px;
  }

  .app-nav-link {
    position: relative;
    display: flex;
    align-items: center;
    gap: 7px;
    text-decoration: none;
    font-family: 'DM Mono', monospace;
    font-size: 12px;
    letter-spacing: 0.5px;
    color: #5a6b54;
    padding: 7px 14px;
    border-radius: 8px;
    border: 1px solid transparent;
    transition: all 0.2s;
  }

  .app-nav-link:hover {
    color: #8fa688;
    background: #1c2118;
  }

  .app-nav-link.active {
    color: #e8f0e4;
    background: #1c2118;
    border-color: #2a3326;
  }

  .app-nav-link.active .nav-dot {
    background: #a8ff78;
    box-shadow: 0 0 6px rgba(168, 255, 120, 0.5);
  }

  .nav-dot {
    width: 5px;
    height: 5px;
    border-radius: 50%;
    background: #2a3326;
    transition: all 0.2s;
    flex-shrink: 0;
  }

  .app-nav-right {
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .app-nav-version {
    font-family: 'DM Mono', monospace;
    font-size: 10px;
    letter-spacing: 1.5px;
    color: #2a3326;
    text-transform: uppercase;
    padding: 4px 10px;
    border: 1px solid #1c2118;
    border-radius: 20px;
  }
`;

function Nav() {
  const location = useLocation();

  return (
    <nav className="app-nav">
      <Link to="/" className="app-nav-logo">
        <div className="app-nav-logo-mark">HR</div>
        <span className="app-nav-logo-text">
          WorkForce<span>.io</span>
        </span>
      </Link>

      <div className="app-nav-links">
        <Link
          to="/"
          className={`app-nav-link ${location.pathname === "/" ? "active" : ""}`}
        >
          <span className="nav-dot" />
          Employees
        </Link>
        <Link
          to="/attendance"
          className={`app-nav-link ${location.pathname === "/attendance" ? "active" : ""}`}
        >
          <span className="nav-dot" />
          Attendance
        </Link>
      </div>

      <div className="app-nav-right">
        <span className="app-nav-version">v1.0</span>
      </div>
    </nav>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <style>{navStyles}</style>
      <Nav />
      <Routes>
        <Route path="/" element={<EmployeeList />} />
        <Route path="/attendance" element={<Attendance />} />
      </Routes>
    </BrowserRouter>
  );
}