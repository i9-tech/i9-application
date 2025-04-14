import './Estoque.css'

import {Listas, Cabecalho, Corpo } from '../../components/Listas/Listas';


export function Estoque() {
    return(
        <>
    <Listas/>

        </>
    );
}

// <section className="estoque-container">
//                 <table className="table-produtos">
//                     <thead>
//                         <Cabecalho tipoLista="Estoque" /> {/* Cabeçalho fixo */}
//                     </thead>
//                     <tbody>
//                         {/* Duplicando vários corpos */}
//                         <Corpo tipoLista="Estoque" />
//                         <Corpo tipoLista="Estoque" />
//                         <Corpo tipoLista="Estoque" />
//                     </tbody>
//                 </table>
//             </section>