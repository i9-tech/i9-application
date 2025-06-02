import React from 'react'
import CheckboxCozinha from '../../Botoes/CheckboxCozinha/CheckboxCozinha'

export default function ComandaFooter({ qtdItens, index, onCompletar }) {
  const checkboxId = `checkbox-footer-${index}` 

  const handleChange = (e) => {
    if (e.target.checked) {
      onCompletar(); 
    }
  };

  return (
    <div className="rodape-conteudo">
      <p className="itensQtd">{qtdItens} {qtdItens == 1 ? "Item" : "Itens"} </p>
      <CheckboxCozinha id={checkboxId} texto="Completo" onChange={handleChange} />
    </div>
  )
}