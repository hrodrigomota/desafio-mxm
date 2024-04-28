<div align="center">

# Desafio FullStack - MXM Sistemas

![MXM](./frontend/src/assets/mxm-logo.png)

</div>

## 📖 Sobre o Desafio

O desafio consiste em criar uma tela de cadastro de pessoa, onde deverá constar as informações abaixo, que deverão ser persistidas em qualquer banco de dados:

- Nome
- CPF ou CNPJ (com máscara)
- E-mail
- Telefone
- Endereço

*Observação: O campo CEP, presente nas informações de Endereço, deverá carregar as informações de endereços através de uma API.

### Regras

- Tecnologias preferenciais:
  - Angular
  - .NET

### Funcionalidades

- Carregar informações de endereço (Logradouro, Bairro, Cidade e Estado) associados ao CEP indicado, através da utilização do método GET da API ViaCEP.

- Cadastrar informações de usuário (Nome Completo, CPF ou CNPJ, E-mail, Telefone e Endereço) através da utilização do método POST da API criada no backend.

### Regras de Negócio

- O campo CPF ou CNPJ apresenta máscara de formatação.

- Os campos editáveis do formulário, com exceção do campo Complemento, por ser opcional, apresentam validações específicas.

- Ao efetuar o cadastro, é exibido na tela um alert personalizado com uma mensagem contendo "Cadastro efetuado com sucesso!".

- O usuário não pode ser cadastrado com o mesmo CPF ou CNPJ já existente na base de dados.

  - É exibido na tela um alert personalizado com uma mensagem de erro contendo "O CPF ou CNPJ já foi cadastrado." ao tentar realizar a requisição com um CPF ou CNPJ já existente na base.

- O usuário não pode ser cadastrado com o mesmo E-mail já existente na base de dados.

  - É exibido na tela um alert personalizado com uma mensagem de erro contendo "O E-mail já foi cadastrado." ao tentar realizar a requisição com um E-mail já existente na base.

### Tecnologias Utilizadas

- Angular
- Typescript
- Ngx Mask
- CSS
- Bootstrap
- C#
- .NET
- Sqlite

## 🎨 Layout

O layout da aplicação apresenta responsividade para dispositivos móveis, tablet e desktop e foi criado através do CSS, com utilização de Bootstrap apenas nos componentes.

<p align="center">
  <img src="./frontend/src/assets/project-screen.png" alt="Project Screen" width="800px">
</p>

## ⚙️ Como Executar

Para executar essa aplicação localmente, em seu terminal, realize o clone do repositório

```
git clone https://github.com/hrodrigomota/desafio-mxm.git
```

### Frontend

Acesse a pasta frontend pelo terminal
```
cd desafio-mxm/frontend
```
Execute instalação das dependências
```
npm install
```
Execute o comando abaixo para rodar a aplicação
```
ng serve
```
Acesse a aplicação no navegador através do link: https://localhost:4200

### Backend

Acesse a pasta backend pelo terminal
```
cd desafio-mxm/backend
```
Execute o comando abaixo para rodar a aplicação
```
dotnet run
```

### Integração entre o Backend e o Frontend

Acesse o arquivo "user.service.ts" no caminho "frontend/src/app/services" e altere a URL presente no retorno da função signUp, utilizando a URL que o .NET forneceu acrescida de "/users" no final, conforme exemplo abaixo:

```ts
  // Exemplo levando em consideração que a URL fornecida pelo .NET foi http://localhost:5038

  signUp(user: User):Observable<User>{
    return this.http.post<User>("http://localhost:5038/users", user);
  }

```

## 🚀 Deploy

Clique no link abaixo para acessar o projeto:

- [Desafio FullStack - MXM Sistemas](https://app-desafio-mxm.netlify.app/)