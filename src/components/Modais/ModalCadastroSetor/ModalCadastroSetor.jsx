import { useEffect, useState } from "react";
import "./ModalCadastroSetor.css";
import { getFuncionario } from "../../../utils/auth";
import api from "../../../provider/api";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ENDPOINTS } from "../../../utils/endpoints";


const ModalCadastroSetor = ({ onCancelar, setorSelecionado }) => {
  const funcionario = getFuncionario();
  const [nomeSetor, setNomeSetor] = useState("");

  useEffect(() => {
    if (setorSelecionado) {
      setNomeSetor(setorSelecionado.nome);
    }
  }, [setorSelecionado]);

  const validarDados = (nomeSetor) => {
    console.log("Validando dados:", nomeSetor);
    if (nomeSetor === "") {
      alert("Nome inválido!");
      return false;
    }
    if (setorSelecionado) {
      editarSetor(setorSelecionado, nomeSetor);
    } else {
      cadastrarSetor(nomeSetor);
    }
  };

  const cadastrarSetor = (nomeSetor) => {
    const token = localStorage.getItem("token");

    api
      .post(`${ENDPOINTS.SETORES}/${funcionario.userId}`, {
        nome: nomeSetor,
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log("Setor cadastrado com sucesso:", response.data);
        toast.success("Setor cadastrado com sucesso!");
        setTimeout(() => window.location.reload(), 2000);
      })
      .catch((error) => {
        toast.error("Erro ao cadastrar setor!");
        console.error("Erro ao cadastrar setor:", error);
      });
  };

  const editarSetor = (setorSelecionado, nomeSetor) => {

    const token = localStorage.getItem("token");

    api
      .put(`${ENDPOINTS.SETORES}/${setorSelecionado.id}/${funcionario.userId}`, {
        nome: nomeSetor,
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log("Setor atualizado com sucesso:", response.data);
        toast.success("Setor atualizado com sucesso!");
        setTimeout(() => window.location.reload(), 2000);
      })
      .catch((error) => {
        toast.success("Erro ao atualizar setor!");
        console.error("Erro ao atualizar setor:", error);
      });
  };

  return (
    <div className="cadastro-formulario">
      <h1 className="titulo-cadastro">Cadastro de Setor</h1>
      <p className="descricao-cadastro">Os setores servem para organizar os produtos e pratos</p>

      <form className="formulario-inputs">
        <div className="grupo-inputs">
          <label htmlFor="nome">Nome do Setor *</label>
          <input
            id="nome"
            type="text"
            placeholder="Informe o nome do setor"
            value={nomeSetor}
            onChange={(e) => setNomeSetor(e.target.value)}
            required
          />
        </div>

        <div className="botoes-formulario">
          <button type="button" className="btn-cancelar-cadastro" onClick={onCancelar}>
            Cancelar
          </button>
          <button type="submit" className="btn-cadastrar" onClick={(e) => { e.preventDefault(); validarDados(nomeSetor); }}>
            {setorSelecionado ? "Editar" : "Cadastrar"}
          </button>

        </div>
      </form>

      <ToastContainer
        position="top-right"
        autoClose={3000}
        theme="light"
      />
      
    </div>
  );
};

export default ModalCadastroSetor;
