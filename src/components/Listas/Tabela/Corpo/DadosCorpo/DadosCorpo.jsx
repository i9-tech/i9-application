import './DadosCorpo.css';
import { BotoesCorpo } from '../BotoesCorpo/BotoesCorpo';
import { InfoCorpo } from '../InfoCorpo/InfoCorpo';
import { ImagemCorpo } from '../ImagemCorpo/ImagemCorpo';

export function DadosCorpo({tipoLista}) {
    return tipoLista === 'Estoque' ? (
        <>
        <InfoCorpo info='01123'/>
        <ImagemCorpo/>
        <InfoCorpo info='Arroz'/>
        <InfoCorpo info='12/07/2025'/>
        <InfoCorpo info='R$ 10,00'/>
        <InfoCorpo info='R$ 20,00'/>
        <InfoCorpo info='15'/>
        <InfoCorpo info='03/03/2025'/>
        <InfoCorpo info='Arroz Branco de Cozinha 5kg'/> 
        <BotoesCorpo/>
        </>
    ) : (
        <>  
            <InfoCorpo info='Guilherme'/>
            <InfoCorpo info='Estoque'/>
            <BotoesCorpo/>
        </>
    )
}