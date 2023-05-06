function PopupWithForm({
  name,
  title,
  onClose,
  onSubmit,
  btnText,
  children,
  btnStatus
}) {

  return (
      <div className={`popup popup_whith-form popup_opened`}>
        <div className={`popup__container popup__container_type_${name}`}>
          <button
            className="popup__close-icon opacity"
            onClick={onClose}
            type="button"></button>
          <h2 className="popup__heading">{title}</h2>
          <form
            className={`form form_type_${name}`}
            name={`${name}-form`}
            onSubmit={onSubmit}>
            {children}
            <button
              className={`popup__submit-button opacity ${
                btnStatus && `popup__submit-button_active`
              }`}
              type="submit">
              {btnText}
            </button>
          </form>
        </div>
      </div>
  );
}

export default PopupWithForm;
