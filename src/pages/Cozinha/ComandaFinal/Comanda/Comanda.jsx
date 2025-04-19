import React from 'react'
import ComandaHeader from '../ComandaHeader/ComandaHeader'
import ComandaBody from '../ComandaBody/ComandaBody'
import ComandaFooter from '../ComandaFooter/ComandaFooter'

import { useState } from 'react';

export default function Comanda() {
    const [pedido, setPedido] = useState({
        numeroPedido: 250,
        dataHora: '19 Mar 2025, 16:54',
        itens: [
            {
                titulo: '1x Lanche Natural',
                descricao: 'Pão, Alface, Tomate e Molho.',
                observacao: 'SEM TOMATE'
            },
            {
                titulo: '1x Lanche Natural',
                descricao: 'Pão, Alface, Tomate e Molho.'
            },
            {
                titulo: '1x Chicken Jr.',
                descricao: 'Pão de hambúrguer, frango empanado, queijo, presunto...'
            },
            {
                titulo: '1x Lanche Natural',
                descricao: 'Pão, Alface, Tomate e Molho.'
            },,
            {
                titulo: '1x Lanche Natural',
                descricao: 'Pão, Alface, Tomate e Molho.'
            },
        ],
        qtdItens: 3
    });

    return (
        <>
            <div className="comanda">
                <div className="cabecalho-comanda">
                    <ComandaHeader />
                </div>

                <div className="corpo-comanda">
                    {pedido.itens.map((item, index) => (
                        <ComandaBody
                            key={index}
                            titulo={<><span>{item.titulo.split(' ')[0]}</span> {item.titulo.split(' ').slice(1).join(' ')}</>}
                            descricao={item.descricao}
                            observacao={item.observacao}
                        />
                    ))}
                </div>
                
                <div className="rodape-comanda">
                    <ComandaFooter />
                </div>
            </div>
        </>
    )
}

