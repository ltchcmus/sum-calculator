import { useState } from 'react';
import './FloatingLabelInput.css';

// Custom input component with label that floats up when focused/filled
function FloatingLabelInput({ label, placeholder, value, onChange, onKeyDown }) {
  // State to track if input is currently focused
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = () => setIsFocused(true);
  const handleBlur = () => setIsFocused(false);

  // Label floats up when: focused OR has value
  const isFloating = isFocused || value;

  return (
    <div className="floating-input-container">
      {/* Input with glassmorphism styling */}
      <input
        type="number"
        className={`floating-input ${isFocused ? 'focused' : ''}`}
        placeholder={isFocused ? placeholder : ''} // only show placeholder when focused
        value={value}
        onChange={onChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onKeyDown={onKeyDown}
      />
      {/* Label will float up (move upward) when isFloating = true */}
      <label className={`floating-label ${isFloating ? 'floating' : ''} ${isFocused ? 'focused' : ''}`}>
        {label}
      </label>
    </div>
  );
}

export default FloatingLabelInput;
