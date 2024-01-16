import React from "react";
import CurrentUserContext from "../contexts/CurrentUserContext";

function Card({ card, onCardClick, onCardLike, onCardDelete }) {
  function handleClick() {
    onCardClick(card);
  }

  function handleLikeClick() {
    onCardLike(card);
  }

  function handleDeleteClick() {
    onCardDelete(card);
  }

  const currentUser = React.useContext(CurrentUserContext);
  const isOwn = card.owner._id === currentUser._id;
  const isLiked = card.likes.some((i) => i._id === currentUser._id);
  const cardLikeButtonClassName = `card__like ${
    isLiked ? "card__like_actived" : ""
  }`;

  return (
    <article className="card">
      {isOwn && (
        <button
          className="card__delete"
          type="button"
          aria-label="Delete"
          onClick={handleDeleteClick}
        />
      )}
      <img
        className="card__image"
        src={card.link}
        alt={card.name}
        onClick={handleClick}
      />
      <div className="card__info">
        <h2 className="card__title">{card.name}</h2>
        <div>
          <button
            className={cardLikeButtonClassName}
            type="button"
            aria-label="Like"
            onClick={handleLikeClick}
          ></button>
          <span className="card__likes-counter">{card.likes.length}</span>
        </div>
      </div>
    </article>
  );
}

export default Card;

