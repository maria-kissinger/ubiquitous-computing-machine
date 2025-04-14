import React from "react";
import "./NumberInputWithButtons.css";

type NumberInputWithButtonsProps = {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  name?: string;
};

function NumberInputWithButtons({ 
  value = 0, 
  onChange, 
  min = 0,
  name = "quantity"
}: NumberInputWithButtonsProps) {
  const handleChange = (newValue: number): void => {
    onChange(Math.max(min, newValue));
  };

  return (
    <div className="number-input-container">
      <button 
        className="number-input-button"
        onClick={() => handleChange(value - 1)} 
        disabled={value <= min}
        aria-label="Decrease quantity"
      >
        -
      </button>
      <input
        type="number"
        min={min}
        value={value}
        onChange={(e) => handleChange(parseInt(e.target.value) || min)}
        className="number-input"
        name={name}
        aria-label={name}
      />
      <button 
        className="number-input-button"
        onClick={() => handleChange(value + 1)}
        aria-label="Increase quantity"
      >
        +
      </button>
    </div>
  );
}

export default NumberInputWithButtons; 