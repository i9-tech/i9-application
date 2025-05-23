import React, { useState, useEffect } from "react";
import "./CadastroProdutoFormulario.css";
import api from "../../../provider/api";
import { getFuncionario } from "../../../utils/auth";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { ENDPOINTS } from "../../../utils/endpoints";
import { ROUTERS } from "../../../utils/routers";
import { enviroments } from "../../../utils/enviroments";


const categorias = ["Bebida", "Entrada", "Prato Principal", "Sobremesa"];
const setores = ["Cozinha", "Estoque", "Atendimento"];


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
  const [urlImagemTemporaria, setUrlImagemTemporaria] = useState("");

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

    if (enviroments === "jsonserver") {
      URL.revokeObjectURL(urlImagemTemporaria);
    }
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
    if (!imagem) {
      toast.error("A imagem do produto é um campo obrigatório!");
      return false;
    }

    return true;
  };

  const buscarURLImagem = () => {
    if (enviroments.ambiente === "jsonserver") {
      const urlJsonServer = URL.createObjectURL(imagem);
      setUrlImagemTemporaria(urlJsonServer);
      salvarProduto(urlJsonServer);
    } else {
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
    }
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
      funcionario: { id: funcionario.userId },
      // empresa: { id: 1 },
    };

    if (enviroments.ambiente === "jsonserver") {
      const metodo = produtoSelecionado
        ? api.patch(`/produtos/${produtoSelecionado.id}`, dados, {})
        : api.post("/produtos/", dados, {});
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
    } else {
      console.log("funcionario.id:", funcionario.userId);
      const metodo = produtoSelecionado
        ? api.patch(`/produtos/1/${produtoSelecionado.id}`, dados, {
        headers: { Authorization: `Bearer ${token}` },
          })
        : api.post(`/produtos/${funcionario.userId}`, dados, {
        headers: { Authorization: `Bearer ${token}` },
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
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validarCampos()) {
      buscarURLImagem();
    }
  };

  const formatarParaReal = (valor) => {
    if (!valor) return "R$ 0,00";

    const numero = valor.replace(/\D/g, "");
    const valorNumerico = (parseInt(numero, 10) / 100).toFixed(2);
    return "R$ " + valorNumerico.replace(".", ",").replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };

  const capitalizarPalavras = (texto) => {
    return texto
      .toLowerCase()
      .split(" ")
      .map((palavra) => palavra.charAt(0).toUpperCase() + palavra.slice(1))
      .join(" ");
  };

  return (
    <div className="formulario-produto">
      <p className="descricao-produto">
        Preencha o formulário abaixo para adicionar novos produtos e informações
        ao seu estoque!
      </p>

      <form className="formulario-inputs" onSubmit={handleSubmit}>
        <div className="linha-dupla">
          <div>
            <label htmlFor="codigo">Código do Produto</label>
            <input
              id="codigo"
              type="number"
              style={{ width: "100%" }}
              value={produto.codigo}
              onChange={(e) => setProduto({ ...produto, codigo: e.target.value })}
              required
              min="1"
            />
          </div>
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
              min="1"
            />
          </div>
        </div>

        <div className="grupo-inputs">
          <label htmlFor="nome">Nome do Produto</label>
          <input
            id="nome"
            type="text"
            style={{ width: "100%" }}
            value={produto.nome}
            onChange={(e) => {
              const capitalizado = capitalizarPalavras(e.target.value);
              setProduto({ ...produto, nome: capitalizado });
            }}
            required
          />

        </div>

        <div className="linha-dupla">
          <div className="grupo-inputs">
            <label>Categoria</label>
            <select
              value={produto.categoria}
              onChange={(e) =>
                setProduto({ ...produto, categoria: e.target.value })
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
              value={produto.setor}
              onChange={(e) => setProduto({ ...produto, setor: e.target.value })}
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

        <div className="linha-dupla">
          <div>
            <label>Valor de Compra</label>
            <input
              type="text"
              value={formatarParaReal(produto.valorCompra)}
              onChange={(e) => {
                const apenasNumeros = e.target.value.replace(/\D/g, "");
                const valorEmReais = (parseInt(apenasNumeros || "0", 10) / 100).toFixed(2);
                setProduto({ ...produto, valorCompra: valorEmReais });
              }}
            />
          </div>
          <div>
            <label>Valor de Venda</label>
            <input
              type="text"
              value={formatarParaReal(produto.valorUnitario)}
              onChange={(e) => {
                const apenasNumeros = e.target.value.replace(/\D/g, "");
                const valorEmReais = (parseInt(apenasNumeros || "0", 10) / 100).toFixed(2);
                setProduto({ ...produto, valorUnitario: valorEmReais });
              }}
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
              min="1"
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
              min="1"
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
