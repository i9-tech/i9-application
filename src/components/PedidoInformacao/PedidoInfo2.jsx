import './PedidoInformacao.css'
import { BotaoCarrossel } from '../../../Botoes/BotaoCarrossel/BotaoCarrossel'
import esquerda from '../../../../assets/seta-esquerda.svg'

export function PedidoInfo2({ numeroPedido, dataHora }) {
    return (
        <>
        <div className="pedidoInfo2">
            <div>
                <h3>Pedido #{numeroPedido}</h3>
                <p>{dataHora}</p>
            </div>
            <BotaoCarrossel iconeDirecao={esquerda}/>
        </div>
        </>
    )
}

export default PedidoInfo2