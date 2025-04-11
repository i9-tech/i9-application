import CardSobreposto from '../../components/CardSobreposto/CardSobreposto';
import './Institucional.css';
import '../../index.css'
import Perguntas from '../../components/Perguntas/Perguntas';

export function Institucional() {
  return (
    <>
    <section className='institucional'>
      <CardSobreposto/>
    </section>
    <section className='institucional-perguntas'>
      <Perguntas/>
    </section>
    </>
  )
}