import './BotaoOpcao.css'

export function BotaoOpcao (props) {
    return (
        <>
            <button className="botao-opcao" alt={`Botão ${props.texto}`}>
                {props.texto}
            </button>
        </>
    )
}
export default BotaoOpcao