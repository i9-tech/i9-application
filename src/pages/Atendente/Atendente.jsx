import './Atendente.css'
import BotaoConfirmar from '../../components/Botoes/BotaoConfirmar/BotaoConfirmar'
import ElementoTotal from '../../components/Hovers/HoverTotalProduto/ElementoTotal'
import LupaPesquisa from '../../assets/lupa-pesquisa.svg'
import ElementoProduto from '../../components/Hovers/HoverProduto/ElementoProduto'
import { useState } from 'react';
import ModalObservacoes from '../../components/Botoes/ModalObservacoes/ModalObservacoes'
import ProdutoComanda from '../../components/Botoes/ProdutoComanda/ProdutoComanda'
import ModalConfirmarPedido from '../../components/Botoes/ModalConfirmarPedido/ModalConfirmarPedido'

export function Atendente(props) {
    const [quantidades, setQuantidades] = useState({});
    const [modalAberto, setModalAberto] = useState(false);
    const [confirmarPedido, setConfirmarPedido] = useState(false);

    const [produtoSelecionado, setProdutoSelecionado] = useState(null);
    const [quantidadeSelecionada, setQuantidadeSelecionada] = useState(0);

    const [comanda, setComanda] = useState([]);

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

            return [...prev, { ...produto, quantidade: 1, precoTotal: produto.preco }];
        });
    };


    function atualizarQuantidade(produto, quantidade) {
        setQuantidades((prev) => ({
            ...prev,
            [produto]: quantidade
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
    }

    const fecharModalConfirmarPedido = () => {
        setConfirmarPedido(false);
    }

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
    const totalPedido = comanda.reduce((total, item) => total + item.precoTotal, 0);


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


                <div className='todos-produtos'>
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
                            <input type="text" placeholder="Procurar Produto" className="input-pesquisa-produtos" />
                            <button className="lupa-pesquisa">
                                <img src={LupaPesquisa} alt="Pesquisar" />
                            </button>
                        </div>
                    </div>

                    <ElementoProduto nome="Pastel de Frango Com Catupiry" prato="2" descricao="Pastel de Frango com Catupiry cremoso, feito com ingredientes selecionados e uma massa crocante, perfeito para um lanche rápido." preco={9.00} onAdicionar={adicionarNaComanda} disabled={false} />
                    <ElementoProduto nome="Pastel de Frango" descricao="Pastel de Frango de casa, com Catupiry e temperos especiais. Um sabor irresistível que derrete na boca." preco={9.00} onAdicionar={adicionarNaComanda} disabled={false} />
                    <ElementoProduto nome="Pastel" descricao="Pastel de Frango com Catupiry cremoso, ideal para quem busca um lanche rápido e saboroso." preco={9.50} onAdicionar={adicionarNaComanda} disabled={false} />
                    <ElementoProduto nome="Bolinho de Bacalhau" descricao="Bolinho de Bacalhau fresco, feito com bacalhau de alta qualidade e temperos especiais, ideal para qualquer ocasião." preco={12.00} onAdicionar={adicionarNaComanda} disabled={false}/>
                    <ElementoProduto nome="X-Calabresa Artesanal" descricao="X-Calabresa Artesanal com queijo e calabresa, uma combinação perfeita para os amantes de sabores intensos." preco={20.00} onAdicionar={adicionarNaComanda} disabled={false}/>
                    <ElementoProduto nome="Lanche Natural" descricao="Lanche Natural com queijo e presunto, preparado com ingredientes frescos, ideal para uma alimentação leve e saudável." preco={15.00} onAdicionar={adicionarNaComanda} disabled={true} />
                    <ElementoProduto nome="Salada de Frutas" descricao="Salada de Frutas frescas, uma explosão de sabores e cores, perfeita para refrescar o seu dia." preco={10.00} onAdicionar={adicionarNaComanda} disabled={false} />
                    <ElementoProduto nome="Feijoada" descricao="Feijoada caseira com arroz e farofa, um prato tradicional que traz o verdadeiro sabor da culinária brasileira." preco={25.00} onAdicionar={adicionarNaComanda} disabled={false} />
                    <ElementoProduto nome="Coxinha de Frango" descricao="Coxinha de Frango com Catupiry cremoso, um clássico dos salgados que agrada a todos os paladares." preco={8.00} onAdicionar={adicionarNaComanda} disabled={false} />
                    <ElementoProduto nome="Pao de Queijo" descricao="Pao de Queijo fresco, macio e saboroso, ideal para acompanhar um café ou chá." preco={5.00} onAdicionar={adicionarNaComanda} disabled={false} />
                    <ElementoProduto nome="Acafe" descricao="Acafe caseiro com leite e açúcar, uma bebida reconfortante para aquecer os dias frios." preco={10.00} onAdicionar={adicionarNaComanda} disabled={false} />
                    <ElementoProduto nome="Pamonha" descricao="Pamonha de milho fresco, um doce típico que traz o sabor autêntico do campo." preco={12.00} onAdicionar={adicionarNaComanda} />
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

                        />
                    ))}
                    {console.log('comanda', comanda)}
                    {console.log('comandaExpandida', comandaExpandida)}


                    {/*
                    <ProdutoComanda produto="Pastel" preco={9.00} atualizarQuantidade={atualizarQuantidade} onClick={abrirModal} />
                    <ProdutoComanda produto="Lanche Natural" preco={12.00} atualizarQuantidade={atualizarQuantidade} onClick={abrirModal} />
                    <ProdutoComanda produto="X-Calabresa Artesanal" preco={20.00} atualizarQuantidade={atualizarQuantidade} onClick={abrirModal} /> */}

                </div>

                <section className="botao-confirmar">
                    <BotaoConfirmar quantidade={totalItens} totalPedido={totalPedido} onClick={abrirModalConfirmarPedido} />
                </section>

            </aside>

        </>
    )
}