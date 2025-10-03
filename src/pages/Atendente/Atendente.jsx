import "./Atendente.css";
import BotaoConfirmar from "../../components/Botoes/BotaoConfirmar/BotaoConfirmar";
import ElementoTotal from "../../components/Hovers/HoverTotalProduto/ElementoTotal";
import LupaPesquisa from "../../assets/lupa-pesquisa.svg";
import ElementoProduto from "../../components/Hovers/HoverProduto/ElementoProduto";
import { useState, useEffect, useMemo, useCallback } from "react";
import ModalObservacoes from "../../components/Botoes/ModalObservacoes/ModalObservacoes";
import ProdutoComanda from "../../components/Botoes/ProdutoComanda/ProdutoComanda";
import ModalConfirmarPedido from "../../components/Botoes/ModalConfirmarPedido/ModalConfirmarPedido";
import { getPermissoes, getToken } from "../../utils/auth";
import todos from "../../assets/todos.png";
import { Navigate } from "react-router-dom";
import api from "../../provider/api";
import { getFuncionario } from "../../utils/auth";
import { ENDPOINTS } from "../../utils/endpoints";
import { toast } from "react-toastify";
import LayoutTela from "../../components/LayoutTela/LayoutTela";
import { ROUTERS } from "../../utils/routers";
import Relogio from "../../components/Relogio/Relogio";
import SetoresCarregamento from "../../components/Atendimento/SetoresCarregamento";
import CardsAtendimentoCarregamento from "../../components/Atendimento/CardsAtendimentoCarregamento";
import NoDataAtendimento from "../../components/Atendimento/NoDataAtendimento";
import { enviroments } from "../../utils/enviroments";
import { imagemPadrao } from "../../assets/imagemPadrao";
import useThrottle from "../../components/useThrottle/UseThrottle";

