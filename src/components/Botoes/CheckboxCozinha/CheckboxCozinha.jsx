import './CheckboxCozinha.css'
import iconeCheck from '../../../assets/check.svg'

export function CheckboxCozinha({ id, texto }) {
  return (
    <>
      <input type="checkbox" id={id} />
      <label htmlFor={id} className="checkbox-cozinha-label">
        <img src={iconeCheck} alt="Ícone de completo" />
        {texto}
      </label>
    </>
  )
}

export default CheckboxCozinha;
