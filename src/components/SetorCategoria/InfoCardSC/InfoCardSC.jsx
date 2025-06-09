import React, { useState } from "react";
import "./InfoCardSC.css";

const InfoCardSCCard = ({
  title,
  description,
  placeholder = "Buscar...",
  onSearch,
  children,
}) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    if (onSearch) {
      onSearch(value);
    }
  };

  return (
    <div className="info-s-card">
      <div className="info-sc-card__header">
        <h2 className="info-sc-card__title">{title}</h2>
        {description && (
          <p className="info-sc-card__description">{description}</p>
        )}
      </div>

      <div className="info-sc-card__search">
        <div className="info-sc-card__input-wrapper">
          <input
            type="text"
            value={searchTerm}
            placeholder={placeholder}
            className="info-sc-card__input"
            onChange={handleSearchChange}
          />
          <span className="info-sc-card__icon">🔍</span>
        </div>
      </div>

      <div className="info-sc-card__body">{children}</div>
    </div>
  );
};

export default InfoCardSCCard;
