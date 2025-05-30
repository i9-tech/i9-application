import './CheckboxComanda.css';
import iconeCheck from '../../../assets/check.svg';

export function CheckboxComanda() {
    return (
        <>
            <input type="checkbox" id="checkbox-prato-completo" />
            <label htmlFor="checkbox-prato-completo" className="checkbox-cozinha-label2">
            <img src={iconeCheck} alt="Ícone de completo"/>
            </label>
        </>
    );
}

export default CheckboxComanda;
