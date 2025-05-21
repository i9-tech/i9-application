import React, { useState, useEffect } from "react";
import "./CadastroPratoFormulario.css";
import api from "../../../provider/api";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

const categorias = ["Bebida", "Entrada", "Prato Principal", "Sobremesa"];
const setores = ["Cozinha", "Estoque", "Atendimento"];

const CadastroPratoFormulario = ({
  pratoSelecionado,
  setPratoSelecionado,
  onSubmit,
}) => {
  const navigate = useNavigate();
  const [prato, setPrato] = useState({
    nome: "",
    venda: "",
    setor: "",
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
        venda: pratoSelecionado.venda || "",
        setor: pratoSelecionado.setor || "",
        categoria: pratoSelecionado.categoria || "",
        ingredientes: pratoSelecionado.ingredientes || [],
      });
    }
  }, [pratoSelecionado]);

  const validarCampos = () => {
    if (!prato.nome || !prato.venda || !prato.categoria) {
      toast.error("Preencha todos os campos obrigatórios!");
      return false;
    }
    const vendaValida = parseFloat(prato.preco);
    if (isNaN(vendaValida) || vendaValida < 0) {
      toast.error("Venda inválida!");
      return false;
    }
    return true;
  };

  const limparFormulario = () => {
    setPrato({
      nome: "",
      venda: "",
      setor: "",
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
        venda: parseFloat(prato.venda),
        tempoPreparo: prato.tempoPreparo ? parseInt(prato.tempoPreparo) : null,
      };
      onSubmit(dados);
    }
  };

  return (
    <div className="formulario-prato">
      <p className="descricao-prato">
        Preencha os dados do prato que deseja adicionar ao cardápio 🍽️
      </p>

      <form className="formulario-inputs" onSubmit={handleSubmit}>
        <div className="grupo-inputs">
          <label>Nome do Prato </label>
          <input
            type="text"
            value={prato.nome}
            onChange={(e) => setPrato({ ...prato, nome: e.target.value })}
            required
          />
        </div>

        <div className="grupo-inputs">
          <label>Venda (R$) </label>
          <input
            type="number"
            step="0.01"
            value={prato.venda}
            onChange={(e) => setPrato({ ...prato, venda: e.target.value })}
            required
          />
        </div>

        <div className="linha-dupla">
          <div className="grupo-inputs">
            <label>Categoria</label>
            <select
              value={prato.categoria}
              onChange={(e) =>
                setPrato({ ...prato, categoria: e.target.value })
              }
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
            <label>Setor</label>
            <select
              value={prato.setor}
              onChange={(e) => setPrato({ ...prato, setor: e.target.value })}
              required
            >
              <option value="">Selecione um setor</option>
              {setores.map((set) => (
                <option key={set} value={set}>
                  {set}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="grupo-inputs">
          <label>Ingredientes</label>
          <select
            multiple
            value={prato.ingredientes}
            onChange={(e) =>
              setPrato({
                ...prato,
                ingredientes: Array.from(
                  e.target.selectedOptions,
                  (opt) => opt.value
                ),
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
