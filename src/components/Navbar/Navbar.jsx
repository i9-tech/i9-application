import './Navbar.css';
import { useEffect, useState } from 'react';
import { Options } from '../Options/Options';
import iconePerfil from '../../assets/user-icone-branco.svg';
import { getFuncionario } from '../../utils/auth';
import { Tooltip } from 'react-tooltip';


export function Navbar() {
    const funcionario = getFuncionario();
    const [isNavbarOpen, setIsNavbarOpen] = useState(false)

    useEffect(() => {
        const itensMenu = document.querySelectorAll('.navbar ul li');

        const handleClick = (event) => {
            itensMenu.forEach(i => i.classList.remove('clicked'));
            event.currentTarget.classList.add('clicked');
        };

        itensMenu.forEach(item => item.addEventListener('click', handleClick));

        return () => {
            itensMenu.forEach(item => item.removeEventListener('click', handleClick));
        };
    }, []);

    return (
        <>
        <nav className={`navbar ${isNavbarOpen ? 'aberta' : ''}`} id="navbar">
            <div className="user">
                <i><img src={iconePerfil} alt="Icone de Usuário" /></i>
                <span>{funcionario.nome}</span>
            </div>
            <ul>
                <Options isNavbarOpen={isNavbarOpen} setIsNavbarOpen={setIsNavbarOpen} />
            </ul>
        </nav>
        <Tooltip
        id="tooltip-navbar"
        place="right"
        style={{
          maxWidth: "200px",
          whiteSpace: "pre-line",
          wordBreak: "break-word",
          zIndex: 2,
        }}
      />
        </>
    );
}

export default Navbar;
