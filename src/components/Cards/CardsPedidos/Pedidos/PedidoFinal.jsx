import './CardPedido.css'
import CheckboxCozinha from '../../../Botoes/CheckboxCozinha/CheckboxCozinha';

export function PedidoFinal({ qtdItens }) {
    return (
        <>
        <div className="pedidoFinal">
            <p className="itensQtd">{qtdItens} Itens</p>
            <CheckboxCozinha texto={'Completo'} />
        </div>
        </>
    )
}

export default PedidoFinal