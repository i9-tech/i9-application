import './Listas.css';
import { Tabela, Cabecalho, Corpo } from './Tabela/Tabela'; 

import { useState } from 'react';

export function Listas () {
    const [tipoLista] = useState('Estoque');

    // const mudarTipo = () => {
    //     setTipoLista(tipoLista === 'Estoque' ? 'Funcionario' : 'Estoque');
    // }
    
    return (
        <>
        <section className='secao4 secao'>
            {/* <BotaoMudar tipoLista={tipoLista} mudarTipo={mudarTipo}/> */}
            <Tabela tipoLista={tipoLista} />
        </section>
        </>
    )
}

export default Listas;
export { Cabecalho, Corpo }; 