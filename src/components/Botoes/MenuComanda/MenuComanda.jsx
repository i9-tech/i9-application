import './MenuComanda.css';
import ProdutoComanda from '../ProdutoComanda/ProdutoComanda';
import BotaoConfirmar from '../BotaoConfirmar/BotaoConfirmar';
import { useState } from 'react';
import ModalObservacoes from '../ModalObservacoes copy/ModalObservacoes';
import ModalConfirmarPedido from '../ModalConfirmarPedido copy/ModalConfirmarPedido';

export function MenuComanda(props) {
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
           
           

            <aside className="menu-comanda">
                <header className="header-comanda">
                    <h1>Comandas</h1>
                </header>

                <div className="produtos-adicionados-comanda">
{/* 
                    <ProdutoComanda produto="Pastel" preco={9.00} atualizarQuantidade={atualizarQuantidade} onClick={abrirModal} />
                    <ProdutoComanda produto="Lanche Natural" preco={12.00} atualizarQuantidade={atualizarQuantidade} onClick={abrirModal} />
                    <ProdutoComanda produto="X-Calabresa Artesanal" preco={20.00} atualizarQuantidade={atualizarQuantidade} onClick={abrirModal} /> */}

                </div>


                <section className="botao-confirmar">
                    <BotaoConfirmar quantidade={totalItens} onClick={abrirModalConfirmarPedido} />
                </section>

            </aside>
        </>
    );

}

export default MenuComanda;
