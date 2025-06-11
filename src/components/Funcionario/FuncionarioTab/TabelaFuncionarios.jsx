import { useState } from "react";
import LinhaFuncionario from "../FuncionarioTab/FuncionarioLinha/LinhaFuncionario";
import "./TabelaFuncionarios.css";
import CabecalhoFuncionarios from "../FuncionarioTab/FuncionarioCabecalho/CabecalhoFuncionarios";
import ResumoFuncionario from "../FuncionarioTab/FuncionarioInfo/ResumoFuncionario";
import CarregamentoEstoque from "../../Estoque/CarregamentoEstoque";
import NoDataEstoque from "../../Estoque/NoDataEstoque";

function TabelaFuncionarios({
  isLoadingData,
  funcionarios,
  onEditar,
  onDeletar,
  onSelecionar,
  funcionarioSelecionado,
}) {
  const [filtroNome, setFiltroNome] = useState("");

  const removerAcentos = (str) =>
    str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");

  const funcionariosFiltrados = funcionarios.filter((func) =>
    removerAcentos(func.nome.toLowerCase()).includes(
      removerAcentos(filtroNome.trim().toLowerCase())
    )
  );

  return (
    <div className="tabela-funcionarios">
      <div className="info-sc-card__input-wrapper">
        <input
          type="text"
          placeholder="Procurar Funcionário"
          className="info-sc-card__input"
          value={filtroNome}
          onChange={(e) => setFiltroNome(e.target.value)}
        />
        <span className="info-sc-card__icon">🔍</span>
      </div>

      <table>
        <CabecalhoFuncionarios />
      </table>

      <div className="corpo-tabela">
        <table>
          <tbody>
            {isLoadingData ? (
              <CarregamentoEstoque colunas={3} temImagem={false} />
            ) : funcionariosFiltrados.length > 0 ? (
              funcionariosFiltrados.map((funcionario) => (
                <LinhaFuncionario
                  key={funcionario.id}
                  funcionario={funcionario}
                  onSelecionar={onSelecionar}
                  onEditar={onEditar}
                  onDeletar={onDeletar}
                />
              ))
            ) : (
              <NoDataEstoque tipo="funcionário" />
            )}
          </tbody>
        </table>
      </div>

      <ResumoFuncionario funcionario={funcionarioSelecionado} />
    </div>
  );
}

export default TabelaFuncionarios;
