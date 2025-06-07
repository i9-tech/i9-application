import React, { useState, useRef, useEffect } from 'react';
import './FloatingAddButton.css';

const FloatingAddButton = ({ onSetor, onCategoria }) => {
  const [open, setOpen] = useState(false);
  const popupRef = useRef();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="fab-container" ref={popupRef}>
      <button className="fab-btn" onClick={() => setOpen(!open)}>+</button>

      {open && (
        <div className="fab-popup">
          <p className="fab-popup-title">Novo Cadastro</p>
          <p className="fab-popup-sub">Escolha o que deseja cadastrar.</p>

          <div className="fab-popup-option" onClick={onSetor}>
            <span className="fab-icon">🏢</span>
            <span className="fab-text bold">Cadastrar Setor</span>
          </div>

          <div className="fab-divider" />

          <div className="fab-popup-option" onClick={onCategoria}>
            <span className="fab-icon">🔷</span>
            <span className="fab-text bold">Cadastrar Categoria</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default FloatingAddButton;
