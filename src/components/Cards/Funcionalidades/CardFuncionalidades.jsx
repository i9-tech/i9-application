import './Funcionalidades.css'

export function CardFuncionalidade({ titulo, descricao }) {
    return (
        <>
        
        <div className="cardFuncionalidade">
            <h3>{titulo}</h3>
            <p>{descricao}</p>
        </div>

        </>
    )
}

export default CardFuncionalidade;
