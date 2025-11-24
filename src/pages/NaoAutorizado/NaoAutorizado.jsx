import React from "react";
import { useNavigate } from "react-router-dom";
import "./NaoAutorizado.css";

export default function NaoAutorizado() {
  const navigate = useNavigate();

  return (
    <section className="container-nao-autorizado">
      <div className="container-header-nao-autorizado">
        <h1>i9</h1>
        <h1>Acesso Negado</h1>
      </div>
      <div className="container-texto-nao-autorizado">
        <p>Você e/ou seu plano não tem permissão para acessar esta página.</p>
        <p>Entre em contato com o administrador do sistema.</p>
      <button onClick={() => navigate("/")}>
        Voltar para a página inicial
      </button>
      </div>
      <div className="container-footer-nao-autorizado">
      <p> i9 2025 &copy;</p>
      <p>Todos os direitos reservados</p>
      </div>
    </section>
  );
}
