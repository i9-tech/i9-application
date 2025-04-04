import './BotaoOpcaoHover.css'

export function BotaoOpcaoHover (props) {
    return (
        <>
            <button className="botao-opcao-hover" alt={`Botão ${props.texto}`}>
                {props.texto}
            </button>
        </>
    )
}
export default BotaoOpcaoHover