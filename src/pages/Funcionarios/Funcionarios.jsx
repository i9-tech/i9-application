import React, { useState, useEffect } from "react";
import CadastroFuncionarioFormulario from "../../components/Funcionario/FuncionarioForm/CadastroFuncionarioFormulario";
import TabelaFuncionarios from "../../components/Funcionario/FuncionarioTab/TabelaFuncionarios";
import Navbar from "../../components/Navbar/Navbar";
import "./Funcionarios.css";
import FuncionarioFoto from "../../components/Funcionario/FuncionarioFoto/FuncionarioFoto";
import api from "../../provider/api";
import { getFuncionario } from "../../utils/auth";

export function Funcionarios() {
  const funcionario = getFuncionario();
  const [funcionarioSelecionado, setFuncionarioSelecionado] = useState(null);
  const [funcionarios, setFuncionarios] = useState([]);

  useEffect(() => {
    const fetchFuncionarios = async () => {
      try {
        const response = await api.get(`/colaboradores/${funcionario.empresaId}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`, 
          },
        });
        setFuncionarios(response.data);
      } catch (error) {
        console.error("Erro ao buscar os funcionários:", error);
      }
    };

    fetchFuncionarios();
  }, []);

  const handleSelecionar = (funcionario) => {
    setFuncionarioSelecionado(funcionario);
  };

  const handleEditar = (funcionario) => {
    console.log("Editar", funcionario);
  };

  const handleDeletar = (id) => {
    const novaLista = funcionarios.filter((func) => func.id !== id);
    setFuncionarios(novaLista);
  };

  return (
    <>
      <Navbar />
      <div className="container-funcionario">
        <div className="coluna-esquerda">
          <CadastroFuncionarioFormulario />
        </div>

        <div className="coluna-meio">
          <FuncionarioFoto />
        </div>

        <div className="coluna-direita">
          <TabelaFuncionarios
            funcionarios={funcionarios}
            onEditar={handleEditar}
            onDeletar={handleDeletar}
            onSelecionar={handleSelecionar}
            funcionarioSelecionado={funcionarioSelecionado}
          />
        </div>
      </div>
    </>
  );
}

export default Funcionarios;
