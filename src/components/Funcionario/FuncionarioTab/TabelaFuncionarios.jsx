import { useState } from "react";
import LinhaFuncionario from "../FuncionarioTab/FuncionarioLinha/LinhaFuncionario";
import "./TabelaFuncionarios.css";
import CabecalhoFuncionarios from "../FuncionarioTab/FuncionarioCabecalho/CabecalhoFuncionarios";
import ResumoFuncionario from "../FuncionarioTab/FuncionarioInfo/ResumoFuncionario";

function TabelaFuncionarios({
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
            {funcionariosFiltrados.map((funcionario) => (
              <LinhaFuncionario
                key={funcionario.id}
                funcionario={funcionario}
                onSelecionar={onSelecionar}
                onEditar={onEditar}
                onDeletar={onDeletar}
              />
            ))}
          </tbody>
        </table>
      </div>

      <ResumoFuncionario funcionario={funcionarioSelecionado} />
    </div>
  );
}

export default TabelaFuncionarios;
