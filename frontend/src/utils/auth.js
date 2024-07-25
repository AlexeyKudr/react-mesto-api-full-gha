// export const BASE_URL = 'https://api.alexeykudr.nomoredomainsmonster.ru';
export const BASE_URL = 'http://localhost:3000';

export const register = (email, password) => {
        return fetch(`${BASE_URL}/signup`, {
            method: "POST",
            credentials: "include",
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
            credentials: "include",
            headers: {
                'Content-Type': "application/json"
            },
            body: JSON.stringify({
                password: password,
                email: email
            })
        })
        .then(getResponse)
        .then((data) => {
            localStorage.setItem('jwt', data.token)
            return data;
        })
};

export const checkToken = () => {
    const token = localStorage.getItem('jwt');
        return fetch(`${BASE_URL}/users/me`, {
            method: "GET",
            credentials: "include",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
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

