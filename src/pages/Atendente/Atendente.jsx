import "./Atendente.css";
import BotaoConfirmar from "../../components/Botoes/BotaoConfirmar/BotaoConfirmar";
import ElementoTotal from "../../components/Hovers/HoverTotalProduto/ElementoTotal";
import LupaPesquisa from "../../assets/lupa-pesquisa.svg";
import ElementoProduto from "../../components/Hovers/HoverProduto/ElementoProduto";
import { useState, useEffect, useMemo } from "react";
import ModalObservacoes from "../../components/Botoes/ModalObservacoes/ModalObservacoes";
import ProdutoComanda from "../../components/Botoes/ProdutoComanda/ProdutoComanda";
import ModalConfirmarPedido from "../../components/Botoes/ModalConfirmarPedido/ModalConfirmarPedido";
import Navbar from "../../components/Navbar/Navbar";
import { getPermissoes, getToken } from "../../utils/auth";
import todos from '../../assets/todos.png';
import { Navigate } from "react-router-dom";
import api from "../../provider/api";
import { getFuncionario } from "../../utils/auth";
import { ENDPOINTS } from "../../utils/endpoints";
import { toast } from "react-toastify";
import LayoutTela from "../../components/LayoutTela/LayoutTela";

export function Atendente() {
  const permissao = getPermissoes();
  if (permissao.length === 0) {
    Navigate("/unauthorized");
  }

  const funcionario = getFuncionario();
  const token = getToken();
  const [produtos, setProdutos] = useState([]);
  const [setores, setSetores] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [setorSelecionado, setSetorSelecionado] = useState("Todos");

  const [buscaProduto, setBuscaProduto] = useState("");

  const [comanda, setComanda] = useState([]);

  const [produtoSelecionado, setProdutoSelecionado] = useState(null);
  const [quantidadeSelecionada, setQuantidadeSelecionada] = useState(0);


  const [modalAberto, setModalAberto] = useState(false);
  const [confirmarPedido, setConfirmarPedido] = useState(false);


  const [itemCarrinhoIds, setItemCarrinhoIds] = useState([]);

  useEffect(() => {
    api.get(`${ENDPOINTS.SETORES}/${funcionario.userId}`, {
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

    api.get(`${ENDPOINTS.CATEGORIAS}/${funcionario.userId}`, {
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

    api.get(`${ENDPOINTS.PRODUTOS}/${funcionario.userId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (Array.isArray(res.data)) {
          const produtosComTipo = res.data.map((item) => ({
            ...item,
            tipo: "produto",
          }));
          setProdutos(produtosComTipo);
        }
      })
      .catch((err) => {
        console.error("Erro ao buscar produtos:", err);
        toast.error("Erro ao buscar produtos!");
      });

    api.get(`${ENDPOINTS.PRATOS}/${funcionario.userId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (Array.isArray(res.data)) {
          const pratosComTipo = res.data.map((item) => ({
            ...item,
            tipo: "prato",
          }));
          setProdutos(prev => [...prev, ...pratosComTipo]);
        }
      })
      .catch((err) => {
        console.error("Erro ao buscar pratos:", err);
        toast.error("Erro ao buscar pratos!");
      });

  }, [funcionario.userId, token]);


  const adicionarNaComanda = (produto) => {
    setComanda((prev) => {
      const index = prev.findIndex((item) => item.nome === produto.nome);

      if (index !== -1) {
        const novaComanda = [...prev];
        const produtoAtual = novaComanda[index];
        const novaQuantidade = (produtoAtual.quantidade || 1) + 1;

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
          tipo: produto.tipo,
          quantidade: 1,
          precoTotal: produto.preco,
          imagem: produto.imagem,
        },
      ];
    });
  };


  function atualizarQuantidade(produto, quantidade) {
    const qtd = Number(quantidade) || 0;

    setComanda(prev => {
      const index = prev.findIndex(item => item.nome === produto);
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
    const item = comanda.find(i => i.nome === produto);
    setProdutoSelecionado({ nome: produto, observacoes: item?.observacoes || [] });
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


  const totalItens = comanda.reduce((totalDeItens, item) => totalDeItens + item.quantidade, 0);

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
          observacao: Array.isArray(item.observacoes) && item.observacoes[i]
            ? item.observacoes[i].texto || ""
            : "",
          funcionario: funcionario.userId,
          tipo: item.tipo
        });
      }
    });
    return lista;
  }, [funcionario.userId, comanda]);
  const [enviarPedido, setEnviarPedido] = useState(false);

  useEffect(() => {
    if (!enviarPedido || comandaExpandida.length === 0) return;

    const promises = comandaExpandida.map((item) => {
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
      setItemCarrinhoIds(idsValidos)
      setConfirmarPedido(true);
      setEnviarPedido(false);
    });
  }, [enviarPedido, comandaExpandida, funcionario.userId, token]);

  function limparComandas() {
    setComanda([]);
    carregarDados();
  }

  function carregarDados() {
    api.get(`${ENDPOINTS.PRODUTOS}/${funcionario.userId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (Array.isArray(res.data)) {
          const produtosComTipo = res.data.map((item) => ({
            ...item,
            tipo: "produto",
          }));
          setProdutos(produtosComTipo);
        }
      })
      .catch((err) => {
        console.error("Erro ao buscar produtos:", err);
        toast.error("Erro ao buscar produtos!");
      });

    api.get(`${ENDPOINTS.PRATOS}/${funcionario.userId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (Array.isArray(res.data)) {
          const pratosComTipo = res.data.map((item) => ({
            ...item,
            tipo: "prato",
          }));
          setProdutos((prev) => [...prev, ...pratosComTipo]);
        }
      })
      .catch((err) => {
        console.error("Erro ao buscar pratos:", err);
        toast.error("Erro ao buscar pratos!");
      });
  }

  return (
    <>
      <LayoutTela titulo="">
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
          <ModalConfirmarPedido onClose={fecharModalConfirmarPedido} statusModal={setConfirmarPedido} itemCarrinhoIds={itemCarrinhoIds} onLimparComandas={limparComandas} />
        )}

        <div className="todos-produtos">
          <h1>Escolha o Setor</h1>
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
                imagem={setor.imagem}
                quantidade={
                  produtos.filter((p) => p.setor && p.setor.nome === setor.nome).length
                }
                onClick={() => setSetorSelecionado(setor.nome)}
              />
            ))}
          </div>

          <div className="header-container">
            <h1 className="setor-nome"> Setor: <span className="color-setor">{setorSelecionado}</span> </h1>
            <div className="barra-pesquisa">
              <input
                type="text"
                placeholder="Procurar Produto"
                className="input-pesquisa-produtos"
                value={buscaProduto}
                onChange={(e) => setBuscaProduto(e.target.value)}
              />
              <button className="lupa-pesquisa">
                <img src={LupaPesquisa} alt="Pesquisar" />
              </button>
            </div>
          </div>

          <div className="produtos-por-categoria">
            {categorias.map((categoria) => {
              const produtosFiltrados = produtos.filter((produto) => {
                const mesmoSetor =
                  setorSelecionado === "Todos" ||
                  (
                    produto.setor &&
                    produto.setor.nome &&
                    produto.setor.nome.trim().toLowerCase() === setorSelecionado.trim().toLowerCase()
                  );

                const mesmaCategoria =
                  produto.categoria &&
                  produto.categoria.nome &&
                  produto.categoria.nome.trim().toLowerCase() === categoria.nome.trim().toLowerCase();

                const nomeCombina =
                  produto.nome.toLowerCase().includes(buscaProduto.toLowerCase());

                return mesmoSetor && mesmaCategoria && nomeCombina;
              });

              if (produtosFiltrados.length === 0) return null;

              return (
                <div key={categoria.id} className="categoria">
                  <h1 className="categoria-nome">{categoria.nome}</h1>
                  <div className="produtos-da-categoria">
                    {produtosFiltrados.map((produto, index) => {
                      const itemComanda = comanda.find((item) => item.nome === produto.nome);
                      const quantidadeNaComanda = itemComanda ? itemComanda.quantidade : 0;
                      const quantidadeRestante = produto.quantidade - quantidadeNaComanda;

                      return (
                        <ElementoProduto
                          key={`${produto.id}-${index}`}
                          id={produto.id}
                          nome={produto.nome}
                          descricao={produto.descricao}
                          preco={produto.valorUnitario || produto.valorVenda}
                          onAdicionar={adicionarNaComanda}
                          imagem={produto.imagem}
                          quantidade={produto.tipo === 'produto' ? quantidadeRestante || 0 : null}
                          tipo={produto.tipo}
                          disabled={quantidadeRestante <= 0 || produto.disponivel === false}
                        />
                      );
                    })}

                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      <aside className="menu-comanda">
        <header className="header-comanda">
          <h1>Comandas</h1>
        </header>

        <div className="produtos-adicionados-comanda">
          {comanda.map((item, index) => {
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
