import React, { useState } from "react";
import "./CVVInput.css";

function CVVInput({ value, onChange, required = false }: {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
}) {
  const [touched, setTouched] = useState(false);
  const error = required && touched && !value;

  const formatCVV = (value: string): string => {
    return value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const formattedValue = formatCVV(e.target.value);
    e.target.value = formattedValue;
    onChange(e);
  };

  const validateCVV = (value: string): boolean => {
    return /^\d{3,4}$/.test(value);
  };

  return (
    <div className="cvv-input">
      <label htmlFor="cvv">
        CVV
        {required && <span className="required">*</span>}
      </label>
      <input
        id="cvv"
        name="cvv"
        type="text"
        value={value}
        onChange={handleChange}
        onBlur={() => setTouched(true)}
        placeholder="123"
        maxLength={4}
        className={error ? "error" : ""}
      />
      {error && (
        <span className="error-message">Please enter a valid CVV</span>
      )}
      {!error && touched && value && !validateCVV(value) && (
        <span className="error-message">CVV must be 3 or 4 digits</span>
      )}
    </div>
  );
}

export default CVVInput; 