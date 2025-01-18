# Plataforma de gerenciamento de cursos

Este é um sistema de cadastro de cursos, com um backend construído utilizando Express, Node, Prisma e Moment.js, e um frontend em Next.js com ShadCN para componentes visuais. O sistema foi containerizado com Docker e está hospedado na AWS.

## Repositório

O código-fonte do projeto pode ser encontrado no GitHub:

[https://github.com/PedroAraripe/platform-courses](https://github.com/PedroAraripe/platform-courses)

## Deploy na AWS

O deploy do frontend se encontra na url:

[http://54.198.116.157:3000/](http://54.198.116.157:3000/)

e o do backend se encontra na url:

[http://54.198.116.157:5000/](http://54.198.116.157:5000/)

## Instruções para Execução do Projeto

### Requisitos

- **Node.js** (versão 18 ou superior)
- **Docker** (para IAC)
- **Docker Compose** (para orquestrar os containers)
- **PostgreSQL** ou banco de dados compatível

### Passos para Execução Local

1. **Clone o repositório**:

   ```bash
   git clone https://github.com/PedroAraripe/platform-courses
   cd platform-courses
   ```

2. **Instale as dependências do backend**:

   ```bash
   cd backend
   npm install
   ```

3. **Instale as dependências do frontend**:

   ```bash
   cd ../frontend
   npm install
   ```

4. **Use o Docker Compose** para rodar os containers:

   Se você preferir rodar todos os serviços (backend, frontend e banco de dados) com Docker Compose, apenas execute:

   ```bash
   docker-compose up --build
   ```

   Isso irá construir e rodar os containers para o backend, frontend e PostgreSQL.

5. **Rodando manualmente (se necessário)**:

   Caso queira rodar manualmente, primeiro inicie o banco de dados:

   ```bash
   docker run --name plataforma-cursos-db -e POSTGRES_PASSWORD=prisma -d prisma
   ```

   ou troque no arquivo backend/prisma/schema.prisma

   de 

   ```
  datasource db {
    provider = "postgresql"
    url      = "postgresql://prisma:prisma@postgres:5432/prisma"
  }
   ```

   para
  ```
  datasource db {
    provider = "sqlite"
    url      = "file:./dev.db"
  }
   ```


   Em seguida, no backend, execute:

   ```bash
   npm run dev  # Para iniciar o backend
   ```

   No frontend, execute:

   ```bash
   npm run dev  # Para iniciar o frontend
   ```

6. **Acesse o sistema na URL**:

   Após a execução, você pode acessar o sistema localmente via:

   ```bash
   http://localhost:3000
   ```

## Descrição das APIs

### **POST /api/courses**

**Descrição**: Cria um novo curso no sistema.

- **Parâmetros**:

  ```json
  {
    "title": "string",    // Título do curso
    "description": "string",    // Descrição do curso
    "startDate": "string",    // Data de início do curso (formato: YYYY-MM-DD)
    "endDate": "string"    // Data de término do curso (formato: YYYY-MM-DD)
  }
  ```

- **Resposta**:

  ```json
  {
    "id": "dfbe137e-80ac-4049-8e6b-2972ba5c0b9e",
  }
  ```

### **GET /api/courses**

**Descrição**: Retorna a lista de cursos cadastrados.

- **Resposta**:

  ```json
  [
    {
      "id": "1560d135-a4f4-4622-a3dc-7dd9bb4dd068",
      "title": "Curso iniciante de Next",
      "description": "Curso para iniciantes de Next",
      "createdAt": "2025-01-18T21:09:19.300Z"
    },
    {
      "id": "ffea1ba6-95c1-442e-946e-efe4a8718684",
      "title": "Vue senior",
      "description": "Curso para devs exprientes em Vue",
      "createdAt": "2025-01-18T21:09:19.311Z"
    }
    ...
  ]
  ```

### **POST /users**

**Descrição**: Cria um novo usuário no sistema.

- **Parâmetros**:

  ```json
  {
    "name": "João Silva",
    "email": "joao.silva@email.com",
  }
  ```

- **Resposta**:

  ```json
  {
    "id": "dfbe137e-80ac-4049-8e6b-2972ba5c0b9e",
  }
  ```

### **GET /users**

**Descrição**: Retorna a lista de usuários cadastrados.

- **Resposta**:

  ```json
  [
    {
      "id": "bf2aeb1b-9f86-45bc-bd4f-9cb62a6a9fd4",
      "name": "João Silva",
      "createdAt": "2025-01-18T20:51:14.330Z",
      "email": "joao.silva@email.com",
      "enrollments": []
    }
  ]
  ```

## Explicação das Principais Escolhas Técnicas

### Backend

- **Express**: Framework minimalista para Node.js, utilizado para gerenciar as rotas da API.
- **Node.js**: Plataforma de execução JavaScript para servidores, escolhida por sua alta performance em I/O.
- **Prisma**: ORM (Object-Relational Mapping) que facilita a interação com o banco de dados PostgreSQL, fornecendo uma API simples e poderosa.
- **Moment.js**: Biblioteca para manipulação de datas e horários, garantindo que as datas de início e término dos cursos sejam tratadas de forma consistente.

### Frontend
- **Next.js**: Framework React para desenvolvimento de páginas estáticas e dinâmicas, otimizado para SEO e performance.
- **ShadCN**: Conjunto de componentes visuais com uma abordagem simples e moderna para a construção de interfaces.
- **Obs.:**: Como o foco avaliativo da task não era frontend, apenas foi feito um projeto frontend bem simples e desorganizado, com o único intuito de listar os dados cadastrados via api etc, se possuísse mais tempo teria organizado melhor os arquivos, criados componentes mais reutilizáveis / organizados e com validações. 

### Docker

- **Docker**: Utilizado para containerizar a aplicação, garantindo consistência no ambiente de desenvolvimento e produção. Foi utilizado mais para facilitar o teste local e deploy em produção, teria organizado melhor os arquivos dockers para desenvolvimento / deploy com opções mais confiáveis como por exemplo utilizar pm2 para administrar os logs do servidor entre outras funcionalidades.

## Conclusão

Este projeto foi desenvolvido com foco em simplicidade, escalabilidade e facilidade de manutenção. A utilização de tecnologias modernas, como Prisma e Next.js, permite um desenvolvimento ágil, enquanto o uso de Docker facilita o gerenciamento de ambientes.

---

Essa documentação pode ser expandida conforme o projeto evolui.
