# Guia de Instalação do Servidor

Este guia fornece instruções passo a passo para a instalação do servidor. Certifique-se de seguir cada passo cuidadosamente.

## Pré-requisitos

Antes de começar, certifique-se de ter os seguintes itens instalados:

- [Node.js](https://nodejs.org/) (npm será instalado automaticamente)
- [Docker](https://www.docker.com/)

## 1. Instalar Dependências

Execute o seguinte comando para instalar as dependências do projeto:

```bash
npm install

# ou

yarn
```

## 2. Configurar o arquivo .env

- Use o arquivo .env.example como modelo para criar um arquivo .env

## 3. Iniciar o Docker Compose

Execute o seguinte comando para iniciar o Docker Compose:

```bash
docker-compose up
```

## 4. Executar a seed do banco de dados

Execute o seguinte comando para executar a seed do banco de dados:

```bash
npx prisma db seed

```

## 5. Iniciar o servidor

Execute o seguinte comando para iniciar o servidor:

```bash
npm run dev

# ou

yarn dev
```


