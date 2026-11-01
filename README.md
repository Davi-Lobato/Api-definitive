# APIs com Node.js — Aulas e Projetos

Tudo o que fiz na disciplina de APIs: exercícios das aulas, anotações e projetos práticos com Node.js e Express.

## Projetos

| Pasta | O que é |
|---|---|
| `api-cinema/` | API de cinema: filmes, salas, sessões, poltronas, clientes, ingressos e vendas, com banco MySQL |
| `api-bank-teste/` | API bancária simples com contas e transações, organizada em models, controllers e rotas |
| `api-contatos/` | API de cadastro de contatos |

## Aulas

| Pasta | Conteúdo |
|---|---|
| `API-TEST/` | Primeiros testes em JavaScript: variáveis, strings e objetos |
| `aula14-08/` | Exercícios de lógica em JavaScript (reajuste, imposto, posto, hipermercado) |
| `aula16-10/` | Primeira API com Express |
| `aula23-10/`, `aula06-11/` | Rotas e controllers de contatos; métodos HTTP |
| `categorias-inicio/` | Início do CRUD de categorias |
| `aula13-11/`, `aula20-11/` | Contatos e categorias com MySQL |

As anotações gerais das aulas estão em [`notas.md`](notas.md).

## Como rodar um projeto

Cada pasta é independente. Por exemplo:

```bash
cd api-cinema
npm install
npm start
```

Os projetos com MySQL precisam de um banco local; o `api-cinema` traz o script em `src/config/db_cinema_ingresso.sql`.

## Tecnologias

Node.js · Express · MySQL · Nodemon
