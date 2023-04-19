function PopupWithForm({name, title, isOpened, onClose, children}) {
  return (
    <div className={`popup popup_whith-form ${isOpened && `popup_opened`}`}>
      <div className={`popup__container popup__container_type_${name}`}>
        <button className="popup__close-icon opacity" onClick={onClose}type="button"></button>
        <h2 className="popup__heading">{title}</h2>
        <form
          className={`form form_type_${name}`}
          name={`${name}-form`}
          noValidate>
            {children}
          <button className="popup__submit-button opacity" type="submit">
            Добавить
          </button>
        </form>
      </div>
    </div>
  );
}

export default PopupWithForm;
