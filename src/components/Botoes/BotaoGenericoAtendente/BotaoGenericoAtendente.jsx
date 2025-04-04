import './BotaoGenericoAtendente.css'

export function BotaoGenericoAtendente (props) {
    return (
        <>
         <button className="botao-generico-atendente" alt={`Botão ${props.texto}`}>
            {props.texto}
         </button>
        </>
    )
}
export default BotaoGenericoAtendente