import React from "react";
import Card from "./Card";
import CurrentUserContext from "../contexts/CurrentUserContext";

function Main({
  onEditProfile,
  onAddPlace,
  onEditAvatar,
  onCardClick,
  onCardLike,
  onCardDelete,
  cards,
}) {
  const currentUser = React.useContext(CurrentUserContext);
  return (
    <main className="content">
      <section className="profile">
        <button
          className="profile__avatar-edit"
          type="button"
          onClick={onEditAvatar}
        >
          <img
            className="profile__avatar"
            alt="Аватар пользователя"
            src={currentUser ? currentUser.avatar : ""}
          />
        </button>
        <div className="profile__info">
          <div className="profile__title-edit">
            <h1 className="profile__title">
              {currentUser ? currentUser.name : ""}
            </h1>
            <button
              type="button"
              id="open-popup-button"
              className="profile__edit-button"
              aria-label="Open"
              onClick={onEditProfile}
            ></button>
          </div>
          <p className="profile__subtitle">
            {currentUser ? currentUser.about : ""}
          </p>
        </div>
        <button
          id="add-popup-button"
          type="button"
          className="profile__add-button"
          aria-label="Open"
          onClick={onAddPlace}
        ></button>
      </section>
      <section className="cards">
        {cards.map((card) => (
          <Card
            key={card._id}
            card={card}
            onCardClick={onCardClick}
            onCardLike={onCardLike}
            onCardDelete={onCardDelete}
          />
        ))}
      </section>
    </main>
  );
}

export default Main;
