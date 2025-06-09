import './Comanda.css'

export function ComandaHead({ numeroPedido, dataHora }) {
    return (
        <>
        <div className="comandaHead">
            <div>
                <h3>Pedido #{numeroPedido}</h3>
                <p>{dataHora}</p>
            </div>
            <button className="btn-info">i</button>
        </div>
        </>
    )
}

export default ComandaHead