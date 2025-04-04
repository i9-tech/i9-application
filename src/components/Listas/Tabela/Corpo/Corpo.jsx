import './corpo.css';
import { DadosCorpo } from './DadosCorpo/DadosCorpo';

export function Corpo({tipoLista}) {
    return (
        <>
        <tr className='lista-item'>
            <DadosCorpo tipoLista={tipoLista}/>
        </tr>
        <tr className='lista-item item2'>
            <DadosCorpo tipoLista={tipoLista}/>
        </tr>
        </>
    )
}