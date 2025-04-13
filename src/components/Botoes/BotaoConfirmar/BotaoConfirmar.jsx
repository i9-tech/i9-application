import './BotaoConfirmar.css'

export function BotaoConfirmar (props) {
    return (
        <>
        <div className="botao-confirmar-pedido" onClick={props.onClick}>
                <div className="info-pedido">
                    <span id="qtd-itens">{props.quantidade} itens</span>
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