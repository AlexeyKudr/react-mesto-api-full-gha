import acceptPopup from '../images/accept-icon.svg';
import errorPopup from '../images/error-icon.svg';

const InfoTooltip = ({ isOpen, onClose, isSuccess}) => {
    const className = isOpen ? "popup_is-opened" : "";
  return (
    <div className={`popup ${className}`}>
      <div className="popup__content">
        <button type="button" className="popup__close-button" onClick={onClose} />
        <img className="popup__login"
          src={isSuccess ? acceptPopup : errorPopup}
          alt={isSuccess ? 'Вы успешно зарегистрировались!' : 'Что-то пошло не так! Попробуйте еще раз.'}
        />
        <h2 className="popup__login-title">
          {isSuccess
            ? 'Вы успешно зарегистрировались!'
            : 'Что-то пошло не так! Попробуйте ещё раз.'}
        </h2>
      </div>
    </div>
  );
};

export default InfoTooltip;