import React from 'react'
import CheckboxPedidoCozinha from '../../../../components/Botoes/CheckboxPedidoCozinha/CheckboxPedidoCozinha'

export default function ComandaBody({ imagem, titulo, descricao, observacao, index, pedidoId }) {
  const checkboxId = `checkbox-${pedidoId}-${index}`

  return (
    <div className="corpo-conteudo">
      <div className='imagem'>
        <img src={imagem} alt="" />
      </div>
      <div className="itemInfo">
        <h4>{titulo}</h4>
        <p>{descricao}</p>
        {observacao && <p className="observacao">Observação: <span>{observacao}</span></p>}
      </div>
      <CheckboxPedidoCozinha id={checkboxId} />
    </div>
  )
}