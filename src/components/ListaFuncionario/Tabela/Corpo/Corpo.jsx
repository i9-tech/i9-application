import './corpo.css';
import { DadosCorpo } from './DadosCorpo/DadosCorpo';

export function Corpo({tipoLista}) {
    return (
        <>
        <tr className='lista-item'>
            <td> <DadosCorpo tipoLista={tipoLista}/></td>
        </tr>
        </>
    )
}

export default Corpo;