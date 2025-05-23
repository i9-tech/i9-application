import React, { useState, useEffect } from "react";
import "./CadastroProdutoFormulario.css";
import api from "../../../provider/api";
import { getFuncionario } from "../../../utils/auth";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { ENDPOINTS } from "../../../utils/endpoints";
import { ROUTERS } from "../../../utils/routers";

const CadastroProdutoFormulario = ({
  produtoSelecionado,
  setProdutoSelecionado,
  descricao,
  setDescricao,
  imagem,
  setImagem,
}) => {
  const navigate = useNavigate();
  const funcionario = getFuncionario();
  const hoje = new Date().toISOString().split("T")[0];
  const token = localStorage.getItem("token");

  const [produto, setProduto] = useState({
    codigo: "",
    nome: "",
    quantidade: "",
    valorCompra: "",
    valorUnitario: "",
    quantidadeMin: "",
    quantidadeMax: "",
    dataRegistro: "",
  });

  useEffect(() => {
    if (produtoSelecionado) {
      setProduto({
        codigo: produtoSelecionado.codigo || "",
        nome: produtoSelecionado.nome || "",
        quantidade: produtoSelecionado.quantidade || "",
        valorCompra: produtoSelecionado.valorCompra || "",
        valorUnitario: produtoSelecionado.valorUnitario || "",
        quantidadeMin: produtoSelecionado.quantidadeMin || "",
        quantidadeMax: produtoSelecionado.quantidadeMax || "",
        dataRegistro: produtoSelecionado.dataRegistro || "",
      });
    }
  }, [produtoSelecionado]);

  const limparFormulario = () => {
    setProduto({
      codigo: "",
      nome: "",
      quantidade: "",
      valorCompra: "",
      valorUnitario: "",
      quantidadeMin: "",
      quantidadeMax: "",
    });
    setDescricao("");
    setImagem("");
    setProdutoSelecionado(null);
    navigate(ROUTERS.ESTOQUE_PRODUTOS);
  };

  const validarCampos = () => {
    if (!produto.codigo || !produto.nome || !produto.quantidade) {
      toast.error("Preencha todos os campos obrigatórios!");
      return false;
    }
    if (
      isNaN(produto.quantidade) ||
      produto.quantidade < 0 ||
      isNaN(produto.quantidadeMin) ||
      produto.quantidadeMin < 0 ||
      isNaN(produto.quantidadeMax) ||
      produto.quantidadeMax < 0
    ) {
      toast.error("As quantidades devem ser números positivos!");
      return false;
    }

    return true;
  };

  const buscarURLImagem = () => {
    const formData = new FormData();
    formData.append("file", imagem);

    api
      .post(ENDPOINTS.IMAGEM_AZURE, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        // console.log("data: ", res);
        salvarProduto(res.data.imageUrl);
      })
      .catch((err) => {
        console.log("erro ao adicionar imagem ao blob storage: ", err);
      });
  };

  const salvarProduto = (urlImagem) => {
    const dados = {
      codigo: produto.codigo,
      nome: produto.nome,
      quantidade: parseInt(produto.quantidade),
      valorCompra: produto.valorCompra,
      valorUnitario: produto.valorUnitario,
      quantidadeMin: parseInt(produto.quantidadeMin),
      quantidadeMax: parseInt(produto.quantidadeMax),
      descricao: descricao,
      dataRegistro: produto.dataRegistro ? produto.dataRegistro : hoje,
      imagem: urlImagem,
      setor: { id: 1 },
      categoria: { id: 2 },
      funcionario: { id: 1 },
      // empresa: { id: 1 },
    };

    const metodo = produtoSelecionado
      ? api.patch(`/produtos/1/${produtoSelecionado.id}`, dados, {
          // headers: { Authorization: `Bearer ${token}` },
        })
      : api.post("/produtos/1", dados, {
          // headers: { Authorization: `Bearer ${token}` },
        });

    metodo
      .then(() => {
        toast.success(
          produtoSelecionado
            ? "Produto editado com sucesso!"
            : "Produto cadastrado com sucesso!"
        );
        limparFormulario();
      })
      .catch((error) => {
        console.error("Erro ao salvar produto:", error);
        toast.error("Erro ao salvar produto!");
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validarCampos()) {
      buscarURLImagem();
    }
  };

  return (
    <div className="formulario-produto">
      <p className="descricao-produto">
        Preencha o formulário abaixo para adicionar novos produtos e informações
        ao seu estoque!
      </p>

      <form className="formulario-inputs" onSubmit={handleSubmit}>
        <div className="grupo-inputs">
          <label htmlFor="codigo">Código do Produto</label>
          <input
            id="codigo"
            type="text"
            style={{ width: "100%" }}
            value={produto.codigo}
            onChange={(e) => setProduto({ ...produto, codigo: e.target.value })}
            required
          />
        </div>

        <div className="grupo-inputs">
          <label htmlFor="nome">Nome do Produto</label>
          <input
            id="nome"
            type="text"
            style={{ width: "100%" }}
            value={produto.nome}
            onChange={(e) => setProduto({ ...produto, nome: e.target.value })}
            required
          />
        </div>

        <div className="linha-dupla">
          <div>
            <label htmlFor="quantidade">Quantidade para Cadastro</label>
            <input
              id="quantidade"
              type="number"
              value={produto.quantidade}
              onChange={(e) =>
                setProduto({ ...produto, quantidade: e.target.value })
              }
              required
            />
          </div>
          <div>
            <label htmlFor="validade">Data de Validade</label>
            <input
              id="validade"
              type="date"
              value={produto.validade}
              onChange={(e) =>
                setProduto({ ...produto, validade: e.target.value })
              }
              style={{ cursor: "not-allowed", backgroundColor: "#d3d3d3" }}
              disabled
            />
          </div>
        </div>

        <div className="linha-dupla">
          <div>
            <label>Valor de Compra</label>
            <input
              type="text"
              value={produto.valorCompra}
              onChange={(e) =>
                setProduto({ ...produto, valorCompra: e.target.value })
              }
              placeholder="R$"
              required
            />
          </div>
          <div>
            <label>Valor de Venda</label>
            <input
              type="text"
              value={produto.valorUnitario}
              onChange={(e) =>
                setProduto({ ...produto, valorUnitario: e.target.value })
              }
              placeholder="R$"
              required
            />
          </div>
        </div>

        <div className="linha-dupla">
          <div>
            <label>Quantidade Mínima para Estoque</label>
            <input
              type="number"
              value={produto.quantidadeMin}
              onChange={(e) =>
                setProduto({ ...produto, quantidadeMin: e.target.value })
              }
            />
          </div>
          <div>
            <label>Quantidade Máxima para Estoque</label>
            <input
              type="number"
              value={produto.quantidadeMax}
              onChange={(e) =>
                setProduto({ ...produto, quantidadeMax: e.target.value })
              }
            />
          </div>
        </div>

        <div className="botoes-produto">
          <button
            type="button"
            className="btn-cancelar-produto"
            onClick={limparFormulario}
          >
            Cancelar
          </button>
          <button type="submit" className="btn-cadastrar-produto">
            {produtoSelecionado ? "Editar" : "Cadastrar"}
          </button>
        </div>
      </form>

      <ToastContainer position="top-right" autoClose={3000} theme="light" />
    </div>
  );
};

export default CadastroProdutoFormulario;
