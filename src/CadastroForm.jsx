import React, { useState } from "react";
import "./CadastroForm.css";
import {
  FaUser,
  FaEnvelope,
  FaPhone,
  FaCalendar,
  FaLock,
  FaEye,
  FaEyeSlash,
  FaComment,
} from "react-icons/fa";

const INITIAL_FORM_STATE = {
  nome: "",
  email: "",
  telefone: "",
  nascimento: "",
  genero: "",
  senha: "",
  comentario: "",
  termos: false,
};

const REGEX = {
  email: /.+@.+\..+/,
  telefone: /^\(\d{2}\)\s\d{4,5}-\d{4}$/,
  nascimento: /^(0[1-9]|[12]\d|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/,
};

const formatters = {
  telefone: (value) => {
    const numbers = value.replace(/\D/g, "");
    const truncated = numbers.slice(0, 11);
    if (truncated.length <= 2) return truncated;
    if (truncated.length <= 7) {
      return `(${truncated.slice(0, 2)}) ${truncated.slice(2)}`;
    }
    return `(${truncated.slice(0, 2)}) ${truncated.slice(
      2,
      7
    )}-${truncated.slice(7)}`;
  },

  nascimento: (value) => {
    const numbers = value.replace(/\D/g, "");
    const truncated = numbers.slice(0, 8);
    if (truncated.length <= 2) return truncated;
    if (truncated.length <= 4) {
      return `${truncated.slice(0, 2)}/${truncated.slice(2)}`;
    }
    return `${truncated.slice(0, 2)}/${truncated.slice(2, 4)}/${truncated.slice(
      4
    )}`;
  },
};

const calcularForcaSenha = (senha) => {
  let forca = 0;
  if (senha.length >= 6) forca++;
  if (senha.match(/[A-Z]/)) forca++;
  if (senha.match(/[a-z]/)) forca++;
  if (senha.match(/[0-9]/)) forca++;
  if (senha.match(/[^A-Za-z0-9]/)) forca++;
  return forca;
};

const validators = {
  nome: (value) => (!value ? "Nome é obrigatório" : ""),
  email: (value) => (!REGEX.email.test(value) ? "Email inválido" : ""),
  senha: (value) => {
    if (!value) return "Senha é obrigatória";
    if (value.length < 6) return "Senha deve ter exatamente 6 caracteres";
    if (value.length > 6) return "Senha não pode ter mais de 6 caracteres";
    return "";
  },
  telefone: (value) => {
    if (!value) return "Telefone é obrigatório";
    if (!REGEX.telefone.test(value)) return "Telefone inválido";
    return "";
  },
  nascimento: (value) => {
    if (!value) return "Data de nascimento é obrigatória";
    if (!REGEX.nascimento.test(value)) return "Data de nascimento inválida";
    const [dia, mes, ano] = value.split("/").map(Number);
    const data = new Date(ano, mes - 1, dia);
    if (
      data.getFullYear() !== ano ||
      data.getMonth() !== mes - 1 ||
      data.getDate() !== dia
    ) {
      return "Data de nascimento inválida";
    }
    if (data > new Date()) {
      return "Data de nascimento não pode ser futura";
    }
    const hoje = new Date();
    const idade = hoje.getFullYear() - data.getFullYear();
    const mesAtual = hoje.getMonth();
    const diaAtual = hoje.getDate();
    const mesNasc = data.getMonth();
    const diaNasc = data.getDate();
    if (
      idade < 13 ||
      (idade === 13 &&
        (mesAtual < mesNasc || (mesAtual === mesNasc && diaAtual < diaNasc)))
    ) {
      return "Idade mínima permitida é 13 anos";
    }
    return "";
  },
  genero: (value) => (!value ? "Selecione um gênero" : ""),
  comentario: (value) =>
    value.length > 250 ? "Comentário excedeu o limite de 250 caracteres" : "",
  termos: (value) =>
    !value
      ? "Você deve aceitar os Termos de Uso e a Política de Privacidade"
      : "",
};

const CadastroForm = () => {
  const [form, setForm] = useState(INITIAL_FORM_STATE);
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [message, setMessage] = useState("");
  const [forcaSenha, setForcaSenha] = useState(0);
  const [touched, setTouched] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [aceitaTermos, setAceitaTermos] = useState(false);

  const validate = () => {
    const newErrors = {};
    Object.keys(form).forEach((field) => {
      if (field !== "comentario") {
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
    const { name, value, type, checked } = e.target;
    if (name === "senha" && value.length > 6) {
      return; // Não atualiza o estado se a senha tiver mais de 6 caracteres
    }
    const newValue = type === "checkbox" ? checked : value;
    const formatter = formatters[name];
    const formattedValue = formatter ? formatter(newValue) : newValue;

    setForm((prev) => ({ ...prev, [name]: formattedValue }));
    setTouched((prev) => ({ ...prev, [name]: true }));

    if (name === "termos") {
      setAceitaTermos(checked);
    }

    const error = validateField(name, formattedValue);
    setErrors((prev) => ({ ...prev, [name]: error }));

    if (name === "senha") {
      setForcaSenha(calcularForcaSenha(value));
    }

    setMessage("");
  };

  const validateField = (name, value) => {
    const validator = validators[name];
    return validator ? validator(value) : "";
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    const error = validateField(name, value);
    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);

    const allFieldsTouched = {};
    Object.keys(form).forEach((field) => {
      allFieldsTouched[field] = true;
    });
    setTouched(allFieldsTouched);

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
    setTouched({});
    setForcaSenha(0);
    setAceitaTermos(false);
  };

  const getForcaSenhaText = () => {
    const textos = ["Muito fraca", "Fraca", "Média", "Forte", "Muito forte"];
    return textos[forcaSenha - 1] || "";
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit} className="formulario">
        <h1>Criar Conta</h1>

        <div>
          <label>
            Nome: <span className="required">*</span>
          </label>
          <div className="input-container">
            <FaUser className="input-icon" />
            <input
              type="text"
              name="nome"
              value={form.nome}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder=""
              data-testid="input-nome"
              className={
                touched.nome || submitted
                  ? errors.nome
                    ? "input-error"
                    : "input-success"
                  : ""
              }
            />
          </div>
          {(touched.nome || submitted) && errors.nome && (
            <span>{errors.nome}</span>
          )}
        </div>

        <div>
          <label>
            Email: <span className="required">*</span>
          </label>
          <div className="input-container">
            <FaEnvelope className="input-icon" />
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder=""
              data-testid="input-email"
              className={
                touched.email || submitted
                  ? errors.email
                    ? "input-error"
                    : "input-success"
                  : ""
              }
            />
          </div>
          {(touched.email || submitted) && errors.email && (
            <span>{errors.email}</span>
          )}
        </div>

        <div>
          <label>
            Telefone (Brasil): <span className="required">*</span>
          </label>
          <div className="input-container">
            <FaPhone className="input-icon" />
            <input
              type="text"
              name="telefone"
              value={form.telefone}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder=""
              data-testid="input-telefone"
              className={
                touched.telefone || submitted
                  ? errors.telefone
                    ? "input-error"
                    : "input-success"
                  : ""
              }
            />
            {!form.telefone && (
              <div className="input-mask">(XX) XXXXX-XXXX</div>
            )}
          </div>
          {(touched.telefone || submitted) && errors.telefone && (
            <span>{errors.telefone}</span>
          )}
        </div>

        <div>
          <label>
            Data de Nascimento: <span className="required">*</span>
          </label>
          <div className="input-container">
            <FaCalendar className="input-icon" />
            <input
              type="text"
              name="nascimento"
              value={form.nascimento}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder=""
              data-testid="input-nascimento"
              className={
                touched.nascimento || submitted
                  ? errors.nascimento
                    ? "input-error"
                    : "input-success"
                  : ""
              }
            />
            {!form.nascimento && <div className="input-mask">DD/MM/AAAA</div>}
          </div>
          {(touched.nascimento || submitted) && errors.nascimento && (
            <span>{errors.nascimento}</span>
          )}
        </div>

        <div>
          <label>
            Gênero: <span className="required">*</span>
          </label>
          <div className="genero-opcoes">
            {["Masculino", "Feminino", "Outro"].map((opcao) => (
              <label key={opcao}>
                <input
                  type="radio"
                  name="genero"
                  value={opcao}
                  checked={form.genero === opcao}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {opcao}
              </label>
            ))}
          </div>
          {(touched.genero || submitted) && errors.genero && (
            <span>{errors.genero}</span>
          )}
        </div>

        <div>
          <label>Comentário (até 250 caracteres):</label>
          <div className="input-container">
            <FaComment className="input-icon" />
            <textarea
              name="comentario"
              value={form.comentario}
              onChange={handleChange}
              onBlur={handleBlur}
              maxLength={250}
              placeholder=""
              data-testid="input-comentario"
              className={
                touched.comentario && errors.comentario ? "input-error" : ""
              }
            />
          </div>
          <div className="caracteres-contador">
            {form.comentario.length}/250 caracteres
          </div>
          {(touched.comentario || submitted) && errors.comentario && (
            <span>{errors.comentario}</span>
          )}
        </div>

        <div>
          <label>
            Senha: <span className="required">*</span>
          </label>
          <div className="input-container">
            <FaLock className="input-icon" />
            <input
              type={showPassword ? "text" : "password"}
              name="senha"
              maxlength="6"
              value={form.senha}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder=""
              data-testid="input-senha"
              className={
                touched.senha || submitted
                  ? errors.senha
                    ? "input-error"
                    : "input-success"
                  : ""
              }
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="toggle-password"
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
          {form.senha && (
            <div className="senha-forca">
              <div className="forca-barra">
                {[...Array(5)].map((_, index) => (
                  <div
                    key={index}
                    className={`forca-nivel ${
                      index < forcaSenha ? "ativo" : ""
                    }`}
                  />
                ))}
              </div>
              <span className="forca-texto">{getForcaSenhaText()}</span>
            </div>
          )}
          {(touched.senha || submitted) && errors.senha && (
            <span>{errors.senha}</span>
          )}
        </div>

        <div>
          <label className="checkbox-label">
            <input
              type="checkbox"
              name="termos"
              checked={aceitaTermos}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            Li e aceito os <a href="/termos-de-uso">Termos de Uso</a> e a{" "}
            <a href="/politica-de-privacidade">Política de Privacidade</a>
          </label>
          {(touched.termos || submitted) && errors.termos && (
            <span>{errors.termos}</span>
          )}
        </div>

        <div className="button-group">
          <button
            type="button"
            onClick={handleReset}
            data-testid="btn-reset"
            className="btn-reset"
          >
            Limpar
          </button>
          <button type="submit" data-testid="btn-submit">
            Cadastrar
          </button>
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
