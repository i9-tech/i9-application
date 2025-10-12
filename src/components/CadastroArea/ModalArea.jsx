import React, { useState } from "react";
import DadosTabela from "../SetorCategoria/DadosTabela/DadosTabela";
import "./ModalArea.css";

const ModalArea = ({
  isOpen,
  onClose,
  dados = [],
  isLoadingData,
  aoEditar,
  aoExcluir,
  onSalvar,
}) => {
  const [nome, setNome] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!nome.trim()) {
      alert("Preencha o nome da área!");
      return;
    }
    onSalvar({ nome });
    setNome("");
    onClose();
  };

  const dadosMockados = [
  {
    id: 1,
    nome: "Área 1",
    area: "Área Mockada A",
    pratos: 5,
    produtos: 12,
  },
  {
    id: 2,
    nome: "Área 2",
    area: "Área Mockada B",
    pratos: 3,
    produtos: 7,
  },
  {
    id: 3,
    nome: "Área 3",
    area: "Área Mockada C",
    pratos: 8,
    produtos: 10,
  },
  {
    id: 3,
    nome: "Área 3",
    area: "Área Mockada C",
    pratos: 8,
    produtos: 10,
  },
  {
    id: 3,
    nome: "Área 3",
    area: "Área Mockada C",
    pratos: 8,
    produtos: 10,
  },
  {
    id: 3,
    nome: "Área 3",
    area: "Área Mockada C",
    pratos: 8,
    produtos: 10,
  },
  {
    id: 3,
    nome: "Área 3",
    area: "Área Mockada C",
    pratos: 8,
    produtos: 10,
  },
  {
    id: 3,
    nome: "Área 3",
    area: "Área Mockada C",
    pratos: 8,
    produtos: 10,
  },
  {
    id: 3,
    nome: "Área 3",
    area: "Área Mockada C",
    pratos: 8,
    produtos: 10,
  },
  {
    id: 3,
    nome: "Área 3",
    area: "Área Mockada C",
    pratos: 8,
    produtos: 10,
  },
  {
    id: 3,
    nome: "Área 3",
    area: "Área Mockada C",
    pratos: 8,
    produtos: 10,
  },
  {
    id: 3,
    nome: "Área 3",
    area: "Área Mockada C",
    pratos: 8,
    produtos: 10,
  },
];


  return (
    <>
      {isOpen && (
        <div className="modal-overlay" onClick={onClose}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <form className="modal-form" onSubmit={handleSubmit}>
              <h2>Cadastro de Área</h2>
              <p className="modal-subtitulo">Cadastre uma nova área da cozinha. As áreas ajudam a organizar os postos de trabalho na cozinha, como chapeiro, fritadeira, linha fria, entre outros, para uma gestão eficiente</p>
              <label>Nome da Área:</label>
              <input
                type="text"
                placeholder="Área"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                required
                maxLength={40}
              />

              {/* Tabela de Áreas */}
              <DadosTabela
                dados={dadosMockados}
                aoEditar={aoEditar}
                aoExcluir={aoExcluir}
                isLoadingData={isLoadingData}
                tipo="area"
              />

              <div className="modal-botoes">
                <button
                  type="button"
                  className="btn cancelar"
                  onClick={onClose}
                >
                  Cancelar
                </button>
                <button type="submit" className="btn cadastrar">
                  Cadastrar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default ModalArea;
