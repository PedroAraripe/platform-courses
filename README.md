# Plataforma de Gerenciamento de Cursos

Este projeto consiste em um sistema de cadastro de cursos, com um backend construído utilizando **Express**, **Node**, **Prisma** e **Moment.js**, e um frontend em **Next.js** com **ShadCN** para os componentes visuais. A aplicação foi containerizada com **Docker** e está hospedada na **AWS**.

---

## Repositório

O código-fonte está disponível no GitHub:  
[https://github.com/PedroAraripe/platform-courses](https://github.com/PedroAraripe/platform-courses)

---

## Deploy na AWS

- **Frontend**: [http://54.198.116.157:3000/](http://54.198.116.157:3000/)  
- **Backend**: [http://54.198.116.157:5000/](http://54.198.116.157:5000/)

---

## Instruções para Execução Local

### Requisitos

- **Node.js** (18 ou superior)
- **Docker** e **Docker Compose**
- Banco de dados **PostgreSQL**

### Passos

1. Clone o repositório e entre na pasta do projeto:

   ```bash
   git clone https://github.com/PedroAraripe/platform-courses
   cd platform-courses
   ```

2. Instale as dependências:  
   **Backend**:

   ```bash
   cd backend
   npm install
   ```

   **Frontend**:

   ```bash
   cd ../frontend
   npm install
   ```

3. Execute o sistema:  
   - **Com Docker Compose**:

     ```bash
     docker-compose up --build
     ```

   - **Manual (se preferir):**
     - Atualize o arquivo `schema.prisma` (se necessário) para usar **SQLite** no ambiente local, como abaixo:
      
      ```
      datasource db {
         provider = "sqlite"
         url      = "file:./dev.db"
      }
      ```

     - Execute o backend e o frontend separadamente:

       ```bash
       cd backend
       npm run dev
       ```

       ```bash
       cd ../frontend
       npm run dev
       ```

4. Acesse a aplicação:  
   Frontend: [http://localhost:3000](http://localhost:3000)

---

## Documentação da API

### **POST /courses**  
**Descrição**: Cria um curso.  
**Exemplo de Parâmetros**:

```json
{
  "title": "Curso Node.js",
  "description": "Curso completo Node.js"
}
```

**Resposta**:

```json
{
  "id": "dfbe137e-80ac-4049-8e6b-2972ba5c0b9e"
}
```

---

### **GET /courses**  
**Descrição**: Retorna os cursos cadastrados.  
**Resposta**:

```json
[
  {
    "id": "1560d135-a4f4-4622-a3dc-7dd9bb4dd068",
    "title": "Curso iniciante de Next",
    "description": "Curso para iniciantes de Next",
    "createdAt": "2025-01-18T21:09:19.300Z",
    "hours": 12
  }
]
```

---

### **GET /courses/:id**  
**Descrição**: Retorna o curso com id correspondente.  

**Exemplo de Parâmetros**:

```json
{
    "id": "1560d135-a4f4-4622-a3dc-7dd9bb4dd068"
}
```

**Resposta**:

```json
[
  {
    "id": "1560d135-a4f4-4622-a3dc-7dd9bb4dd068",
    "title": "Curso iniciante de Next",
    "description": "Curso para iniciantes de Next",
    "createdAt": "2025-01-18T21:09:19.300Z",
    "hours": 12
  }
]
```

---

### **POST /users**  
**Descrição**: Cria um usuário.  
**Exemplo de Parâmetros**:

```json
{
  "name": "João Silva",
  "email": "joao.silva@email.com"
}
```

**Resposta**:

```json
{
  "id": "bf2aeb1b-9f86-45bc-bd4f-9cb62a6a9fd4"
}
```

---

### **GET /users**  
**Descrição**: Lista os usuários cadastrados.  
**Resposta**:

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

---

### **GET /users/:id**  
**Descrição**: Retorna o usuário com id correspondente.  

**Exemplo de Parâmetros**:

```json
{
    "id": "bf2aeb1b-9f86-45bc-bd4f-9cb62a6a9fd4"
}
```

**Resposta**:

```json
{
 "id": "bf2aeb1b-9f86-45bc-bd4f-9cb62a6a9fd4",
 "name": "João Silva",
 "createdAt": "2025-01-18T20:51:14.330Z",
 "email": "joao.silva@email.com",
 "enrollments": []
}
```

---

### **POST /enrollments**  
**Descrição**: Cria um histórico de compra de curso do usuário.  
**Exemplo de Parâmetros**:

```json
{
  "userId": "bf2aeb1b-9f86-45bc-bd4f-9cb62a6a9fd4",
  "courseId": "dfbe137e-80ac-4049-8e6b-2972ba5c0b9e"
}
```

**Resposta**:

```json
{
  "id": "dfbe137e-80ac-4049-8e6b-2972ba5c0b9e"
}
```

---

### **GET /enrollments**  
**Descrição**: Retorna os históricos de compras de cursos de todos os usuários.  
**Resposta**:

```json
[
   {
      "id": "fb8fdb6f-92a4-4e3b-8d5e-4345df6bc3a6",
      "userId": "bf2aeb1b-9f86-45bc-bd4f-9cb62a6a9fd4",
      "courseId": "dfbe137e-80ac-4049-8e6b-2972ba5c0b9e",
      "enrolledAt": "2025-01-18T21:13:20.067Z",
      "course": {
         "id": "dfbe137e-80ac-4049-8e6b-2972ba5c0b9e",
         "title": "Node.js Básico",
         "createdAt": "2025-01-18T21:06:25.864Z",
         "description": "Curso completo de Node.js Básico",
         "hours": 30
      },
      "user": {
         "id": "bf2aeb1b-9f86-45bc-bd4f-9cb62a6a9fd4",
         "name": "João Silva",
         "createdAt": "2025-01-18T20:51:14.330Z",
         "email": "joao.silva@email.com"
      }
   }
]
```

---

### **GET /enrollments/:userId**  
**Descrição**: Retorna os históricos de compras de cursos de todos os usuários.
**Exemplo de Parâmetros**:

```json
{
  "userId": "bf2aeb1b-9f86-45bc-bd4f-9cb62a6a9fd4",
}

**Resposta**:

```json
{
   "id": "fb8fdb6f-92a4-4e3b-8d5e-4345df6bc3a6",
   "userId": "bf2aeb1b-9f86-45bc-bd4f-9cb62a6a9fd4",
   "courseId": "dfbe137e-80ac-4049-8e6b-2972ba5c0b9e",
   "enrolledAt": "2025-01-18T21:13:20.067Z",
   "course": {
      "id": "dfbe137e-80ac-4049-8e6b-2972ba5c0b9e",
      "title": "Node.js Básico",
      "createdAt": "2025-01-18T21:06:25.864Z",
      "description": "Curso completo de Node.js Básico",
      "hours": 30
   },
   "user": {
      "id": "bf2aeb1b-9f86-45bc-bd4f-9cb62a6a9fd4",
      "name": "João Silva",
      "createdAt": "2025-01-18T20:51:14.330Z",
      "email": "joao.silva@email.com"
   }
}
```

---

## Detalhes Técnicos

### Backend

- **Express**: Gerenciamento de rotas.  
- **Prisma**: ORM para banco de dados.  
- **Moment.js**: Manipulação de datas.  
- **Node.js**: Plataforma de execução.  

### Frontend

- **Next.js**: Framework React para páginas estáticas e dinâmicas.  
- **ShadCN**: Biblioteca de componentes visuais.

### Docker

- Utilizado para consistência no ambiente de desenvolvimento e produção.  
- Pode ser aprimorado para incluir **PM2** para gerenciamento de processos.

---

## Considerações Finais

Este projeto foi desenvolvido como uma solução simples e funcional para gerenciamento de cursos, utilizando tecnologias modernas e práticas recomendadas para desenvolvimento web. O uso de contêineres e infraestrutura na nuvem torna a aplicação escalável e fácil de gerenciar.  
