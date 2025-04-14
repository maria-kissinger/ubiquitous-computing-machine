import React, { useState } from "react";
import "./CardExpiryInput.css";

type Props = {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
};

function CardExpiryInput({ value, onChange, required = false }: Props) {
  const [touched, setTouched] = useState(false);
  const error = required && touched && !value;

  const formatExpiryDate = (value: string): string => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
    if (v.length >= 2) {
      return `${v.substring(0, 2)}/${v.substring(2, 4)}`;
    }
    return value;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const formattedValue = formatExpiryDate(e.target.value);
    e.target.value = formattedValue;
    onChange(e);
  };

  const validateExpiryDate = (value: string): boolean => {
    const [month, year] = value.split("/");
    if (!month || !year || month.length !== 2 || year.length !== 2) {
      return false;
    }
    const monthNum = parseInt(month);
    const yearNum = parseInt(year);
    const currentYear = new Date().getFullYear() % 100;
    const currentMonth = new Date().getMonth() + 1;

    if (monthNum < 1 || monthNum > 12) {
      return false;
    }

    if (yearNum < currentYear || (yearNum === currentYear && monthNum < currentMonth)) {
      return false;
    }

    return true;
  };

  return (
    <div className="card-expiry-input">
      <label htmlFor="expiryDate">
        Expiry Date
        {required && <span className="required">*</span>}
      </label>
      <input
        id="expiryDate"
        name="expiryDate"
        type="text"
        value={value}
        onChange={handleChange}
        onBlur={() => setTouched(true)}
        placeholder="MM/YY"
        maxLength={5}
        className={error ? "error" : ""}
      />
      {error && (
        <span className="error-message">Please enter a valid expiry date</span>
      )}
      {!error && touched && value && !validateExpiryDate(value) && (
        <span className="error-message">Please enter a valid future date</span>
      )}
    </div>
  );
}

export default CardExpiryInput; 