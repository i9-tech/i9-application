import React, { useState, useEffect } from "react";
import LayoutTela from "../../components/LayoutTela/LayoutTela";
import Relogio from "../../components/Relogio/Relogio";
import { CardPlanoAtual } from "../../components/CardPlanoAtual/CardPlanoAtual";
import { ResumoPlano } from "../../components/ResumoPlano/ResumoPlano";
import "./Configuracoes.css";

export function Configuracoes() {
  const [plano, setPlano] = useState(null);
  const [_editando, setEditando] = useState(false);
  const [empresaEditada, setEmpresaEditada] = useState(null);

  const diaAtual = new Date().toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });

  useEffect(() => {
    const mock = {
      dataInicio: "2025-11-21",
      dataFim: "2025-12-21",
      valorCobrado: 249.0,
      ativo: true,
      testeGratis: true, // <- ATIVANDO TESTE GRÁTIS
      diasTeste: 5, // <- EXIBIR DIAS RESTANTES
      periodo: "ANUAL",
      empresa: {
        nomeResponsavel: "João Silva",
        nomeFantasia: "Tatuí Lanches",
        email: "joao@tatui.com",
      },
      planoTemplate: {
        tipo: "Profissional",
        descricao:
          "Para quem busca otimizar os processos da empresa com automações e dashboards",
        qtdUsuarios: 35,
        qtdSuperUsuarios: 4,
        acessoDashboard: true,
        acessoRelatorioWhatsApp: false,
      },
    };

    setPlano(mock);
    setEmpresaEditada(mock.empresa);
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEmpresaEditada((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const _cancelarEdicao = () => {
    setEmpresaEditada(plano.empresa);
    setEditando(false);
  };

  const _salvarAlteracoes = () => {
    console.log("Salvar alterações:", empresaEditada);
    // Aqui no futuro fará um PUT para o backend
    setEditando(false);
  };

  return (
    <LayoutTela
      titulo="Configurações de Plano"
      adicional={
        <>
          {diaAtual} - <Relogio />
        </>
      }
    >
      {!plano ? (
        <p className="loading">Carregando...</p>
      ) : (
        <div className="config-container">
          <div className="coluna-esquerda">

        <p className="descricao-plano">
                Gerencie aqui as informações da sua empresa e o plano que você
                adquiriu.
              </p>

            <div className="card usuario">
              
              <div className="campo">
                <label>Nome:</label>
                <input
                  name="nomeResponsavel"
                  value={empresaEditada.nomeResponsavel}
                  readOnly={true}
                  onChange={handleInputChange}
                />
              </div>
              <div className="campo">
                <label>Estabelecimento:</label>
                <input
                  name="nomeFantasia"
                  value={empresaEditada.nomeFantasia}
                  readOnly={true}
                  onChange={handleInputChange}
                />
              </div>
              <div className="campo">
                <label>Email:</label>
                <input
                  name="email"
                  value={empresaEditada.email}
                  readOnly={true}
                  onChange={handleInputChange}
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
