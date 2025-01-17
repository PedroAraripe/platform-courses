# Use a imagem base do Node.js
FROM node:18-alpine

# Diretório de trabalho
WORKDIR /usr/src/app

# Copiar arquivos de configuração e instalar dependências
COPY package*.json ./
RUN npm install

# Copiar o restante do código da aplicação
COPY . .

# Instalar Prisma CLI e TypeScript globalmente
RUN npm install -g typescript prisma

# Gerar o cliente Prisma
RUN npx prisma generate

# Compilar o código TypeScript para JavaScript
RUN npm run build

# Expor a porta da API
EXPOSE 5000

# Script de inicialização para sincronizar o banco e rodar o servidor
CMD ["sh", "-c", "npx prisma db push && node dist/main.js"]
