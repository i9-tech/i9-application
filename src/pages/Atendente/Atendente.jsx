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

    function atualizarQuantidade(produto, quantidade) {
        setQuantidades((prev) => ({
            ...prev,
            [produto]: quantidade
        }));
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


    const totalItens = Object.values(quantidades).reduce((acc, q) => acc + q, 0);

    return (
        <>
            <section className="menu-atendente">

            {modalAberto && produtoSelecionado && (
                        <ModalObservacoes
                            produto={produtoSelecionado}
                            quantidade={quantidadeSelecionada}
                            onClose={fecharModal}
                        />
            )}
                     {confirmarPedido && (
                    <ModalConfirmarPedido onClose={fecharModalConfirmarPedido} />
                )}


                <div className='todos-produtos'>
                <h1>Escolha o Setor</h1>
                <div className="setores">
                    <ElementoTotal nome="Todos" quantidade={20}/>
                    <ElementoTotal nome="Restaurante" quantidade={150}/>
                    <ElementoTotal nome="Pastelaria" quantidade={100}/>
                    <ElementoTotal nome="Lanchonete" quantidade={50}/>
                    <ElementoTotal nome="Mercado" quantidade={20}/>
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


                <ElementoProduto nome="Pastel de Frango Com Catupiry" descricao="Pastel de Frango com Catupiry cremoso, feito com ingredientes selecionados e uma massa crocante, perfeito para um lanche rápido." preco={9.00} />
                <ElementoProduto nome="Pastel de Frango" descricao="Pastel de Frango de casa, com Catupiry e temperos especiais. Um sabor irresistível que derrete na boca." preco={9.00} />
                <ElementoProduto nome="Pastel" descricao="Pastel de Frango com Catupiry cremoso, ideal para quem busca um lanche rápido e saboroso." preco={9.00} />
                <ElementoProduto nome="Bolinho de Bacalhau" descricao="Bolinho de Bacalhau fresco, feito com bacalhau de alta qualidade e temperos especiais, ideal para qualquer ocasião." preco={12.00} />
                <ElementoProduto nome="X-Calabresa Artesanal" descricao="X-Calabresa Artesanal com queijo e calabresa, uma combinação perfeita para os amantes de sabores intensos." preco={20.00} />
                <ElementoProduto nome="Lanche Natural" descricao="Lanche Natural com queijo e presunto, preparado com ingredientes frescos, ideal para uma alimentação leve e saudável." preco={15.00} />
                <ElementoProduto nome="Salada de Frutas" descricao="Salada de Frutas frescas, uma explosão de sabores e cores, perfeita para refrescar o seu dia." preco={10.00} />
                <ElementoProduto nome="Feijoada" descricao="Feijoada caseira com arroz e farofa, um prato tradicional que traz o verdadeiro sabor da culinária brasileira." preco={25.00} />
                <ElementoProduto nome="Coxinha de Frango" descricao="Coxinha de Frango com Catupiry cremoso, um clássico dos salgados que agrada a todos os paladares." preco={8.00} />
                <ElementoProduto nome="Pao de Queijo" descricao="Pao de Queijo fresco, macio e saboroso, ideal para acompanhar um café ou chá." preco={5.00} />
                <ElementoProduto nome="Acafe" descricao="Acafe caseiro com leite e açúcar, uma bebida reconfortante para aquecer os dias frios." preco={10.00} />
                <ElementoProduto nome="Pamonha" descricao="Pamonha de milho fresco, um doce típico que traz o sabor autêntico do campo." preco={12.00} />

                </div>
            </section>

            <aside className="menu-comanda">
                <header className="header-comanda">
                    <h1>Comandas</h1>
                </header>

                <div className="produtos-adicionados-comanda">

                <ProdutoComanda produto="Pastel" preco={9.00}  atualizarQuantidade={atualizarQuantidade} onClick={abrirModal} />
                <ProdutoComanda produto="Lanche Natural" preco={12.00}  atualizarQuantidade={atualizarQuantidade} onClick={abrirModal}/>
                <ProdutoComanda produto="X-Calabresa Artesanal" preco={20.00}  atualizarQuantidade={atualizarQuantidade} onClick={abrirModal}/>

                </div>

    
            <section className="botao-confirmar">
                    <BotaoConfirmar quantidade={totalItens} onClick={abrirModalConfirmarPedido}/>               
             </section>
               
            </aside>
        
        </>
    )
}