import './CheckboxCozinha.css'
import iconeCheck from '../../../assets/check.svg'

export function CheckboxCozinha({ id, texto, onChange }) {
  return (
    <>
      <label htmlFor={id} className="checkbox-cozinha-label">
      <input type="checkbox" id={id} onChange={onChange} />
        <img src={iconeCheck} alt="Ícone de completo" />
        {texto}
      </label>
    </>
  )
}

export default CheckboxCozinha;
