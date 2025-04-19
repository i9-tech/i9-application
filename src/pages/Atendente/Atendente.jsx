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

  useEffect(() => {
    const dadosProdutos = [
      {
        nome: "Pastel de Frango Com Catupiry",
        descricao:
          "Pastel de Frango recheado com Catupiry cremoso, servido com uma xícara de café e um toque de canela. O pastel é feito com uma massa leve e crocante, recheado com um delicioso frango moído e um queijo derretido. O Catupiry é feito com um creme de leite fresco e um queijo parmesão ralado, o que lhe confere um sabor aveludado e um aroma intenso. O café é servido em uma xícara de porcelana branca e decorada com um desenho de um café.",
        preco: 9.0,
        disabled: false,
      },
      {
        nome: "Pastel de Frango",
        descricao:
          "Pastel de Frango de casa, servido com uma xícara de café e um toque de canela. O pastel é feito com uma massa leve e crocante, recheado com um delicioso frango moído. O café é servido em uma xícara de porcelana branca e decorada com um desenho de um café.",
        preco: 9.0,
        disabled: false,
      },
      {
        nome: "Bolinho de Bacalhau",
        descricao:
          "Bolinho de Bacalhau fresco, servido com uma xícara de café e um toque de limão. O bolinho é feito com um bacalhau fresco, picado e misturado com um ovo, uma cebola picada e um pouco de farinha de trigo. O bolinho é frito em uma panela de azeite quente e servido com uma xícara de café e um toque de limão.",
        preco: 12.0,
        disabled: false,
      },
      {
        nome: "X-Calabresa Artesanal",
        descricao:
          "X-Calabresa Artesanal com queijo, servido com uma xícara de café e um toque de queijo. A X-Calabresa é feita com uma massa leve e crocante, recheada com um delicioso queijo parmesão ralado e um presunto picado. O queijo é servido em uma xícara de porcelana branca e decorada com um desenho de um queijo.",
        preco: 20.0,
        disabled: false,
      },
      {
        nome: "Lanche Natural",
        descricao:
          "Lanche Natural com queijo, servido com uma xícara de café e um toque de queijo. O lanche é feito com uma massa leve e crocante, recheado com um delicioso queijo parmesão ralado e um presunto picado. O queijo é servido em uma xícara de porcelana branca e decorada com um desenho de um queijo.",
        preco: 15.0,
        disabled: true,
      },
      {
        nome: "Salada de Frutas",
        descricao:
          "Salada de Frutas frescas, servido com uma xícara de café e um toque de limão. A salada é feita com uma mistura de frutas frescas, como maçã, banana, mirtilo, abacaxi e kiwi. As frutas são picadas e misturadas com um pouco de açúcar e um toque de limão.",
        preco: 10.0,
        disabled: false,
      },
      {
        nome: "Feijoada",
        descricao:
          "Feijoada caseira com arroz e farofa, servido com uma xícara de café e um toque de queijo. A feijoada é feita com uma mistura de feijão preto, carne de porco, carne de bovino e temperos. O arroz é servido ao lado da feijoada e é feito com um arroz branco e um toque de queijo. A farofa é feita com uma mistura de farinha de milho e um pouco de açúcar.",
        preco: 25.0,
        disabled: false,
      },
      {
        nome: "Coxinha de Frango",
        descricao:
          "Coxinha de Frango com Catupiry, servido com uma xícara de café e um toque de queijo. A coxinha é feita com uma massa leve e crocante, recheada com um delicioso frango moído e um queijo derretido. O Catupiry é feito com um creme de leite fresco e um queijo parmesão ralado, o que lhe confere um sabor aveludado e um aroma intenso.",
        preco: 8.0,
        disabled: false,
      },
      {
        nome: "Pao de Queijo",
        descricao:
          "Pao de Queijo fresco, servido com uma xícara de café e um toque de queijo. O pão é feito com uma massa leve e crocante, recheado com um delicioso queijo parmesão ralado. O queijo é servido em uma xícara de porcelana branca e decorada com um desenho de um queijo.",
        preco: 5.0,
        disabled: false,
      },
      {
        nome: "Acafe",
        descricao:
          "Acafe caseiro com leite, servido com uma xícara de café e um toque de canela. O acafe é feito com uma mistura de café, leite e um toque de canela. O leite é servido em uma xícara de porcelana branca e decorada com um desenho de um café.",
        preco: 10.0,
        disabled: false,
      },
      {
        nome: "Pamonha",
        descricao:
          "Pamonha de milho fresco, servido com uma xícara de café e um toque de canela. A pamonha é feita com um milho fresco, picado e misturado com um ovo, uma cebola picada e um pouco de farinha de trigo. A pamonha é frita em uma panela de azeite quente e servida com uma xícara de café e um toque de canela.",
        preco: 12.0,
        disabled: false,
      },
    ];
    setProdutos(dadosProdutos);
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
          <ModalConfirmarPedido onClose={fecharModalConfirmarPedido} />
        )}

        <div className="todos-produtos">
          <h1>Escolha o Setor</h1>
          <div className="setores">
            <ElementoTotal nome="Todos" quantidade={20} />
            <ElementoTotal nome="Restaurante" quantidade={150} />
            <ElementoTotal nome="Pastelaria" quantidade={100} />
            <ElementoTotal nome="Lanchonete" quantidade={50} />
            <ElementoTotal nome="Mercado" quantidade={20} />
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

          {produtos.map((produto, index) => (
            <ElementoProduto
              key={index}
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

          {/*
                    <ProdutoComanda produto="Pastel" preco={9.00} atualizarQuantidade={atualizarQuantidade} onClick={abrirModal} />
                    <ProdutoComanda produto="Lanche Natural" preco={12.00} atualizarQuantidade={atualizarQuantidade} onClick={abrirModal} />
                    <ProdutoComanda produto="X-Calabresa Artesanal" preco={20.00} atualizarQuantidade={atualizarQuantidade} onClick={abrirModal} /> */}
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
