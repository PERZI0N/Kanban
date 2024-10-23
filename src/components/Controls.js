// Controls.js
import React, { useState, useRef, useEffect } from "react";
import "./Controls.css";

const Controls = ({ groupBy, setGroupBy, sortBy, setSortBy }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const handleGroupChange = (e) => {
    setGroupBy(e.target.value);
  };

  const handleSortChange = (e) => {
    setSortBy(e.target.value);
  };

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  console.log("Dropdown state:", isOpen);

  return (
    <div className="controls-wrapper">
      <div className="controls" ref={dropdownRef}>
        <button className="display-btn" onClick={toggleDropdown} type="button">
          <span>Display</span>
          <svg
            className={`arrow-icon ${isOpen ? "rotate" : ""}`}
            width="12"
            height="12"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M6 9l6 6 6-6" />
          </svg>
        </button>

        <div className={`dropdown-content ${isOpen ? "show" : ""}`}>
          <div className="control-group">
            <label htmlFor="group">Grouping </label>
            <select id="group" value={groupBy} onChange={handleGroupChange}>
              <option value="status">Status</option>
              <option value="user">User</option>
              <option value="priority">Priority</option>
            </select>
          </div>

          <div className="control-group">
            <label htmlFor="sort">Ordering </label>
            <select id="sort" value={sortBy} onChange={handleSortChange}>
              <option value="priority">Priority</option>
              <option value="title">Title</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Controls;
