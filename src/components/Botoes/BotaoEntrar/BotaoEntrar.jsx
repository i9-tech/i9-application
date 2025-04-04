import './BotaoEntrar.css'

export function BotaoEntrar (props) {
    return (
        <>
         <button className="botao-institucional" alt="Botão Entrar">
            {props.texto}
         </button>
        </>
    )
}
export default BotaoEntrar