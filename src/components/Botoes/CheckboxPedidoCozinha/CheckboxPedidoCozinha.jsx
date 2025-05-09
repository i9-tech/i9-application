import './CheckboxPedidoCozinha.css'
import iconeCheck from '../../../assets/check.svg'

export function CheckboxPedidoCozinha({ id }) {
  return (
    <div className="btn-check">
      <input type="checkbox" id={id} />
      <label htmlFor={id} className="checkbox-cozinha-label2">
        <img src={iconeCheck} alt="Ícone de completo" />
      </label>
    </div>
  )
}

export default CheckboxPedidoCozinha