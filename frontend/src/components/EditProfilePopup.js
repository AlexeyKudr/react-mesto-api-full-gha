import React, { useState, useEffect } from "react";
import PopupWithForm from "./PopupWithForm";
import CurrentUserContext from "../contexts/CurrentUserContext";

function EditProfilePopup({
  isEditProfilePopupOpen,
  closeAllPopups,
  onUpdateUser,
}) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const currentUser = React.useContext(CurrentUserContext);

  useEffect(() => {
    if (currentUser) {
      setName(currentUser.name);
      setDescription(currentUser.about);
    }
  }, [currentUser, isEditProfilePopupOpen]);

  function handleNameChange(e) {
    setName(e.target.value);
  }

  function handleDescriptionChange(e) {
    setDescription(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();

    onUpdateUser({
      name: name,
      about: description,
    });
  }

  return (
    <PopupWithForm
      title="Редактировать профиль"
      name="profile-edit"
      isOpen={isEditProfilePopupOpen}
      onClose={closeAllPopups}
      onSubmit={handleSubmit}
      buttonText="Сохранить"
    >
      <input
        id="name-input"
        type="text"
        className="popup__input popup__input_type_title"
        name="name"
        placeholder="Имя"
        required
        minLength="2"
        maxLength="40"
        value={name || ""}
        onChange={handleNameChange}
      />
      <span id="name-input-error"></span>
      <input
        id="input-subtitle"
        type="text"
        className="popup__input popup__input_type_subtitle"
        name="about"
        placeholder="О себе"
        required
        minLength="2"
        maxLength="200"
        value={description || ""}
        onChange={handleDescriptionChange}
      />
      <span id="input-subtitle-error"></span>
    </PopupWithForm>
  );
}

export default EditProfilePopup;
