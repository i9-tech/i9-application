import React from 'react'
import { corrigirDataISO } from '../../../utils/utils'

export default function ComandaHeader({numeroPedido, dataHora}) {

  return (
    <>
        <div className="cabecalho-conteudo">
          <div>
            <h3>Pedido #{numeroPedido}</h3>
            <p>{corrigirDataISO(dataHora)}</p>
          </div>
        </div>
    </>
  )
}
