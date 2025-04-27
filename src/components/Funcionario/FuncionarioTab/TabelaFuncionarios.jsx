import { useState } from "react";
import React from "react";
import LinhaFuncionario from "../FuncionarioTab/FuncionarioLinha/LinhaFuncionario";
import "./TabelaFuncionarios.css";
import CabecalhoFuncionarios from "../FuncionarioTab/FuncionarioCabecalho/CabecalhoFuncionarios";
import ResumoFuncionario from "../FuncionarioTab/FuncionarioInfo/ResumoFuncionario";

function TabelaFuncionarios({ funcionarios, onEditar, onDeletar, onSelecionar, funcionarioSelecionado }) {
  
  return (
    <div className="tabela-funcionarios">
      <table>
        <CabecalhoFuncionarios />
      </table>

      <div className="corpo-tabela">
        <table>
          <tbody>
            {funcionarios.map((funcionario) => (
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
