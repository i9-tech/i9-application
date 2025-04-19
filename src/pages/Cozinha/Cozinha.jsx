import './Cozinha.css'

import React from 'react'
import Navbar from '../../components/Navbar/Navbar'
import Comanda from './ComandaFinal/Comanda/Comanda'

export function Cozinha() {
    return (
        <>
            <Navbar/>
            <section className="cozinha">
                <header className="titulo">
                    <h1>Preparo de Pedidos</h1>
                    <p>8 pedidos</p>
                </header>

                <article className='tela-comandas'>
                    <Comanda/>
                    
                </article>

            </section>
        </>
    )
}
