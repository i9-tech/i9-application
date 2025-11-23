import './BotaoConfirmar.css'

export function BotaoConfirmar(props) {
    return (
        <>
            <div className="botao-confirmar-pedido" onClick={props.onClick}>
                <div className="info-pedido">
                    <span id="qtd-itens">{props.quantidade} itens</span>
                    <span id="valor-total">R$ {props.totalPedido.toLocaleString('pt-BR', {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2
                    })}</span>
                </div>
                <button className="button-confirmar">
                    {props.textoBotao || 'Confirmar'}
                </button>
            </div>
        </>
    )
}
export default BotaoConfirmar
