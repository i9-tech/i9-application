import './CheckboxCozinha.css';
import iconeCheck from '../../../assets/check.svg';

export function CheckboxCozinha({ id, texto, onClick, disabled }) {
  return (
    <button
      id={id}
      type="button"
      className="checkbox-cozinha-label"
      onClick={onClick}
      disabled={disabled}
    >
      <img
        src={iconeCheck}
        alt="Ícone de completo"
      />
      {texto}
    </button>
  );
}

export default CheckboxCozinha;
