import React from "react";
import "./ResumoFuncionario.css";

function ResumoFuncionario({ funcionario }) {
  return (
    <div className="resumo-funcionario">
      <p>
        <strong>Nome completo:</strong> {funcionario ? funcionario.nome : ""}
      </p>
      <p>
        <strong>Data de admissão:</strong>{" "}
        {funcionario ? funcionario.dataAdmissao : ""}
      </p>
    </div>
  );
}

export default ResumoFuncionario;
