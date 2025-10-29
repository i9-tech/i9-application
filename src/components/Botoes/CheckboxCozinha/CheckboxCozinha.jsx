import './CheckboxCozinha.css';
import iconeCheck from '../../../assets/check.svg';

export function CheckboxCozinha({ id, texto, onClick, disabled, feito }) {
  return (
    <button
      id={id}
      type="button"
      className={`checkbox-cozinha-label ${feito ? 'feito' : ''}`}
      onClick={onClick}
      disabled={disabled}
      title={feito ? 'Não é possivel desfazer uma comanda já concluída!' : ''}
    >
      <img
        src={iconeCheck}
        alt="Ícone de completo"
        className={feito ? 'icone-feito' : ''}
      />
      {texto}
    </button>
  );
}

export default CheckboxCozinha;
