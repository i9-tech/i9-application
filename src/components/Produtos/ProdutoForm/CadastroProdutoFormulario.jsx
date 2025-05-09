import React, { useState, useEffect } from "react";
import "./CadastroProdutoFormulario.css";
import api from "../../../provider/api";
import { getFuncionario } from "../../../utils/auth";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CadastroProdutoFormulario = ({
  produtoSelecionado,
  setProdutoSelecionado,
}) => {
  const funcionario = getFuncionario();

  const [produto, setProduto] = useState({
    codigo: "",
    nome: "",
    quantidade: "",
    validade: "",
    valorCompra: "",
    valorVenda: "",
    quantidadeMinima: "",
    quantidadeMaxima: "",
  });

  useEffect(() => {
    if (produtoSelecionado) {
      setProduto({
        codigo: produtoSelecionado.codigo || "",
        nome: produtoSelecionado.nome || "",
        quantidade: produtoSelecionado.estoque || "",
        validade: produtoSelecionado.validade || "",
        valorCompra: produtoSelecionado.compra || "",
        valorVenda: produtoSelecionado.venda || "",
        quantidadeMinima: produtoSelecionado.minEstoque || "",
        quantidadeMaxima: produtoSelecionado.maxEstoque || "",
      });
    }
  }, [produtoSelecionado]);

  const limparFormulario = () => {
    setProduto({
      codigo: "",
      nome: "",
      quantidade: "",
      validade: "",
      valorCompra: "",
      valorVenda: "",
      quantidadeMinima: "",
      quantidadeMaxima: "",
    });
    setProdutoSelecionado(null);
  };

  const validarCampos = () => {
    if (
      !produto.codigo ||
      !produto.nome ||
      !produto.quantidade ||
      !produto.validade
    ) {
      toast.error("Preencha todos os campos obrigatórios!");
      return false;
    }
    if (
      isNaN(produto.quantidade) ||
      produto.quantidade < 0 ||
      isNaN(produto.quantidadeMinima) ||
      produto.quantidadeMinima < 0 ||
      isNaN(produto.quantidadeMaxima) ||
      produto.quantidadeMaxima < 0
    ) {
      toast.error("As quantidades devem ser números positivos!");
      return false;
    }

    return true;
  };

  const salvarProduto = () => {
    const token = localStorage.getItem("token");

    const dados = {
      codigo: produto.codigo,
      nome: produto.nome,
      estoque: parseInt(produto.quantidade),
      validade: produto.validade,
      compra: produto.valorCompra,
      venda: produto.valorVenda,
      minEstoque: parseInt(produto.quantidadeMinima),
      maxEstoque: parseInt(produto.quantidadeMaxima),
      empresaId: funcionario.empresaId,
    };

    const metodo = produtoSelecionado
      ? api.patch(`/produtos/${produtoSelecionado.id}`, dados, {
          headers: { Authorization: `Bearer ${token}` },
        })
      : api.post("/produtos", dados, {
          headers: { Authorization: `Bearer ${token}` },
        });

    metodo
      .then(() => {
        toast.success(
          produtoSelecionado
            ? "Produto editado com sucesso!"
            : "Produto cadastrado com sucesso!"
        );
        setTimeout(() => window.location.reload(), 2000);
      })
      .catch((error) => {
        console.error("Erro ao salvar produto:", error);
        toast.error("Erro ao salvar produto!");
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validarCampos()) salvarProduto();
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
              required
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
              value={produto.valorVenda}
              onChange={(e) =>
                setProduto({ ...produto, valorVenda: e.target.value })
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
              value={produto.quantidadeMinima}
              onChange={(e) =>
                setProduto({ ...produto, quantidadeMinima: e.target.value })
              }
            />
          </div>
          <div>
            <label>Quantidade Máxima para Estoque</label>
            <input
              type="number"
              value={produto.quantidadeMaxima}
              onChange={(e) =>
                setProduto({ ...produto, quantidadeMaxima: e.target.value })
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
