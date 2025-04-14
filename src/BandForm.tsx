import React, { useState, useMemo } from "react";
import NumberInputWithButtons from "./atoms/NumberInputWithButtons";
import TextInput from "./atoms/TextInput";
import CardNumberInput from "./atoms/CardNumberInput";
import CardExpiryInput from "./atoms/CardExpiryInput";
import CVVInput from "./atoms/CVVInput";
import { formatDate } from "./utils/formatDate";
import { formatCents } from "./utils/formatCents";
import { Band, FormData } from "./types";
import "./BandForm.css";

type BandFormProps = {
  band: Band;
}; 

function BandFormComponent({ band }: BandFormProps) {
  const [quantities, setQuantities] = useState<Record<string, number>>({});
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    address: "",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
  });
  const [error, setError] = useState<string>("");

  const handleQuantityChange = (ticketType: string, value: number): void => {
    setQuantities((prev) => ({
      ...prev,
      [ticketType]: value,
    }));
    setError("");
  };

  const handleFormChange = (name: keyof FormData, value: string): void => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleTextInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    handleFormChange(name as keyof FormData, value);
  };

  const handleSubmit = (): void => {
    const totalQuantity = Object.values(quantities).reduce((sum, qty) => sum + qty, 0);
    if (totalQuantity === 0) {
      setError("Please select at least one ticket");
      return;
    }
    console.log('Form Data:', {
      ...formData,
      total: total
    });
  };

  const total = useMemo(() => {
    return band?.ticketTypes?.reduce((sum, ticket) => {
      const quantity = quantities[ticket.type] || 0;
      return sum + (quantity * ticket.cost);
    }, 0);
  }, [quantities, band?.ticketTypes]);

  return (
    <div className="band-form-wrapper">
      <div className="band-form">
        <div className="band-info">
          <h1>{band.name}</h1>
          <p>{formatDate(band.date)}</p>
          <p>{band.location}</p>
          <div className="band-image-container">
            <img src={band.imgUrl} alt={band.name} />
          </div>
          <div dangerouslySetInnerHTML={{ __html: band.description_blurb }} />
        </div>
        <div className="ticket-selection">
          <h2>Select Tickets</h2>
          {band.ticketTypes.map((ticket) => (
            <div key={ticket.type} className="ticket-item">
              <h3>{ticket.name}</h3>
              <p>{ticket.description}</p>
              <p>{formatCents(ticket.cost)}</p>
              <NumberInputWithButtons
                value={quantities[ticket.type] || 0}
                onChange={(value) => handleQuantityChange(ticket.type, value)}
                name={ticket.name}
              />
            </div>
          ))}
          <p className="ticket-item">Total: {formatCents(total)}</p>
          
          <div className="form-section">
            <div className="name-fields">
              <TextInput
                label="First Name"
                name="firstName"
                value={formData.firstName}
                onChange={handleTextInputChange}
                required
              />
              <TextInput
                label="Last Name"
                name="lastName"
                value={formData.lastName}
                onChange={handleTextInputChange}
                required
              />
            </div>
            <TextInput
              label="Address"
              name="address"
              value={formData.address}
              onChange={handleTextInputChange}
            />
          </div>

          <div className="form-section">
            <h3>Payment Details</h3>
            <CardNumberInput
              value={formData.cardNumber}
              onChange={handleTextInputChange}
              required
            />
            <div className="card-details">
              <div className="card-expiry-wrapper">
                <CardExpiryInput
                  value={formData.expiryDate}
                  onChange={handleTextInputChange}
                  required
                />
              </div>
              <div className="cvv-wrapper">
                <CVVInput
                  value={formData.cvv}
                  onChange={handleTextInputChange}
                  required
                />
              </div>
            </div>
          </div>

          {error && <div className="error-message">{error}</div>}
          <button className="submit-button" onClick={handleSubmit}>Get Tickets</button>
        </div>
      </div>
    </div>
  );
}

export default BandFormComponent; 