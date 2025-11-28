import React, { useState, useEffect } from "react";
import LayoutTela from "../../components/LayoutTela/LayoutTela";
import Relogio from "../../components/Relogio/Relogio";
import { CardPlanoAtual } from "../../components/CardPlanoAtual/CardPlanoAtual";
import { ResumoPlano } from "../../components/ResumoPlano/ResumoPlano";
import api from "../../provider/api";
import { ENDPOINTS } from "../../utils/endpoints";
import { getToken, getFuncionario } from "../../utils/auth";
import "./Configuracoes.css";

export function Configuracoes() {
  const [plano, setPlano] = useState(null);
  const [empresa, setEmpresa] = useState(null);

  const funcionario = getFuncionario();
  const token = getToken();

  const diaAtual = new Date().toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });

  useEffect(() => {
    api
      .get(`${ENDPOINTS.GERENCIAMENTO_PLANO_EMPRESA}/${funcionario.empresaId}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setPlano(res.data);
      })
      .catch((err) => {
        console.error("Erro ao buscar plano da empresa:", err);
      });

       api
      .get(`${ENDPOINTS.EMPRESAS}/${funcionario.empresaId}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setEmpresa(res.data);
        console.log(empresa);
      })
      .catch((err) => {
        console.error("Erro ao buscar dados da empresa:", err);
      });

  }, [token]);

  return (
    <LayoutTela
      titulo="Configurações de Plano"
      adicional={
        <>
          {diaAtual} - <Relogio />
        </>
      }
    >
      {!plano || !empresa ? (
        <p className="loading">Carregando...</p>
      ) : (
        <div className="config-container">
          <div className="coluna-esquerda">
            <p className="descricao-plano">
              Veja as informações da sua empresa e os detalhes do plano ativo.
            </p>

            <div className="card usuario">
              <div className="campo">
                <label>Estabelecimento:</label>
                <input
                  value={empresa.nome || "Nome da Empresa Não Informado"}
                  readOnly={true}
                />
              </div>

              <div className="campo">
                <label>Endereço:</label>
                <input
                  value={empresa.endereco || "Endereço Não Informado"}
                  readOnly={true}
                />
              </div>

              <div className="campo">
                <label>CNPJ:</label>
                <input
                  value={empresa.cnpj || "CNPJ Não Informado"}
                  readOnly={true}
                />
              </div>

              <div className="campo">
                <label>WhatsApp:</label>
                <input
                  value={empresa.whatsapp || "WhatsApp Não Informado"}
                  readOnly={true}
                />
              </div>
            </div>
            <ResumoPlano plano={plano} />
          </div>

          <div className="coluna-direita">
            <CardPlanoAtual plano={plano} />
          </div>
        </div>
      )}
    </LayoutTela>
  );
}
