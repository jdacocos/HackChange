import { useState } from "react";

const Sidebar = ({ onNavigate }) => {
  const [activeItem, setActiveItem] = useState("Home");
  const [isOpen, setIsOpen] = useState(true);

  const topMenuItems = [
    { name: "Home", icon: "🏠" },
    { name: "Map", icon: "🗺️" },
    { name: "Member", icon: "👥" },
    { name: "About Us", icon: "ℹ️" },
  ];

  const handleClick = (itemName) => {
    setActiveItem(itemName);
    if (onNavigate) {
      onNavigate(itemName);
    }
  };

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      {/* Hamburger Menu Button */}
      <button
        className="hamburger-menu"
        onClick={toggleSidebar}
        aria-label="Toggle menu"
      >
        <div className="hamburger-icon">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </button>

      {/* Sidebar */}
      <div className={`sidebar ${isOpen ? "open" : "closed"}`}>
        <div className="sidebar-header">
          <h1 className="sidebar-title">STREET AID💙</h1>
        </div>

        <nav className="sidebar-nav">
          {topMenuItems.map((item) => (
            <button
              key={item.name}
              onClick={() => handleClick(item.name)}
              className={`sidebar-item ${activeItem === item.name ? "active" : ""}`}
            >
              <span className="sidebar-icon">{item.icon}</span>
              <span className="sidebar-label">{item.name}</span>
            </button>
          ))}
        </nav>

        <div style={{ borderTop: "1px solid #374151" }}>
          <button
            onClick={() => handleClick("Log in")}
            className={`sidebar-item ${activeItem === "Log in" ? "active" : ""}`}
          >
            <span className="sidebar-icon">🔐</span>
            <span className="sidebar-label">Log in</span>
          </button>
        </div>

        <div className="sidebar-footer">
          <p>&copy; 2024 STREET AID</p>
        </div>
      </div>

      {/* Overlay */}
      {isOpen && <div className="sidebar-overlay" onClick={toggleSidebar}></div>}
    </>
  );
};

export default Sidebar;
