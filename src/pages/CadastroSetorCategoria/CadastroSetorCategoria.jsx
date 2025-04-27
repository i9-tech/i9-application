import './CadastroSetorCategoria.css'
import Navbar from '../../components/Navbar/Navbar'
import LupaPesquisa from '../../assets/lupa-pesquisa.svg'

export function CadastroSetorCategoria() {
    const setores = [
        { id: 1, nome: "Cozinha" },
        { id: 2, nome: "Financeiro" },
        { id: 3, nome: "RH" },
        { id: 4, nome: "Comercial" }
    ];

    const categorias = [
        { id: 1, nome: "Bebidas" },
        { id: 2, nome: "Alimentos" },
        { id: 3, nome: "Utensílios" },
        { id: 4, nome: "Limpeza" }
    ];


    return (
        <>
            <Navbar />

            <div className='container-setor-categoria'>

                <div className="cadastro-setor">

                    <div className="container-pesquisa">
                        <div className="barra-pesquisa">
                            <input
                                type="text"
                                placeholder="Procurar Setor"
                                className="input-pesquisa-produtos"
                            />
                            <button className="lupa-pesquisa">
                                <img src={LupaPesquisa} alt="Pesquisar" />
                            </button>

                        </div>
                        <button className='botao-add-pesquisa'>Cadastrar Setor</button>
                    </div>

                    <table className="table">
                        <thead>
                            <tr>
                                <th>Nome do Setor</th>
                                <th>Ações</th>
                            </tr>
                        </thead>
                        <tbody>
                            {setores.map((setor) => (
                                <tr key={setor.id}>
                                    <td>{setor.nome}</td>
                                    <td>
                                        <button type="button">✏️</button>
                                        <span> | </span>
                                        <button type="button">🗑️</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                </div>

                <div className="cadastro-categoria">
                    <div className="container-pesquisa">
                        <div className="barra-pesquisa">
                            <input
                                type="text"
                                placeholder="Procurar Categoria"
                                className="input-pesquisa-produtos"
                            />
                            <button className="lupa-pesquisa">
                                <img src={LupaPesquisa} alt="Pesquisar" />
                            </button>

                        </div>
                        <button className='botao-add-pesquisa'>Cadastrar Categoria</button>
                    </div>

                    <table className="table">
                        <thead>
                            <tr>
                                <th>Nome do Setor</th>
                                <th>Ações</th>
                            </tr>
                        </thead>
                        <tbody>
                            {categorias.map((categoria) => (
                                <tr key={categoria.id}>
                                    <td>{categoria.nome}</td>
                                    <td>
                                        <button type="button">✏️</button>
                                        <span> | </span>
                                        <button type="button">🗑️</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                </div>

            </div>

        </>
    )
}