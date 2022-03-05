### Projeto Blogs API

Esse projeto foi desenvolvido no curso de Desenvolvimento de Software Web da Trybe, no modulo de back-end. O objetivo desse projeto foi arquiteturar e desenvolver uma API em `Node.js` usando o pacote `sequelize` para fazer um `CRUD` de posts de blog. Começando pela API, foi desenvolvendo alguns endpoints (seguindo os princípios do REST) que se conectam ao banco de dados.

Para fazer um post é necessário usuário e login, portanto foi trabalhada a **relação entre** `user` e `post`. Também foi necessário a utilização de categorias para os posts, trabalhando a relação de `posts` para `categorias` e de `categorias` para `posts`.


---


# Habilidades 

Neste projeto, desenvolvi as seguintes habilidades:

 - Criar e associar tabelas usando `models` do `sequelize`;
 - Construir endpoints para consumir os models criados; 
 - Fazer um `CRUD` com o `ORM`;

---


# Instruções para rodar o projeto no seu computador:


### ANTES DE COMEÇAR A DESENVOLVER:

1. Clone o repositório
  * `git clone git@github.com:Matheushg156/Project-Blogs-API.git`.
  * Entre na pasta do repositório que você acabou de clonar:
    * `cd sd-014-b-project-blogs-api`

2. Instale as dependências [**Caso existam**]
  * `npm install`

---