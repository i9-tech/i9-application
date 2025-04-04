import './cabecalho.css';
import { DadosCabecalho } from './DadosCabecalho/DadosCabecalho';

export function Cabecalho({tipoLista}) {
    return(
        <tr className='header'>
        {tipoLista === 'Estoque' ? (
            <>
            <DadosCabecalho nomeCabecalho='Código'/>
            <DadosCabecalho nomeCabecalho='Imagem'/>
            <DadosCabecalho nomeCabecalho='Nome'/>
            <DadosCabecalho nomeCabecalho='Validade'/>
            <DadosCabecalho nomeCabecalho='Compra'/>
            <DadosCabecalho nomeCabecalho='Venda'/>
            <DadosCabecalho nomeCabecalho='Estoque'/>
            <DadosCabecalho nomeCabecalho='Registro'/>
            <DadosCabecalho nomeCabecalho='Descrição'/>
            <DadosCabecalho nomeCabecalho='Ação'/>
            </>
        ) : (
            <>
            <DadosCabecalho nomeCabecalho='Nome'/>
            <DadosCabecalho nomeCabecalho='Setor'/>
            <DadosCabecalho nomeCabecalho='Ação'/>
            </>
        )}
        </tr>
    )
}