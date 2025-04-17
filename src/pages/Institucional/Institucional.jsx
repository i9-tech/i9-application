import CardSobreposto from '../../components/CardSobreposto/CardSobreposto';
import './Institucional.css';
import '../../index.css'
import Perguntas from '../../components/Perguntas/Perguntas';
import NavInstitucional from '../../components/NavInstitucional/NavInstitucional';
import CardsSobreNos from '../../components/CardsSobreNos/CardsSobreNos';
import DesktopInicio from '../../components/DesktopInicio/DesktopInicio';

export function Institucional() {
  return (
    <>
    {/* <NavInstitucional/> */}
    <section className='institucional-home' id='inicio'>
    <DesktopInicio/>
    </section>
    <section className='institucional' id='solucoes'>
      <CardSobreposto/>
    </section>
    <section className='institucional-sobre' id='sobre'>
    <CardsSobreNos/>
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