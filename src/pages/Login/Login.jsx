import { useNavigate } from 'react-router-dom';
import FormularioLogin from '../../components/FormularioLogin/FormularioLogin';
import './Login.css';

export function Login() {
  const navigate = useNavigate();
  return (
    <section className='login'>
    <span className='login-header'>
    <div className="botoes-log">
    <button onClick={() => navigate("/")}>X</button>
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