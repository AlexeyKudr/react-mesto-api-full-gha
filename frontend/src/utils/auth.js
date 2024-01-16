export const BASE_URL = 'https://auth.nomoreparties.co';

export const register = (email, password) => {
        return fetch(`${BASE_URL}/signup`, {
            method: "POST",
            headers: {
                'Content-Type': "application/json"
            },
            body: JSON.stringify({
                password: password,
                email: email
            })
        })
        .then(getResponse);
};

export const authorize = (email, password) => {
        return fetch(`${BASE_URL}/signin`, {
            method: "POST",
            headers: {
                'Content-Type': "application/json"
            },
            body: JSON.stringify({
                password: password,
                email: email
            })
        })
        .then(getResponse);
};

export const checkToken = (token) => {
        return fetch(`${BASE_URL}/users/me`, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        })
        .then(getResponse);
};

const TOKEN_KEY = 'token';

export const setToken = (token) => {
  localStorage.setItem(TOKEN_KEY, token);
};

export const getToken = () => localStorage.getItem(TOKEN_KEY);

export const removeToken = () => {
  localStorage.removeItem(TOKEN_KEY)
};



function getResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`)
};

