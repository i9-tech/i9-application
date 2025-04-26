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
        {funcionario.setores.map((setor, index) => (
          <div key={index}>{setor}</div>
        ))}
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
