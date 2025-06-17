# 🖥️ Aplicação i9
![CI](https://github.com/i9-tech/i9-application/actions/workflows/i9-application-ci.yml/badge.svg?branch=develop)
[![💻 Serviço de App Web Estático da Azure CI/CD](https://github.com/i9-tech/i9-application/actions/workflows/azure-static-web-apps-happy-bay-092f1780f.yml/badge.svg)](https://github.com/i9-tech/i9-application/actions/workflows/azure-static-web-apps-happy-bay-092f1780f.yml)

***

### 🌟 Boas-vindas!
Esse é o repositório da **i9 Tech** responsável pelo desenvolvimento da interface do nosso sistema. Este repositório tem como propósito **concentrar** toda a **construção visual da aplicação**, com foco em usabilidade, **responsividade** e **integração com o back-end**. Cada nova funcionalidade é desenvolvida em uma branch separada, garantindo organização e evitando conflitos. A **branch principal** sempre conterá a versão mais atualizada e homologada da aplicação.

***

## 📋 Requisitos de Uso
Para rodar a interface da aplicação em sua máquina, é necessário instalar os seguintes softwares:
- Visual Studio Code - IDE para desenvolvimento de códigos
- JavaScript
- Node.js com npm
- React com Vite (já incluído nas dependências do projeto)
- Navegador Web

<br/>

***

## 🧳 Dependências
Além das ferramentas de desenvolvimento, o projeto utiliza as seguintes dependências principais para sua execução e organização:
- React
- Vite
- React SOM
- React Router DOM
- React Hooks
- Axios
- Motion

<br/>

***

## 🔑 Acesso a Aplicação
Para executar a aplicação localmente, siga os passos abaixo:
1. Clone o repositório:
```sh
git clone https://github.com/SeuUsuario/i9-application.git
```

2. Acesse o diretório do projeto:
```sh
cd i9-application
```

3. Instale as dependências do projeto:
```sh
npm install
```

4. Configure as variáveis de ambiente em um arquivo **.env.local**:
```sh
VITE_AMBIENTE=
VITE_IMAGE_TOKEN_URL=
VITE_API_BASE_URL_LOCAL=
VITE_API_BASE_URL_DEV=
VITE_API_BASE_URL_PROD=
```

👉 Agora, basta escolher qual ambiente deseja rodar a aplicação para prosseguir com os passos

<br/>

***

## 🔧 Para rodar em  ambiente de DEV:

5. Preencha `VITE_AMBIENTE` como `spring` ou `jsonserver`:
```sh
VITE_AMBIENTE=spring
OU 
VITE_AMBIENTE=jsonserver
```

6. Rode o server:
```sh
npm run dev
```

7. Endereço de exibição:
```sh
http://localhost:5173
```

<br/>

***

## 🚀 Para rodar em  ambiente de PROD:

5. Preencha `VITE_AMBIENTE` como `spring` ou `prod`:
```sh
VITE_AMBIENTE=spring
OU
VITE_AMBIENTE=prod
```

6. Instale o Ttg server:
```sh
npm build + npm install -tg server
```

7. Rode o server:
```sh
serve -s dist
```

8. Endereço de exibição:
```sh
http://localhost:80
```
*`(ou a porta que definir nas configurações de prod)`*

<br/>

***

## 🔐 Variáveis de Ambiente no Frontend

As variáveis de ambiente são utilizadas para configurar o ambiente de execução (dev, prod, etc.), definir URLs de APIs e armazenar tokens e credenciais (como o token de imagem da Azure).

### Frontend (Vite)

As variáveis ficam em arquivos `.env` e precisam seguir o padrão do Vite: `VITE_NOME_DA_VARIAVEL`.

Exemplo no arquivo `.env`:

```env
VITE_AMBIENTE=spring
VITE_IMAGE_TOKEN_URL=https://...
```
Essas variáveis são consumidas no código usando `import.meta.env`:

```javascript
const token = import.meta.env.VITE_IMAGE_TOKEN_URL;
```
Para facilitar, o projeto centraliza essas configurações no arquivo `src/utils/enviroments.js`, que faz o mapeamento das variáveis e, com base no ambiente (`VITE_AMBIENTE`), define a URL da API correspondente (ex: JSON Server, Spring Boot, Produção).

**💡 Dica:** mantenha o arquivo `.env` com valores genéricos no repositório e use o `.env.local` com os dados reais apenas localmente (esse arquivo deve estar listado no `.gitignore`).

### ⚠️ Atenção às variáveis!
Nunca suba arquivos com variáveis sensíveis preenchidas para o repositório.

Certifique-se de que arquivos como `.env.local` estejam listados no seu `.gitignore`.
<br/>
***

## ⚠️ ATENÇÃO
Para acessar qualquer função dentro da nossa aplicação, será necessário informar um `token de segurança` a partir de um **login**. Existe um usuário padrão que é criado para testes, é possível utilizar seu login com as credenciais:

**CPF:** 000.000.000-00

**Email:** 00000000000@teste

Esse usuário é apenas para fins de desenvolvimento e não representa dados reais ou clientes da aplicação.

<br/>

***

## 📚 Estrutura de Telas
A interface contém as seguintes principais seções (módulos):
- Login e autenticação
- Tela inicial do sistema
- Área de atendimento
- Cadastro e gerenciamento de funcionários
- Visualização e controle de pedidos
- Edição de permissões e informações da empresa
- Integração visual com API e rotas protegidas

<br/>

***

## 📂 Pastas
As principais pastas da aplicação são:

`components/` – Componentes reutilizáveis da interface.

`pages/` – Telas completas organizadas por funcionalidades.

`services/` – Configurações e chamadas HTTP (Axios).

`contexts/` – Armazenamento de dados em memória via Context API.

`routes/` – Definição das rotas com controle de acesso.

`utils/` – Arquivos auxiliares.

`assets/` – Imagens, ícones e arquivos visuais.

<br/>

***

## 🧪 Exemplos de Uso
Ao interagir com a interface, o usuário poderá:

1. Realizar login com autenticação segura
2. Visualizar pedidos e produtos disponíveis
3. Navegar entre as áreas da empresa (ex: cozinha, atendimento)
4. Gerenciar cadastros e permissões de funcionários
5. Receber mensagens de erro e sucesso com feedback visual
6. Usar a aplicação de forma intuitiva e responsiva em diferentes dispositivos

<br/>

***

## 🔗 Integração
A comunicação entre a interface e o servidor é feita por requisições HTTP via Axios. As rotas protegidas exigem envio do token JWT no cabeçalho da requisição, e a resposta do servidor é manipulada para exibir mensagens visuais ao usuário.

Caso deseje testar a aplicação com a geração de dados por meio de requisições e respostas em um servidor, a i9 oferece um repositório com toda a aplicação desenvolvida para o back-end do projeto. Se deseja clonar o repositório, acesse o link: 

https://github.com/i9-tech/i9-server

Nele, é possível ler o passo a passo de como realizar a instalação do repositório e rodar localmente.

<br/>

***

## 📜 Licença
Este projeto está licenciado sob a Licença MIT. Isso significa que você pode usá-lo, modificá-lo e distribuí-lo livremente, desde que mantenha os avisos de copyright e a licença original.

Consulte o arquivo [LICENSE](./LICENSE) para mais detalhes.

i9 Tech 2025 &copy; Todos os direitos reservados.
