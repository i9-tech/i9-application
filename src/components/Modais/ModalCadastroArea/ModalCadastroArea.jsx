import { useEffect, useState } from "react";
import "./ModalCadastroArea.css";
import { getFuncionario } from "../../../utils/auth";
import api from "../../../provider/api";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ENDPOINTS } from "../../../utils/endpoints";


const ModalCadastroArea = ({ onCancelar, setorSelecionado }) => {
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
      <h1 className="titulo-cadastro">Cadastro de Área</h1>
      <p className="descricao-cadastro">As áreas servem para organizar a preparação dos pratos na cozinha</p>

      <form className="formulario-inputs">
        <div className="grupo-inputs">
          <label htmlFor="nome">Nome da Área *</label>
          <input
            id="nome"
            type="text"
            placeholder="Informe o nome da área"
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

export default ModalCadastroArea;