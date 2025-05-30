import React, { useState, useEffect } from "react";
import "./CadastroPratoFormulario.css";
import api from "../../../provider/api";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { ENDPOINTS } from "../../../utils/endpoints";
import { ROUTERS } from "../../../utils/routers";

const categorias = ["Bebida", "Entrada", "Prato Principal", "Sobremesa"];

const CadastroPratoFormulario = ({
  pratoSelecionado,
  setPratoSelecionado,
  descricao,
  setDescricao,
  imagem,
  setImagem,
}) => {
  const navigate = useNavigate();
  const [prato, setPrato] = useState({
    nome: "",
    valorVenda: "",
  });

  useEffect(() => {
    if (pratoSelecionado) {
      setPrato({
        nome: pratoSelecionado.nome || "",
        valorVenda: pratoSelecionado.valorVenda || "",
      });
    }
  }, [pratoSelecionado]);

  const limparFormulario = () => {
    setPrato({
      nome: "",
      valorVenda: "",
    });
    setPratoSelecionado(null);
    navigate(ROUTERS.ESTOQUE_PRATOS);
  };

  const validarCampos = () => {
    if (!prato.nome || !prato.valorVenda || !prato.categoria) {
      toast.error("Preencha todos os campos obrigatórios!");
      return false;
    }
    if (isNaN(prato.valorVenda) || prato.valorVenda < 0) {
      toast.error("Preço inválido!");
      return false;
    }
    return true;
  };

  const salvarPrato = () => {
    // const token = localStorage.getItem("token");

    const dados = {
      nome: prato.nome,
      imagem: imagem,
      valorVenda: parseFloat(prato.valorVenda),
      descricao: descricao,
      disponivel: true,
      setor: { id: 1 },
      categoria: { id: 2 },
      funcionario: { id: 1 },
      empresa: { id: 1 },
    };

     const metodo = pratoSelecionado
      ? api.patch(
          `${ENDPOINTS.PRATOS}/${pratoSelecionado.id}`,
          dados
          // , {
          //   headers: { Authorization: `Bearer ${token}` },}
        )
      : api.post(
          ENDPOINTS.PRATOS,
          dados
          // , {headers: { Authorization: `Bearer ${token}` },}
        );

    metodo
      .then(() => {
        toast.success(
          pratoSelecionado
            ? "Prato editado com sucesso!"
            : "Prato cadastrado com sucesso!"
        );
        limparFormulario();
      })
      .catch((error) => {
        console.error("Erro ao salvar prato:", error);
        toast.error("Erro ao salvar prato!");
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validarCampos()) salvarPrato();
  };

  return (
    <div className="formulario-prato">
      <p className="descricao-prato">
        Preencha os dados do prato que deseja adicionar ao cardápio 🍽️
      </p>

      <form className="formulario-inputs" onSubmit={handleSubmit}>
        <div className="grupo-inputs">
          <label>Nome do Prato *</label>
          <input
            type="text"
            value={prato.nome}
            onChange={(e) => setPrato({ ...prato, nome: e.target.value })}
            required
          />
        </div>

        <div className="linha-dupla">
          <div>
            <label>Preço (R$) *</label>
            <input
              type="text"
              step="0.01"
              value={prato.valorVenda}
              onChange={(e) =>
                setPrato({ ...prato, valorVenda: e.target.value })
              }
              required
            />
          </div>
          <div>
            <label>Tempo de Preparo (min)</label>
            <input
              type="number"
              min="0"
              value={prato.tempoPreparo}
              onChange={(e) =>
                setPrato({ ...prato, tempoPreparo: e.target.value })
              }
            />
          </div>
        </div>

        <div className="grupo-inputs">
          <label>Categoria *</label>
          <select
            value={prato.categoria}
            onChange={(e) => setPrato({ ...prato, categoria: e.target.value })}
            required
          >
            <option value="">Selecione uma categoria</option>
            {categorias.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        <div className="grupo-inputs">
          <label>Ingredientes</label>
          <input type="text" disabled style={{cursor: 'not-allowed', backgroundColor: '#d3d3d3', height: '5.6rem'}}/>
        </div>

        <div className="botoes-prato">
          <button type="button" onClick={limparFormulario}>
            Cancelar
          </button>
          <button type="submit">
            {pratoSelecionado ? "Editar" : "Cadastrar"}
          </button>
        </div>
      </form>

      <ToastContainer position="top-right" autoClose={3000} theme="light" />
    </div>
  );
};

export default CadastroPratoFormulario;
