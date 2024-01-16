import React, { useRef, useEffect } from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup({ isAddPlacePopupOpen, closeAllPopups, onAddPlace }) {
  const nameRef = useRef();
  const linkRef = useRef();

  function handleSubmit(e) {
    e.preventDefault();
    onAddPlace({
      name: nameRef.current.value,
      link: linkRef.current.value,
    });
  }

  useEffect(() => {
    if (!isAddPlacePopupOpen) {
      nameRef.current.value = "";
      linkRef.current.value = "";
    }
  }, [isAddPlacePopupOpen]);

  return (
    <PopupWithForm
      title="Новое место"
      name="add-card"
      isOpen={isAddPlacePopupOpen}
      onClose={closeAllPopups}
      buttonText="Добавить"
      onSubmit={handleSubmit}
    >
      <input
        id="card-input-title"
        type="text"
        className="popup__input popup__input_type_title"
        name="name"
        ref={nameRef}
        placeholder="Название"
        required
        minLength="2"
        maxLength="30"
      />
      <span id="card-input-title-error"></span>
      <input
        id="place-input-subtitle"
        type="url"
        className="popup__input popup__input_type_subtitle"
        name="link"
        ref={linkRef}
        placeholder="Ссылка на картинку"
        required
      />
      <span id="place-input-subtitle-error"></span>
    </PopupWithForm>
  );
}

export default AddPlacePopup;