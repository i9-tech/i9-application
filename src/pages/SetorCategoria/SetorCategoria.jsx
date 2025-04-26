import React from "react";
import "./SetorCategoria.css";
import Navbar from "../../components/Navbar/Navbar";

export function SetorCategoria() {
  return (
    <>

      <Navbar />
      <div className="formulario-funcionario">
        <div className="botoes">
          <button type="button" className="btn-cancelar">
            Cadastrar Setor Alimentício
          </button>
          <button type="submit" className="btn-cadastrar">
            Cadastrar Categorias de Alimentos
          </button>

        </div>
      </div>

    </>
  );
};

export default SetorCategoria;
