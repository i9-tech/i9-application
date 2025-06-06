import React, { useState } from "react";
import "./CadastroSetoresCategorias.css";
import InfoCardSCCard from "../../components/SetorCategoria/InfoCardSC/InfoCardSC";
import DadosTabela from "../../components/SetorCategoria/DadosTabela/DadosTabela";
import FloatingAddButton from "../../components/SetorCategoria/FloatingAddButton/FloatingAddButton";
import LayoutTela from "../../components/LayoutTela/LayoutTela";
import Modal from "../../components/SetorCategoria/ModalSC/Modal";

const CadastroSetoresCategorias = () => {
  const [setores, setSetores] = useState([
    { nome: "Lanchonete", pratos: 10, produtos: 20 },
    { nome: "Lanchonete", pratos: 10, produtos: 20 },
    { nome: "Lanchonete", pratos: 10, produtos: 20 },
    { nome: "Lanchonete", pratos: 10, produtos: 20 },
    { nome: "Lanchonete", pratos: 10, produtos: 20 },
    { nome: "Lanchonete", pratos: 10, produtos: 20 },
    { nome: "Lanchonete", pratos: 10, produtos: 20 },
  ]);

  const [categorias, setCategorias] = useState([
    { nome: "Bebida", pratos: 10, produtos: 20 },
    { nome: "Lanchonete", pratos: 10, produtos: 20 },
    { nome: "Lanchonete", pratos: 10, produtos: 20 },
  ]);

  const [modalAberto, setModalAberto] = useState(false);
  const [tipoCadastro, setTipoCadastro] = useState(null);

  const handleEditarSetor = (item) => {
    console.log("Editar setor:", item);
  };

  const handleExcluirSetor = (item) => {
    console.log("Excluir setor:", item);
  };

  const handleEditarCategoria = (item) => {
    console.log("Editar categoria:", item);
  };

  const handleExcluirCategoria = (item) => {
    console.log("Excluir categoria:", item);
  };

  const handleCadastrarSetor = () => {
    setTipoCadastro("setor");
    setModalAberto(true);
  };

  const handleCadastrarCategoria = () => {
    setTipoCadastro("categoria");
    setModalAberto(true);
  };

  const fecharModal = () => {
    setModalAberto(false);
    setTipoCadastro(null);
  };

  return (
    <>
      <LayoutTela titulo="Cadastro de Setores e Categorias">
        <div className="pagina-container">
          <div className="cadastro-container">
            <InfoCardSCCard
              title="Setores"
              description="Visualize e gerencie os setores da empresa"
              placeholder="Buscar setor por nome ou status..."
            >
              <DadosTabela
                dados={setores}
                aoEditar={handleEditarSetor}
                aoExcluir={handleExcluirSetor}
              />
            </InfoCardSCCard>

            <InfoCardSCCard
              title="Categoria"
              description="Organize as categorias da empresa"
              placeholder="Buscar por nome ou status..."
            >
              <DadosTabela
                dados={categorias}
                aoEditar={handleEditarCategoria}
                aoExcluir={handleExcluirCategoria}
              />
            </InfoCardSCCard>
          </div>

          <FloatingAddButton
            onSetor={handleCadastrarSetor}
            onCategoria={handleCadastrarCategoria}
          />

          <Modal
            isOpen={modalAberto}
            onClose={fecharModal}
            tipo={tipoCadastro}
            onSalvar={(dados) => console.log("Dados salvos:", dados)}
          />
        </div>
      </LayoutTela>
    </>
  );
};

export default CadastroSetoresCategorias;
