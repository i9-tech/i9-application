import React, { useEffect, useState } from "react";
import "./ModalCadastroSetor.css";
import { getFuncionario } from "../../../utils/auth";
import api from "../../../provider/api";

const ModalCadastroSetor = ({ onCancelar, onSalvar, setorSelecionado }) => {
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
      .post(`/setores/${funcionario.userId}`, {
        nome: nomeSetor,
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log("Setor cadastrado com sucesso:", response.data);
        alert("Setor cadastrado com sucesso!");
        setTimeout(() => window.location.reload(), 2000);
      })
      .catch((error) => {
        console.error("Erro ao cadastrar setor:", error);
      });
  };

  const editarSetor = (setorSelecionado, nomeSetor) => {

    const token = localStorage.getItem("token");

    api
      .put(`/setores/${setorSelecionado.id}/${funcionario.userId}`, {
        nome: nomeSetor,
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log("Setor atualizado com sucesso:", response.data);
        alert("Setor atualizado com sucesso!");
        setTimeout(() => window.location.reload(), 2000);
      })
      .catch((error) => {
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
    </div>
  );
};

export default ModalCadastroSetor;
