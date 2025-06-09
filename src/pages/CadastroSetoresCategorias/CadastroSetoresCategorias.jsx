import React, { useEffect, useState } from "react";
import "./CadastroSetoresCategorias.css";
import InfoCardSCCard from "../../components/SetorCategoria/InfoCardSC/InfoCardSC";
import DadosTabela from "../../components/SetorCategoria/DadosTabela/DadosTabela";
import FloatingAddButton from "../../components/SetorCategoria/FloatingAddButton/FloatingAddButton";
import LayoutTela from "../../components/LayoutTela/LayoutTela";
import Modal from "../../components/SetorCategoria/ModalSC/Modal";
import { ENDPOINTS } from "../../utils/endpoints";
import { getFuncionario } from "../../utils/auth";
import api from "../../provider/api";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import CarregamentoFormulario from "../../components/Carregamento/CarregamentoFormulario";

const CadastroSetoresCategorias = () => {
  const funcionario = getFuncionario();
  const token = localStorage.getItem("token");
  const [itemSelecionado, setItemSelecionado] = useState(null);
  const [porcentagemCarregamento, setPorcentagemCarregamento] = useState(0);
  const [isEnviandoDados, setIsEnviandoDados] = useState(false);

  const [setores, setSetores] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [produtos, setProdutos] = useState([]);
  const [pratos, setPratos] = useState([]);

  const [modalAberto, setModalAberto] = useState(false);
  const [tipoCadastro, setTipoCadastro] = useState(null);

  const handleEditarSetor = (item) => {
    setTipoCadastro("setor");
    setItemSelecionado(item);
    setModalAberto(true);
    console.log("HANDLE SETOR ", item);
  };

  const handleEditarCategoria = (item) => {
    setTipoCadastro("categoria");
    setItemSelecionado(item);
    setModalAberto(true);
    console.log("HANDLE CATEGORIA ", item);
  };

  const handleCadastrarSetor = () => {
    setTipoCadastro("setor");
    setModalAberto(true);
  };

  const handleCadastrarCategoria = () => {
    setTipoCadastro("categoria");
    setModalAberto(true);
  };

  const fecharModal = () => {
    setModalAberto(false);
    setTipoCadastro(null);
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

    api
      .get(`${ENDPOINTS.PRODUTOS}/${funcionario.userId}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setProdutos(res.data);
      })
      .catch((err) => {
        console.error("Erro ao ao buscar produtos:", err);
      });

    api
      .get(`${ENDPOINTS.PRATOS}/${funcionario.userId}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setPratos(res.data);
      })
      .catch((err) => {
        console.error("Erro ao ao buscar produtos:", err);
      });
  }, [funcionario.userId, token]);

  function adicionarContagemProdutosPratos(lista, tipo) {
    return lista.map((item) => {
      const qtdProdutos = produtos.filter((p) => {
        if (tipo === "setor") return p.setor?.id === item.id;
        if (tipo === "categoria") return p.categoria?.id === item.id;
        return false;
      }).length;

      const qtdPratos = pratos.filter((p) => {
        if (tipo === "setor") return p.setor?.id === item.id;
        if (tipo === "categoria") return p.categoria?.id === item.id;
        return false;
      }).length;

      return {
        ...item,
        produtos: qtdProdutos,
        pratos: qtdPratos,
      };
    });
  }

  const handleExcluirSetor = (setor) => {
    Swal.fire({
      title: "Tem certeza?",
      text: `Deseja excluir o setor ${setor.nome}?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sim, excluir",
      cancelButtonText: "Cancelar",
      customClass: {
        confirmButton: "btn-aceitar",
        cancelButton: "btn-cancelar",
      },
      buttonsStyling: false,
    }).then((result) => {
      if (result.isConfirmed) {
        api
          .delete(`${ENDPOINTS.SETORES}/${setor.id}/${funcionario.userId}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
          .then((response) => {
            console.log("Setor deletado com sucesso:", response.data);
            toast.success("Setor deletado com sucesso!");
            setSetores((prev) => prev.filter((s) => s.id !== setor.id));
          })
          .catch((error) => {
            console.error("Erro ao deletar setor:", error);
            toast.error("Erro ao deletar setor!");
          });
      }
    });
  };

  const handleExcluirCategoria = (categoria) => {
    Swal.fire({
      title: "Tem certeza?",
      text: `Deseja excluir a categoria ${categoria.nome}?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sim, excluir",
      cancelButtonText: "Cancelar",
      customClass: {
        confirmButton: "btn-aceitar",
        cancelButton: "btn-cancelar",
      },
      buttonsStyling: false,
    }).then((result) => {
      if (result.isConfirmed) {
        api
          .delete(
            `${ENDPOINTS.CATEGORIAS}/${categoria.id}/${funcionario.userId}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          )
          .then((response) => {
            console.log("Categoria deletada com sucesso:", response.data);
            toast.success("Categoria deletada com sucesso!");
            setCategorias((prev) => prev.filter((c) => c.id !== categoria.id));
          })
          .catch((error) => {
            console.error("Erro ao deletar categoria:", error);
            toast.error("Erro ao deletar categoria!");
          });
      }
    });
  };

  const [buscaSetor, setBuscaSetor] = useState("");
  const [buscaCategoria, setBuscaCategoria] = useState("");

  function removerAcentos(str) {
    return str
      ? str.normalize("NFD").replace(/[\u0300-\u036f]/g, "")
      : "";
  }

  const handleBuscaSetor = (value) => {
    setBuscaSetor(value);
  };

  const setoresFiltradas = setores.filter((s) =>
    removerAcentos(s.nome.toLowerCase()).includes(
      removerAcentos(buscaSetor.toLowerCase())
    )
  );

  const handleBuscaCategoria = (value) => {
    setBuscaCategoria(value);
  };

  const categoriasFiltradas = categorias.filter((c) =>
    removerAcentos(c.nome.toLowerCase()).includes(
      removerAcentos(buscaCategoria.toLowerCase())
    )
  );

  const setoresFiltradasComContagem = adicionarContagemProdutosPratos(
    setoresFiltradas,
    "setor"
  );
  const categoriasFiltradasComContagem = adicionarContagemProdutosPratos(
    categoriasFiltradas,
    "categoria"
  );

  return (
    <>
      {isEnviandoDados && (
        <CarregamentoFormulario
          porcentagemCarregamento={porcentagemCarregamento}
        />
      )}
      <LayoutTela titulo="Cadastro de Setores e Categorias">
        <div className="pagina-container">
          <div className="cadastro-container">
            <InfoCardSCCard
              title="Setores"
              description="Visualize, edite e organize os setores cadastrados."
              placeholder="Procurar Setor"
              onSearch={handleBuscaSetor}
            >
              <DadosTabela
                dados={setoresFiltradasComContagem}
                aoEditar={handleEditarSetor}
                aoExcluir={handleExcluirSetor}
              />
            </InfoCardSCCard>

            <InfoCardSCCard
              title="Categorias"
              description="Visualize, edite e organize as categorias cadastradas."
              placeholder="Procurar Categoria"
              onSearch={handleBuscaCategoria}
            >
              <DadosTabela
                dados={categoriasFiltradasComContagem}
                aoEditar={handleEditarCategoria}
                aoExcluir={handleExcluirCategoria}
              />
            </InfoCardSCCard>
          </div>

          <FloatingAddButton
            onSetor={handleCadastrarSetor}
            onCategoria={handleCadastrarCategoria}
          />

          <Modal
            isOpen={modalAberto}
            setPorcentagemCarregamento={setPorcentagemCarregamento}
            setIsEnviandoDados={setIsEnviandoDados}
            onClose={() => {
              fecharModal();
              setItemSelecionado(null);
            }}
            tipo={tipoCadastro}
            itemParaEditar={itemSelecionado}
            onSalvar={(novoOuEditado) => {
              if (tipoCadastro === "categoria") {
                setCategorias((prev) => {
                  const existe = prev.find((c) => c.id === novoOuEditado.id);
                  return existe
                    ? prev.map((c) =>
                        c.id === novoOuEditado.id ? novoOuEditado : c
                      )
                    : [...prev, novoOuEditado];
                });
              } else if (tipoCadastro === "setor") {
                setSetores((prev) => {
                  const existe = prev.find((s) => s.id === novoOuEditado.id);
                  return existe
                    ? prev.map((s) =>
                        s.id === novoOuEditado.id ? novoOuEditado : s
                      )
                    : [...prev, novoOuEditado];
                });
              }
            }}
          />
        </div>
      </LayoutTela>
    </>
  );
};

export default CadastroSetoresCategorias;
