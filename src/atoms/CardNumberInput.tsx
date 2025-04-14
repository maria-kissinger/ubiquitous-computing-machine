import React, { useState } from "react";
import "./CardNumberInput.css";

type Props = {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
};

function CardNumberInput({ value, onChange, required = false }: Props) {
  const [touched, setTouched] = useState(false);
  const error = required && touched && !value;

  const formatCardNumber = (value: string): string => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
    const matches = v.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || "";
    const parts = [];

    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }

    if (parts.length) {
      return parts.join(" ");
    } else {
      return value;
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const formattedValue = formatCardNumber(e.target.value);
    e.target.value = formattedValue;
    onChange(e);
  };

  const validateCardNumber = (value: string): boolean => {
    const v = value.replace(/\s+/g, "");
    return /^\d{16}$/.test(v);
  };

  return (
    <div className="card-number-input">
      <label htmlFor="cardNumber">
        Card Number
        {required && <span className="required">*</span>}
      </label>
      <input
        id="cardNumber"
        name="cardNumber"
        type="text"
        value={value}
        onChange={handleChange}
        onBlur={() => setTouched(true)}
        placeholder="1234 5678 9012 3456"
        maxLength={19}
        className={error ? "error" : ""}
      />
      {error && (
        <span className="error-message">Please enter a valid card number</span>
      )}
      {!error && touched && value && !validateCardNumber(value) && (
        <span className="error-message">Card number must be 16 digits</span>
      )}
    </div>
  );
}

export default CardNumberInput; 