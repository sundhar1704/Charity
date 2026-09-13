import { useState, useRef, useEffect } from "react";
import "./Dropdown.css";

export default function Dropdown({ options, value, onChange, placeholder, disabled }) {
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef(null);

  // Close the dropdown if the person clicks anywhere outside it
  useEffect(() => {
    function handleClickOutside(e) {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  function handleSelect(option) {
    onChange(option);
    setIsOpen(false);
  }

  return (
    <div className="dropdown" ref={wrapperRef}>
      <button
        type="button"
        className={"dropdown-trigger" + (isOpen ? " dropdown-trigger-open" : "")}
        onClick={() => !disabled && setIsOpen((open) => !open)}
        disabled={disabled}
      >
        <span className={value ? "" : "dropdown-placeholder"}>
          {value || placeholder}
        </span>
        <span className="dropdown-arrow">{isOpen ? "▲" : "▼"}</span>
      </button>

      {isOpen && (
        <div className="dropdown-list">
          {options.map((option) => (
            <div
              key={option}
              className={
                "dropdown-item" + (option === value ? " dropdown-item-selected" : "")
              }
              onClick={() => handleSelect(option)}
            >
              {option}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}