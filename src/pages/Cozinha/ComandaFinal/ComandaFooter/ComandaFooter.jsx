import React from 'react'
import CheckboxCozinha from '../../../../components/Botoes/CheckboxCozinha/CheckboxCozinha'

export default function ComandaFooter({ qtdItens, index }) {
  const checkboxId = `checkbox-footer-${index}` 

  return (
    <div className="rodape-conteudo">
      <p className="itensQtd">{qtdItens} Itens</p>
      <CheckboxCozinha id={checkboxId} texto="Completo" />
    </div>
  )
}