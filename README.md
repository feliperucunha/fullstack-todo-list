# Teste técnico JavaScript Viasoft
## Requisitos criados pela empresa
    **Desenvolva uma aplicação web com as seguintes especificações:**

1. Deve ser possível fazer login na aplicação (o cadastro de usuário não é mandatório, podendo ser previamente cadastrado);
2. Deve ser possível a um usuário fazer o cadastro de um feedback para outro usuário, contendo as seguintes informações:
- Usuário;
- Data;
- Pontos a melhorar;
- Pontos a manter;
- Sugestões;
- Feedback Final;
- Deve ser possível a edição de um feedback criado pelo usuário;
- Deve ser possível visualizar os feedbacks criados por mim e também os feedback que eu criei para outras pessoas.

**Requisitos técnicos:**

- As aplicação devem ser divididas em duas camadas: uma API e um frontend;
- A API deve ser feita com Node.js, com bibliotecas ou frameworks de sua escolha;
- A biblioteca frontend pode ser de sua escolha;
- O banco de dados pode ser da sua escolha;

## Como rodar a aplicação
    1. Instale o banco de dados https://www.mongodb.com/try/download/community
    2. Rode com "mongod" se já estiver no path ou com "mongod --config /usr/local/etc/mongod.conf"
    3. "yarn" na pasta raiz e depois "yarn" na pasta frontend.
    4. "yarn dev"

## Observações
    - No requisito "- Deve ser possível visualizar os feedbacks criados por mim e também os feedback que eu criei para outras pessoas." não sei o que o avaliador quis realmente dizer, mas ambos os feedbacks descritos se referem ao mesmo, ou seja, o que foi criado pelo usuário.
    - Desculpe pelo uso do inglês junto ao Português. Vi no código fonte do site da Viasoft que geralmente vocês utilizam bastante o Português no desenvolvimento, mas eu sempre usei o Inglês como padrão. Não é algo que não possa ser mudado.
    - A chave da API de email foi inserida hardcoded, pois não estava funcionando com variável. Julguei necessário continuar com o projeto e não perder tempo com isto já que quis entregar o teste o mais rápido possível.
    - A interface pode ser melhorada de forma considerável, no entanto, quis entregar um protótipo funcional rapidamente, pois não foi dada uma data de entrega, então julguei que seria o mais rápido possível.