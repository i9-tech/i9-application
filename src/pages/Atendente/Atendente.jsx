import "./Atendente.css";
import BotaoConfirmar from "../../components/Botoes/BotaoConfirmar/BotaoConfirmar";
import ElementoTotal from "../../components/Hovers/HoverTotalProduto/ElementoTotal";
import LupaPesquisa from "../../assets/lupa-pesquisa.svg";
import ElementoProduto from "../../components/Hovers/HoverProduto/ElementoProduto";
import { useState, useEffect } from "react";
import ModalObservacoes from "../../components/Botoes/ModalObservacoes/ModalObservacoes";
import ProdutoComanda from "../../components/Botoes/ProdutoComanda/ProdutoComanda";
import ModalConfirmarPedido from "../../components/Botoes/ModalConfirmarPedido/ModalConfirmarPedido";
import Navbar from "../../components/Navbar/Navbar";

export function Atendente(props) {
  const [produtos, setProdutos] = useState([]);
  const [setores, setSetores] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [setorSelecionado, setSetorSelecionado] = useState("Todos");

  const [buscaProduto, setBuscaProduto] = useState("");

  const [comanda, setComanda] = useState([]);

  const [quantidades, setQuantidades] = useState({});
  const [produtoSelecionado, setProdutoSelecionado] = useState(null);
  const [quantidadeSelecionada, setQuantidadeSelecionada] = useState(0);


  const [modalAberto, setModalAberto] = useState(false);
  const [confirmarPedido, setConfirmarPedido] = useState(false);

  useEffect(() => {
    const dadosProdutos = [
      {
        id: 1,
        codigo: 1001,
        nome: "Pastel de Frango Com Catupiry",
        quantidade: 10,
        dataVencimento: "2025-12-31",
        valorCompra: 5.0,
        valorUnitario: 9.0,
        quantidadeMin: 2,
        quantidadeMax: 50,
        descricao: "Pastel de Frango recheado com Catupiry, feito com amor e carinho, utilizando a melhor qualidade de ingredientes...",
        categoria: "Salgados",
        setor: "Pastelaria",
        dataRegistro: "2024-04-25",
        funcionario: { id: 1, nome: "Yasmim" },
        preco: 9.0,
        disabled: false,
      },
      {
        id: 2,
        codigo: 1002,
        nome: "Pastel de Frango",
        quantidade: 10,
        dataVencimento: "2025-12-31",
        valorCompra: 4.5,
        valorUnitario: 9.0,
        quantidadeMin: 2,
        quantidadeMax: 50,
        descricao: "Pastel de Frango de casa, feito com amor e carinho, utilizando a melhor qualidade de ingredientes...",
        categoria: "Salgados",
        setor: "Pastelaria",
        dataRegistro: "2024-04-25",
        funcionario: { id: 1, nome: "Yasmim" },
        preco: 9.0,
        disabled: false,
      },
      {
        id: 3,
        codigo: 1003,
        nome: "Pastel de Chocolate",
        quantidade: 10,
        dataVencimento: "2025-12-31",
        valorCompra: 5.5,
        valorUnitario: 11.0,
        quantidadeMin: 2,
        quantidadeMax: 50,
        descricao: "Pastel de Chocolate recheado com chocolate, feito com amor e carinho, utilizando a melhor qualidade de ingredientes...",
        categoria: "Doces",
        setor: "Pastelaria",
        dataRegistro: "2024-04-25",
        funcionario: { id: 1, nome: "Yasmim" },
        preco: 11.0,
        disabled: true,
      },
      {
        id: 4,
        codigo: 1004,
        nome: "Pastel de Morango",
        quantidade: 10,
        dataVencimento: "2025-12-31",
        valorCompra: 6.0,
        valorUnitario: 12.0,
        quantidadeMin: 2,
        quantidadeMax: 50,
        descricao: "Pastel de Morango recheado com morango, feito com amor e carinho, utilizando a melhor qualidade de ingredientes...",
        categoria: "Doces",
        setor: "Pastelaria",
        dataRegistro: "2024-04-25",
        funcionario: { id: 1, nome: "Yasmim" },
        preco: 12.0,
        disabled: true,
      },
      {
        id: 5,
        codigo: 1005,
        nome: "Pastel de Creme",
        quantidade: 10,
        dataVencimento: "2025-12-31",
        valorCompra: 5.0,
        valorUnitario: 10.0,
        quantidadeMin: 2,
        quantidadeMax: 50,
        descricao: "Pastel de Creme recheado com creme, feito com amor e carinho, utilizando a melhor qualidade de ingredientes...",
        categoria: "Doces",
        setor: "Pastelaria",
        dataRegistro: "2024-04-25",
        funcionario: { id: 1, nome: "Yasmim" },
        preco: 10.0,
        disabled: true,
      },
      {
        id: 6,
        codigo: 1006,
        nome: "Pastel de Carne",
        quantidade: 10,
        dataVencimento: "2025-12-31",
        valorCompra: 5.5,
        valorUnitario: 11.0,
        quantidadeMin: 2,
        quantidadeMax: 50,
        descricao: "Pastel de Carne recheado com carne, feito com amor e carinho, utilizando a melhor qualidade de ingredientes...",
        categoria: "Salgados",
        setor: "Pastelaria",
        dataRegistro: "2024-04-25",
        funcionario: { id: 1, nome: "Yasmim" },
        preco: 11.0,
        disabled: false,
      },
      {
        id: 7,
        codigo: 1007,
        nome: "Pastel de Pizza",
        quantidade: 10,
        dataVencimento: "2025-12-31",
        valorCompra: 6.0,
        valorUnitario: 12.0,
        quantidadeMin: 2,
        quantidadeMax: 50,
        descricao: "Pastel de Pizza recheado com frango, feito com amor e carinho, utilizando a melhor qualidade de ingredientes...",
        categoria: "Salgados",
        setor: "Pastelaria",
        dataRegistro: "2024-04-25",
        funcionario: { id: 1, nome: "Yasmim" },
        preco: 12.0,
        disabled: false,
      },
      {
        id: 8,
        codigo: 1008,
        nome: "Pastel de Queijo",
        quantidade: 10,
        dataVencimento: "2025-12-31",
        valorCompra: 6.5,
        valorUnitario: 13.0,
        quantidadeMin: 2,
        quantidadeMax: 50,
        descricao: "Pastel de Queijo recheado com queijo, feito com amor e carinho, utilizando a melhor qualidade de ingredientes...",
        categoria: "Salgados",
        setor: "Pastelaria",
        dataRegistro: "2024-04-25",
        funcionario: { id: 1, nome: "Yasmim" },
        preco: 13.0,
        disabled: false,
      },
      {
        id: 9,
        codigo: 1009,
        nome: "Pastel de Peixe",
        quantidade: 10,
        dataVencimento: "2025-12-31",
        valorCompra: 7.0,
        valorUnitario: 14.0,
        quantidadeMin: 2,
        quantidadeMax: 50,
        descricao: "Pastel de Peixe recheado com peixe, feito com amor e carinho, utilizando a melhor qualidade de ingredientes...",
        categoria: "Salgados",
        setor: "Pastelaria",
        dataRegistro: "2024-04-25",
        funcionario: { id: 1, nome: "Yasmim" },
        preco: 14.0,
        disabled: false,
      },
      {
        id: 11,
        codigo: 1011,
        nome: "Pastel de Camarão",
        quantidade: 10,
        dataVencimento: "2025-12-31",
        valorCompra: 7.5,
        valorUnitario: 15.0,
        quantidadeMin: 2,
        quantidadeMax: 50,
        descricao: "Pastel de Camarão recheado com camar o, feito com amor e carinho, utilizando a melhor qualidade de ingredientes...",
        categoria: "Salgados",
        setor: "Pastelaria",
        dataRegistro: "2024-04-25",
        funcionario: { id: 1, nome: "Yasmim" },
        preco: 15.0,
        disabled: false,
      },
      {
        id: 12,
        codigo: 1012,
        nome: "Feijoada",
        quantidade: 7,
        dataVencimento: "2025-12-31",
        valorCompra: 15.0,
        valorUnitario: 25.0,
        quantidadeMin: 1,
        quantidadeMax: 15,
        descricao: "Feijoada caseira com arroz e farofa, feita com amor e carinho, utilizando a melhor qualidade de ingredientes...",
        categoria: "Pratos Feitos",
        setor: "Restaurante",
        dataRegistro: "2024-04-25",
        funcionario: { id: 6, nome: "Marcos" },
        preco: 25.0,
        disabled: false,
      },
      {
        id: 13,
        codigo: 1013,
        nome: "Arroz, Feijão e Bisteca",
        quantidade: 10,
        dataVencimento: "2025-12-31",
        valorCompra: 14.0,
        valorUnitario: 22.0,
        quantidadeMin: 2,
        quantidadeMax: 20,
        descricao: "Prato feito com arroz soltinho, feijão bem temperado e bisteca suína grelhada.",
        categoria: "Pratos Feitos",
        setor: "Restaurante",
        dataRegistro: "2024-04-25",
        funcionario: { id: 3, nome: "Ana" },
        preco: 22.0,
        disabled: false,
      },
      {
        id: 14,
        codigo: 1014,
        nome: "Arroz, Feijão e Frango Grelhado",
        quantidade: 12,
        dataVencimento: "2025-12-31",
        valorCompra: 13.0,
        valorUnitario: 21.0,
        quantidadeMin: 3,
        quantidadeMax: 30,
        descricao: "Tradicional prato brasileiro com arroz, feijão e filé de frango grelhado.",
        categoria: "Pratos Feitos",
        setor: "Restaurante",
        dataRegistro: "2024-04-25",
        funcionario: { id: 7, nome: "Joana" },
        preco: 21.0,
        disabled: false,
      },
      {
        id: 15,
        codigo: 1015,
        nome: "Arroz, Feijão e Linguiça",
        quantidade: 9,
        dataVencimento: "2025-12-31",
        valorCompra: 12.0,
        valorUnitario: 19.0,
        quantidadeMin: 2,
        quantidadeMax: 25,
        descricao: "Arroz e feijão com linguiça calabresa acebolada e salada do dia.",
        categoria: "Pratos Feitos",
        setor: "Restaurante",
        dataRegistro: "2024-04-25",
        funcionario: { id: 4, nome: "Bruno" },
        preco: 19.0,
        disabled: false,
      },
      {
        id: 16,
        codigo: 1016,
        nome: "Arroz, Feijão e Ovo Frito",
        quantidade: 14,
        dataVencimento: "2025-12-31",
        valorCompra: 10.0,
        valorUnitario: 17.0,
        quantidadeMin: 3,
        quantidadeMax: 30,
        descricao: "Prato simples e saboroso com arroz, feijão e dois ovos fritos com gema mole.",
        categoria: "Pratos Feitos",
        setor: "Restaurante",
        dataRegistro: "2024-04-25",
        funcionario: { id: 2, nome: "Carlos" },
        preco: 17.0,
        disabled: false,
      },
      {
        id: 17,
        codigo: 1017,
        nome: "Arroz, Feijão e Carne Moída",
        quantidade: 11,
        dataVencimento: "2025-12-31",
        valorCompra: 13.0,
        valorUnitario: 20.0,
        quantidadeMin: 2,
        quantidadeMax: 25,
        descricao: "Prato tradicional com arroz branco, feijão preto e carne moída refogada.",
        categoria: "Pratos Feitos",
        setor: "Restaurante",
        dataRegistro: "2024-04-25",
        funcionario: { id: 9, nome: "Fernanda" },
        preco: 20.0,
        disabled: false,
      },
      {
        id: 18,
        codigo: 1018,
        nome: "Arroz, Feijão e Costela Bovina",
        quantidade: 8,
        dataVencimento: "2025-12-31",
        valorCompra: 17.0,
        valorUnitario: 28.0,
        quantidadeMin: 1,
        quantidadeMax: 20,
        descricao: "Costela bovina assada lentamente, servida com arroz, feijão e couve refogada.",
        categoria: "Pratos Feitos",
        setor: "Restaurante",
        dataRegistro: "2024-04-25",
        funcionario: { id: 5, nome: "Laura" },
        preco: 28.0,
        disabled: false,
      },
      {
        id: 19,
        codigo: 1019,
        nome: "Arroz, Feijão e Filé de Peixe",
        quantidade: 10,
        dataVencimento: "2025-12-31",
        valorCompra: 16.0,
        valorUnitario: 26.0,
        quantidadeMin: 2,
        quantidadeMax: 25,
        descricao: "Filé de peixe empanado, acompanhado de arroz, feijão e salada.",
        categoria: "Pratos Feitos",
        setor: "Restaurante",
        dataRegistro: "2024-04-25",
        funcionario: { id: 8, nome: "Ricardo" },
        preco: 26.0,
        disabled: false,
      },
      {
        id: 20,
        codigo: 1020,
        nome: "Bolinho de Bacalhau",
        quantidade: 15,
        dataVencimento: "2025-12-31",
        valorCompra: 6.0,
        valorUnitario: 12.0,
        quantidadeMin: 3,
        quantidadeMax: 40,
        descricao: "Bolinho de Bacalhau fresco, feito com amor e carinho, utilizando a melhor qualidade de ingredientes...",
        categoria: "Salgados",
        setor: "Lanchonete",
        dataRegistro: "2024-04-25",
        funcionario: { id: 2, nome: "Carlos" },
        preco: 12.0,
        disabled: false,
      },
      {
        id: 21,
        codigo: 1021,
        nome: "X-Calabresa Artesanal",
        quantidade: 8,
        dataVencimento: "2025-12-31",
        valorCompra: 12.0,
        valorUnitario: 20.0,
        quantidadeMin: 1,
        quantidadeMax: 20,
        descricao: "X-Calabresa Artesanal com queijo, feita com amor e carinho, utilizando a melhor qualidade de ingredientes...",
        categoria: "Lanches Artesanais",
        setor: "Lanchonete",
        dataRegistro: "2024-04-25",
        funcionario: { id: 3, nome: "Ana" },
        preco: 20.0,
        disabled: false,
      },
      {
        id: 22,
        codigo: 1022,
        nome: "Lanche Natural",
        quantidade: 12,
        dataVencimento: "2025-12-31",
        valorCompra: 8.0,
        valorUnitario: 15.0,
        quantidadeMin: 2,
        quantidadeMax: 30,
        descricao: "Lanche Natural com queijo, feito com amor e carinho, utilizando a melhor qualidade de ingredientes...",
        categoria: "Lanches Artesanais",
        setor: "Lanchonete",
        dataRegistro: "2024-04-25",
        funcionario: { id: 4, nome: "Bruno" },
        preco: 15.0,
        disabled: true,
      },
      {
        id: 23,
        codigo: 1023,
        nome: "Salada de Frutas",
        quantidade: 10,
        dataVencimento: "2025-12-31",
        valorCompra: 6.0,
        valorUnitario: 10.0,
        quantidadeMin: 2,
        quantidadeMax: 30,
        descricao: "Salada de Frutas frescas, feito com amor e carinho, utilizando a melhor qualidade de ingredientes...",
        categoria: "Saladas",
        setor: "Restaurante",
        dataRegistro: "2024-04-25",
        funcionario: { id: 5, nome: "Laura" },
        preco: 10.0,
        disabled: false,
      },
      {
        id: 23,
        codigo: 1023,
        nome: "Salada de Frutas",
        quantidade: 10,
        dataVencimento: "2025-12-31",
        valorCompra: 6.0,
        valorUnitario: 10.0,
        quantidadeMin: 2,
        quantidadeMax: 30,
        descricao: "Salada de Frutas frescas, feito com amor e carinho, utilizando a melhor qualidade de ingredientes...",
        categoria: "Saladas",
        setor: "Restaurante",
        dataRegistro: "2024-04-25",
        funcionario: { id: 5, nome: "Laura" },
        preco: 10.0,
        disabled: false,
      },
      {
        id: 24,
        codigo: 1028,
        nome: "Salada de Maionese",
        quantidade: 15,
        dataVencimento: "2025-11-15",
        valorCompra: 7.0,
        valorUnitario: 12.0,
        quantidadeMin: 3,
        quantidadeMax: 40,
        descricao: "Salada de Maionese da casa, preparada com ingredientes frescos, alface crocante, croutons dourados e queijo parmesão ralado na hora.",
        categoria: "Saladas",
        setor: "Restaurante",
        dataRegistro: "2024-05-01",
        funcionario: { id: 6, nome: "Carlos" },
        preco: 12.0,
        disabled: false,
      },
      {
        id: 28,
        codigo: 1028,
        nome: "Salada Caesar",
        quantidade: 15,
        dataVencimento: "2025-11-15",
        valorCompra: 7.0,
        valorUnitario: 12.0,
        quantidadeMin: 3,
        quantidadeMax: 40,
        descricao: "Salada Caesar clássica com alface, croutons e queijo parmesão.",
        categoria: "Saladas",
        setor: "Restaurante",
        dataRegistro: "2024-05-01",
        funcionario: { id: 6, nome: "Carlos" },
        preco: 12.0,
        disabled: false,
      },
      {
        id: 29,
        codigo: 1029,
        nome: "Salada Grega",
        quantidade: 20,
        dataVencimento: "2025-10-20",
        valorCompra: 5.0,
        valorUnitario: 9.0,
        quantidadeMin: 5,
        quantidadeMax: 50,
        descricao: "Salada Grega com tomate, pepino, cebola, azeitonas e queijo feta.",
        categoria: "Saladas",
        setor: "Restaurante",
        dataRegistro: "2024-05-02",
        funcionario: { id: 7, nome: "Ana" },
        preco: 9.0,
        disabled: false,
      },
      {
        id: 30,
        codigo: 1030,
        nome: "Salada Caprese",
        quantidade: 12,
        dataVencimento: "2025-09-10",
        valorCompra: 6.5,
        valorUnitario: 11.5,
        quantidadeMin: 4,
        quantidadeMax: 35,
        descricao: "Salada Caprese com tomate, mussarela de búfala e manjericão fresco.",
        categoria: "Saladas",
        setor: "Restaurante",
        dataRegistro: "2024-05-03",
        funcionario: { id: 8, nome: "Mariana" },
        preco: 11.5,
        disabled: false,
      },
      {
        id: 24,
        codigo: 1024,
        nome: "Coxinha de Frango",
        quantidade: 25,
        dataVencimento: "2025-12-31",
        valorCompra: 4.0,
        valorUnitario: 8.0,
        quantidadeMin: 5,
        quantidadeMax: 100,
        descricao: "Coxinha de Frango com Catupiry,  feito com amor e carinho, utilizando a melhor qualidade de ingredientes...",
        categoria: "Salgados",
        setor: "Lanchonete",
        dataRegistro: "2024-04-25",
        funcionario: { id: 7, nome: "Joana" },
        preco: 8.0,
        disabled: false,
      },
      {
        id: 25,
        codigo: 1025,
        nome: "Pao de Queijo",
        quantidade: 30,
        dataVencimento: "2025-12-31",
        valorCompra: 3.0,
        valorUnitario: 5.0,
        quantidadeMin: 5,
        quantidadeMax: 100,
        descricao: "Pao de Queijo fresco, feito com amor e carinho, utilizando a melhor qualidade de ingredientes...",
        categoria: "Salgados",
        setor: "Lanchonete",
        dataRegistro: "2024-04-25",
        funcionario: { id: 1, nome: "Yasmim" },
        preco: 5.0,
        disabled: false,
      },
      {
        id: 26,
        codigo: 1026,
        nome: "Cafe",
        quantidade: 15,
        dataVencimento: "2025-12-31",
        valorCompra: 6.0,
        valorUnitario: 10.0,
        quantidadeMin: 3,
        quantidadeMax: 50,
        descricao: "Cafe caseiro com leite, feito com amor e carinho, utilizando a melhor qualidade de ingredientes...",
        categoria: "Bebidas",
        setor: "Lanchonete",
        dataRegistro: "2024-04-25",
        funcionario: { id: 8, nome: "Ricardo" },
        preco: 10.0,
        disabled: false,
      },
      {
        id: 30,
        codigo: 1030,
        nome: "Hambúrguer Artesanal",
        quantidade: 15,
        dataVencimento: "2025-12-31",
        valorCompra: 10.0,
        valorUnitario: 18.0,
        quantidadeMin: 3,
        quantidadeMax: 30,
        descricao: "Hambúrguer artesanal com pão brioche, carne 150g, queijo, alface, tomate e molho da casa.",
        categoria: "Salgados",
        setor: "Lanchonete",
        dataRegistro: "2024-04-25",
        funcionario: { id: 3, nome: "Ana" },
        preco: 18.0,
        disabled: false,
      },
      {
        id: 31,
        codigo: 1031,
        nome: "Tortinha de Frango",
        quantidade: 20,
        dataVencimento: "2025-12-31",
        valorCompra: 5.0,
        valorUnitario: 9.0,
        quantidadeMin: 2,
        quantidadeMax: 40,
        descricao: "Tortinha assada de frango com requeijão e massa leve e crocante.",
        categoria: "Salgados",
        setor: "Lanchonete",
        dataRegistro: "2024-04-25",
        funcionario: { id: 7, nome: "Joana" },
        preco: 9.0,
        disabled: false,
      },
      {
        id: 32,
        codigo: 1032,
        nome: "Pão com Mortadela",
        quantidade: 18,
        dataVencimento: "2025-12-31",
        valorCompra: 3.5,
        valorUnitario: 6.0,
        quantidadeMin: 2,
        quantidadeMax: 30,
        descricao: "Pão francês recheado com generosas fatias de mortadela e toque de mostarda.",
        categoria: "Lanches Artesanais",
        setor: "Lanchonete",
        dataRegistro: "2024-04-25",
        funcionario: { id: 5, nome: "Laura" },
        preco: 6.0,
        disabled: false,
      },
      {
        id: 33,
        codigo: 1033,
        nome: "Batata Frita",
        quantidade: 25,
        dataVencimento: "2025-12-31",
        valorCompra: 4.0,
        valorUnitario: 8.0,
        quantidadeMin: 3,
        quantidadeMax: 50,
        descricao: "Porção de batata frita crocante, temperada na hora.",
        categoria: "Salgados",
        setor: "Lanchonete",
        dataRegistro: "2024-04-25",
        funcionario: { id: 6, nome: "Marcos" },
        preco: 8.0,
        disabled: false,
      },
      {
        id: 34,
        codigo: 1034,
        nome: "Misto Quente",
        quantidade: 14,
        dataVencimento: "2025-12-31",
        valorCompra: 4.0,
        valorUnitario: 7.0,
        quantidadeMin: 2,
        quantidadeMax: 25,
        descricao: "Sanduíche quente de presunto e queijo no pão de forma, grelhado na chapa.",
        categoria: "Lanches Artesanais",
        setor: "Lanchonete",
        dataRegistro: "2024-04-25",
        funcionario: { id: 1, nome: "Yasmim" },
        preco: 7.0,
        disabled: false,
      },
      {
        id: 35,
        codigo: 1035,
        nome: "Tortinha de Limão",
        quantidade: 10,
        dataVencimento: "2025-12-31",
        valorCompra: 6.0,
        valorUnitario: 10.0,
        quantidadeMin: 1,
        quantidadeMax: 20,
        descricao: "Tortinha doce com recheio cremoso de limão e cobertura de merengue.",
        categoria: "Doces",
        setor: "Lanchonete",
        dataRegistro: "2024-04-25",
        funcionario: { id: 4, nome: "Bruno" },
        preco: 10.0,
        disabled: false,
      },
      {
        id: 35,
        codigo: 1035,
        nome: "Coxinha de Chocolate",
        quantidade: 10,
        dataVencimento: "2025-12-31",
        valorCompra: 6.0,
        valorUnitario: 10.0,
        quantidadeMin: 1,
        quantidadeMax: 20,
        descricao: "Coxinha de Chocolate com recheio cremoso e cobertura de merengue.",
        categoria: "Doces",
        setor: "Lanchonete",
        dataRegistro: "2024-04-25",
        funcionario: { id: 4, nome: "Bruno" },
        preco: 10.0,
        disabled: false,
      },
      {
        id: 36,
        codigo: 1036,
        nome: "Cachorro-Quente",
        quantidade: 16,
        dataVencimento: "2025-12-31",
        valorCompra: 5.0,
        valorUnitario: 9.0,
        quantidadeMin: 2,
        quantidadeMax: 30,
        descricao: "Pão macio recheado com salsicha, molho de tomate caseiro e batata palha.",
        categoria: "Lanches Artesanais",
        setor: "Lanchonete",
        dataRegistro: "2024-04-25",
        funcionario: { id: 2, nome: "Carlos" },
        preco: 9.0,
        disabled: false,
      },
      {
        id: 37,
        codigo: 1037,
        nome: "Croissant de Chocolate",
        quantidade: 12,
        dataVencimento: "2025-12-31",
        valorCompra: 6.0,
        valorUnitario: 11.0,
        quantidadeMin: 2,
        quantidadeMax: 25,
        descricao: "Croissant macio recheado com chocolate meio amargo, perfeito para o lanche.",
        categoria: "Doces",
        setor: "Lanchonete",
        dataRegistro: "2024-04-25",
        funcionario: { id: 8, nome: "Ricardo" },
        preco: 11.0,
        disabled: false,
      },
      {
        id: 38,
        codigo: 1036,
        nome: "Risole Artesanal",
        quantidade: 16,
        dataVencimento: "2025-12-31",
        valorCompra: 5.0,
        valorUnitario: 9.0,
        quantidadeMin: 2,
        quantidadeMax: 30,
        descricao: "Risole com salsicha, molho de tomate caseiro.",
        categoria: "Lanches Artesanais",
        setor: "Lanchonete",
        dataRegistro: "2024-04-25",
        funcionario: { id: 2, nome: "Carlos" },
        preco: 9.0,
        disabled: false,
      },
      {
        id: 39,
        codigo: 1036,
        nome: "Coca-Cola",
        quantidade: 16,
        dataVencimento: "2025-12-31",
        valorCompra: 5.0,
        valorUnitario: 9.0,
        quantidadeMin: 2,
        quantidadeMax: 30,
        descricao: "Bebida carbonatada, sabor cola.",
        categoria: "Bebidas",
        setor: "Lanchonete",
        dataRegistro: "2024-04-25",
        funcionario: { id: 2, nome: "Carlos" },
        preco: 9.0,
        disabled: false,
      },
    ];

    const dadosSetores = [
      { id: 2, nome: "Restaurante", empresa: { id: 1, nome: "Minha Empresa" } },
      { id: 3, nome: "Pastelaria", empresa: { id: 1, nome: "Minha Empresa" } },
      { id: 4, nome: "Lanchonete", empresa: { id: 1, nome: "Minha Empresa" } },
      { id: 5, nome: "Mercado", empresa: { id: 1, nome: "Minha Empresa" } },
    ];

    const categorias = [
      { id: 1, nome: "Pasteis Doces" },
      { id: 2, nome: "Doces" },
      { id: 3, nome: "Salgados" },
      { id: 4, nome: "Lanches" },
      { id: 5, nome: "Bebidas" },
      { id: 6, nome: "Pratos Feitos" },
      { id: 7, nome: "Saladas" },
      { id: 8, nome: "Lanches Artesanais" },
    ];
    setProdutos(dadosProdutos);
    setSetores(dadosSetores);
    setCategorias(categorias);
  }, []);

  const adicionarNaComanda = (produto) => {
    setComanda((prev) => {
      const index = prev.findIndex((item) => item.nome === produto.nome);

      if (index !== -1) {
        const novaComanda = [...prev];
        const produtoAtual = novaComanda[index];

        const novaQuantidade = (produtoAtual.quantidade || 1) + 1;

        novaComanda[index] = {
          ...produtoAtual,
          quantidade: novaQuantidade,
          precoTotal: produtoAtual.preco * novaQuantidade,
        };

        return novaComanda;
      }

      return [
        ...prev,
        { ...produto, quantidade: 1, precoTotal: produto.preco },
      ];
    });
  };

  function atualizarQuantidade(produto, quantidade) {
    const qtd = Number(quantidade) || 0;

    setQuantidades((prev) => ({
      ...prev,
      [produto]: qtd,
    }));

    setComanda((prev) => {
      const index = prev.findIndex((item) => item.nome === produto);
      if (index !== -1) {
        const novaComanda = [...prev];
        const produtoAtual = novaComanda[index];

        novaComanda[index] = {
          ...produtoAtual,
          quantidade: qtd,
          precoTotal: produtoAtual.preco * qtd,
        };

        return novaComanda;
      }
      return prev;
    });
  }

  function removerProdutoDaComanda(nomeProduto) {
    setComanda((prev) => prev.filter((item) => item.nome !== nomeProduto));
  }

  function abrirModal(produto, quantidade) {
    setProdutoSelecionado({ nome: produto });
    setQuantidadeSelecionada(quantidade);
    setModalAberto(true);
  }

  function fecharModal() {
    setModalAberto(false);
    setProdutoSelecionado(null);
  }

  const abrirModalConfirmarPedido = () => {
    setConfirmarPedido(true);
  };

  const fecharModalConfirmarPedido = () => {
    setConfirmarPedido(false);
  };

  function salvarObservacoes(observacoesRecebidas) {
    setComanda((prev) => {
      return prev.map((item) => {
        if (item.nome === produtoSelecionado.nome) {
          return {
            ...item,
            observacoes: observacoesRecebidas,
          };
        }
        return item;
      });
    });
    fecharModal();
  }

  const totalItens = comanda.reduce((totalDeItens, item) => totalDeItens + item.quantidade, 0);

  const totalPedido = comanda.reduce(
    (total, item) => total + item.precoTotal,
    0
  );

  const comandaExpandida = [];

  comanda.forEach((item) => {
    for (let i = 0; i < item.quantidade; i++) {
      comandaExpandida.push({
        prato: item.prato,
        produto: item.produto,
        nome: item.nome,
        valorUnitario: item.preco,
        observacao: item.observacoes?.[i]?.texto || "",
        funcionario: "Yasmim",
      });
    }
  });

  return (
    <>
      <Navbar />
      <section className="menu-atendente">
        {modalAberto && produtoSelecionado && (
          <ModalObservacoes
            produto={produtoSelecionado}
            quantidade={quantidadeSelecionada}
            onClose={fecharModal}
            onSalvarObservacoes={salvarObservacoes}
          />
        )}
        {confirmarPedido && (
          <ModalConfirmarPedido onClose={fecharModalConfirmarPedido} statusModal={setConfirmarPedido} />
        )}

        <div className="todos-produtos">
          <h1>Escolha o Setor</h1>
          <div className="setores">
            <ElementoTotal
              key="todos"
              nome="Todos"
              quantidade={produtos.length}
              onClick={() => setSetorSelecionado("Todos")}
            />
            {setores.map((setor) => (
              <ElementoTotal
                key={setor.id}
                nome={setor.nome}
                quantidade={
                  produtos.filter((p) => p.setor === setor.nome).length
                }
                onClick={() => setSetorSelecionado(setor.nome)}
              />
            ))}
          </div>

          <div className="header-container">
            <h1> Setor: {setorSelecionado} </h1>
            <div className="barra-pesquisa">
              <input
                type="text"
                placeholder="Procurar Produto"
                className="input-pesquisa-produtos"
                value={buscaProduto}
                onChange={(e) => setBuscaProduto(e.target.value)}
              />
              <button className="lupa-pesquisa">
                <img src={LupaPesquisa} alt="Pesquisar" />
              </button>
            </div>
          </div>

          <div className="produtos-por-categoria">
            {categorias.map((categoria) => {
              const produtosFiltrados = produtos.filter((produto) => {
                const mesmoSetor =
                  setorSelecionado === "Todos" ||
                  produto.setor.trim().toLowerCase() === setorSelecionado.trim().toLowerCase();
                const mesmaCategoria =
                  produto.categoria.trim().toLowerCase() === categoria.nome.trim().toLowerCase();
                const nomeCombina =
                  produto.nome.toLowerCase().includes(buscaProduto.toLowerCase());

                return mesmoSetor && mesmaCategoria && nomeCombina;
              });


              if (produtosFiltrados.length === 0) return null;

              return (
                <div key={categoria.id} className="categoria">
                  <h1>{categoria.nome}</h1>
                  <div className="produtos-da-categoria">
                    {produtosFiltrados.map((produto) => (
                      <ElementoProduto
                        key={produto.id}
                        nome={produto.nome}
                        descricao={produto.descricao}
                        preco={produto.preco}
                        onAdicionar={adicionarNaComanda}
                        disabled={produto.disabled}
                      />
                    ))}
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      <aside className="menu-comanda">
        <header className="header-comanda">
          <h1>Comandas</h1>
        </header>

        <div className="produtos-adicionados-comanda">
          {comanda.map((item, index) => (
            <ProdutoComanda
              key={index}
              produto={item.nome}
              preco={item.preco}
              quantidade={item.quantidade}
              atualizarQuantidade={atualizarQuantidade}
              onClick={abrirModal}
              removerProduto={removerProdutoDaComanda}
            />
          ))}
          {console.log("comanda", comanda)}
          {console.log("comandaExpandida", comandaExpandida)}

        </div>

        <section className="botao-confirmar">
          <BotaoConfirmar
            quantidade={totalItens}
            totalPedido={totalPedido}
            onClick={abrirModalConfirmarPedido}
          />
        </section>
      </aside>
    </>
  );
}
