# Dimdim

## Descrição
Dimdim é uma API desenvolvida com Express.js e OracleDB que permite a criação, leitura, atualização e exclusão de itens de uma playlist musical. O projeto utiliza Docker para containerização, facilitando a configuração e execução do ambiente.

## Integrantes
- Ana Paula Nascimento Silva - RM552513
- Calina Thalya Santana da Silva - RM552523
- Geovana Ribeiro Domingos Silva - RM99646
- Leonardo Camargo Lucena - RM552537
- Nathan Nunes Calsonari - RM552539

## Requisitos
- Docker
- Docker Compose

## Instalação
1. Clone este repositório:
    ```sh
    git clone https://github.com/seu-usuario/dimdim.git
    cd dimdim
    ```
2. Construa e inicie os contêineres Docker:
    ```sh
    docker-compose up --build
    ```

## Uso
A API estará disponível na porta 8000. Você pode testar os seguintes endpoints:
- `GET /`: Testa a conexão com a API.
- `GET /items`: Lista todos os itens da playlist.
- `POST /items`: Cria um novo item na playlist.
    - Corpo da requisição:
    ```json
    {
      "nm_musica": "Nome da Música",
      "nm_banda": "Nome da Banda",
      "nm_genero": "Gênero Musical"
    }
    ```
- `PUT /items/:id`: Atualiza o nome de uma música.
    - Corpo da requisição:
    ```json
    {
      "nm_musica": "Novo Nome da Música"
    }
    ```
- `DELETE /items/:id`: Deleta um item da playlist.

## Estrutura do Projeto
- `Dockerfile`: Define a imagem Docker para o servidor Node.js.
- `docker-compose.yml`: Configura o Docker Compose para orquestrar os contêineres do banco de dados Oracle e da API.
- `package.json`: Gerencia as dependências do projeto.
- `server.js`: Código fonte principal do servidor Express.js.

## Tecnologias Utilizadas
- Node.js
- Express.js
- OracleDB
- Docker
- Docker Compose

## Configuração do Banco de Dados Oracle
A configuração do banco de dados Oracle é realizada através das variáveis de ambiente definidas no `Dockerfile` e no `docker-compose.yml`.
