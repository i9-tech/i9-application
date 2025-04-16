import CardSobreposto from '../../components/CardSobreposto/CardSobreposto';
import './Institucional.css';
import '../../index.css'
import Perguntas from '../../components/Perguntas/Perguntas';
import NavInstitucional from '../../components/NavInstitucional/NavInstitucional';

export function Institucional() {
  return (
    <>
    <NavInstitucional/>
    <section className='institucional-home' id='inicio'>
    [TELA INICIAL]
    </section>
    <section className='institucional' id='solucoes'>
      <CardSobreposto/>
    </section>
    <section className='institucional-home' id='sobre'>
    [TELA SOBRE NÓS]
    </section>
    <section className='institucional-perguntas' id='sobre'>
      <Perguntas/>
    </section>
    <section className='institucional-home' id='contato'>
    [TELA CHAMADA DE AÇÃO E FOOTER]
    </section>
    </>
  )
}