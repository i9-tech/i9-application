import React from 'react'

import CheckboxCozinha from '../../../../components/Botoes/CheckboxCozinha/CheckboxCozinha'


export default function ComandaFooter({ qtdItens, index }) {
  return (
    <>
      <div className="rodape-conteudo">
        <p className="itensQtd">{qtdItens} Itens</p>
        <CheckboxCozinha texto={'Completo'} />
      </div>
    </>
  )
}
