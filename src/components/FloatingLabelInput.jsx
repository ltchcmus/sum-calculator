import { useState } from 'react';
import './FloatingLabelInput.css';

// Custom input component with floating label animation
function FloatingLabelInput({ label, placeholder, value, onChange, onKeyDown }) {
  // Track focus state for styling
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = () => setIsFocused(true);
  const handleBlur = () => setIsFocused(false);

  // Label floats up when input is focused or has value
  const isFloating = isFocused || value;

  return (
    <div className="floating-input-container">
      <input
        type="number"
        className={`floating-input ${isFocused ? 'focused' : ''}`}
        placeholder={isFocused ? placeholder : ''}
        value={value}
        onChange={onChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onKeyDown={onKeyDown}
      />
      <label className={`floating-label ${isFloating ? 'floating' : ''} ${isFocused ? 'focused' : ''}`}>
        {label}
      </label>
    </div>
  );
}

export default FloatingLabelInput;
