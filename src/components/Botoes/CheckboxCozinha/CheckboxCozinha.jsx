import './CheckboxCozinha.css';
import iconeCheck from '../../../assets/check.svg';

export function CheckboxCozinha(props) {
    return (
        <>
            <input type="checkbox" id="checkbox-pedido-completo" />
            <label htmlFor="checkbox-pedido-completo" className="checkbox-cozinha-label">
            <img src={iconeCheck} alt="Ícone de completo"/>
                {props.texto}
            </label>
        </>
    );
}

export default CheckboxCozinha;
