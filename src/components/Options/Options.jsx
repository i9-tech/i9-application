import { Link } from "react-router-dom";
import iconeAtendimento from '../../assets/atendimento-icone-colorido-escuro.svg';
import iconeDashboard from '../../assets/dashboard-icone-colorido-escuro.svg';
import iconeCozinha from '../../assets/cozinha-icone-colorido-escuro.svg';
import iconeEstoque from '../../assets/estoque-icone-colorido-escuro.svg';
import iconeEquipe from '../../assets/equipe-icone-colorido-escuro.svg';
import iconeSair from '../../assets/sair-icone-colorido-escuro.svg';

export function Options () {
    return(
        <>
        <Link to="/atendente">
        <li><i> <img src={iconeAtendimento} alt="Icone de Atendimento" /> </i> <span>Atendimento</span></li>
        </Link>
        <Link to="/">
        <li><i> <img src={iconeDashboard} alt="Icone de Dashboard" /> </i> <span>Dashboard</span></li>
        </Link>
        <Link to="/cozinha">
        <li><i> <img src={iconeCozinha} alt="Icone de Cozinha" /> </i> <span>Cozinha</span></li>
        </Link>
        <Link to="/estoque">
        <li><i> <img src={iconeEstoque} alt="Icone de Estoque" /> </i> <span>Estoque</span></li>
        </Link>
        <Link to="/funcionarios">
        <li><i> <img src={iconeEquipe} alt="Icone de Equipe" /> </i> <span>Equipe</span></li>
        </Link>
        <Link to="/institucional">
        <li><i> <img src={iconeSair} alt="Icone de Sair" /> </i> <span>Sair</span></li> 
        </Link> 
        </>
    )
}