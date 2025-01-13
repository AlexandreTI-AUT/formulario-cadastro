# Formulário de Cadastro - Documentação

## 📝 Descrição
Este é um formulário de cadastro desenvolvido em React com validações em tempo real, formatação automática e feedback visual para o usuário.

## 🚀 Tecnologias Utilizadas
- React.js
- CSS3
- React Icons

## 🔍 Campos e Validações

### Nome
```javascript
- Tipo: Texto
- Obrigatório: Sim
- Validações:
  * Não pode estar vazio
- Feedback: Visual em tempo real com cores de sucesso/erro
```

### Email
```javascript
- Tipo: Email
- Obrigatório: Sim
- Validações:
  * Formato válido (deve conter @ e domínio)
  * Não pode estar vazio
- Feedback: Visual em tempo real com cores de sucesso/erro
```

### Telefone
```javascript
- Tipo: Texto com máscara
- Obrigatório: Sim
- Formato: (XX) XXXXX-XXXX
- Validações:
  * Formato brasileiro válido
  * Exatamente 11 dígitos numéricos
  * Apenas números são aceitos (outros caracteres são removidos automaticamente)
- Formatação Automática:
  * Insere parênteses após DDD
  * Insere hífen antes dos últimos 4 dígitos
  * Máscara visual quando vazio: (XX) XXXXX-XXXX
- Feedback: Visual em tempo real
```

### Data de Nascimento
```javascript
- Tipo: Texto com máscara
- Obrigatório: Sim
- Formato: DD/MM/AAAA
- Validações:
  * Formato válido
  * Data existente (considera meses com 30/31 dias e anos bissextos)
  * Não pode ser data futura
  * Idade mínima de 13 anos
  * Apenas números são aceitos
- Formatação Automática:
  * Insere barras (/) automaticamente
  * Máscara visual quando vazio: DD/MM/AAAA
- Feedback: Visual em tempo real
```

### Gênero
```javascript
- Tipo: Radio buttons
- Obrigatório: Sim
- Opções: 
  * Masculino
  * Feminino
  * Outro
- Validações:
  * Uma opção deve ser selecionada
- Feedback: Mensagem de erro quando necessário
```

### Senha
```javascript
- Tipo: Password com toggle de visibilidade
- Obrigatório: Sim
- Validações:
  * Mínimo 6 caracteres
- Medidor de Força (pontuação):
  * +1 ponto: Comprimento mínimo (6 caracteres)
  * +1 ponto: Contém letra maiúscula
  * +1 ponto: Contém letra minúscula
  * +1 ponto: Contém número
  * +1 ponto: Contém caractere especial
- Níveis de Força:
  * 1 ponto: Muito fraca
  * 2 pontos: Fraca
  * 3 pontos: Média
  * 4 pontos: Forte
  * 5 pontos: Muito forte
- Feedback: 
  * Visual em tempo real
  * Barra de força da senha
  * Toggle de visibilidade
```

### Comentário
```javascript
- Tipo: Textarea
- Obrigatório: Não
- Validações:
  * Máximo 250 caracteres
- Feedback: 
  * Contador de caracteres em tempo real
  * Mensagem de erro quando excede o limite
```

## 🎯 Comportamentos Gerais

### Validação em Tempo Real
```javascript
- Validação ocorre durante a digitação
- Feedback visual imediato
- Mensagens de erro específicas
```

### Estados do Campo
```javascript
- Normal: Estado inicial
- Sucesso: Campo válido (borda verde)
- Erro: Campo inválido (borda vermelha)
```

### Botões
```javascript
1. Cadastrar
   - Submete o formulário
   - Valida todos os campos obrigatórios
   - Exibe mensagem de sucesso ou erro

2. Limpar
   - Reseta todos os campos
   - Limpa mensagens de erro
   - Reseta medidor de força da senha
```

### Mensagens
```javascript
- Sucesso: ✅ Cadastro realizado com sucesso!
- Erro: ⚠️ Por favor, preencha todos os campos obrigatórios.
```

## 🔧 Detalhes Técnicos

### RegEx Utilizadas
```javascript
const REGEX = {
  email: /.+@.+\..+/,
  telefone: /^\(\d{2}\)\s\d{4,5}-\d{4}$/,
  nascimento: /^(0[1-9]|[12]\d|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/
};
```

### Formatadores
```javascript
const formatters = {
  telefone: (value) => {
    // Remove tudo que não for número
    const numbers = value.replace(/\D/g, "");
    // Limita a 11 dígitos
    const truncated = numbers.slice(0, 11);
    // Aplica a máscara
    if (truncated.length <= 2) return truncated;
    if (truncated.length <= 7) {
      return `(${truncated.slice(0, 2)}) ${truncated.slice(2)}`;
    }
    return `(${truncated.slice(0, 2)}) ${truncated.slice(2, 7)}-${truncated.slice(7)}`;
  },

  nascimento: (value) => {
    // Remove tudo que não for número
    const numbers = value.replace(/\D/g, "");
    // Limita a 8 dígitos
    const truncated = numbers.slice(0, 8);
    // Aplica a máscara
    if (truncated.length <= 2) return truncated;
    if (truncated.length <= 4) {
      return `${truncated.slice(0, 2)}/${truncated.slice(2)}`;
    }
    return `${truncated.slice(0, 2)}/${truncated.slice(2, 4)}/${truncated.slice(4)}`;
  }
};
```

## 📚 Como Usar

1. Clone o repositório
2. Instale as dependências:
```bash
npm install
```

3. Execute o projeto:
```bash
npm start
```

## 🤝 Contribuindo

1. Faça o fork do projeto
2. Crie sua feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request