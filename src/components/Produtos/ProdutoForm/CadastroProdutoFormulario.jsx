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
import Select from "react-select";

const CadastroProdutoFormulario = ({
  setPorcentagemCarregamento,
  produtoSelecionado,
  setProdutoSelecionado,
  descricao,
  setDescricao,
  imagem,
  setImagem,
  setIsSendingData,
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
        valorCompra:
          produtoSelecionado.valorCompra !== undefined &&
            produtoSelecionado.valorCompra !== ""
            ? Number(produtoSelecionado.valorCompra).toFixed(2)
            : "",
        valorUnitario:
          produtoSelecionado.valorUnitario !== undefined &&
            produtoSelecionado.valorUnitario !== ""
            ? Number(produtoSelecionado.valorUnitario).toFixed(2)
            : "",
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
    setIsSendingData(false);
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

  const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  const buscarURLImagem = async () => {
    setPorcentagemCarregamento(10);
    await sleep(200);

    if (enviroments.ambiente === "jsonserver") {
      const urlJsonServer = URL.createObjectURL(imagem);
      setPorcentagemCarregamento(30);
      await sleep(200);
      setUrlImagemTemporaria(urlJsonServer);
      salvarProduto(urlJsonServer);
    } else {
      const formData = new FormData();
      formData.append("file", imagem);
      setPorcentagemCarregamento(20);
      await sleep(200);

      api
        .post(ENDPOINTS.AZURE_IMAGEM, formData, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        })
        .then(async (res) => {
          setPorcentagemCarregamento(40);
          await sleep(200);
          salvarProduto(res.data.imageUrl);
        })
        .catch(async (err) => {
          console.log("erro ao adicionar imagem ao blob storage: ", err);

          if (imagem) {
            setPorcentagemCarregamento(40);
            await sleep(200);
            salvarProduto(imagem);
          } else {
            setPorcentagemCarregamento(40);
            await sleep(200);
            salvarProduto("");
          }

          console.log("erro ao adicionar imagem ao blob storage: ", err);
          setTimeout(() => {
            setIsSendingData(false);
          }, 2500);
        });
    }
  };

  const salvarProduto = async (urlImagem) => {
    setPorcentagemCarregamento(60);
    await sleep(200);
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
      setPorcentagemCarregamento(80);
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
        .then(async () => {
          setPorcentagemCarregamento(90);
          await sleep(200);
          setPorcentagemCarregamento(100);
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
          setTimeout(() => {
            setIsSendingData(false);
          }, 2000);
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
      setIsSendingData(true);
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

  const setoresOptions = setores.map((set) => ({
    value: set.id,
    label: set.nome,
  }));

  const categoriasOptions = categorias.map((cat) => ({
    value: cat.id,
    label: cat.nome,
  }));

  return (
    <div className="formulario-produto">
      <p className="descricao-produto">
        Preencha o formulário abaixo para adicionar um novo produto ao seu
        estoque!
      </p>

      <form className="formulario-inputs" onSubmit={handleSubmit}>
        <div className="linha-dupla">
          <div>
            <label htmlFor="codigo">
              Código do Produto{" "}
              <span aria-hidden="true" style={{ color: "red" }}>
                *
              </span>
            </label>
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
            <label htmlFor="quantidade">
              Quantidade para Cadastro{" "}
              <span aria-hidden="true" style={{ color: "red" }}>
                *
              </span>
            </label>
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
          <label htmlFor="nome">
            Nome do Produto{" "}
            <span aria-hidden="true" style={{ color: "red" }}>
              *
            </span>
          </label>
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
            <label>
              Setor{" "}
              <span aria-hidden="true" style={{ color: "red" }}>
                *
              </span>
            </label>
            <Select
              value={setoresOptions.find((opt) => opt.value === produto.setor)}
              onChange={(opt) => setProduto({ ...produto, setor: opt.value })}
              options={setoresOptions}
              placeholder="Selecione um Setor"
              isSearchable={false}
              styles={{
                control: (baseStyles, state) => ({
                  ...baseStyles,
                  borderColor: state.isFocused
                    ? "var(--cor-para-o-texto-branco)"
                    : "transparent",
                boxShadow: "0 3px 8px rgba(0, 0, 0, 0.15)",
                  "&:hover": { borderColor: "transparent" },
                }),
                placeholder: (baseStyles) => ({
                  ...baseStyles,
                  color: "var(--cor-para-texto-preto)",
                }),
                option: (baseStyles, state) => ({
                  ...baseStyles,
                  backgroundColor: state.isSelected
                    ? "var(--titulos-botoes-destaques)"
                    : state.isFocused
                      ? "var(--cinza-hover-select)"
                      : "var(--cor-para-o-texto-branco)",
                  color: state.isSelected
                    ? "var(--cor-para-o-texto-branco)"
                    : "var(--cor-para-texto-preto)",
                  padding: 14,
                  cursor: "pointer",
                }),
                singleValue: (baseStyles) => ({
                  ...baseStyles,
                  color: "var(--cor-para-texto-preto)",
                }),
                menuList: (base) => ({
                  ...base,
                  maxHeight: 200,
                  overflowY: "auto",
                }),
                menu: (base) => ({
                  ...base,
                  borderRadius: 5,
                  marginTop: 0,
                }),
              }}
            />
          </div>

          <div className="grupo-inputs">
            <label>
              Categoria{" "}
              <span aria-hidden="true" style={{ color: "red" }}>
                *
              </span>
            </label>
            <Select
              value={categoriasOptions.find(
                (opt) => opt.value === produto.categoria
              )}
              onChange={(opt) =>
                setProduto({ ...produto, categoria: opt.value })
              }
              options={categoriasOptions}
              placeholder="Selecione uma Categoria"
              isSearchable={false}
              styles={{
                control: (baseStyles, state) => ({
                  ...baseStyles,
                  borderColor: state.isFocused
                    ? "var(--cor-para-o-texto-branco)"
                    : "transparent",
                boxShadow: "0 3px 8px rgba(0, 0, 0, 0.15)",
                  "&:hover": { borderColor: "transparent" },
                }),
                placeholder: (baseStyles) => ({
                  ...baseStyles,
                  color: "var(--cor-para-texto-preto)",
                }),
                option: (baseStyles, state) => ({
                  ...baseStyles,
                  backgroundColor: state.isSelected
                    ? "var(--titulos-botoes-destaques)"
                    : state.isFocused
                      ? "var(--cinza-hover-select)"
                      : "var(--cor-para-o-texto-branco)",
                  color: state.isSelected
                    ? "var(--cor-para-o-texto-branco)"
                    : "var(--cor-para-texto-preto)",
                  padding: 14,
                  cursor: "pointer",
                }),
                singleValue: (baseStyles) => ({
                  ...baseStyles,
                  color: "var(--cor-para-texto-preto)",
                }),
                menuList: (base) => ({
                  ...base,
                  maxHeight: 200,
                  overflowY: "auto",
                }),
                menu: (base) => ({
                  ...base,
                  borderRadius: 5,
                  marginTop: 0,
                }),
              }}
            />
          </div>
        </div>

        <div className="linha-dupla">
          <div>
            <label>
              Valor de Compra Unitária{" "}
              <span aria-hidden="true" style={{ color: "red" }}>
                *
              </span>
            </label>
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
            <label>
              Valor de Venda{" "}
              <span aria-hidden="true" style={{ color: "red" }}>
                *
              </span>
            </label>
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
            <label>
              Quantidade Mínima para Estoque{" "}
              <span aria-hidden="true" style={{ color: "red" }}>
                *
              </span>
            </label>
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
            <label>
              Quantidade Máxima para Estoque{" "}
              <span aria-hidden="true" style={{ color: "red" }}>
                *
              </span>
            </label>
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
          <button type="submit" className="btn-cadastrar-produto">
            {produtoSelecionado ? "Editar" : "Cadastrar"}
          </button>
          <button
            type="button"
            className="btn-cancelar-produto"
            onClick={limparFormulario}
          >
            Cancelar
          </button>

        </div>
      </form>

      <ToastContainer position="top-right" autoClose={3000} theme="light" />
    </div>
  );
};

export default CadastroProdutoFormulario;
