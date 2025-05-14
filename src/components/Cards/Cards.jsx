import './Cards.css';
import React from 'react';
import PedidoInfo from './CardsPedidos/Pedidos/PedidoInfo';
import PedidoItem from './CardsPedidos/Pedidos/PedidoItem';
import PedidoFinal from './CardsPedidos/Pedidos/PedidoFinal';
import BaseModais from './Modais/BaseModais';
import BotoesModais from './Modais/BotoesModais';
import PedidoInfo2 from './CardsPedidos/PedidoInformacao/PedidoInfo2';
import PedidoFinal2 from './CardsPedidos/PedidoInformacao/PedidoFinal2';
import PedidoCliente from './CardsPedidos/PedidoInformacao/PedidoCliente';
import SelecaoFuncionalidades from './Funcionalidades/SelecaoFuncionalidades';
import CardFuncionalidades from './Funcionalidades/CardFuncionalidades';
import ImagemSobreNos from './SobreNos/ImagemSobreNos';
import TextoSobreNos from './SobreNos/TextoSobreNos';

export function Cards() {
    return (
        <>
            <section className='secao2 secao'>

                <div className="grupo"> 

                    <div className="pedidos">
                        <PedidoInfo numeroPedido={250} dataHora="19 Mar 2025, 16:54" />
                        <div className="pedidoItens">
                            <PedidoItem
                                titulo={<><span>1x</span> Lanche Natural</>}
                                descricao="Pão, Alface, Tomate e Molho."
                                observacao="SEM TOMATE"
                            />

                            <PedidoItem
                                titulo={<><span>1x</span> Lanche Natural</>}
                                descricao="Pão, Alface, Tomate e Molho."
                            />

                            <PedidoItem
                                titulo={<><span>1x</span> Chicken Jr.</>}
                                descricao="Pão de hambúrguer, frango empanado, queijo, presunto..."
                            />
                        </div>

                        <PedidoFinal qtdItens={3} />
                    </div>

                    <div className="pedidosInfo">
                        <PedidoInfo2 numeroPedido={250} dataHora="19 Mar 2025, 16:54" />

                        <PedidoCliente
                            cliente={'Jhonattan'} mesa={5} pagamento={'Dinheiro'} itensQtd={3}
                        />

                        <PedidoFinal2 qtdItens={3} />
                    </div>

                    <div className='modalSemBotao'>
                        <BaseModais
                            titulo="PRODUTO REGISTRADO">
                            <>
                                Seu produto foi registrado com sucesso<br />
                                e já se encontra disponível para<br />
                                visualização na tela de estoque
                            </>
                        </BaseModais>
                    </div>

                    <div className='modalComBotao'>
                        <BaseModais
                            titulo="CANCELAR CADASTRO">
                            <>
                                Tem certeza que deseja cancelar o<br />
                                cadastro do produto? Suas<br />
                                informações digitadas serão perdidas

                                <BotoesModais />
                            </>
                        </BaseModais>


                    </div>

                    <div className='funcionalidades'>
                        <SelecaoFuncionalidades />

                        <div className="infoFuncionalidades">
                            <CardFuncionalidades
                                titulo="📄 Registro Simplificado de Pedidos"
                                descricao={
                                    <>
                                        Registrar um pedido é rápido e fácil,<br />
                                        evitando erros e melhorando a <br />
                                        comunicação da equipe para um <br />
                                        atendimento mais eficiente.
                                    </>
                                }
                            />
                        </div>
                    </div>

                    <div className='sobreNos'>
                        <ImagemSobreNos />
                        <TextoSobreNos
                            titulo="Tudo Integrado em Um Só Sistema"
                            descricao={
                                <>
                                    Com a i9, não há necessidade de trocar
                                    entre <br /> diferentes plataformas. Tenha tudo
                                    que você <br /> precisa em um único lugar, de forma
                                    prática <br /> e fácil.
                                </>
                            }
                        />
                    </div>

                </div>
            </section>
        </>
    )
}