# Instruções para Utilização do Projeto

## Dependências Necessárias

Este projeto utiliza o **json-server** para simular um servidor de API. Siga os passos abaixo para configurar e rodar o servidor localmente.

### Passo 1: Instalação do json-server

Antes de iniciar o projeto, você precisa instalar o **json-server**. Execute o seguinte comando no seu terminal:

```bash
npm install json-server
```

### Passo 2: Iniciar o servidor

Após a instalação, inicie o servidor com o comando:

```bash
npx json-server db.json
```

Esse comando irá levantar a aplicação e expor os endpoints da API localmente. Você pode utilizá-los com ferramentas como **Insomnia** ou diretamente via **URL**.

## JSON-Server no Projeto

### Funcionalidade de Endpoints

O **json-server** está configurado para simular a gestão de uma entidade chamada **PRODUTOS**. No contexto deste projeto, você encontrará duas funcionalidades principais:

* Tela de Estoque: Visualize os produtos cadastrados no estoque.
* Formulário de Cadastro de Produtos: Adicione, edite ou remova produtos no estoque.

Essas funcionalidades são manipuladas através dos seguintes métodos CRUD:

* Adicionar: Criação de novos produtos.
* Visualizar: Exibição dos produtos cadastrados.
* Atualizar: Modificação dos dados de produtos existentes.
* Deletar: Remoção de produtos do estoque.

## Interação com a API
Ao realizar operações de **adicionar**, **visualizar**, **atualizar** ou **deletar** produtos, os dados serão refletidos no arquivo `db.json`, que simula um banco de dados. As alterações podem ser acessadas via API.

## Considerações sobre a Responsividade
* A interface atual **não é responsiva** e foi desenvolvida considerando uma resolução de **90% de zoom no navegador**.
* Para uma melhor visualização, recomendamos ajustar o zoom do navegador para **90%**.

&copy; 2025 i9tech. Todos os direitos reservados. 