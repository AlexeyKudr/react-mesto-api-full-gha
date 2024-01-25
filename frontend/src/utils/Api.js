class Api {
  constructor({url}) {
    this._url= url;
  }

  _getResponse(res) {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`)
  }

  getInitialCards() {
    const token =localStorage.getItem('jwt');
      return fetch(`${this._url}/cards`, {
        credentials: "include",
        headers: {
          authorization: `Bearer ${token}`,
        },
      })
      .then(res => this._getResponse(res));
    }

  getUserInfo() {
    const token =localStorage.getItem('jwt');
      return fetch(`${this._url}/users/me`, {
        credentials: "include",
        headers: {
          authorization: `Bearer ${token}`,
        },
      })
      .then(res => this._getResponse(res));
    }

    setUserAvatar(urlAvatar) {
      const token =localStorage.getItem('jwt');
      return fetch(`${this._url}/users/me/avatar`, {
        method: "PATCH",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          avatar: urlAvatar,
        }),
      })
      .then(this._getResponse);
    }

    setUserInfo(name, about) {
      const token =localStorage.getItem('jwt');
      return fetch(`${this._url}/users/me`, {
        method: "PATCH",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name,
          about
        }),

      })
      .then(this._getResponse);
    }

    addNewCard({name, link}) {
      const token =localStorage.getItem('jwt');
      return fetch(`${this._url}/cards`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name: name,
          link: link,
        }),
      })
      .then(this._getResponse);
    }

    deleteCard(cardId) {
      const token =localStorage.getItem('jwt');
      return fetch(`${this._url}/cards/${cardId}`, {
        method: 'DELETE',
        credentials: "include",
        headers: {
      "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },
      })
      .then(this._getResponse);
    }

    changeLikeCardStatus(cardId, isLiked) {
      const token =localStorage.getItem('jwt');
      return fetch(`${this._url}/cards/${cardId}/likes`, {
        method: isLiked ? 'PUT' : 'DELETE',
        credentials: "include",
        headers: {
          authorization: `Bearer ${token}`,
        },
      })
      .then(this._getResponse);
    }

}

const api = new Api({
  url: 'http://localhost:3000',
});

export default api;