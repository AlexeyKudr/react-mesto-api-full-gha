import React, { useState } from "react";

function Login({ onLogin }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const resetForm = () => {
        setEmail('');
        setPassword('');
      };

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
      onLogin(email, password)
      .then(resetForm)
    }
      
    return(
        <div className="authorization">
            <h2 className="authorization__header">Вход</h2>
            <form className="authorization__block" onSubmit={handleSubmit}>
              <div className="authorization__inputs">
                <input type="email" id="email" name="email" placeholder="Email" className="authorization__input" value={email} onChange={handleEmailChange} required />
                <input type="password" id="password"  name="password" placeholder="Пароль" className="authorization__input" value={password} onChange={handlePasswordChange} required />
                <button type="submit" className="authorization__submit">Войти</button>
                </div>
            </form>
        </div>
    )
}


export default Login;