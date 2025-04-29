import React, { useState, useEffect } from "react";
import CadastroFuncionarioFormulario from "../../components/Funcionario/FuncionarioForm/CadastroFuncionarioFormulario";
import TabelaFuncionarios from "../../components/Funcionario/FuncionarioTab/TabelaFuncionarios";
import Navbar from "../../components/Navbar/Navbar";
import "./Funcionarios.css";
import FuncionarioFoto from "../../components/Funcionario/FuncionarioFoto/FuncionarioFoto";
import api from "../../provider/api";
import { getFuncionario } from "../../utils/auth";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Swal from "sweetalert2";


export function Funcionarios() {
  const funcionarioLogin = getFuncionario();
  const [funcionarioSelecionado, setFuncionarioSelecionado] = useState(null);
  const [funcionarios, setFuncionarios] = useState([]);


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
    if (funcionario.id === funcionarioLogin.id || funcionario.proprietario) {
      toast.error("Você não pode excluir a si mesmo ou o proprietário!");
      return;
    }

    Swal.fire({
      title: "Tem certeza?",
      text: `Deseja excluir ${funcionario.nome}?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sim, excluir",
      cancelButtonText: "Cancelar",
      customClass: {
        confirmButton: 'btn-aceitar',
        cancelButton: 'btn-cancelar',
      },
      buttonsStyling: false, 
    }).then((result) => {
      if (result.isConfirmed) {
        const token = localStorage.getItem("token");
        console.log(funcionarioLogin.empresaId);
        console.log(funcionario.id);

        api
          .delete(
            `/colaboradores/${funcionario.id}/${funcionarioLogin.empresaId}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          )
          .then((response) => {
            console.log("Funcionário deletado com sucesso:", response.data);
            toast.success("Funcionário excluído com sucesso!");
            setTimeout(() => window.location.reload(), 2000);
          })
          .catch((error) => {
            console.error("Erro ao deletar funcionário:", error);
            toast.error("Erro ao deletar funcionário!");
          });
      }
    });
  };


  return (
    <>
      <Navbar />
      <div className="container-funcionario">
        <div className="coluna-esquerda">
          <CadastroFuncionarioFormulario funcionarioSelecionado={funcionarioSelecionado} setFuncionarioSelecionado={setFuncionarioSelecionado} />
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

      <ToastContainer
        position="top-right"
        autoClose={3000}
        theme="light"
      />
    </>
  );
}

export default Funcionarios;