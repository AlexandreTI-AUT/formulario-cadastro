# Formulário de Cadastro

Este formulário de cadastro contém campos que são validados antes de ser enviado. A seguir estão as regras para cada campo do formulário.

## Campos do Formulário

### 1. **Nome**
- **Requisito**: O campo `Nome` é obrigatório.
- **Validação**: Não pode estar vazio. Caso esteja vazio, será exibida uma mensagem de erro: `"Nome é obrigatório"`.

### 2. **Email**
- **Requisito**: O campo `Email` deve seguir o formato de um endereço de email válido.
- **Validação**: O email será validado usando uma expressão regular que verifica o formato básico de um email (`exemplo@dominio.com`).
  - Caso o formato seja inválido, a mensagem de erro será: `"Email inválido"`.

### 3. **Telefone**
- **Requisito**: O campo `Telefone` deve ser preenchido com um número de telefone no formato brasileiro.
- **Validação**: O número pode ser inserido no formato com ou sem parênteses e traços:
  - Formato aceito: `(XX) XXXXX-XXXX` ou `XXXXXXXXXXX`.
  - Caso o número seja inválido, a mensagem de erro será: `"Telefone inválido"`.
  
### 4. **Data de Nascimento**
- **Requisito**: O campo `Data de Nascimento` deve ser preenchido.
- **Validação**: A data de nascimento pode ser inserida de duas formas:
  - Formato `dd/mm/yyyy` ou `ddmmyyyy`.
  - Caso a data seja inválida, a mensagem de erro será: `"Data de nascimento inválida"`.

### 5. **Gênero**
- **Requisito**: O campo `Gênero` é obrigatório.
- **Validação**: O usuário deve escolher uma das opções de gênero:
  - Masculino
  - Feminino
  - Outro
  - Caso nenhuma opção seja selecionada, a mensagem de erro será: `"Selecione um gênero"`.

### 6. **Comentário**
- **Requisito**: O campo `Comentário` é opcional.
- **Validação**: O comentário não pode exceder 250 caracteres.
  - Caso o comentário ultrapasse esse limite, a mensagem de erro será: `"Comentário excedeu o limite de 250 caracteres"`.

### 7. **Senha**
- **Requisito**: O campo `Senha` deve ter pelo menos 6 caracteres.
- **Validação**: A senha deve ter 6 ou mais caracteres.
  - Caso a senha tenha menos de 6 caracteres, a mensagem de erro será: `"Senha deve ter pelo menos 6 caracteres"`.

## Mensagens de Erro
- **Erro na validação do formulário**: Se algum dos campos não passar na validação, a mensagem de erro será exibida em vermelho, como `"Erro na validação do formulário."`.
- **Sucesso**: Quando o formulário é validado corretamente, a mensagem de sucesso será exibida em verde, como `"Formulário enviado com sucesso!"`.

## Regras Adicionais
- Todos os campos são validados quando o formulário é submetido.
- A validação é feita ao submeter o formulário, e o formulário não é enviado até que todos os campos estejam válidos.
- Os campos `Telefone`, `Data de Nascimento` e `Comentário` aceitam entradas com formatação específica, conforme descrito nas regras acima.

## Estilos
- As mensagens de erro são exibidas em vermelho e as de sucesso em verde.
- O formulário tem uma aparência limpa, com bordas arredondadas e um fundo branco.

## Tecnologias Usadas
- **React**: Para a construção do formulário.
- **CSS**: Para a estilização do formulário e das mensagens.

## Como Rodar o Formulário na Web

### Passo 1: Clonar o Repositório
Caso ainda não tenha o código do formulário, siga os seguintes passos para clonar o repositório para o seu computador:

1. Abra o terminal.
2. Clone o repositório do projeto com o comando:


git clone <URL_DO_REPOSITORIO>

3. Entre no diretório do projeto:
cd <NOME_DO_REPOSITORIO>

### Passo 2: Instalar as Dependências
Dentro do diretório do projeto, instale as dependências usando o npm:
`npm install`

### Passo 3: Iniciar o Servidor
Após a instalação das dependências, inicie o servidor de desenvolvimento para rodar o projeto localmente:
`npm start`

### Passo 4: Acessar o Formulário na Web
Agora que o servidor está rodando, você pode acessar o formulário diretamente no seu navegador, indo até o endereço:

http://localhost:3000

---
Este documento descreve as regras de validação do formulário de cadastro. Por favor, siga as regras mencionadas para garantir a correta validação de todos os campos.
