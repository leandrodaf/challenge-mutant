
# challenge-mutant

## Desafio proposto para a vaga de desenvolvedor backend.


## Problema:

Sua tarefa é fazer um aplicativo que carregue a saida da URL [https://jsonplaceholder.typicode.com/users](https://jsonplaceholder.typicode.com/users), que retorna uma lista de usuário em JSON.

Faça um programa que carregue a saída dessa URL e mostre os seguintes dados:
1.  Os websites de todos os usuários
2.  O Nome, email e a empresa em que trabalha (em ordem alfabética).
3.  Mostrar todos os usuários que no endereço contém a palavra suite
4.  Salvar logs de todas interações no elasticsearch
5.  EXTRA: Criar test unitário para validar os itens a cima

### Resolução
Foi utilizado o superset do TypeScript junto com o framework Koajs, a decisão de escolha foi pela a velocidade do framework e a facilidade de implementação em um ambiente Docker.

- Para simular e testar a aplicação foi utilizado o docker-composer que virtualiza a rede, com a aplicação e o elasticsearch.

- O projeto seguiu os principios do SOLID, em uma arquitetura organizacional simplificada, utilizando padroẽs de serviço, integração de api e transformadores.

 - Para padronização e validação do código, foi adicionado o eslint junto a prettier.
Para métricas de qualidade foi adicionado o codelcimate.
 
### Requisitos
- Docker version => 19.03.12
- Docker Compose version => 1.25.0
  
## Comandos make
| Comando | Descrição |
|--|--|
| tests | Roda toda a suite de testes unitários e aceitação |
| attach | Acessa o container App onde esta aplicação |
| install | Roda o comando composer install, baixa as dependências do projeto |
| stop | Para a execução de toda a suíte do docker-compose em execução |
| up | Inicia toda a suite de aplicações do docker-compose |
| lint | Aplica as regras de validação e padronização de código em toda a aplicação |
| build-project-production | Faz o build para produção (apenas o cogio de produção)  |
| build-docker-production | Faz o build para produção imagem Docker (Códgo de container)  |

### Váriaveis de ambiente
| Nome | Valor Padrão | Descrição | 
|--|--|--|
| PORT | 8080 | Porta http de execução da aplicação |
| NODE_ENV | development | Ambiente de execução (production, homolog, development) |
| ELASTIC_HOST | http://elasticsearch:9200 | Endereço do servidor elasticsearch |

## Executar o projeto em desenvolvimento
Execute os comandos na sequencia

1. `cp .env.example .env` para clonar as variáveis de ambiente
2. Preencher as váriaveis com as devidas informações
3. `make up` para iniciar toda a aplicação
