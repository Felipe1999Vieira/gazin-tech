# Bem-vindo ao meu Teste Gazin Tech

Este projeto é uma aplicação para cadastro de desenvolvedores associados a diferentes níveis. Ele é composto por:

- **Backend:** API RESTful desenvolvida com NestJS e PostgreSQL.
- **Frontend:** SPA (Single Page Application) criada com React, Vite e Tailwind.

---

## Como testar a aplicação?

### Clonando o repositório

Antes de tudo, clone o repositório para sua máquina local:

```sh
git clone https://github.com/Felipe1999Vieira/gazin-tech.git
```

Depois, acesse o diretório do projeto:

```sh
cd gazin-tech
```

A estrutura do repositório será:

```
📂 gazin-tech
 ├── 📂 backend
 ├── 📂 frontend
 ├── 🐳 docker-compose.yml
```

---

### Executando com Docker Compose

Para rodar a aplicação com Docker Compose, é necessário ter o **Docker** instalado e configurado.

1️⃣ **Primeira execução:**

```sh
docker compose up --build
```

Esse comando **construirá e subirá** os containers do Frontend, Backend e Banco de Dados.

2️⃣ **Próximas execuções:**

```sh
docker compose up
```

---

## Acessando a aplicação

Após a execução do comando acima, a aplicação estará pronta para uso.

- **Frontend:**
  ```
  http://localhost:5173/
  ```
- **API Backend:**

  ```
  http://localhost:3300
  ```

- **Health Check:**

  ```
  http://localhost:3300/api/v1/status
  ```

- **Swagger (Documentação da API):**
  ```
  http://localhost:3300/api/v1/docs
  ```

Agora você pode testar todas as funcionalidades: **visualizar, criar, editar e excluir desenvolvedores e níveis com a aplicação**. 🚀

---

## Ambiente de Desenvolvimento

Se precisar rodar os serviços separadamente sem Docker Compose, siga os passos abaixo.

### 1. Rodando o PostgreSQL no Docker

Baixe e rode uma instância do PostgreSQL:

```sh
docker pull postgres
```

```sh
docker run -d   --name postgres_container   -e POSTGRES_USER=meu_usuario   -e POSTGRES_PASSWORD=minha_senha   -e POSTGRES_DB=meu_banco   -p 5432:5432   postgres
```

Agora, sua **connection string** será:

```sh
postgresql://meu_usuario:minha_senha@localhost:5432/meu_banco
```

---

### 2. Configurando o Backend

1️⃣ No diretório **`backend/`**, crie um arquivo `.env.development` com o seguinte conteúdo:

```sh
PORT=3300
DATABASE_URL="postgresql://meu_usuario:minha_senha@localhost:5432/meu_banco"
```

2️⃣ Instale as dependências:

```sh
pnpm install
```

Caso não tenha o **pnpm**, instale com:

```sh
npm install -g pnpm
```

3️⃣ Configure o banco de dados com Prisma:

```sh
pnpm prisma:generate:development
pnpm prisma:migratedeploy
```

4️⃣ Execute o servidor backend:

```sh
pnpm start:dev
```

---

### 3. Configurando o Frontend

1️⃣ No diretório **`frontend/`**, instale as dependências:

```sh
npm install
```

2️⃣ Inicie o projeto:

```sh
npm run dev
```

---

**Muito obrigado por chegar até aqui! 🚀**
