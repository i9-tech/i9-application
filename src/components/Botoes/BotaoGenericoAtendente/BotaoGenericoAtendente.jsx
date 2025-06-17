import './BotaoGenericoAtendente.css'

export function BotaoGenericoAtendente (props) {
    return (
        <>
         <button className="botao-generico-atendente" onClick={props.onClick} disabled={props.disabled} alt={`Botão ${props.texto}` }>
            {props.texto}
         </button>
        </>
    )
}
export default BotaoGenericoAtendente