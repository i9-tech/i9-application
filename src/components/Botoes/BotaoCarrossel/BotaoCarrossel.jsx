import './BotaoCarrossel.css';

export function BotaoCarrossel(props) {
    return (
        <button className="botao-carrossel">
            <img src={props.iconeDirecao}  alt={`Seta para a ${props.iconeDirecao}`} />
        </button>
    );
}

export default BotaoCarrossel;
