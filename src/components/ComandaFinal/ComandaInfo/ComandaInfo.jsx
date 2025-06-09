import React from 'react'

export default function ComandaInfo({cliente, mesa, pagamento}) {
    return (
        <>
            <div className="pedidoCliente">
                <p>Cliente <span>{cliente}</span></p>
                <p>Mesa <span>{mesa || "Não Informado"}</span></p>
                <p>Pagamento <span>{pagamento}</span></p>
            </div>
        </>
    )
}
