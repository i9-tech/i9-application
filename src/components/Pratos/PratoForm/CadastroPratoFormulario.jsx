import React, { useState, useEffect } from "react";
import "./CadastroPratoFormulario.css";
import api from "../../../provider/api";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { ROUTERS } from "../../../utils/routers";
import { ENDPOINTS } from "../../../utils/endpoints";
import { getFuncionario, getToken } from "../../../utils/auth";
import { enviroments } from "../../../utils/enviroments";

const CadastroPratoFormulario = ({
  pratoSelecionado,
  setPratoSelecionado,
  descricao,
  setDescricao,
  imagem,
  setImagem,
}) => {
  const navigate = useNavigate();
  const funcionario = getFuncionario();
  const token = getToken();
  const [urlImagemTemporaria, setUrlImagemTemporaria] = useState("");
  const [categorias, setCategorias] = useState([]);
  const [setores, setSetores] = useState([]);

  const [prato, setPrato] = useState({
    nome: "",
    venda: 0,
    setor: "",
    categoria: "",
    disponivel: true,
  });

  useEffect(() => {
    if (pratoSelecionado) {
      console.log("🔍 Prato recebido para edição:", pratoSelecionado);
      setPrato({
        nome: pratoSelecionado.nome || "",
        venda:
          pratoSelecionado.valorVenda !== undefined &&
          pratoSelecionado.valorVenda !== ""
            ? parseFloat(pratoSelecionado.valorVenda).toFixed(2)
            : "",
        setor: pratoSelecionado.setor?.id || "",
        categoria: pratoSelecionado.categoria?.id || "",
        disponivel: pratoSelecionado.disponivel ?? true,
      });
    }
  }, [pratoSelecionado]);

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
  }, []);

  const validarCampos = () => {
    if (!prato.nome || !prato.venda || !prato.categoria) {
      toast.error("Preencha todos os campos obrigatórios!");
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
      disponivel: true,
    });
    setDescricao("");
    setImagem("");
    setPratoSelecionado(null);
    navigate(ROUTERS.ESTOQUE_PRATOS);

    if (enviroments === "jsonserver") {
      URL.revokeObjectURL(urlImagemTemporaria);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validarCampos()) {
      buscarURLImagem();
    }
  };

  const buscarURLImagem = () => {
    if (enviroments.ambiente === "jsonserver") {
      const urlJsonServer = URL.createObjectURL(imagem);
      setUrlImagemTemporaria(urlJsonServer);
      salvarPrato(urlJsonServer);
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
          salvarPrato(res.data.imageUrl);
        })
        .catch((err) => {
          if (imagem) {
            salvarPrato(imagem);
            return;
          }
          if (imagem == "") {
            salvarPrato("");
            return;
          }
          console.log("erro ao adicionar imagem ao blob storage: ", err);
        });
    }
  };

  const salvarPrato = (urlImagem) => {
    const dados = {
      nome: prato.nome,
      valorVenda: parseFloat(prato.venda),
      descricao: descricao,
      imagem: urlImagem,
      disponivel: prato.disponivel,
      funcionario: { id: funcionario.userId },
      setor: { id: prato.setor },
      categoria: { id: prato.categoria },
    };

    const metodo = pratoSelecionado
      ? api.patch(
          `${ENDPOINTS.PRATOS}/${pratoSelecionado.id}/${funcionario.userId}`,
          dados,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        )
      : api.post(`${ENDPOINTS.PRATOS}/${funcionario.userId}`, dados, {
          headers: { Authorization: `Bearer ${token}` },
        });

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
        console.error("Erro ao salvar prato:", error.response?.data || error);
        toast.error("Erro ao salvar prato!");
      });
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
            onChange={(e) => {
              const capitalizado = capitalizarPalavras(e.target.value);
              setPrato({ ...prato, nome: capitalizado });
            }}
            required
          />
        </div>

        <div className="grupo-inputs">
          <label>Venda (R$) </label>
          <input
            type="text"
            step="0.01"
            value={formatarParaReal(prato.venda)}
            onChange={(e) => {
              const apenasNumeros = e.target.value.replace(/\D/g, "");
              const valorEmReais = (
                parseInt(apenasNumeros || "0", 10) / 100
              ).toFixed(2);
              setPrato({ ...prato, venda: valorEmReais });
            }}
            required
          />
        </div>

        <div className="grupo-inputs">
          <label>Categoria</label>
          <select
            value={prato.categoria}
            onChange={(e) =>
              setPrato({ ...prato, categoria: parseInt(e.target.value) })
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

        <div className="grupo-inputs">
          <label>Setor</label>
          <select
            value={prato.setor}
            onChange={(e) =>
              setPrato({ ...prato, setor: parseInt(e.target.value) })
            }
            required
          >
            <option value="">Selecione um Setor</option>
            {setores.map((set) => (
              <option key={set.id} value={set.id}>
                {set.nome}
              </option>
            ))}
          </select>
        </div>

        <div className="grupo-inputs">
          <label>Disponibilidade</label>
          <div className="checkbox-pratos">
            <label className="caixinhas-checkbox">
              <input
                type="checkbox"
                className="estilo-checkbox"
                checked={prato.disponivel === true}
                onChange={() =>
                  setPrato((prev) => ({ ...prev, disponivel: true }))
                }
              />
              <span className="checado"></span>
              Ativo
            </label>
            <label className="caixinhas-checkbox">
              <input
                type="checkbox"
                className="estilo-checkbox"
                checked={prato.disponivel === false}
                onChange={() =>
                  setPrato((prev) => ({ ...prev, disponivel: false }))
                }
              />
              <span className="checado"></span>
              Inativo
            </label>
          </div>
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
