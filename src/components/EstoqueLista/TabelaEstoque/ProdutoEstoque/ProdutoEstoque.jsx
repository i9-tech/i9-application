import React, { useEffect, useState } from "react";
import "./ProdutoEstoque.css";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../../../../provider/api";
import { enviroments } from "../../../../utils/enviroments";
import { ENDPOINTS } from "../../../../utils/endpoints";
import { getFuncionario } from "../../../../utils/auth";
import Swal from "sweetalert2";
import { imagemPadrao } from "../../../../assets/imagemPadrao";

const ProdutoEstoque = ({ produto, buscar }) => {
  const funcionario = getFuncionario();

  const navigate = useNavigate();
  const [dataFormatada, setDataFormatada] = useState("");
  const [valorCompraFormatado, setValorCompraFormatado] = useState("");
  const [valorUnitarioFormatado, setValorUnitarioFormatado] = useState("");
  const tokenImagem = enviroments.tokenURL;
  const [urlImagem, setUrlImagem] = useState("");


  useEffect(() => {
    formatarDados(produto)
  }, [])


  const formatarDados = (produto) => {

    // FORMATAÇÃO DATA
    const dataFormatada = new Date(produto.dataRegistro).toLocaleDateString("pt-BR")

    setDataFormatada(dataFormatada)

    // FORMATAÇÃO VALOR
    const CompraFormatado = Number(produto.valorCompra).toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL"
    });

    setValorCompraFormatado(CompraFormatado);

    const UnitarioFormatado = Number(produto.valorUnitario).toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL"
    });

    setValorUnitarioFormatado(UnitarioFormatado);

    if (produto.imagem) {
      if (enviroments.ambiente === "jsonserver") {
        setUrlImagem(produto.imagem);
      } else {
        setUrlImagem(produto.imagem + tokenImagem);
      }
    } else {
      setUrlImagem(null);
    }

  }

  const editar = (produto) => {
    navigate(`formulario-produtos/${produto.id}`);
  };

  const deletar = (id) => {
    Swal.fire({
      title: "Tem certeza?",
      text: "Deseja excluir este produto?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sim, excluir",
      cancelButtonText: "Cancelar",
      customClass: {
        confirmButton: 'btn-aceitar',
        cancelButton: 'btn-cancelar',
      },
      buttonsStyling: false,
    }).then((result) => {
      if (result.isConfirmed) {
        api
          .delete(
            `${ENDPOINTS.PRODUTOS}/${id}/${funcionario.userId}`,
            {
              headers: {
                Authorization: `Bearer ${funcionario.token}`
              }
            }
          )
          .then(() => {
            toast.success("Produto removido com sucesso!");
            buscar();
          })
          .catch((err) => {
            console.error("Erro ao remover produto:", err);
            toast.error("Erro ao remover produto!");
          });
      }
    });
  };

  return (
    <>
      <tr className="linha-produto-prod">
        <td>{produto.codigo}</td>
        <td>
          <div className="imagem-container-prod">
            <img src={urlImagem || imagemPadrao} alt={produto.nome} />
          </div>
        </td>
        <td>{produto.nome}</td>
        <td>{valorCompraFormatado}</td>
        <td>{valorUnitarioFormatado}</td>
        <td>
          <span
            data-tooltip-id="tooltip"
            data-tooltip-content={`Estoque máximo: ${produto.quantidadeMax}\nEstoque mínimo: ${produto.quantidadeMin}`}
            style={{ display: "inline-block", width: "100%", cursor: "pointer" }}
          >
            {produto.quantidade}
          </span>
        </td>
        <td>{dataFormatada}</td>
        <td title={produto.descricao}>{produto.descricao}</td>
        <td className="acoes-prod">
          <button onClick={() => editar(produto)}>✏️</button> |
          <button onClick={() => deletar(produto.id)}>🗑️</button>
        </td>
      </tr>
    </>
  );
};

export default ProdutoEstoque;
