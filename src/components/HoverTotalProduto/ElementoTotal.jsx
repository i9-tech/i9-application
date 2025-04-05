import './ElementoTotal.css'
import ImagemProduto from '../../assets/lanche.png';

export function ElementoTotal(props) {
    return (
        <>
            <div className='elemento-total'>
                <article>
                    <div className="card-total">
                        <img className='lanche' src={ImagemProduto} alt="imagem" />
                        <span>Lanchonete 
                            <small>(12 itens)</small>
                        </span>
                    </div>
                </article>

            </div>
        </>
    )
}

export default ElementoTotal;