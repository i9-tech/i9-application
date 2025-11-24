import React from "react";
import "./ResumoPlano.css";
import iconeCalendario from "../../assets/calendar-alt-svgrepo-com.svg";
import iconeRenovacao from "../../assets/auto-renewal-2-svgrepo-com.svg";
import iconePagamento from "../../assets/card-billing-svgrepo-com.svg";
import iconeTeste from "../../assets/gift-svgrepo-com.svg";
import iconeAlerta from "../../assets/alert-svgrepo-com.svg";

export function ResumoPlano() {
  const formatarData = (iso) => {
    if (!iso) return "Não disponível";
    const [y, m, d] = iso.split("-");
    return `${d}/${m}/${y}`;
  };

  const plano = {
    dataAdesao: "2025-11-21",
    dataFim: "2025-12-21",
    periodo: "ANUAL",
    testeGratis: true,
    diasTeste: 14,
    ativo: false,
  };

  return (
    <div className="resumo-plano">
      {plano.testeGratis && (
        <div className="badge-teste">
          <img
            src={iconeTeste}
            alt="Ícone de teste grátis"
            className="icone-badge"
          />
          <strong>Teste gratuito</strong> • {plano.diasTeste} dias restantes
        </div>
      )}

      <h4 className="titulo">Resumo da Assinatura</h4>

      <div className="linha-info">
        <div className="label">
          <img src={iconeCalendario} alt="Calendário" className="icone" />
          Assinante desde
        </div>
        <div className="valor">{formatarData(plano.dataAdesao)}</div>
      </div>

      <div className="linha-info">
        <div className="label">
          <img src={iconeRenovacao} alt="Renovação" className="icone" />
          Renovação em
        </div>
        <div className="valor">{formatarData(plano.dataFim)}</div>
      </div>

      <div className="linha-info">
        <div className="label">
          <img src={iconePagamento} alt="Cobrança" className="icone" />
          Cobrança
        </div>
        <div className="valor">
          {plano.periodo === "MENSAL" ? "Mensal" : "Anual"}
        </div>
      </div>

      {!plano.ativo && (
        <div className="alerta">
          <img src={iconeAlerta} alt="Alerta" className="icone-alerta" /> Seu
          plano está inativo
        </div>
      )}
    </div>
  );
}
