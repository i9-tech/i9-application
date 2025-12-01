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

# ---------------------------
# 1. Declarar que aceitamos esses argumentos na hora do build
ARG VITE_AMBIENTE
ARG VITE_IMAGE_TOKEN_URL
ARG VITE_API_BASE_URL_AWS
ARG VITE_API_BASE_URL_LOCAL
ARG VITE_API_BASE_URL_DEV
ARG VITE_API_BASE_URL_PROD

# 2. Transformar os argumentos em variáveis de ambiente para o Linux do container
ENV VITE_AMBIENTE=$VITE_AMBIENTE
ENV VITE_IMAGE_TOKEN_URL=$VITE_IMAGE_TOKEN_URL
ENV VITE_API_BASE_URL_AWS=$VITE_API_BASE_URL_AWS
ENV VITE_API_BASE_URL_LOCAL=$VITE_API_BASE_URL_LOCAL
ENV VITE_API_BASE_URL_DEV=$VITE_API_BASE_URL_DEV
ENV VITE_API_BASE_URL_PROD=$VITE_API_BASE_URL_PROD
# ---------------------------

# Gera os arquivos estáticos de produção
RUN npm run build

# Estágio 2: Servir os arquivos com Nginx
FROM nginx:stable-alpine

# Copia os arquivos estáticos gerados no estágio anterior para a pasta padrão do Nginx
COPY --from=build /app/dist /usr/share/nginx/html

# A porta que o Nginx vai escutar DENTRO do container
EXPOSE 80

# O comando padrão do Nginx já inicia o servidor, então não precisamos de um CMD