import './CardPedido.css'
import CheckboxPedidoCozinha from '../../../Botoes/CheckboxPedidoCozinha/CheckboxPedidoCozinha';


export function PedidoItem({ titulo, descricao, observacao }) {
    return (
        <>
        <div className="item">
            <div className='imagem'></div>
            <div className="itemInfo">
                <h4>{titulo}</h4>
                <p>{descricao}</p>
                {observacao && <p className="observacao">Observação: <span>{observacao}</span></p>}
            </div>
            <CheckboxPedidoCozinha className="btn-check" />
        </div>
        </>
    )
}

export default PedidoItem