import React, { useState, useEffect } from "react";
import CadastroFuncionarioFormulario from "../../components/Funcionario/FuncionarioForm/CadastroFuncionarioFormulario";
import TabelaFuncionarios from "../../components/Funcionario/FuncionarioTab/TabelaFuncionarios";
import Navbar from "../../components/Navbar/Navbar";
import "./Funcionarios.css";
import FuncionarioFoto from "../../components/Funcionario/FuncionarioFoto/FuncionarioFoto";
import api from "../../provider/api";
import { getFuncionario } from "../../utils/auth";
import BaseModais from "../../components/Modais/BaseModais";

export function Funcionarios() {
  const funcionarioLogin = getFuncionario();
  const [funcionarioSelecionado, setFuncionarioSelecionado] = useState(null);
  const [funcionarios, setFuncionarios] = useState([]);

    const [showModal, setShowModal] = useState(false);
    const [modalMensagem, setModalMensagem] = useState("");
  

  useEffect(() => {
    const fetchFuncionarios = async () => {
      try {
        const response = await api.get(`/colaboradores/${funcionarioLogin.empresaId}`, {
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
    setFuncionarioSelecionado(funcionario);
    console.log("Editar", funcionario);
  };

  const handleDeletar = (funcionario) => {
    const confirmacao = window.confirm(`Tem certeza que deseja excluir o funcionário ${funcionario.nome}?`);

    if (!confirmacao) return;
  
    const token = localStorage.getItem("token");
    console.log(funcionario.empresaId);
  
    api
      .delete(`/colaboradores/${funcionario.id}/${funcionarioLogin.empresaId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log("Funcionário deletado com sucesso:", response.data);
        setShowModal(true);
        setModalMensagem("Funcionário excluido com sucesso!");
        setTimeout(() => window.location.reload(), 2000); 

      })
      .catch((error) => {
        console.error("Erro ao deletar funcionário:", error);
      });
  };
  

  return (
    <>
      <Navbar />
      <div className="container-funcionario">
        <div className="coluna-esquerda">
          <CadastroFuncionarioFormulario funcionarioSelecionado={funcionarioSelecionado}  setFuncionarioSelecionado={setFuncionarioSelecionado}/>
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

      {showModal && (
            <BaseModais titulo="Sucesso!" >
              {modalMensagem}
            </BaseModais>
          )}
    </>
  );
}

export default Funcionarios;