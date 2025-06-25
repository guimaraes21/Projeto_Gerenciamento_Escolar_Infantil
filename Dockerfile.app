# Versão LTS do Node.js como imagem base
FROM node:18-alpine

# Definir diretório de trabalho na imagem
WORKDIR /app

# Copiar package.json e package-lock.json para o diretório de trabalho
COPY ./APP/package*.json ./

# Instalar dependências
RUN npm install

# Copiar todo o código fonte para o diretório de trabalho
COPY ./APP ./

# Expor a porta para o Express
EXPOSE 3000

# Comando para iniciar a aplicação
CMD ["npm", "start"]
