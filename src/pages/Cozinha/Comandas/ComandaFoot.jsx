import './Comanda.css'
import CheckboxCozinha from '../Botoes/CheckboxComanda';

export function ComandaFoot({ qtdItens }) {
    return (
        <>
        <div className="comandaFoot">
            <p className="itensQtd">{qtdItens} Itens</p>
            <CheckboxCozinha texto={'Completo'} />
        </div>
        </>
    )
}

export default ComandaFoot