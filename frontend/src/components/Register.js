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
          console.log(onRegister);
        });
    }
      
    return(
        <div className="authorization">
            <h2 className="authorization__header">Регистрация</h2>
            <form  className="authorization__form" onSubmit={handleSubmit}>
            <div className="authorization__field">
                <input type="email" id="email" name="email" placeholder="Email" className="authorization__input" value={email} onChange={handleEmailChange} required />
                <input type="password" id="password"  name="password" placeholder="Пароль" className="authorization__input" value={password} onChange={handlePasswordChange} required />
              </div>
                <button className="authorization__submit">Зарегистрироваться</button>
                <p className="authorization__register">Уже зарегистрированы? <Link to="/sign-in" className="authorization__login">Войти</Link></p>
            </form>
        </div>
    )
};

export default Register;