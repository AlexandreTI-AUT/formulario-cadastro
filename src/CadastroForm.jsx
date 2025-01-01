import React, { useState } from "react";
import "./CadastroForm.css";

const CadastroForm = () => {
  const [form, setForm] = useState({
    nome: "",
    email: "",
    telefone: "",
    nascimento: "",
    genero: "",
    senha: "",
    comentario: "", // Adicionando campo comentário
  });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [message, setMessage] = useState("");

  const validate = () => {
    let tempErrors = {};
    tempErrors.nome = form.nome ? "" : "Nome é obrigatório";
    tempErrors.email = /.+@.+\..+/.test(form.email) ? "" : "Email inválido";
    tempErrors.senha =
      form.senha.length >= 6 ? "" : "Senha deve ter pelo menos 6 caracteres";

    // Regex para validar telefone com ou sem formatação
    tempErrors.telefone = /^(?:\(\d{2}\)\s?\d{4,5}-\d{4}|\d{11})$/.test(
      form.telefone
    )
      ? ""
      : "Telefone inválido";

    // Regex para validar data de nascimento com ou sem formatação
    tempErrors.nascimento = /^(?:\d{2}\/\d{2}\/\d{4}|\d{8})$/.test(
      form.nascimento
    )
      ? ""
      : "Data de nascimento inválida";

    tempErrors.genero = form.genero ? "" : "Selecione um gênero";
    tempErrors.comentario =
      form.comentario.length <= 250
        ? ""
        : "Comentário excedeu o limite de 250 caracteres";
    setErrors(tempErrors);

    return Object.values(tempErrors).every((x) => x === "");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
    setErrors({ ...errors, [name]: "" });
  };

  const handlePhoneChange = (e) => {
    let value = e.target.value.replace(/\D/g, ""); // Remove tudo o que não é número
    if (value.length <= 2) {
      value = value.replace(/(\d{2})/, "($1) "); // Formata o DDD
    } else if (value.length <= 7) {
      value = value.replace(/(\d{2})(\d{5})(\d{0,4})/, "($1) $2-$3"); // Formata o número
    } else {
      value = value.replace(/(\d{2})(\d{5})(\d{4})/, "($1) $2-$3"); // Formata o número completo
    }
    setForm({ ...form, telefone: value });
  };

  const handleDateChange = (e) => {
    let value = e.target.value.replace(/\D/g, ""); // Remove tudo o que não é número
    if (value.length <= 2) {
      value = value.replace(/(\d{2})/, "$1"); // Apenas o dia
    } else if (value.length <= 4) {
      value = value.replace(/(\d{2})(\d{2})/, "$1/$2"); // Adiciona a barra após o dia
    } else if (value.length <= 8) {
      value = value.replace(/(\d{2})(\d{2})(\d{4})/, "$1/$2/$3"); // Adiciona a barra após o mês e ano
    }
    setForm({ ...form, nascimento: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    if (validate()) {
      setMessage("Formulário enviado com sucesso!");
      setForm({
        nome: "",
        email: "",
        telefone: "",
        nascimento: "",
        genero: "",
        senha: "",
        comentario: "", // Resetando o campo comentário
      });
      setSubmitted(false);
    } else {
      setMessage("Erro na validação do formulário.");
    }
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit} className="formulario">
        <h1>Cadastro</h1>
        <div>
          <label>Nome:</label>
          <input
            type="text"
            name="nome"
            value={form.nome}
            onChange={handleChange}
            data-testid="input-nome"
          />
          {submitted && errors.nome && <span>{errors.nome}</span>}
        </div>
        <div>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            data-testid="input-email"
          />
          {submitted && errors.email && <span>{errors.email}</span>}
        </div>
        <div>
          <label>Telefone (Brasil):</label>
          <input
            type="text"
            name="telefone"
            placeholder="(XX) XXXXX-XXXX"
            value={form.telefone}
            onChange={handlePhoneChange} // Usando a função de formatação
            data-testid="input-telefone"
          />
          {submitted && errors.telefone && <span>{errors.telefone}</span>}
        </div>
        <div>
          <label>Data de Nascimento:</label>
          <input
            type="text"
            name="nascimento"
            placeholder="dd/mm/yyyy"
            value={form.nascimento}
            onChange={handleDateChange} // Usando a função de formatação
            data-testid="input-nascimento"
          />
          {submitted && errors.nascimento && <span>{errors.nascimento}</span>}
        </div>
        <div>
          <label>Gênero:</label>
          <div className="genero-opcoes">
            <label>
              <input
                type="radio"
                name="genero"
                value="Masculino"
                checked={form.genero === "Masculino"}
                onChange={handleChange}
              />
              Masculino
            </label>
            <label>
              <input
                type="radio"
                name="genero"
                value="Feminino"
                checked={form.genero === "Feminino"}
                onChange={handleChange}
              />
              Feminino
            </label>
            <label>
              <input
                type="radio"
                name="genero"
                value="Outro"
                checked={form.genero === "Outro"}
                onChange={handleChange}
              />
              Outro
            </label>
          </div>
          {submitted && errors.genero && <span>{errors.genero}</span>}
        </div>
        <div>
          <label>Comentário (até 250 caracteres):</label>
          <textarea
            name="comentario"
            value={form.comentario}
            onChange={handleChange}
            maxLength="250"
            data-testid="input-comentario"
          />
          {submitted && errors.comentario && <span>{errors.comentario}</span>}
        </div>
        <div>
          <label>Senha:</label>
          <input
            type="password"
            name="senha"
            value={form.senha}
            onChange={handleChange}
            data-testid="input-senha"
          />
          {submitted && errors.senha && <span>{errors.senha}</span>}
        </div>
        <button type="submit" data-testid="btn-submit">
          Cadastrar
        </button>
        {message && message.includes("sucesso") ? (
          <p className="message" data-testid="form-message">
            {message}
          </p>
        ) : (
          <p className="error-message" data-testid="form-message">
            {message}
          </p>
        )}
      </form>
    </div>
  );
};

export default CadastroForm;
