import React from 'react'

export default function ComandaHeader({numeroPedido, dataHora}) {
  return (
    <>
        <div className="cabecalho-conteudo">
          <div>
            <h3>Pedido #{numeroPedido}</h3>
            <p>{new Date(dataHora).toLocaleDateString("pt-BR")}</p>
          </div>
        </div>
    </>
  )
}
