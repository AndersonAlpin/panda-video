# Panda Video

O projeto **Panda Video** é composto por um **Frontend** desenvolvido com Vue.js e Vuetify, e um **Backend** desenvolvido com Node.js e Express. O frontend consome a API fornecida pelo backend, permitindo que os usuários interajam com vídeos de maneira simples e eficiente.

## Estrutura das Pastas
<pre>
/panda-video
  /backend
  /frontend
</pre>

## Tecnologias Utilizadas

### Frontend
- **Vue.js**: Framework JavaScript para construção da interface do usuário.
- **Vuetify**: Biblioteca de componentes baseada em Material Design para Vue.js.
- **Axios**: Cliente HTTP para consumir a API backend.

### Backend
- **Node.js**: Ambiente de execução JavaScript no servidor.
- **Express**: Framework para construção de APIs RESTful.
- **PostgreSQL**: Banco de dados relacional utilizado para armazenar dados do projeto.
- **Redis**: Banco de dados de cache utilizado para armazenar a resposta das listagens de vídeos.
- **JWT**: Autenticação utilizando JSON Web Token.

## Como Rodar

#### Usuário Padrão
**email**: admin@gmail.com <br>
**senha**: 1234

**Clone este repositório para sua máquina local:**
```bash
git clone https://github.com/AndersonAlpin/panda-video.git
```

### Frontend
#### Requisitos
- **Node.js**: Certifique-se de que o Node.js está instalado. Caso não tenha, baixe e instale a partir de https://nodejs.org/.

#### Passos para rodar o projeto:

1. Navegue até o diretório do projeto:
```bash
cd frontend
```

2. Instale as dependências:
```bash
npm install
```

3. Inicie o frontend:
```bash
npm run dev
```

### Backend
#### Requisitos

- **Docker**:Certifique-se de que o Docker e Docker Compose estão instalados. Caso não tenha, baixe e instale a partir de https://www.docker.com/get-started.

#### Passos para rodar o projeto:

1. Navegue até o diretório do projeto:
```bash
cd backend
```

2. Crie um arquivo .env na raiz do projeto a partir do arquivo .env.example <br>
**Valores padrões já estão definidos**

3. Instale as dependências:
```bash
npm install
```

4. Inicie o projeto com Docker Compose:
```bash
docker-compose up --build
```
