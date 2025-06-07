import { useState, useEffect } from "react";
import "./CadastroProdutoFormulario.css";
import api from "../../../provider/api";
import { getFuncionario } from "../../../utils/auth";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { ENDPOINTS } from "../../../utils/endpoints";
import { ROUTERS } from "../../../utils/routers";
import { enviroments } from "../../../utils/enviroments";


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
  const [setores, setSetores] = useState([]);
  const [categorias, setCategorias] = useState([]);

  const [produto, setProduto] = useState({
    codigo: "",
    nome: "",
    quantidade: "",
    categoria: "",
    setor: "",
    valorCompra: 0,
    valorUnitario: 0,
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
        valorCompra: produtoSelecionado.valorCompra !== undefined && produtoSelecionado.valorCompra !== "" ? Number(produtoSelecionado.valorCompra).toFixed(2) : "",
        valorUnitario: produtoSelecionado.valorUnitario !== undefined && produtoSelecionado.valorUnitario !== "" ? Number(produtoSelecionado.valorUnitario).toFixed(2) : "",
        quantidadeMin: produtoSelecionado.quantidadeMin || "",
        quantidadeMax: produtoSelecionado.quantidadeMax || "",
        dataRegistro: produtoSelecionado.dataRegistro || "",
        setor: produtoSelecionado.setor?.id || "",
        categoria: produtoSelecionado.categoria?.id || "",
      });
    }
  }, [produtoSelecionado]);

  const limparFormulario = () => {
    setProduto({
      codigo: "",
      nome: "",
      quantidade: "",
      categoria: "",
      setor: "",
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
    if (
      !produto.codigo ||
      !produto.nome ||
      !produto.quantidade ||
      !produto.categoria ||
      !produto.setor
    ) {
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

    if (
      produto.quantidadeMin !== "" &&
      produto.quantidadeMax !== "" &&
      Number(produto.quantidadeMax) <= Number(produto.quantidadeMin)
    ) {
      toast.error(
        "A quantidade máxima deve ser maior que a quantidade mínima!"
      );
      return false;
    }
    const valorCompra = parseFloat(
      String(produto.valorCompra).replace(/\./g, "").replace(",", ".")
    );
    const valorUnitario = parseFloat(
      String(produto.valorUnitario).replace(/\./g, "").replace(",", ".")
    );
    if (
      !isNaN(valorCompra) &&
      !isNaN(valorUnitario) &&
      valorUnitario <= valorCompra
    ) {
      toast.error("O valor unitário deve ser maior que o valor de compra!");
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
        .post(ENDPOINTS.AZURE_IMAGEM, formData, {
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
          if (imagem) {
            salvarProduto(imagem);
            return;
          }
          if (imagem == "") {
            salvarProduto("");
            return;
          }
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
      categoria: { id: produto.categoria },
      setor: { id: produto.setor },
      funcionario: { id: funcionario.userId },
    };

    if (enviroments.ambiente === "jsonserver") {
      const metodo = produtoSelecionado
        ? api.patch(`${ENDPOINTS.PRODUTOS}/${produtoSelecionado.id}`, dados, {})
        : api.post(ENDPOINTS.PRODUTOS, dados, {});
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
        ? api.patch(
          `${ENDPOINTS.PRODUTOS}/${produtoSelecionado.id}/${funcionario.userId}`,
          dados,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        )
        : api.post(`${ENDPOINTS.PRODUTOS}/${funcionario.userId}`, dados, {
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

  useEffect(() => {
    api
      .get(`${ENDPOINTS.SETORES}/${funcionario.userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        if (Array.isArray(res.data)) {
          setSetores(res.data);
        }
      })
      .catch((err) => {
        console.error("Erro ao buscar setores:", err);
        toast.error("Erro ao buscar setores!");
      });

    api
      .get(`${ENDPOINTS.CATEGORIAS}/${funcionario.userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        if (Array.isArray(res.data)) {
          setCategorias(res.data);
        }
      })
      .catch((err) => {
        console.error("Erro ao buscar setores:", err);
        toast.error("Erro ao buscar setores!");
      });
  }, [funcionario.userId, token]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validarCampos()) {
      buscarURLImagem();
    }
  };

  const formatarParaReal = (valor) => {
    if (valor == null) return "R$ 0,00";

    const numero = String(valor).replace(/\D/g, "");
    const valorNumerico = (parseInt(numero, 10) / 100).toFixed(2);
    return (
      "R$ " +
      valorNumerico.replace(".", ",").replace(/\B(?=(\d{3})+(?!\d))/g, ".")
    );
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
            <label htmlFor="codigo">Código do Produto  <span aria-hidden="true" style={{ color: 'red' }}>*</span></label>
            <input
              id="codigo"
              type="number"
              style={{ width: "100%" }}
              value={produto.codigo}
              onChange={(e) =>
                setProduto({ ...produto, codigo: e.target.value })
              }
              required
              min="0"
              placeholder="001"
            />
          </div>
          <div>
            <label htmlFor="quantidade">Quantidade para Cadastro  <span aria-hidden="true" style={{ color: 'red' }}>*</span></label>
            <input
              id="quantidade"
              type="number"
              value={produto.quantidade}
              onChange={(e) =>
                setProduto({ ...produto, quantidade: e.target.value })
              }
              required
              min="0"
              placeholder="0"
            />
          </div>
        </div>

        <div className="grupo-inputs">
          <label htmlFor="nome">Nome do Produto  <span aria-hidden="true" style={{ color: 'red' }}>*</span></label>
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
            placeholder="Água Mineral 500ml"
          />
        </div>

        <div className="linha-dupla">
          <div className="grupo-inputs">
            <label>Setor  <span aria-hidden="true" style={{ color: 'red' }}>*</span></label>
            <select
              value={produto.setor}
              onChange={(e) =>
                setProduto({ ...produto, setor: parseInt(e.target.value) })
              }
              required
            >
              <option value="">Selecione um Setor </option>
              {setores.map((set) => (
                <option key={set.id} value={set.id}>
                  {set.nome}
                </option>
              ))}
            </select>
          </div>

          <div className="grupo-inputs">
            <label>Categoria  <span aria-hidden="true" style={{ color: 'red' }}>*</span></label>
            <select
              value={produto.categoria}
              onChange={(e) =>
                setProduto({ ...produto, categoria: parseInt(e.target.value) })
              }
              required
            >
              <option value="">Selecione uma Categoria</option>
              {categorias.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.nome}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="linha-dupla">
          <div>
            <label>Valor de Compra Unitária  <span aria-hidden="true" style={{ color: 'red' }}>*</span></label>
            <input
              type="text"
              value={formatarParaReal(produto.valorCompra)}
              onChange={(e) => {
                const apenasNumeros = e.target.value.replace(/\D/g, "");
                const valorEmReais = (
                  parseInt(apenasNumeros || "0", 10) / 100
                ).toFixed(2);
                setProduto({ ...produto, valorCompra: valorEmReais });
              }}
              required
            />
          </div>
          <div>
            <label>Valor de Venda  <span aria-hidden="true" style={{ color: 'red' }}>*</span></label>
            <input
              type="text"
              value={formatarParaReal(produto.valorUnitario)}
              onChange={(e) => {
                const apenasNumeros = e.target.value.replace(/\D/g, "");
                const valorEmReais = (
                  parseInt(apenasNumeros || "0", 10) / 100
                ).toFixed(2);
                setProduto({ ...produto, valorUnitario: valorEmReais });
              }}
              required
            />
          </div>
        </div>

        <div className="linha-dupla">
          <div>
            <label>Quantidade Mínima para Estoque  <span aria-hidden="true" style={{ color: 'red' }}>*</span></label>
            <input
              type="number"
              value={produto.quantidadeMin}
              onChange={(e) =>
                setProduto({ ...produto, quantidadeMin: e.target.value })
              }
              min="1"
              placeholder="10"
              required
            />
          </div>
          <div>
            <label>Quantidade Máxima para Estoque  <span aria-hidden="true" style={{ color: 'red' }}>*</span></label>
            <input
              type="number"
              value={produto.quantidadeMax}
              onChange={(e) =>
                setProduto({ ...produto, quantidadeMax: e.target.value })
              }
              min="1"
              placeholder="50"
              required
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
