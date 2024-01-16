import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Register({ onRegister }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    function handleEmailChange(e) {
        setEmail(e.target.value);
      }

      function handlePasswordChange(e) {
        setPassword(e.target.value);
      }
      
      const handleSubmit = (target) => {
        target.preventDefault();

        if (!email || !password) {
          return;
        }
        onRegister(email, password).then(() => {
          navigate("/sign-in");
        });
    }
      
    return(
        <div className="auth">
            <h2 className="auth__title">Регистрация</h2>
            <form  className="auth__form" onSubmit={handleSubmit}>
            <div className="auth__field">
                <input type="email" id="email" name="email" placeholder="Email" className="auth__input" value={email} onChange={handleEmailChange} required />
                <input type="password" id="password"  name="password" placeholder="Пароль" className="auth__input" value={password} onChange={handlePasswordChange} required />
              </div>
                <button className="auth__submit">Зарегистрироваться</button>
                <p className="auth__register">Уже зарегистрированы? <Link to="/sign-in" className="auth__login">Войти</Link></p>
            </form>
        </div>
    )
};

export default Register;