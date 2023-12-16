# cy-básico-v2

Projeto do curso Testes automatizados com Cypress de Walmyr Filho

## Pré-requisitos

É requerido o Node.js e npm instalados para executar esse projeto.

> Eu usei as versões `v16.13.2` e `8.3.2` do Node.js e npm, respectivamente. Sugiro que utilize as mesmas versões ou mais atuais.

## Instalação

Execute `npm install` (ou `npm i`) para instalar as dependências de dev.

## Testes

Você pode executar os testes em viewport mobile ou de desktop.

### Desktop

Execute `npm test` (or `npm t`) para executar no modo headless em uma viewport de Desktop.

Ou, execute `npm run cy:open` para abrir o Cypress no modo interativo em uma viewport de Desktop.

### Mobile

Execute `npm test:mobile` para executar no modo headless em uma viewport de mobile.

Ou, execute `npm run cy:open:mobile` para abrir o Cypress no modo interativo em uma viewport de mobile.
