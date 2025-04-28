import './PedidoInformacao.css'
import { CheckboxCozinha } from '../../../Botoes/CheckboxCozinha/CheckboxCozinha'

export function PedidoFinal2({ qtdItens }) {
    return (
        <>
             <div className="pedidoFinal2">
                <p className="itensQtd">{qtdItens} Itens</p>
                <CheckboxCozinha texto={'Completo'} />
            </div>
        </>
    )
}

export default PedidoFinal2