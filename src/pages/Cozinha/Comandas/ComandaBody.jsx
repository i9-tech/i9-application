import './Comanda.css'
import CheckboxComanda from '../Botoes/CheckboxComanda';


export function ComandaBody({ titulo, descricao, observacao }) {
    return (
        <>
        <div className="item">
            <div className='imagem'></div>
            <div className="itemInfo">
                <h4>{titulo}</h4>
                <p>{descricao}</p>
                {observacao && <p className="observacao">Observação: <span>{observacao}</span></p>}
            </div>
            <CheckboxComanda className="btn-check" />
        </div>
        </>
    )
}

export default ComandaBody