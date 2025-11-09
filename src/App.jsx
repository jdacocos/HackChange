import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import "leaflet/dist/leaflet.css";
import Sidebar from "./components/Sidebar";
import Login from "./pages/Login";
import Registration from "./pages/Registration";
import Member from "./pages/Member";
import AboutUs from "./pages/AboutUs";
import MapView from "./pages/Map";
import ChatWidget from "./components/ChatWidget";

const AppContent = () => {
  const navigate = useNavigate();

  const handleNavigation = (itemName) => {
    if (itemName === "Log in") {
      navigate("/login");
    } else if (itemName === "Member") {
      navigate("/member");
    } else if (itemName === "Home") {
      navigate("/about");
    } else if (itemName === "Map") {
      navigate("/");
    } else if (itemName === "About Us") {
      navigate("/about");
    }
  };

  return (
    <div>
      {/* Sidebar + Alert system */}
      <Sidebar onNavigate={handleNavigation} />
      <AlertMarker onSelect={specifyAlert} show={alertMarker} />
      <ChatWidget />
      
      {/* Map container */}
      <div
        id="map"
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          height: "100vh",
          width: "100%",
          zIndex: 0,
        }}
      ></div>
    </div>
  );
};

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MapView />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Registration />} />
        <Route path="/member" element={<Member />} />
        <Route path="/about" element={<AboutUs />} />
      </Routes>
    </div>
  );
};

const App = () => {
  return (
    <Router>
      <AppContent />
    </Router>
  );
};

export default App;