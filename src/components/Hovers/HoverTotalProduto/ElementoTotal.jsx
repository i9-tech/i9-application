import './ElementoTotal.css'
import ImagemProduto from '../../../assets/lanche.png';

export function ElementoTotal(props) {
    return (
        <>
            <button className="card-total"  onClick={props.onClick}>
                <img className='lanche' src={ImagemProduto} alt="imagem" />
                <span> {props.nome}
                    <small> <p>({props.quantidade} itens) </p>  </small>
                </span>
            </button>
        </>
    )
}

export default ElementoTotal;


