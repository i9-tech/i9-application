import React from "react";
import "./ResumoPlano.css";
import iconeCalendario from "../../assets/calendar-alt-svgrepo-com.svg";
import iconeRenovacao from "../../assets/auto-renewal-2-svgrepo-com.svg";
import iconePagamento from "../../assets/card-billing-svgrepo-com.svg";
import iconeTeste from "../../assets/gift-svgrepo-com.svg";
import iconeAlerta from "../../assets/alert-svgrepo-com.svg";

export function ResumoPlano({ plano }) {
  if (!plano) return null;

  const formatarData = (iso) => {
    if (!iso) return "Não disponível";
    const [y, m, d] = iso.split("-");
    return `${d}/${m}/${y}`;
  };

  const calcularDiasRestantes = (dataInicioIso, diasTeste) => {
    if (!dataInicioIso || !diasTeste) return 0;

    const hoje = new Date();
    const inicio = new Date(dataInicioIso);

    const diffMs = hoje - inicio;
    const diasPassados = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    return diasTeste - diasPassados;
  };


  const diasRestantes = calcularDiasRestantes(plano.dataInicio, plano.diasTeste);
  const testeAtivo = plano.testeGratis && diasRestantes > 0;

  return (
    <div className="resumo-plano">

      {plano.testeGratis ? (
        
        <div className="badge-teste">
          <img src={iconeTeste} alt="Teste" className="icone-badge" />

          {testeAtivo ? (
            <>
              <strong>Teste gratuito</strong> • {diasRestantes} dias restantes
            </>
          ) : (
            <strong>Período de teste gratuito expirado</strong>
          )}
        </div>
      ) : (
       
        <div className="badge-teste">
          <img src={iconeTeste} alt="Teste" className="icone-badge" />
          <strong>Este plano não possui mais período de teste. O período já foi encerrado.</strong>
        </div>
      )}

      <h4 className="titulo">Resumo da Assinatura</h4>

      <div className="linha-info">
        <div className="label">
          <img src={iconeCalendario} className="icone" alt="" />
          Assinante desde
        </div>
        <div className="valor">{formatarData(plano.dataAdesao)}</div>
      </div>

      <div className="linha-info">
        <div className="label">
          <img src={iconeRenovacao} className="icone" alt="" />
          Renovação em
        </div>
        <div className="valor">{formatarData(plano.dataFim)}</div>
      </div>

      <div className="linha-info">
        <div className="label">
          <img src={iconePagamento} className="icone" alt="" />
          Cobrança
        </div>
        <div className="valor">
          {plano.periodo === "MENSAL" ? "Mensal" : "Anual"}
        </div>
      </div>

      <div className={`alerta ${plano.ativo ? "ativo" : "inativo"}`}>
        <img src={iconeAlerta} className="icone-alerta" alt="" />
        {plano.ativo ? "Seu plano está ativo!" : "Seu plano está inativo"}
      </div>
    </div>
  );
}
