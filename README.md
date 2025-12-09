# 🖥️ Aplicação i9
![CI](https://github.com/i9-tech/i9-application/actions/workflows/i9-application-ci.yml/badge.svg?branch=develop)
![CI](https://github.com/i9-tech/i9-application/actions/workflows/i9-components-cd.yml/badge.svg?branch=develop)
![CD](https://github.com/i9-tech/i9-application/actions/workflows/i9-images-cd.yml/badge.svg?branch=develop)
![CD](https://github.com/i9-tech/i9-application/actions/workflows/i9-aws-depoy.yml/badge.svg?branch=feature/aws)

-----

### 🌟 Boas-vindas\!

Esse é o repositório da **i9 Tech** responsável pelo desenvolvimento da interface do nosso sistema de Ponto de Venda (PDV) e gestão. Este repositório concentra toda a **construção visual da aplicação**, com foco em usabilidade, **responsividade** e **integração com o back-end**.

A aplicação é projetada para ser uma solução completa para restaurantes, mercados e outros estabelecimentos, oferecendo controle total sobre o negócio.

-----

## ✨ Funcionalidades Principais

A plataforma conta com um ecossistema robusto de módulos para diferentes perfis de usuário:

  * **📈 Dashboard (Proprietário):** Visualização de KPIs (Key Performance Indicators), gráficos de faturamento, lucro, produtos e pratos mais vendidos, e ranking de setores.
  * **🛒 Atendimento (PDV):** Interface de ponto de venda para atendentes registrarem pedidos, selecionando produtos por setores e categorias de forma rápida e intuitiva.
  * **🍳 Gestão de Cozinha:** Tela para a cozinha visualizar comandas de pratos pendentes em tempo real, com filtros por data e área de preparo, e marcar pedidos como concluídos.
  * **📦 Gestão de Estoque (Produtos e Pratos):** Módulo completo para CRUD (Criação, Leitura, Atualização e Deleção) de produtos e pratos, com formulários detalhados e upload de imagens.
  * **📑 Paginação e Filtros:** Todas as tabelas de estoque possuem sistema de **paginação**, filtros por status (disponível, estoque baixo) e busca por nome.
  * **👥 Gestão de Funcionários (Proprietário):** Cadastro e edição de funcionários, definindo suas permissões de acesso ao sistema.
  * **🏷️ Gestão de Setores e Categorias:** Gerenciamento centralizado de setores (ex: Lanchonete, Restaurante) e categorias (ex: Bebidas, Sobremesas) que organizam todo o sistema.
  * **🔐 Controle de Acesso (RBAC):** O sistema utiliza rotas privadas que validam o token JWT do usuário e suas permissões (`ROLE_PROPRIETARIO`, `ROLE_ATENDIMENTO`, `ROLE_COZINHA`, `ROLE_ESTOQUE`) para acessar cada módulo.
  * **🔑 Recuperação de Senha & Primeiro Acesso:** Fluxo seguro de recuperação de senha via e-mail e redefinição obrigatória de senha no primeiro login de um novo funcionário.

-----

## 🚀 Tecnologias Utilizadas

O projeto é construído com as seguintes tecnologias:

  * **Core:** React 19+ e Vite
  * **Roteamento:** React Router DOM
  * **Requisições HTTP:** Axios (para integração com a API Spring Boot)
  * **Gráficos:** ApexCharts e React ApexCharts
  * **Estilização:** CSS Puro com Variáveis
  * **Componentes:** React Select, React Day Picker, React Icons, React Toastify
  * **Deployment:** Docker, Docker Compose, Nginx

-----

## infrastucture 🐳 Arquitetura de Implantação (AWS)

A aplicação está configurada para implantação em produção utilizando **Docker** e **Nginx**, com foco em escalabilidade e segurança.

### 1\. Docker

Utilizamos um `Dockerfile` multi-stage para otimizar a imagem final:

1.  **Estágio `build`:** Usa uma imagem `node:20-alpine` para instalar as dependências (`npm install`) e gerar os arquivos estáticos de produção (`npm run build`).
2.  **Estágio Final:** Usa uma imagem leve `nginx:stable-alpine` e copia apenas os arquivos estáticos da pasta `dist` (do estágio anterior) para a pasta padrão do Nginx (`/usr/share/nginx/html`).

### 2\. Nginx e Balanceamento de Carga

O arquivo `nginx/app.conf` gerencia o tráfego da aplicação:

  * **Balanceamento de Carga:** O bloco `upstream backend_servers` define um pool de servidores da API (backend). O Nginx distribui o tráfego entre eles (ex: `10.0.0.167:8080`, `10.0.0.167:8081`).
  * **Proxy Reverso:** Requisições para `/api/` são encaminhadas para o `upstream backend_servers`, atuando como um proxy reverso para a API.
  * **Roteamento do React:** A diretiva `try_files $uri $uri/ /index.html` garante que todas as rotas do React Router funcionem corretamente, servindo o `index.html` em caso de "não encontrado" (erro 404).
  * **SSL (HTTPS):** A configuração escuta na porta `443 ssl` e redireciona todo o tráfego `http` (porta 80) para `https`.

### 3\. Docker Compose

O `docker-compose.yml` orquestra os contêineres necessários para a aplicação:

  * **Serviço `nginx`:** Constrói a imagem do `Dockerfile` e mapeia as portas 80 e 443. Ele monta os volumes do Nginx (`app.conf`) e dos certificados SSL (obtidos pelo Certbot).
  * **Serviço `certbot`:** Utiliza a imagem `certbot/certbot` para gerenciar e renovar automaticamente os certificados SSL da Let's Encrypt, compartilhando os volumes de certificados com o serviço `nginx`.

-----

## ⚙️ Rodando Localmente

Para executar a aplicação localmente em modo de desenvolvimento:

1.  Clone o repositório:
    ```sh
    git clone https://github.com/i9-tech/i9-application.git
    ```
2.  Acesse o diretório do projeto:
    ```sh
    cd i9-application
    ```
3.  Instale as dependências do projeto:
    ```sh
    npm install
    ```
4.  Execute a aplicação (Vite):
    ```sh
    npm run dev
    ```
5.  Acesse no navegador:
    `http://localhost:5173`

📌 **Nota:** Para que a aplicação funcione, é necessário estar executando o back-end (`i9-server`) simultaneamente. Certifique-se de configurar o arquivo `.env` com a URL correta da sua API local (ex: `VITE_API_BASE_URL_LOCAL=http://localhost:8080`).

-----

## 📂 Estrutura de Pastas

As principais pastas da aplicação são:

`nginx/` – Contém os arquivos de configuração do Nginx para produção.

`src/components/` – Componentes reutilizáveis (Navbar, Gráficos, Modais, Paginação, etc).

`src/pages/` – Telas completas organizadas por funcionalidades (Dashboard, Login, Atendente, Cozinha, etc).

`src/provider/` – Configuração central do Axios (`api.js`).

`src/routes/` – Definição das rotas e componentes de rota privada (`RotaPrivada.jsx`).

`src/utils/` – Arquivos auxiliares (autenticação, endpoints da API, rotas, etc).

`src/assets/` – Imagens, ícones e arquivos visuais.

`Dockerfile` – Instruções para buildar a imagem Docker da aplicação.

`docker-compose.yml` – Orquestração dos serviços de Nginx e Certbot.

-----

## 🔄 CI/CD

O projeto utiliza GitHub Actions para Integração Contínua (CI). O workflow definido em `.github/workflows/i9-application-ci.yml` é disparado em todo `push` ou `pull_request` para as branches `develop` e `main`.

Ele executa os seguintes passos:

1.  Checkout do código.
2.  Setup do Node.js 20.
3.  Instalação de dependências (`npm ci`).
4.  **Análise de Lint** (`npm run lint`).
5.  **Build de Produção** (`npm run build`).

Isso garante que o código nessas branches esteja sempre saudável e pronto para deploy.

-----

## 🔑 Autenticação

Para acessar qualquer função interna da nossa aplicação, será necessário informar um `token de segurança` a partir de um **login**. Existe um usuário padrão criado pelo back-end para testes:
<br/>
**CPF:** `000.000.000-00`<br/>
**Email:** `00000000000@teste`<br/>
*(A senha inicial geralmente é definida pelo back-end, como `00000000000@taua`)*
<br/>
**Primeiro Acesso:** Ao fazer login pela primeira vez com um novo usuário, o sistema exigirá a redefinição imediata da senha, garantindo a segurança da conta.

-----

## 📜 Licença

Este projeto está licenciado sob a Licença MIT. Isso significa que você pode usá-lo, modificá-lo e distribuí-lo livremente, desde que mantenha os avisos de copyright e a licença original.
<br/>
i9 Tech 2025 © Todos os direitos reservados.i9 Tech 2025 &copy; Todos os direitos reservados.
