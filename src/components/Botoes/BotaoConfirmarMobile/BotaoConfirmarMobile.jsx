import './BotaoConfirmarMobile.css'

export function BotaoConfirmarMobile(props) {
    return (
        <>
            <div className="botao-confirmar-pedido-mobile" onClick={props.onClick}>
                <div className="info-pedido-mobile">
                    <span id="qtd-itens-mobile">{props.quantidade} itens</span>
                    <span id="valor-total-mobile">R$ {props.totalPedido.toLocaleString('pt-BR', {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2
                    })}</span>
                </div>
                <button className="button-confirmar-mobile">
                    {props.textoBotao || 'Confirmar'}
                </button>
            </div>
        </>
    )
}
export default BotaoConfirmarMobile