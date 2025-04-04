import './BotaoConfirmar.css'

export function BotaoConfirmar () {
    return (
        <>
        <div className="botao-confirmar-pedido">
                <div className="info-pedido">
                    <span id="qtd-itens">0 itens</span>
                    <span id="valor-total">R$00,00</span>
                </div>
                <button className="button-confirmar">
                    Confirmar
                </button>
            </div>
        </>
    )
}
export default BotaoConfirmar