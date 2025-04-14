import './DadosCabecalho.css';

export function DadosCabecalho(props) {
    return(
    <th className='item-cabecalho' scope='col'>{props.nomeCabecalho}</th>       
    )
}