import React, { useState, useEffect } from "react";
import "./CadastroPratoFormulario.css";
import api from "../../../provider/api";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

const categorias = ["Bebida", "Entrada", "Prato Principal", "Sobremesa"];

const CadastroPratoFormulario = ({ pratoSelecionado, setPratoSelecionado, onSubmit }) => {
  const navigate = useNavigate();
  const [prato, setPrato] = useState({
    nome: "",
    preco: "",
    tempoPreparo: "",
    categoria: "",
    ingredientes: [],
  });

  const [produtos, setProdutos] = useState([]);

  useEffect(() => {
    api
      .get("/produtos")
      .then((res) => setProdutos(res.data))
      .catch((err) => console.error("Erro ao buscar produtos:", err));
  }, []);

  useEffect(() => {
    if (pratoSelecionado) {
      setPrato({
        nome: pratoSelecionado.nome || "",
        preco: pratoSelecionado.preco || "",
        tempoPreparo: pratoSelecionado.tempoPreparo || "",
        categoria: pratoSelecionado.categoria || "",
        ingredientes: pratoSelecionado.ingredientes || [],
      });
    }
  }, [pratoSelecionado]);

  const validarCampos = () => {
    if (!prato.nome || !prato.preco || !prato.categoria) {
      toast.error("Preencha todos os campos obrigatórios!");
      return false;
    }
    const precoValido = parseFloat(prato.preco);
    if (isNaN(precoValido) || precoValido < 0) {
      toast.error("Preço inválido!");
      return false;
    }
    return true;
  };

  const limparFormulario = () => {
    setPrato({
      nome: "",
      preco: "",
      tempoPreparo: "",
      categoria: "",
      ingredientes: [],
    });
    setPratoSelecionado(null);
    navigate("/estoque-pratos");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validarCampos()) {
      const dados = {
        ...prato,
        preco: parseFloat(prato.preco),
        tempoPreparo: prato.tempoPreparo ? parseInt(prato.tempoPreparo) : null,
      };
      onSubmit(dados); // ✨ envia os dados para o pai (Pratos.jsx)
    }
  };

  return (
    <div className="formulario-prato">
      <p className="descricao-prato">Preencha os dados do prato que deseja adicionar ao cardápio 🍽️</p>

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
              type="number"
              step="0.01"
              value={prato.preco}
              onChange={(e) => setPrato({ ...prato, preco: e.target.value })}
              required
            />
          </div>
          <div>
            <label>Tempo de Preparo (min)</label>
            <input
              type="number"
              min="0"
              value={prato.tempoPreparo}
              onChange={(e) => setPrato({ ...prato, tempoPreparo: e.target.value })}
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
          <select
            multiple
            value={prato.ingredientes}
            onChange={(e) =>
              setPrato({
                ...prato,
                ingredientes: Array.from(e.target.selectedOptions, (opt) => opt.value),
              })
            }
          >
            {produtos.map((prod) => (
              <option key={prod.id} value={prod.id}>
                {prod.nome}
              </option>
            ))}
          </select>
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
