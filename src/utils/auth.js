import { jwtDecode } from "jwt-decode";
import { ROUTERS } from "./routers";

export function getFuncionario() {
    const funcionario = localStorage.getItem("funcionario");
    return funcionario ? JSON.parse(funcionario) : {};
}

export function getPermissoes() {
  const token = localStorage.getItem("token");
  
  if (token) {
    const tokenTraduzido = jwtDecode(token);
    //console.log("Token traduzido:", tokenTraduzido);  

    const permissoes = tokenTraduzido.authorities ? tokenTraduzido.authorities.split(',') : [];
    //console.log("Permissões:", permissoes);
    
    return permissoes;
  }

  return [];
}

export function getPrimeiraRotaPermitida(permissoes) {
  if (permissoes.includes("PROPRIETARIO_ROLE_PLANO_ACESSO_DASHBOARD")) return ROUTERS.DASHBOARD;
  if (permissoes.includes("ROLE_PROPRIETARIO")) return ROUTERS.ATENDENTE;
  if (permissoes.includes("ROLE_ATENDIMENTO")) return ROUTERS.ATENDENTE;
  if (permissoes.includes("ROLE_COZINHA")) return ROUTERS.COMANDAS;
  if (permissoes.includes("ROLE_ESTOQUE")) return ROUTERS.ESTOQUE_PRODUTOS;

  return ROUTERS.LOGIN; 
}


export function getToken() {
  const token = localStorage.getItem("token");
  return token ? token : {};
}