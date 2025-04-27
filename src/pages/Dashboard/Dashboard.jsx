import Navbar from '../../components/Navbar/Navbar';
import './Dashboard.css';
import iconeDev from '../../assets/dev-icone.svg';

export function Dashboard() {
  return (
    <>
      <Navbar />
      <div className='dashboard'>
        <img style={{width: '100px'}} src={iconeDev} alt="Icone de desenvolvimento" />
        <h1 style={{fontSize: '2rem'}}>DASHBOARD EM DESENVOLVIMENTO</h1>
        Por favor selecione uma página na navbar
      </div>
    </>
  );
}
