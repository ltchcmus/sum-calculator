import { useState } from 'react';
import './FloatingLabelInput.css';

function FloatingLabelInput({ label, placeholder, value, onChange, onKeyDown }) {
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = () => setIsFocused(true);
  const handleBlur = () => setIsFocused(false);

  // Label nổi lên khi: focused hoặc có giá trị
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
