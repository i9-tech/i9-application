import "./Atendente.css";
import BotaoConfirmar from "../../components/Botoes/BotaoConfirmar/BotaoConfirmar";
import ElementoTotal from "../../components/Hovers/HoverTotalProduto/ElementoTotal";
import LupaPesquisa from "../../assets/lupa-pesquisa.svg";
import ElementoProduto from "../../components/Hovers/HoverProduto/ElementoProduto";
import { useState, useEffect } from "react";
import ModalObservacoes from "../../components/Botoes/ModalObservacoes/ModalObservacoes";
import ProdutoComanda from "../../components/Botoes/ProdutoComanda/ProdutoComanda";
import ModalConfirmarPedido from "../../components/Botoes/ModalConfirmarPedido/ModalConfirmarPedido";
import Navbar from "../../components/Navbar/Navbar";

export function Atendente(props) {
  const [quantidades, setQuantidades] = useState({});
  const [modalAberto, setModalAberto] = useState(false);
  const [confirmarPedido, setConfirmarPedido] = useState(false);

  const [produtoSelecionado, setProdutoSelecionado] = useState(null);
  const [quantidadeSelecionada, setQuantidadeSelecionada] = useState(0);

  const [comanda, setComanda] = useState([]);

  const [produtos, setProdutos] = useState([]);
  const [setores, setSetores] = useState([]);
  const [categorias, setCategorias] = useState([]);

  const [setorSelecionado, setSetorSelecionado] = useState("Todos");


  useEffect(() => {
    const dadosProdutos = [
      {
        id: 1,
        codigo: 1001,
        nome: "Pastel de Frango Com Catupiry",
        quantidade: 10,
        dataVencimento: "2025-12-31",
        valorCompra: 5.0,
        valorUnitario: 9.0,
        quantidadeMin: 2,
        quantidadeMax: 50,
        descricao: "Pastel de Frango recheado com Catupiry, feito com amor e carinho, utilizando a melhor qualidade de ingredientes...",
        categoria: "Pastelaria",
        setor: "Lanchonete",
        dataRegistro: "2024-04-25",
        funcionario: { id: 1, nome: "Yasmim" },
        preco: 9.0,
        disabled: false,
      },
      {
        id: 2,
        codigo: 1002,
        nome: "Pastel de Frango",
        quantidade: 10,
        dataVencimento: "2025-12-31",
        valorCompra: 4.5,
        valorUnitario: 9.0,
        quantidadeMin: 2,
        quantidadeMax: 50,
        descricao: "Pastel de Frango de casa, feito com amor e carinho, utilizando a melhor qualidade de ingredientes...",
        categoria: "Pastelaria",
        setor: "Lanchonete",
        dataRegistro: "2024-04-25",
        funcionario: { id: 1, nome: "Yasmim" },
        preco: 9.0,
        disabled: false,
      },
      {
        id: 3,
        codigo: 1003,
        nome: "Bolinho de Bacalhau",
        quantidade: 15,
        dataVencimento: "2025-12-31",
        valorCompra: 6.0,
        valorUnitario: 12.0,
        quantidadeMin: 3,
        quantidadeMax: 40,
        descricao: "Bolinho de Bacalhau fresco, feito com amor e carinho, utilizando a melhor qualidade de ingredientes...",
        categoria: "Petisco",
        setor: "Restaurante",
        dataRegistro: "2024-04-25",
        funcionario: { id: 2, nome: "Carlos" },
        preco: 12.0,
        disabled: false,
      },
      {
        id: 4,
        codigo: 1004,
        nome: "X-Calabresa Artesanal",
        quantidade: 8,
        dataVencimento: "2025-12-31",
        valorCompra: 12.0,
        valorUnitario: 20.0,
        quantidadeMin: 1,
        quantidadeMax: 20,
        descricao: "X-Calabresa Artesanal com queijo, feita com amor e carinho, utilizando a melhor qualidade de ingredientes...",
        categoria: "Lanche",
        setor: "Lanchonete",
        dataRegistro: "2024-04-25",
        funcionario: { id: 3, nome: "Ana" },
        preco: 20.0,
        disabled: false,
      },
      {
        id: 5,
        codigo: 1005,
        nome: "Lanche Natural",
        quantidade: 12,
        dataVencimento: "2025-12-31",
        valorCompra: 8.0,
        valorUnitario: 15.0,
        quantidadeMin: 2,
        quantidadeMax: 30,
        descricao: "Lanche Natural com queijo, feito com amor e carinho, utilizando a melhor qualidade de ingredientes...",
        categoria: "Lanche",
        setor: "Lanchonete",
        dataRegistro: "2024-04-25",
        funcionario: { id: 4, nome: "Bruno" },
        preco: 15.0,
        disabled: true,
      },
      {
        id: 6,
        codigo: 1006,
        nome: "Salada de Frutas",
        quantidade: 10,
        dataVencimento: "2025-12-31",
        valorCompra: 6.0,
        valorUnitario: 10.0,
        quantidadeMin: 2,
        quantidadeMax: 30,
        descricao: "Salada de Frutas frescas, feito com amor e carinho, utilizando a melhor qualidade de ingredientes...",
        categoria: "Sobremesa",
        setor: "Restaurante",
        dataRegistro: "2024-04-25",
        funcionario: { id: 5, nome: "Laura" },
        preco: 10.0,
        disabled: false,
      },
      {
        id: 7,
        codigo: 1007,
        nome: "Feijoada",
        quantidade: 7,
        dataVencimento: "2025-12-31",
        valorCompra: 15.0,
        valorUnitario: 25.0,
        quantidadeMin: 1,
        quantidadeMax: 15,
        descricao: "Feijoada caseira com arroz e farofa, feito com amor e carinho, utilizando a melhor qualidade de ingredientes...",
        categoria: "Prato Principal",
        setor: "Restaurante",
        dataRegistro: "2024-04-25",
        funcionario: { id: 6, nome: "Marcos" },
        preco: 25.0,
        disabled: false,
      },
      {
        id: 8,
        codigo: 1008,
        nome: "Coxinha de Frango",
        quantidade: 25,
        dataVencimento: "2025-12-31",
        valorCompra: 4.0,
        valorUnitario: 8.0,
        quantidadeMin: 5,
        quantidadeMax: 100,
        descricao: "Coxinha de Frango com Catupiry,  feito com amor e carinho, utilizando a melhor qualidade de ingredientes...",
        categoria: "Salgado",
        setor: "Pastelaria",
        dataRegistro: "2024-04-25",
        funcionario: { id: 7, nome: "Joana" },
        preco: 8.0,
        disabled: false,
      },
      {
        id: 9,
        codigo: 1009,
        nome: "Pao de Queijo",
        quantidade: 30,
        dataVencimento: "2025-12-31",
        valorCompra: 3.0,
        valorUnitario: 5.0,
        quantidadeMin: 5,
        quantidadeMax: 100,
        descricao: "Pao de Queijo fresco, feito com amor e carinho, utilizando a melhor qualidade de ingredientes...",
        categoria: "Salgado",
        setor: "Lanchonete",
        dataRegistro: "2024-04-25",
        funcionario: { id: 1, nome: "Yasmim" },
        preco: 5.0,
        disabled: false,
      },
      {
        id: 10,
        codigo: 1010,
        nome: "Acafe",
        quantidade: 15,
        dataVencimento: "2025-12-31",
        valorCompra: 6.0,
        valorUnitario: 10.0,
        quantidadeMin: 3,
        quantidadeMax: 50,
        descricao: "Acafe caseiro com leite, feito com amor e carinho, utilizando a melhor qualidade de ingredientes...",
        categoria: "Bebida",
        setor: "Lanchonete",
        dataRegistro: "2024-04-25",
        funcionario: { id: 8, nome: "Ricardo" },
        preco: 10.0,
        disabled: false,
      },
      {
        id: 11,
        codigo: 1011,
        nome: "Pamonha",
        quantidade: 5,
        dataVencimento: "2025-12-31",
        valorCompra: 8.0,
        valorUnitario: 12.0,
        quantidadeMin: 1,
        quantidadeMax: 20,
        descricao: "Pamonha de milho fresco, feito com amor e carinho, utilizando a melhor qualidade de ingredientes...",
        categoria: "Doce",
        setor: "Lanchonete",
        dataRegistro: "2024-04-25",
        funcionario: { id: 9, nome: "Fernanda" },
        preco: 12.0,
        disabled: false,
      },
    ];

    const dadosSetores = [
      { id: 2, nome: "Restaurante", empresa: { id: 1, nome: "Minha Empresa" } },
      { id: 3, nome: "Pastelaria", empresa: { id: 1, nome: "Minha Empresa" } },
      { id: 4, nome: "Lanchonete", empresa: { id: 1, nome: "Minha Empresa" } },
      { id: 5, nome: "Mercado", empresa: { id: 1, nome: "Minha Empresa" } },
    ];

    const categorias = [
      { id: 1, nome: "Todos" },
      { id: 2, nome: "Doce"},
      { id: 3, nome: "Salgado" },
      { id: 4, nome: "Lanche" },
      { id: 5, nome: "Bebida" },
    ];
    
    setProdutos(dadosProdutos);
    setSetores(dadosSetores);
    setCategorias(categorias);
  }, []);

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
        { ...produto, quantidade: 1, precoTotal: produto.preco },
      ];
    });
  };

  function atualizarQuantidade(produto, quantidade) {
    setQuantidades((prev) => ({
      ...prev,
      [produto]: quantidade,
    }));

    setComanda((prev) => {
      const index = prev.findIndex((item) => item.nome === produto);
      if (index !== -1) {
        const novaComanda = [...prev];
        const produtoAtual = novaComanda[index];

        novaComanda[index] = {
          ...produtoAtual,
          quantidade: quantidade,
          precoTotal: produtoAtual.preco * quantidade,
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
    setProdutoSelecionado({ nome: produto });
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

  const totalItens = Object.values(quantidades).reduce((acc, q) => acc + q, 0);
  const totalPedido = comanda.reduce(
    (total, item) => total + item.precoTotal,
    0
  );

  const comandaExpandida = [];

  comanda.forEach((item) => {
    for (let i = 0; i < item.quantidade; i++) {
      comandaExpandida.push({
        prato: item.prato,
        produto: item.produto,
        nome: item.nome,
        valorUnitario: item.preco,
        observacao: item.observacoes?.[i]?.texto || "",
        funcionario: "Yasmim",
      });
    }
  });

  

  return (
    <>
      <Navbar />
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
          <ModalConfirmarPedido onClose={fecharModalConfirmarPedido} statusModal={setConfirmarPedido}/>
        )}

        <div className="todos-produtos">
          <h1>Escolha o Setor</h1>
          <div className="setores">
            <ElementoTotal
              key="todos"
              nome="Todos"
              quantidade={produtos.length}
              onClick={() => setSetorSelecionado("Todos")}
            />
            {setores.map((setor) => (
              <ElementoTotal
                key={setor.id}
                nome={setor.nome}
                quantidade={
                  produtos.filter((p) => p.setor === setor.nome).length
                }
                onClick={() => setSetorSelecionado(setor.nome)}
              />
            ))}
          </div>

          <div className="header-container">
            <h1>{props.categoria}</h1>
            <div className="barra-pesquisa">
              <input
                type="text"
                placeholder="Procurar Produto"
                className="input-pesquisa-produtos"
              />
              <button className="lupa-pesquisa">
                <img src={LupaPesquisa} alt="Pesquisar" />
              </button>
            </div>
          </div>

          {produtos
              .filter((produto) =>
                setorSelecionado === "Todos"
                  ? true
                  : produto.setor.trim().toLowerCase() === setorSelecionado.trim().toLowerCase()
              )
            .map((produto) => (
              <ElementoProduto
                key={produto.id}
                nome={produto.nome}
                descricao={produto.descricao}
                preco={produto.preco}
                onAdicionar={adicionarNaComanda}
                disabled={produto.disabled}
              />
          ))}
        </div>
      </section>

      <aside className="menu-comanda">
        <header className="header-comanda">
          <h1>Comandas</h1>
        </header>

        <div className="produtos-adicionados-comanda">
          {comanda.map((item, index) => (
            <ProdutoComanda
              key={index}
              produto={item.nome}
              preco={item.preco}
              quantidade={item.quantidade}
              atualizarQuantidade={atualizarQuantidade}
              onClick={abrirModal}
              removerProduto={removerProdutoDaComanda}
            />
          ))}
          {console.log("comanda", comanda)}
          {console.log("comandaExpandida", comandaExpandida)}

        </div>

        <section className="botao-confirmar">
          <BotaoConfirmar
            quantidade={totalItens}
            totalPedido={totalPedido}
            onClick={abrirModalConfirmarPedido}
          />
        </section>
      </aside>
    </>
  );
}
