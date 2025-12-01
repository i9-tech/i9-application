# Estágio 1: Build da aplicação React
FROM node:20-alpine AS build

# Define o diretório de trabalho dentro do container
WORKDIR /app

# Copia o package.json e package-lock.json para o container
COPY package*.json ./

# Instala as dependências
RUN npm install

# Copia o resto do código da aplicação
COPY . .

# Gera os arquivos estáticos de produção
RUN npm run build

# Estágio 2: Servir os arquivos com Nginx
FROM nginx:stable-alpine

# Copia os arquivos estáticos gerados no estágio anterior para a pasta padrão do Nginx
COPY --from=build /app/dist /usr/share/nginx/html/app

# A porta que o Nginx vai escutar DENTRO do container
EXPOSE 80

# O comando padrão do Nginx já inicia o servidor, então não precisamos de um CMD