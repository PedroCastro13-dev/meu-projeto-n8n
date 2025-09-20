# n8n Custom Node: True Random Number Generator

Este repositório contém um conector (custom node) para a plataforma n8n que gera números inteiros verdadeiramente aleatórios, utilizando a API pública do **Random.org**.

O projeto inclui toda a configuração de infraestrutura necessária, utilizando Docker Compose, para subir uma instância local completa do n8n com um banco de dados PostgreSQL.

## Funcionalidades

-   **Node:** `Random`
-   **Operação:** `True Random Number Generator`
-   **Inputs:**
    -   `Min`: O menor valor inteiro a ser retornado (inclusivo).
    -   `Max`: O maior valor inteiro a ser retornado (inclusivo).
-   **Backend:** Utiliza o endpoint `GET /integers/` da API do [Random.org](http://Random.org) para garantir aleatoriedade de alta qualidade.
-   **Ícone Personalizado:** Um ícone de dado para fácil identificação na interface do n8n.

## Pré-requisitos

Antes de começar, garanta que você tenha as seguintes ferramentas instaladas:

-   [Docker Desktop](https://www.docker.com/get-started/) (utilizando o backend WSL 2 no Windows)
-   [Node.js](https://nodejs.org/) v22 (LTS) ou superior
-   [npm](https://www.npmjs.com/) (geralmente instalado com o Node.js)

## Instalação e Execução

Siga os passos abaixo para configurar e executar o ambiente n8n com o conector personalizado.

### 1. Clone o Repositório

```bash
git clone <URL_DO_SEU_REPOSITORIO>
cd meu-projeto-n8n
```

### 2. Configure as Variáveis de Ambiente

Crie um arquivo chamado `.env` na raiz do projeto, utilizando o `.env.example` como base.

**`.env.example`:**
```env
# Configurações do Banco de Dados PostgreSQL
POSTGRES_DB=n8n
POSTGRES_USER=n8n_user
POSTGRES_PASSWORD=mysecretpassword
```
*Copie o conteúdo acima e cole no seu novo arquivo `.env`.*

### 3. Suba os Serviços com Docker Compose

Com o Docker Desktop em execução, execute o seguinte comando na raiz do projeto:

```bash
docker-compose up -d
```
Este comando irá baixar as imagens do n8n e do PostgreSQL e iniciar os contêineres em segundo plano.

### 4. Acesse e Teste o n8n

Aguarde um ou dois minutos para os serviços iniciarem completamente.

-   **Acesse a URL:** `http://localhost:5678`
-   **Configure sua conta:** Na primeira vez, crie uma conta de administrador.
-   **Teste o conector:** Crie um novo workflow, clique no `+` e procure por "**Random**". Adicione-o, defina os valores de `Min` e `Max`, e execute para ver o resultado!

## Desenvolvimento

Se desejar modificar o conector:

1.  **Instale as dependências** do conector:
    ```bash
    cd custom-nodes/n8n-nodes-random
    npm install
    ```
2.  **Inicie o modo de desenvolvimento:**
    ```bash
    # No mesmo terminal acima
    npm run dev
    ```
    O TypeScript irá compilar automaticamente os arquivos a cada alteração salva. Basta atualizar a página do n8n no navegador para ver as mudanças.

## Solução de Problemas Comuns

-   **Erro `ERR_EMPTY_RESPONSE` ou n8n não carrega:**
    Isso geralmente indica que o contêiner do n8n não tem memória RAM suficiente para iniciar. A solução é aumentar a memória disponível para o WSL 2 (backend do Docker). Crie um arquivo em `C:\Users\<SeuUsuario>\.wslconfig` com o seguinte conteúdo e reinicie o Docker/WSL (`wsl --shutdown`):
    ```ini
    [wsl2]
    memory=6GB
    ```

-   **Erro do Docker sobre não encontrar o serviço (`pipe/docker_engine`):**
    Isso significa que o aplicativo **Docker Desktop não está em execução**. Abra-o pelo Menu Iniciar e aguarde a inicialização completa antes de usar os comandos `docker-compose`.

## Estrutura do Projeto

```
.
├── custom-nodes/
│   └── n8n-nodes-random/     # Pacote do conector customizado
│       ├── nodes/
│       │   └── Random/
│       │       ├── Random.node.ts  # Lógica e UI do conector
│       │       └── icon.svg        # Ícone do conector
│       ├── package.json
│       └── tsconfig.json
│
├── .env                      # Arquivo com as senhas (não deve ser enviado ao Git)
├── .env.example              # Exemplo de variáveis de ambiente
├── docker-compose.yml        # Orquestração dos contêineres n8n e Postgres
└── README.md                 # Este arquivo
```
