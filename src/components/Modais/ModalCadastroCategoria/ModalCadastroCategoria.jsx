import { useEffect, useState } from "react";
import "./ModalCadastroCategoria.css";
import { getFuncionario } from "../../../utils/auth";
import api from "../../../provider/api";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ENDPOINTS } from "../../../utils/endpoints";


const ModalCadastroCategoria = ({ onCancelar, categoriaSelecionada }) => {
  const funcionario = getFuncionario();
  const [nomeCategoria, setNomeCategoria] = useState("");

  useEffect(() => {
    if (categoriaSelecionada) {
      setNomeCategoria(categoriaSelecionada.nome);
    }
  }, [categoriaSelecionada]);

  const validarDados = (nomeCategoria) => {
    console.log("Validando dados:", nomeCategoria);
    if (nomeCategoria === "") {
      alert("Nome inválido!");
      return false;
    }
    if (categoriaSelecionada) {
      editarCategoria(categoriaSelecionada, nomeCategoria);
    } else {
      cadastrarCategoria(nomeCategoria);
    }
  };

  const cadastrarCategoria = (nomeCategoria) => {
    const token = localStorage.getItem("token");

    api
      .post(`${ENDPOINTS.CATEGORIAS}/${funcionario.userId}`, {
        nome: nomeCategoria,
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log("Categoria cadastrado com sucesso:", response.data);
        toast.success("Categoria cadastrada com sucesso!");
        setTimeout(() => window.location.reload(), 3000);
      })
      .catch((error) => {
        toast.error("Erro ao cadastrar categoria!");
        console.error("Erro ao cadastrar categoria:", error);
      });
  };

  const editarCategoria = (categoriaSelecionada, nomeCategoria) => {

    const token = localStorage.getItem("token");

    api
      .put(`${ENDPOINTS.CATEGORIAS}/${categoriaSelecionada.id}/${funcionario.userId}`, {
        nome: nomeCategoria,
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log("Categoria atualizado com sucesso:", response.data);
        toast.success("Categoria atualizada com sucesso!");
        setTimeout(() => window.location.reload(), 3000);
      })
      .catch((error) => {
        toast.error("Erro ao atualizar categoria!");
        console.error("Erro ao atualizar categoria:", error);
      });
  };

  return (
    <div className="cadastro-formulario">
      <h1 className="titulo-cadastro">Cadastro de Categoria</h1>
      <p className="descricao-cadastro">As categoria servem para organizar os produtos e pratos</p>

      <form className="formulario-inputs">
        <div className="grupo-inputs">
          <label htmlFor="nome">Nome da Categoria *</label>
          <input
            id="nome"
            type="text"
            placeholder="Informe o nome da categoria"
            value={nomeCategoria}
            onChange={(e) => setNomeCategoria(e.target.value)}
            required
          />
        </div>

        <div className="botoes-formulario">
          <button type="button" className="btn-cancelar-cadastro" onClick={onCancelar}>
            Cancelar
          </button>
          <button type="submit" className="btn-cadastrar" onClick={(e) => { e.preventDefault(); validarDados(nomeCategoria); }}>
            {categoriaSelecionada ? "Editar" : "Cadastrar"}
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

export default ModalCadastroCategoria;
