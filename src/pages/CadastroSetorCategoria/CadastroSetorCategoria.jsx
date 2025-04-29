import React, { useState, useEffect } from "react";
import Navbar from "../../components/Navbar/Navbar";
import "./CadastroSetorCategoria.css";
import LupaPesquisa from "../../assets/lupa-pesquisa.svg";
import api from "../../provider/api";
import { getFuncionario } from "../../utils/auth";
import ModalCadastroSetor from "../../components/Modais/ModalCadastroSetor/ModalCadastroSetor";
import ModalCadastroCategoria from "../../components/Modais/ModalCadastroCategoria/ModalCadastroCategoria";
import BaseModais from "../../components/Modais/BaseModais";

export function CadastroSetorCategoria() {
    const funcionario = getFuncionario();
    const [setores, setSetores] = useState([]);
    const [categorias, setCategorias] = useState([]);

    const [showModal, setShowModal] = useState(false);
    const [modalMensagem, setModalMensagem] = useState("");

    const [setorSelecionado, setSetorSelecionado] = useState(null);
    const [modalSetorOpen, setModalSetorOpen] = useState(false);

    const [categoriaSelecionado, setCategoriaSelecionada] = useState(null);
    const [modalCategoriaOpen, setModalCategoriaOpen] = useState(false);

    useEffect(() => {
        const fetchSetores = async () => {
            try {
                const response = await api.get(`/setores/${funcionario.userId}`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                });
                setSetores(response.data);
            } catch (error) {
                console.error("Erro ao buscar os setores:", error);
            }
        };

        fetchSetores();

        const fetchCategorias = async () => {
            try {
                const response = await api.get(`/categorias/${funcionario.userId}`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                });
                setCategorias(response.data);
            } catch (error) {
                console.error("Erro ao buscar as categorias:", error);
            }
        };

        fetchCategorias();
    }, []);

    const handleEditarSetor = (setor) => {
        setSetorSelecionado(setor);
        setModalSetorOpen(true);
    };

    const handleDeletarSetor = (setor) => {
        const confirmacao = window.confirm(`Tem certeza que deseja excluir o setor ${setor.nome}?`);

        if (!confirmacao) return;

        const token = localStorage.getItem("token");
        console.log(funcionario.empresaId);

        api
            .delete(`/setores/${setor.id}/${funcionario.userId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((response) => {
                console.log("Setor deletado com sucesso:", response.data);
                setShowModal(true);
                setModalMensagem("Setor deletado com sucesso!");
                setTimeout(() => window.location.reload(), 2000);
            })
            .catch((error) => {
                console.error("Erro ao deletar setor:", error);
            });
    };


    const handleEditarCategoria = (categoria) => {
        console.log("Editar categoria:", categoria);
        setCategoriaSelecionada(categoria);
        setModalCategoriaOpen(true);
    };

    const handleDeletarCategoria = (categoria) => {
        const confirmacao = window.confirm(`Tem certeza que deseja excluir a categoria ${categoria.nome}?`);

        if (!confirmacao) return;

        const token = localStorage.getItem("token");
        console.log(funcionario.empresaId);

        api
            .delete(`/categorias/${categoria.id}/${funcionario.userId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((response) => {
                console.log("Categoria deletado com sucesso:", response.data);
                setShowModal(true);
                setModalMensagem("Categoria deletada com sucesso!");
                setTimeout(() => window.location.reload(), 2000);

            })
            .catch((error) => {
                console.error("Erro ao deletar setor:", error);
            });
    };

    return (
        <>
            <Navbar />
            <div className="container-setor-categoria">

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
                        <button
                            className="botao-add-pesquisa"
                            onClick={() => setModalSetorOpen(true)}
                        >
                            Cadastrar Setor
                        </button>
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
                                        <button type="button" onClick={() => handleEditarSetor(setor)}>✏️</button>
                                        <span> | </span>
                                        <button type="button" onClick={() => handleDeletarSetor(setor)}>🗑️</button>
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
                        <button className="botao-add-pesquisa"
                            onClick={() => setModalCategoriaOpen(true)}>Cadastrar Categoria</button>
                    </div>

                    <table className="table">
                        <thead>
                            <tr>
                                <th>Nome da Categoria</th>
                                <th>Ações</th>
                            </tr>
                        </thead>
                        <tbody>
                            {categorias.map((categoria) => (
                                <tr key={categoria.id}>
                                    <td>{categoria.nome}</td>
                                    <td>
                                        <button type="button" onClick={() => handleEditarCategoria(categoria)}>✏️</button>
                                        <span> | </span>
                                        <button type="button" onClick={() => handleDeletarCategoria(categoria)}>🗑️</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {showModal && (
                    <BaseModais titulo="Sucesso!" >
                        {modalMensagem}
                    </BaseModais>
                )}
            </div>

            {modalSetorOpen && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <ModalCadastroSetor
                            onCancelar={() => {
                                setModalSetorOpen(false);
                                setSetorSelecionado(null);
                            }}
                            onSalvar={() => {
                                setModalSetorOpen(false);
                                setSetorSelecionado(null);
                            }}
                            setorSelecionado={setorSelecionado}
                        />
                    </div>
                </div>
            )}

            {modalCategoriaOpen && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <ModalCadastroCategoria
                            onCancelar={() => {
                                setModalCategoriaOpen(false);
                                setSetorSelecionado(null);
                            }}
                            onSalvar={() => {
                                setModalCategoriaOpen(false);
                                setSetorSelecionado(null);
                            }}
                            categoriaSelecionada={categoriaSelecionado}
                        />
                    </div>
                </div>
            )}


        </>
    );
}

export default CadastroSetorCategoria;
