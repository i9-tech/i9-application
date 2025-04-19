import './PedidoInformacao.css'

export function PedidoCliente({ cliente, mesa, pagamento }) {
    return (
        <>
            <div className="pedidoCliente">
                <p>Cliente <span>{cliente}</span></p>
                <p>Mesa <span>{mesa}</span></p>
                <p>Pagamento <span>{pagamento}</span></p>
            </div>
        </>
    )
}

export default PedidoCliente