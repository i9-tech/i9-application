import React, { useState } from "react";
import CadastroFuncionarioFormulario from "../../components/Funcionario/FuncionarioForm/CadastroFuncionarioFormulario";
import TabelaFuncionarios from "../../components/Funcionario/FuncionarioTab/TabelaFuncionarios";
import Navbar from "../../components/Navbar/Navbar";
import "./Funcionarios.css";
import FuncionarioFoto from "../../components/Funcionario/FuncionarioFoto/FuncionarioFoto";

export function Funcionarios() {
  const [funcionarioSelecionado, setFuncionarioSelecionado] = useState(null);

  const [funcionarios, setFuncionarios] = useState([
    {
      id: 1,
      nome: "Patrícia",
      setores: ["Cozinha", "Estoque", "Atendimento"],
      dataAdmissao: "05/02/2022",
    },
    {
      id: 2,
      nome: "Roberta",
      setores: ["Cozinha"],
      dataAdmissao: "12/03/2021",
    },
    {
      id: 3,
      nome: "Julia",
      setores: ["Atendimento"],
      dataAdmissao: "01/08/2020",
    },
    {
      id: 4,
      nome: "Beto",
      setores: ["Estoque", "Atendimento"],
      dataAdmissao: "15/09/2019",
    },
    { id: 5, nome: "Wagner", setores: ["Estoque"], dataAdmissao: "10/10/2018" },
    {
      id: 6,
      nome: "Rosane",
      setores: ["Cozinha", "Atendimento"],
      dataAdmissao: "22/04/2022",
    },
    {
      id: 7,
      nome: "Isadora",
      setores: ["Cozinha"],
      dataAdmissao: "18/11/2023",
    },
    { id: 8, nome: "Felipe", setores: ["Estoque"], dataAdmissao: "20/01/2023" },
    {
      id: 9,
      nome: "Bruna",
      setores: ["Cozinha", "Atendimento"],
      dataAdmissao: "14/02/2023",
    },
    {
      id: 10,
      nome: "Carlos",
      setores: ["Atendimento"],
      dataAdmissao: "30/05/2022",
    },
    {
      id: 11,
      nome: "Mariana",
      setores: ["Cozinha"],
      dataAdmissao: "17/07/2022",
    },
    { id: 12, nome: "André", setores: ["Estoque"], dataAdmissao: "25/09/2022" },
    {
      id: 13,
      nome: "Luciana",
      setores: ["Atendimento", "Cozinha"],
      dataAdmissao: "03/12/2023",
    },
    { id: 14, nome: "Paulo", setores: ["Estoque"], dataAdmissao: "11/01/2024" },
  ]);

  const handleSelecionar = (funcionario) => {
    // console.log("Selecionou: ", funcionario);
    setFuncionarioSelecionado(funcionario);
  };

  const handleEditar = (funcionario) => {
    console.log("Editar", funcionario);
  };

  const handleDeletar = (id) => {
    const novaLista = funcionarios.filter((func) => func.id !== id);
    setFuncionarios(novaLista);
  };

  return (
    <>
      <Navbar />
      <div className="container-funcionario">
        <div className="coluna-esquerda">
          <CadastroFuncionarioFormulario />
        </div>

        <div className="coluna-meio">
          <FuncionarioFoto />
        </div>

        <div className="coluna-direita">
          <TabelaFuncionarios
            funcionarios={funcionarios}
            onEditar={handleEditar}
            onDeletar={handleDeletar}
            onSelecionar={handleSelecionar}
            funcionarioSelecionado={funcionarioSelecionado}
          />
        </div>
      </div>
    </>
  );
}

export default Funcionarios;