export function Atendente() {
  const permissao = getPermissoes();
  if (permissao.length === 0) {
    Navigate(ROUTERS.UNAUTHORIZED);
  }

  const diaAtual = new Date().toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });

  const funcionario = getFuncionario();
  const token = getToken();
  const [produtos, setProdutos] = useState([]);
  const [setores, setSetores] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [setorSelecionado, setSetorSelecionado] = useState("Todos");

  const [buscaProduto, setBuscaProduto] = useState("");

  const [comanda, setComanda] = useState([]);
  const tokenUrl = enviroments.tokenURL;

  const [produtoSelecionado, setProdutoSelecionado] = useState(null);
  const [quantidadeSelecionada, setQuantidadeSelecionada] = useState(0);

  const [modalAberto, setModalAberto] = useState(false);
  const [confirmarPedido, setConfirmarPedido] = useState(false);

  const [itemCarrinhoIds, setItemCarrinhoIds] = useState([]);

  const [isSetoresCarregando, setIsSetoresCarregando] = useState(true);
  const [isProdutosCarregando, setIsProdutosCarregando] = useState(true);

  const [errorPrato, setErrorPrato] = useState(false);
  const [errorProduto, setErrorProduto] = useState(false);
  const [errorSetor, setErrorSetor] = useState(false);

  const [isSemResultado, setIsSemResultado] = useState(false);

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
          setIsSetoresCarregando(false);
        }
      })
      .catch((err) => {
        console.error("Erro ao buscar setores:", err);
        toast.error("Erro ao buscar setores!");
        setTimeout(() => {
          setIsSetoresCarregando(false);
          setErrorSetor(true);
        }, 1200);
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
        console.error("Erro ao buscar categorias:", err);
        toast.error("Erro ao buscar categorias!");
      });
  }, [funcionario.userId, token]);

  useEffect(() => {
    const headers = { Authorization: `Bearer ${token}` };

    const requisicaoProdutos = api.get(
      `${ENDPOINTS.PRODUTOS}/${funcionario.userId}`,
      { headers }
    );
    const requisicaoPratos = api.get(
      `${ENDPOINTS.PRATOS_TODOS}/${funcionario.userId}`,
      { headers }
    );

    Promise.allSettled([requisicaoProdutos, requisicaoPratos]).then(
      (results) => {
        const [produtosResult, pratosResult] = results;

        let produtosComTipo = [];
        let pratosComTipo = [];

        if (produtosResult.status === "fulfilled") {
          produtosComTipo = produtosResult.value.data.map((produto) => ({
            ...produto,
            tipo: "produto",
          }));
        } else {
          setErrorProduto(true);
        }

        if (pratosResult.status === "fulfilled") {
          pratosComTipo = pratosResult.value.data.map((prato) => ({
            ...prato,
            tipo: "prato",
          }));
        } else {
          setErrorPrato(true);
        }

        setProdutos([...produtosComTipo, ...pratosComTipo]);

        setTimeout(() => {
          setIsProdutosCarregando(false);
        }, 1000);
      }
    );
  }, [funcionario.userId, token]);

  const adicionarNaComanda = useCallback((produto) => {
    console.log(`Produto ${produto} adicionado`);
    setComanda((prev) => {
      const index = prev.findIndex(
        (item) => item.id === produto.id && item.tipo === produto.tipo
      );

      if (index !== -1) {
        const novaComanda = [...prev];
        const produtoAtual = novaComanda[index];
        const novaQuantidade =
          (typeof produtoAtual.quantidade === "number"
            ? produtoAtual.quantidade
            : 0) + 1;

        novaComanda[index] = {
          ...produtoAtual,
          quantidade: novaQuantidade,
          precoTotal: produtoAtual.preco * novaQuantidade,
        };
        return novaComanda;
      }

      return [
        ...prev,
        {
          ...produto,
          quantidade: 1,
          precoTotal: produto.preco,
        },
      ];
    });
  }, []);

  const throttledAdicionarNaComanda = useThrottle(adicionarNaComanda, 100);

  function atualizarQuantidade(produto, quantidade) {
    const qtd = Number(quantidade) || 0;

    setComanda((prev) => {
      const index = prev.findIndex((item) => item.nome === produto);
      if (index !== -1) {
        const produtoAtual = prev[index];
        if (produtoAtual.quantidade === qtd) {
          return prev;
        }
        const novaComanda = [...prev];
        novaComanda[index] = {
          ...produtoAtual,
          quantidade: qtd,
          precoTotal: produtoAtual.preco * qtd,
        };
        return novaComanda;
      }
      return prev;
    });
  }

  function removerProdutoDaComanda(nomeProduto) {
    setComanda((prev) => prev.filter((item) => item.nome !== nomeProduto));
  }

  function abrirModal(produto, quantidade) {
    const item = comanda.find((i) => i.nome === produto);
    setProdutoSelecionado({
      nome: produto,
      observacoes: item?.observacoes || [],
    });
    setQuantidadeSelecionada(quantidade);
    setModalAberto(true);
  }

  function fecharModal() {
    setModalAberto(false);
    setProdutoSelecionado(null);
  }

  const abrirModalConfirmarPedido = () => {
    setConfirmarPedido(true);
  };

  const fecharModalConfirmarPedido = () => {
    setConfirmarPedido(false);
  };

  function salvarObservacoes(observacoesRecebidas) {
    setComanda((prev) => {
      return prev.map((item) => {
        if (item.nome === produtoSelecionado.nome) {
          return {
            ...item,
            observacoes: observacoesRecebidas,
          };
        }
        return item;
      });
    });
    fecharModal();
  }

  const totalItens = comanda.reduce(
    (totalDeItens, item) => totalDeItens + item.quantidade,
    0
  );

  const totalPedido = comanda.reduce(
    (total, item) => total + item.precoTotal,
    0
  );

  const comandaExpandida = useMemo(() => {
    const lista = [];
    comanda.forEach((item) => {
      for (let i = 0; i < item.quantidade; i++) {
        lista.push({
          id: item.id,
          prato: item.prato,
          produto: item.produto,
          nome: item.nome,
          valorUnitario: item.valorUnitario,
          observacao:
            Array.isArray(item.observacoes) && item.observacoes[i]
              ? item.observacoes[i].texto || ""
              : "",
          funcionario: funcionario.userId,
          tipo: item.tipo,
        });
      }
    });
    return lista;
  }, [funcionario.userId, comanda]);
  const [enviarPedido, setEnviarPedido] = useState(false);

  useEffect(() => {
    if (!enviarPedido || comandaExpandida.length === 0) return;

    const promises = comandaExpandida.map(async (item) => {
      const url =
        item.tipo === "produto"
          ? `${ENDPOINTS.CARRINHO_PRODUTO}/${funcionario.userId}`
          : `${ENDPOINTS.CARRINHO_PRATO}/${funcionario.userId}`;

      const body =
        item.tipo === "produto"
          ? {
              venda: "venda5",
              produto: { id: item.id },
              funcionario: { id: funcionario.userId },
            }
          : {
              venda: "venda5",
              prato: { id: item.id },
              ...(item.observacao ? { observacao: item.observacao } : {}),
              funcionario: { id: funcionario.userId },
            };

      return api
        .post(url, body, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => {
          return res.data.id;
        })
        .catch((err) => {
          console.error("Erro ao enviar item ao carrinho:", err);
          toast.error("Erro ao enviar item ao carrinho!");
          return null;
        });
    });

    Promise.all(promises).then((ids) => {
      const idsValidos = ids.filter((id) => id !== null);
      setItemCarrinhoIds(idsValidos);
      setConfirmarPedido(true);
      setEnviarPedido(false);
    });
  }, [enviarPedido, comandaExpandida, funcionario.userId, token]);

  function limparComandas() {
    setComanda([]);
    carregarDados();
  }

  function carregarDados() {
    const headers = { Authorization: `Bearer ${token}` };

    const requisicaoProdutos = api.get(
      `${ENDPOINTS.PRODUTOS}/${funcionario.userId}`,
      { headers }
    );
    const requisicaoPratos = api.get(
      `${ENDPOINTS.PRATOS_TODOS}/${funcionario.userId}`,
      { headers }
    );

    Promise.allSettled([requisicaoProdutos, requisicaoPratos]).then(
      (results) => {
        const [produtosResult, pratosResult] = results;

        let produtosComTipo = [];
        let pratosComTipo = [];

        if (produtosResult.status === "fulfilled") {
          produtosComTipo = produtosResult.value.data.map((produto) => ({
            ...produto,
            tipo: "produto",
          }));
        } else {
          setErrorProduto(true);
        }

        if (pratosResult.status === "fulfilled") {
          pratosComTipo = pratosResult.value.data.map((prato) => ({
            ...prato,
            tipo: "prato",
          }));
        } else {
          setErrorPrato(true);
        }

        setProdutos([...produtosComTipo, ...pratosComTipo]);

        setTimeout(() => {
          setIsProdutosCarregando(false);
        }, 1000);
      }
    );
  }

  useEffect(() => {
    const temResultados = categorias.some((categoria) =>
      produtos.some((produto) => {
        const mesmoSetor =
          setorSelecionado === "Todos" ||
          (produto.setor &&
            produto.setor.nome &&
            produto.setor.nome.trim().toLowerCase() ===
              setorSelecionado.trim().toLowerCase());

        const mesmaCategoria =
          produto.categoria &&
          produto.categoria.nome &&
          produto.categoria.nome.trim().toLowerCase() ===
            categoria.nome.trim().toLowerCase();

        const buscaValida = buscaProduto.trim() !== "";

        function removerAcentos(str) {
          return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
        }

        const nomeCombina = buscaValida
          ? removerAcentos(produto.nome.toLowerCase()).includes(
              removerAcentos(buscaProduto.toLowerCase())
            )
          : true;

        return mesmoSetor && mesmaCategoria && nomeCombina;
      })
    );

    setIsSemResultado(!temResultados);
  }, [produtos, categorias, setorSelecionado, buscaProduto]);

  return (
    <>
      <LayoutTela
        titulo={"Menu de Atendimento"}
        adicional={
          <>
            {diaAtual} - <Relogio />
          </>
        }
      >
        <section className="menu-atendente">
          {modalAberto && produtoSelecionado && (
            <ModalObservacoes
              produto={produtoSelecionado}
              quantidade={quantidadeSelecionada}
              onClose={fecharModal}
              onSalvarObservacoes={salvarObservacoes}
            />
          )}
          {confirmarPedido && (
            <ModalConfirmarPedido
              onClose={fecharModalConfirmarPedido}
              statusModal={setConfirmarPedido}
              itemCarrinhoIds={itemCarrinhoIds}
              onLimparComandas={limparComandas}
            />
          )}

          <div className="todos-produtos">
            <h1>Escolha o Setor</h1>
            <div className="setores">
              {isSetoresCarregando && !errorSetor ? (
                <SetoresCarregamento quantidadeCards={7} />
              ) : !errorSetor ? (
                <div className="setores">
                  <ElementoTotal
                    key="todos"
                    nome="Todos"
                    imagem={todos}
                    quantidade={produtos.length}
                    onClick={() => setSetorSelecionado("Todos")}
                  />
                  {setores.map((setor) => (
                    <ElementoTotal
                      key={setor.id}
                      nome={setor.nome}
                      imagem={
                        setor.imagem ? setor.imagem + tokenUrl : imagemPadrao
                      }
                      quantidade={
                        produtos.filter(
                          (p) => p.setor && p.setor.nome === setor.nome
                        ).length
                      }
                      onClick={() => setSetorSelecionado(setor.nome)}
                    />
                  ))}
                </div>
              ) : (
                <div style={{ width: "68vw" }}>
                  <NoDataAtendimento />
                </div>
              )}
            </div>

            <div className="header-container">
              <h1> Setor: {setorSelecionado} </h1>
              <div className="barra-pesquisa">
                <input
                  type="text"
                  placeholder="Procurar Produto"
                  className="input-pesquisa-produtos"
                  value={buscaProduto}
                  onChange={(e) => {
                    const valor = e.target.value;
                    setBuscaProduto(valor);
                  }}
                />
                <button className="lupa-pesquisa">
                  <img src={LupaPesquisa} alt="Pesquisar" />
                </button>
              </div>
            </div>

            <div className="produtos-por-categoria">
              {isProdutosCarregando ? (
                <CardsAtendimentoCarregamento quantidadeCards={6} />
              ) : !errorPrato && !errorProduto ? (
                categorias.map((categoria) => {
                  const produtosFiltrados = produtos.filter((produto) => {
                    const mesmoSetor =
                      setorSelecionado === "Todos" ||
                      (produto.setor &&
                        produto.setor.nome &&
                        produto.setor.nome.trim().toLowerCase() ===
                          setorSelecionado.trim().toLowerCase());

                    const mesmaCategoria =
                      produto.categoria &&
                      produto.categoria.nome &&
                      produto.categoria.nome.trim().toLowerCase() ===
                        categoria.nome.trim().toLowerCase();

                    function removerAcentos(str) {
                      return str
                        .normalize("NFD")
                        .replace(/[\u0300-\u036f]/g, "");
                    }

                    const buscaValida = buscaProduto.trim() !== "";

                    const nomeCombina = buscaValida
                      ? removerAcentos(produto.nome.toLowerCase()).includes(
                          removerAcentos(buscaProduto.toLowerCase())
                        )
                      : true;

                    return mesmoSetor && mesmaCategoria && nomeCombina;
                  });

                  if (produtosFiltrados.length === 0) return null;

                  return (
                    <div key={categoria.id} className="categoria">
                      <h1>{categoria.nome}</h1>
                      <div className="produtos-da-categoria">
                        {produtosFiltrados.map((produto) => {
                          const itemComanda = comanda.find(
                            (item) => item.nome === produto.nome
                          );
                          const quantidadeNaComanda = itemComanda
                            ? itemComanda.quantidade
                            : 0;
                          const quantidadeRestante =
                            produto.quantidade - quantidadeNaComanda;

                          return (
                            <ElementoProduto
                              key={produto.id}
                              id={produto.id}
                              nome={produto.nome}
                              descricao={produto.descricao}
                              preco={
                                produto.valorUnitario || produto.valorVenda
                              }
                              onAdicionar={throttledAdicionarNaComanda}
                              imagem={produto.imagem}
                              quantidade={
                                produto.tipo === "produto"
                                  ? quantidadeRestante || 0
                                  : null
                              }
                              tipo={produto.tipo}
                              disabled={
                                quantidadeRestante <= 0 ||
                                produto.disponivel === false
                              }
                            />
                          );
                        })}
                      </div>
                    </div>
                  );
                })
              ) : (
                <div style={{ width: "68vw" }}>
                  <NoDataAtendimento />
                </div>
              )}
              {!isProdutosCarregando &&
                !errorPrato &&
                !errorProduto &&
                isSemResultado && (
                  <p
                    style={{
                      width: "68vw",
                      display: "flex",
                      marginTop: "30px",
                      justifyContent: "center",
                    }}
                  >
                    Não foram encontrados pratos e/ou produtos com esse nome.
                  </p>
                )}
            </div>
          </div>
        </section>

        <aside className="menu-comanda">
          <header className="header-comanda">
            <h1>Comandas</h1>
          </header>

          <div className="produtos-adicionados-comanda">
            {comanda.map((item, index) => {
              const produtoEstoque = produtos.find((p) => p.nome === item.nome);

              const itemComanda = comanda.find(
                (item) => item.nome === produtoEstoque.nome
              );
              const quantidadeNaComanda = itemComanda
                ? itemComanda.quantidade
                : 0;
              const quantidadeRestante =
                produtoEstoque.quantidade - quantidadeNaComanda;

              return (
                <ProdutoComanda
                  key={index}
                  produto={item.nome}
                  preco={item.preco}
                  imagem={item.imagem}
                  quantidade={item.quantidade}
                  atualizarQuantidade={atualizarQuantidade}
                  onClick={abrirModal}
                  removerProduto={removerProdutoDaComanda}
                  tipo={item.tipo}
                  quantidadeRestante={quantidadeRestante}
                />
              );
            })}
          </div>

          <section className="botao-confirmar">
            <BotaoConfirmar
              quantidade={totalItens}
              totalPedido={totalPedido}
              onClick={() => {
                abrirModalConfirmarPedido();
                setEnviarPedido(true);
              }}
              disabled={comandaExpandida.length === 0}
            />
          </section>
        </aside>
      </LayoutTela>
    </>
  );
}
