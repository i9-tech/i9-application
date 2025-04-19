import './CardPedido.css'

export function PedidoInfo({ numeroPedido, dataHora }) {
    return (
        <>
        <div className="pedidoInfo">
            <div>
                <h3>Pedido #{numeroPedido}</h3>
                <p>{dataHora}</p>
            </div>
            <button className="btn-info">i</button>
        </div>
        </>
    )
}

export default PedidoInfo