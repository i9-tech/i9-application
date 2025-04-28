import React from 'react'

export default function ComandaInfo({cliente, mesa, pagamento, index}) {
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
