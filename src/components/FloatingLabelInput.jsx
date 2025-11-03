import { useState } from 'react';
import './FloatingLabelInput.css';

// Custom input component với label tự động nổi lên khi focus/nhập
function FloatingLabelInput({ label, placeholder, value, onChange, onKeyDown }) {
  // State theo dõi input có đang được focus không
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = () => setIsFocused(true);
  const handleBlur = () => setIsFocused(false);

  // Label nổi lên khi: đang focus HOẶC đã có giá trị
  const isFloating = isFocused || value;

  return (
    <div className="floating-input-container">
      {/* Input với glassmorphism styling */}
      <input
        type="number"
        className={`floating-input ${isFocused ? 'focused' : ''}`}
        placeholder={isFocused ? placeholder : ''} // chỉ hiện placeholder khi focus
        value={value}
        onChange={onChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onKeyDown={onKeyDown}
      />
      {/* Label sẽ nổi lên (di chuyển lên trên) khi isFloating = true */}
      <label className={`floating-label ${isFloating ? 'floating' : ''} ${isFocused ? 'focused' : ''}`}>
        {label}
      </label>
    </div>
  );
}

export default FloatingLabelInput;
