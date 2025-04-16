import CardSobreposto from '../../components/CardSobreposto/CardSobreposto';
import './Institucional.css';
import '../../index.css'
import Perguntas from '../../components/Perguntas/Perguntas';
import NavInstitucional from '../../components/NavInstitucional/NavInstitucional';

export function Institucional() {
  return (
    <>
    <NavInstitucional/>
    <section className='institucional' id='solucoes'>
      <CardSobreposto/>
    </section>
    <section className='institucional-perguntas' id='sobre'>
      <Perguntas/>
    </section>
    </>
  )
}