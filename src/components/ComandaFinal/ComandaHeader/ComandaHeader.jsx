import React from 'react'

export default function ComandaHeader({numeroPedido, dataHora}) {
  return (
    <>
        <div className="cabecalho-conteudo">
          <div>
            <h3>Pedido #{numeroPedido}</h3>
            <p>{dataHora}</p>
          </div>
        </div>
    </>
  )
}
