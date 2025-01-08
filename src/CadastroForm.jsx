import React, { useState } from "react";
import "./CadastroForm.css";

const INITIAL_FORM_STATE = {
  nome: "",
  email: "",
  telefone: "",
  nascimento: "",
  genero: "",
  senha: "",
  comentario: "",
};

const REGEX = {
  email: /.+@.+\..+/,
  telefone: /^(?:\(\d{2}\)\s?\d{4,5}-\d{4}|\d{11})$/,
  nascimento: /^(?:\d{2}\/\d{2}\/\d{4}|\d{8})$/,
};

const formatters = {
  telefone: (value) => {
    const numbers = value.replace(/\D/g, "");
    if (numbers.length <= 2) return numbers;
    if (numbers.length <= 7) {
      return numbers.replace(/(\d{2})(\d{5})/, "($1) $2");
    }
    return numbers.replace(/(\d{2})(\d{5})(\d{4})/, "($1) $2-$3");
  },

  nascimento: (value) => {
    const numbers = value.replace(/\D/g, "");
    if (numbers.length <= 2) return numbers;
    if (numbers.length <= 4) {
      return numbers.replace(/(\d{2})(\d{2})/, "$1/$2");
    }
    return numbers.replace(/(\d{2})(\d{2})(\d{4})/, "$1/$2/$3");
  },
};

const validators = {
  nome: (value) => (!value ? "Nome é obrigatório" : ""),
  email: (value) => (!REGEX.email.test(value) ? "Email inválido" : ""),
  senha: (value) =>
    value.length < 6 ? "Senha deve ter pelo menos 6 caracteres" : "",
  telefone: (value) => (!REGEX.telefone.test(value) ? "Telefone inválido" : ""),
  nascimento: (value) =>
    !REGEX.nascimento.test(value) ? "Data de nascimento inválida" : "",
  genero: (value) => (!value ? "Selecione um gênero" : ""),
  comentario: (value) =>
    value.length > 250 ? "Comentário excedeu o limite de 250 caracteres" : "",
};

const CadastroForm = () => {
  const [form, setForm] = useState(INITIAL_FORM_STATE);
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [message, setMessage] = useState("");

  const validate = () => {
    const newErrors = {};
    Object.keys(form).forEach((field) => {
      if (field !== "comentario") {
        // Comentário não é obrigatório
        const validateField = validators[field];
        if (validateField) {
          newErrors[field] = validateField(form[field]);
        }
      }
    });
    setErrors(newErrors);
    return Object.values(newErrors).every((error) => !error);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    const formatter = formatters[name];
    const formattedValue = formatter ? formatter(value) : value;

    setForm((prev) => ({ ...prev, [name]: formattedValue }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
    setMessage("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);

    if (validate()) {
      setMessage("✅ Cadastro realizado com sucesso!");
      setTimeout(() => {
        handleReset();
      }, 15000);
    } else {
      setMessage("⚠️ Por favor, preencha todos os campos obrigatórios.");
    }
  };

  const handleReset = () => {
    setForm(INITIAL_FORM_STATE);
    setErrors({});
    setMessage("");
    setSubmitted(false);
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
            onChange={handleChange}
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
            onChange={handleChange}
            data-testid="input-nascimento"
          />
          {submitted && errors.nascimento && <span>{errors.nascimento}</span>}
        </div>

        <div>
          <label>Gênero:</label>
          <div className="genero-opcoes">
            {["Masculino", "Feminino", "Outro"].map((opcao) => (
              <label key={opcao}>
                <input
                  type="radio"
                  name="genero"
                  value={opcao}
                  checked={form.genero === opcao}
                  onChange={handleChange}
                />
                {opcao}
              </label>
            ))}
          </div>
          {submitted && errors.genero && <span>{errors.genero}</span>}
        </div>

        <div>
          <label>Comentário (até 250 caracteres):</label>
          <textarea
            name="comentario"
            value={form.comentario}
            onChange={handleChange}
            maxLength={250}
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

        <div className="button-group">
          <div className="button-left">
            <button
              type="button"
              onClick={handleReset}
              data-testid="btn-reset"
              className="btn-reset"
            >
              Limpar
            </button>
          </div>
          <div className="button-right">
            <button type="submit" data-testid="btn-submit">
              Cadastrar
            </button>
          </div>
        </div>

        {message && (
          <div
            className={
              message.includes("sucesso") ? "success-message" : "error-message"
            }
          >
            {message}
          </div>
        )}
      </form>
    </div>
  );
};

export default CadastroForm;
