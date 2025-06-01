import React from 'react'
import '../Grafico.css'

export default function CarregamentoDonuts() {
  return (
    <section className="carregamento-donuts-container">
        <div className='carregamento-donuts'>
            <div className='dados-laterais-donuts'>
                <span className="dado-donuts"></span>
                <span className="dado-donuts"></span>
                <span className="dado-donuts"></span>
                <span className="dado-donuts"></span>
                <span className="dado-donuts"></span>
            </div>
        <div className="dados-grafico-donuts">
            <span className='grafico-donut'></span>
        </div>
        </div>
    </section>
  )
}
