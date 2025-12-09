import React, { useEffect, useState } from "react";
import "./ModalPlanos.css";
import api from "../../provider/api";
import { ENDPOINTS } from "../../utils/endpoints";

import IMAGEM_USER from "../../assets/usuario.svg";
import IMAGEM_SUPERUSER from "../../assets/icon-adminn.svg";
import IMAGEM_NAO from "../../assets/block.svg";
import IMAGEM_CHECK from "../../assets/check.svg";

export function ModalPlanos({ aberto, onFechar, planoAtual }) {
  const [periodo, setPeriodo] = useState("mensal");
  const [templates, setTemplates] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    api
      .get(ENDPOINTS.PLANOS_TEMPLATES)
      .then((res) => {
        const data = Array.isArray(res.data)
          ? res.data
          : res.data?.content ?? res.data;
        setTemplates(Array.isArray(data) ? data : []);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const formatarMoeda = (value) => {
    if (value == null) return "-";
    const num = typeof value === "number" ? value : parseFloat(String(value).replace(",", "."));
    return isNaN(num)
      ? "-"
      : num.toLocaleString("pt-BR", { minimumFractionDigits: 2 });
  };

  if (!aberto) return null;

  return (
    <div className="overlay-modal-planos">
      <div className="conteudo-modal-planos">
        <button className="btn-fechar" onClick={onFechar}>×</button>

        {/* Seleção de período */}
        <div className="periodo">
          <button
            className={periodo === "mensal" ? "ativo" : ""}
            onClick={() => setPeriodo("mensal")}
          >
            Mensal
          </button>

          <button
            className={periodo === "anual" ? "ativo" : ""}
            onClick={() => setPeriodo("anual")}
          >
            Anual
          </button>
        </div>

        {/* Carregando */}
        {loading && <p className="carregando">Carregando planos...</p>}

        {/* Cards */}
        <div className="cards">
          {templates.map((tpl) => {
            const usuariosNum = parseInt(String(tpl.qtdUsuarios ?? "").replace(/\D/g, ""), 10);
            const usuariosLabel =
              !isNaN(usuariosNum) && usuariosNum > 1000
                ? "Ilimitados"
                : tpl.qtdUsuarios ?? "-";

            const planoAtualId = planoAtual?.planoTemplate?.id;
            const planoAtualPeriodo = planoAtual?.periodo?.toLowerCase();

            const isMesmoPlano = tpl.id === planoAtualId;
            const isMesmoPeriodo = periodo === planoAtualPeriodo;

            let botaoLabel = "Selecionar plano";
            let botaoDisabled = false;

            if (isMesmoPlano && isMesmoPeriodo) {
              // Plano atual e mesmo período → desabilitado
              botaoLabel = "ESSE É O SEU PLANO";
              botaoDisabled = true;
            } else if (isMesmoPlano && !isMesmoPeriodo) {
              // Mesmo plano, período diferente
              botaoLabel =
                planoAtualPeriodo === "mensal"
                  ? "Fazer Upgrade"
                  : "Fazer Downgrade";
            } else if (planoAtualId && tpl.id < planoAtualId) {
              botaoLabel = "Fazer Downgrade";
            } else if (planoAtualId && tpl.id > planoAtualId) {
              botaoLabel = "Fazer Upgrade";
            }

            return (
              <div
                key={tpl.id}
                className={`card-planos
                  ${tpl.tipo?.toLowerCase() === "profissional" ? "destaque-card" : ""}
                  ${isMesmoPlano && isMesmoPeriodo ? "plano-atual" : ""}`}
              >
                <h2>{tpl.tipo}</h2>
                <p>{tpl.descricao ?? "-"}</p>

                <h3>
                  R$
                  {formatarMoeda(
                    periodo === "mensal"
                      ? tpl.precoMensal
                      : tpl.precoMensalComDescontoAnual ?? tpl.precoAnual / 12
                  )}
                  <span>/mês</span>
                </h3>

                {periodo === "anual" && (
                  <span className="total-anual">
                    R${formatarMoeda(tpl.precoAnual)} / ano
                  </span>
                )}

               <button
  className={`btn-secondary ${botaoDisabled ? "btn-atual" : ""}`}
  disabled={botaoDisabled}
>
  {botaoLabel}
</button>

                <ul>
                  <li className="feature">
                    <img src={IMAGEM_USER} className="icone" alt="Usuário" />
                    <span>{usuariosLabel} Usuários</span>
                  </li>

                  <li className="feature">
                    <img src={IMAGEM_SUPERUSER} className="icone" alt="Super Usuário" />
                    <span>{tpl.qtdSuperUsuarios ?? "-"} Super Usuários</span>
                  </li>

                  <li className="feature">
                    <img
                      src={tpl.acessoRelatorioWhatsApp ? IMAGEM_CHECK : IMAGEM_NAO}
                      className="icone"
                      alt={tpl.acessoRelatorioWhatsApp ? "Disponível" : "Não disponível"}
                    />
                    <span>Envio de relatório WhatsApp</span>
                  </li>

                  <li className="feature">
                    <img
                      src={tpl.acessoDashboard ? IMAGEM_CHECK : IMAGEM_NAO}
                      className="icone"
                      alt={tpl.acessoDashboard ? "Disponível" : "Não disponível"}
                    />
                    <span>Dashboard Analítica</span>
                  </li>
                </ul>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
