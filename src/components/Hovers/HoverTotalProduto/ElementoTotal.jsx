import './ElementoTotal.css'
import { imagemPadrao } from '../../../assets/imagemPadrao';

export function ElementoTotal(props) {
    return (
        <>
            <button className="card-total"  onClick={props.onClick}>
            <img className="lanche" src={props.imagem ? props.imagem : imagemPadrao} alt="Imagem do Setor" />
                <span> {props.nome}
                    <small> <p>({props.quantidade} itens) </p>  </small>
                </span>
            </button>
        </>
    )
}

export default ElementoTotal;


