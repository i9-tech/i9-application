import { useNavigate } from 'react-router-dom';
import FormularioLogin from '../../components/FormularioLogin/FormularioLogin';
import './Login.css';
import { TbArrowBackUp } from 'react-icons/tb';

export function Login() {
  const navigate = useNavigate();
  return (
    <section className='login'>
    <span className='login-header'>
    <div className="botoes-log">
    <button onClick={() => navigate("/")}><TbArrowBackUp size={28} /> VOLTAR</button>
    </div>
    <div className='saudacoes'>
    <h1>i9 <br /> Boas Vindas </h1>
    <p>Entre em sua conta e tenha acesso a todas <br /> as funcionalidades</p>
    </div>
    </span>
    <FormularioLogin/>
    <span className='login-footer'>
    <p>Não possui uma conta? <hov>Contate-nos</hov></p>
    </span>
    </section>
    
  )
}