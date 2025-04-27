import React from "react";
import "./LinhaFuncionario.css";

const LinhaFuncionario = ({
  funcionario,
  onSelecionar,
  onEditar,
  onDeletar,
}) => {
  return (
    <tr className="linha-funcionario" onClick={() => onSelecionar(funcionario)}>
      <td>{funcionario.nome}</td>
      <td>
        <div>{funcionario.acessoSetorCozinha && "Cozinha"}</div>
        <div>{funcionario.acessoSetorEstoque && "Estoque"}</div>
        <div>{funcionario.acessoSetorAtendimento && "Atendimento"}</div>
      </td>
      <td className="acoes" onClick={(e) => e.stopPropagation()}>
        <button onClick={() => onEditar(funcionario)}>✏️</button>
        <span> | </span>
        <button onClick={() => onDeletar(funcionario.id)}>🗑️</button>
      </td>
    </tr>
  );
};

export default LinhaFuncionario;