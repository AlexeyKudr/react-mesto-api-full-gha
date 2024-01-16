import React from "react";
import logo from "../images/mesto-logo.svg";
import { Link, useLocation } from 'react-router-dom'

function Header({loggedIn, userEmail, onSignOut}) {
  const location = useLocation();

  return (
    <header className="header">
      <img src={logo} alt="место" className="header__logo" />
      <div className="header__nav">
      {loggedIn ? (
                <>
                    <h2 className="header__email">{userEmail}</h2>
                    <Link to="/sign-in" className="header__exit" onClick={onSignOut}>Выйти</Link>
                </>
            ) : (
                <>
                    {location.pathname.includes('sign-in') && <Link to="/sign-up" className="header__link">Регистрация</Link>}
                    {location.pathname.includes('sign-up') && <Link to="/sign-in" className="header__link">Войти</Link>}
                </>
            )}
            </div>
    </header>
  );
}

export default Header;
