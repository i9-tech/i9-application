import React from "react";
import "./CardPlanoAtual.css";

export function CardPlanoAtual({ plano }) {
  const formatarData = (iso) => {
    if (!iso) return "--";
    const [y, m, d] = iso.split("-");
    return `${d}/${m}/${y}`;
  };

  const { planoTemplate } = plano;

  return (
    <div className="card-plano">
      <div className="plano-header">
        <h3>Seu plano atual!</h3>
      </div>

      <div className="plano-body">
        <span className="status ativo">Ativo</span>

        <p className="tipo">{planoTemplate.tipo}</p>
        <p className="descricao">{planoTemplate.descricao}</p>

        <div className="mensal">
          <span>Mensal</span>
          <strong>R$ {plano.valorCobrado.toFixed(2).replace(".", ",")}</strong>
        </div>

        <div className="datas">
          <div>
            <span className="label">Início:</span>
            <span>{formatarData(plano.dataInicio)}</span>
          </div>
          <div>
            <span className="label">Vencimento:</span>
            <span>{formatarData(plano.dataFim)}</span>
          </div>
        </div>

        <ul className="lista-beneficios">
          <li>✔️ {planoTemplate.qtdUsuarios} Usuários</li>
          <li>✔️ {planoTemplate.qtdSuperUsuarios} Super Usuários</li>
          <li>✔️ Dashboard Analítica</li>
          <li className={planoTemplate.acessoRelatorioWhatsApp ? "" : "negado"}>
            {planoTemplate.acessoRelatorioWhatsApp ? "✔️" : "❌"} Envio de relatório WhatsApp
          </li>
        </ul>

        <button className="btn-alterar">Alterar Plano</button>
      </div>
    </div>
  );
}
