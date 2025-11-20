import React, { useState } from "react";
import LayoutTela from "../../components/LayoutTela/LayoutTela";
import "./PlanosInterno.css";

import IMAGEM_USER from "../../assets/usuario.svg";
import IMAGEM_SUPERUSER from "../../assets/icon-adminn.svg";
import IMAGEM_NAO from "../../assets/block.svg";
import IMAGEM_CHECK from "../../assets/check.svg";

export function PlanosInterno() {
  const [periodo, setPeriodo] = useState("mensal");

  // Simula o plano escolhido pelo usuário
  const planoEscolhido = { nome: "Profissional", periodo: "mensal" };

  const planos = [
    {
      nome: "Essencial",
      descricao: "Para quem quer fazer a gestão completa do negócio em uma única plataforma",
      usuarios: 10,
      superUsuarios: 2,
      relatorioWhatsApp: false,
      dashboardAnalitica: false,
      mensal: 99.0,
      anual: 69.3,
    },
    {
      nome: "Profissional",
      descricao: "Para quem busca otimizar os processos da empresa com automações e dashboards",
      usuarios: 35,
      superUsuarios: 4,
      relatorioWhatsApp: true,
      dashboardAnalitica: true,
      mensal: 249.0,
      anual: 174.3,
    },
    {
      nome: "Premium",
      descricao: "Para quem quer crescer o negócio com recursos para alta performance",
      usuarios: "Ilimitados",
      superUsuarios: 10,
      relatorioWhatsApp: true,
      dashboardAnalitica: true,
      mensal: 499.0,
      anual: 349.3,
    },
  ];

  const handleAssinar = (planoNome, periodo) => {
    const preco = periodo === "mensal" ? planos.find(p => p.nome === planoNome).mensal : planos.find(p => p.nome === planoNome).anual;
    alert(`Você selecionou o plano ${planoNome} (${periodo}) - R$${preco}`);
  };

  const renderCard = (plano, periodoAtual) => {
    const preco = periodoAtual === "mensal" ? plano.mensal : plano.anual;
    const destaque = plano.nome === planoEscolhido.nome && periodoAtual === planoEscolhido.periodo;

    return (
      <div key={plano.nome + periodoAtual} className={`card-planos ${destaque ? "destaque-card" : ""}`}>
        <h2>{plano.nome}</h2>
        <p>{plano.descricao}</p>
        <h3>
          R${preco.toFixed(2)}
          <span>/mês</span>
        </h3>
        {periodoAtual === "anual" && (
          <span className="total-anual">
            R${(preco * 12).toFixed(2)}/ano
          </span>
        )}

        <button className="btn-secondary" onClick={() => handleAssinar(plano.nome, periodoAtual)}>
          Assinar
        </button>

        <ul>
          <li className="feature">
            <img src={IMAGEM_USER} alt="Usuário" className="icone" />
            <span>{plano.usuarios} Usuários</span>
          </li>
          <li className="feature">
            <img src={IMAGEM_SUPERUSER} alt="Super Usuário" className="icone" />
            <span>{plano.superUsuarios} Super Usuários</span>
          </li>
          <li className="feature">
            <img src={plano.relatorioWhatsApp ? IMAGEM_CHECK : IMAGEM_NAO} alt="" className="icone" />
            <span>Envio de relatório WhatsApp</span>
          </li>
          <li className="feature">
            <img src={plano.dashboardAnalitica ? IMAGEM_CHECK : IMAGEM_NAO} alt="" className="icone" />
            <span>Dashboard Analítica</span>
          </li>
        </ul>
      </div>
    );
  };

  return (
    <LayoutTela titulo="Gerenciamento de Planos">
      <div className="planos-container">
        <div className="periodo">
          <button className={periodo === "mensal" ? "ativo" : ""} onClick={() => setPeriodo("mensal")}>Mensal</button>
          <button className={periodo === "anual" ? "ativo" : ""} onClick={() => setPeriodo("anual")}>Anual</button>
        </div>

        <div className="cards">
          {planos.map((plano) => renderCard(plano, periodo))}
        </div>
      </div>
    </LayoutTela>
  );
}

export default PlanosInterno;
