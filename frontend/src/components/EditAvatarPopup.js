import React, { useRef, useEffect } from "react";
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup({
  isEditAvatarPopupOpen,
  closeAllPopups,
  onUpdateAvatar,
}) {
  const avatarRef = useRef();

  useEffect(() => {
    if (!isEditAvatarPopupOpen) {
      avatarRef.current.value = "";
    }
  }, [isEditAvatarPopupOpen]);

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateAvatar({
      avatar: avatarRef.current.value,
    });
  }

  return (
    <PopupWithForm
      title="Обновить аватар"
      name="edit-avatar"
      isOpen={isEditAvatarPopupOpen}
      onClose={closeAllPopups}
      buttonText="Сохранить"
      onSubmit={handleSubmit}
    >
      <input
        id="avatar"
        className="popup__input popup__input_avatar"
        name="avatar"
        type="url"
        placeholder="Ссылка на картинку"
        ref={avatarRef}
        required
      />
      <span id="avatar-error"></span>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
