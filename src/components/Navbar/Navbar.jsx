import './Navbar.css';
import { useEffect } from 'react';
import { Options } from '../Options/Options';
import iconePerfil from '../../assets/user-icone-branco.svg';
import { getFuncionario } from '../../utils/auth';


export function Navbar() {
    const funcionario = getFuncionario();

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
        <nav className="navbar" id="navbar">
            <div className="user">
                <i><img src={iconePerfil} alt="Icone de Usuário" /></i>
                <span>{funcionario.nome}</span>
            </div>
            <ul>
                <Options />
            </ul>
        </nav>
        </>
    );
}

export default Navbar;
