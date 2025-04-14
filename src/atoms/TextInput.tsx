import React, { useState } from "react";
import "./TextInput.css";

type Props = {
  label?: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  placeholder?: string;
  type?: string;
  errorMessage?: string;
};

function TextInput({
  label,
  name,
  value,
  onChange,
  required = false,
  placeholder = "",
  type = "text",
  errorMessage = "This field is required",
}: Props) {
  const [touched, setTouched] = useState(false);
  const error = required && touched && !value;

  return (
    <div className="text-input">
      {label && (
        <label htmlFor={name}>
          {label}
          {required && <span className="required">*</span>}
        </label>
      )}
      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        onBlur={() => setTouched(true)}
        placeholder={placeholder}
        className={error ? "error" : ""}
      />
      {error && <span className="error-message">{errorMessage}</span>}
    </div>
  );
}

export default TextInput; 