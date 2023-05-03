import PopupWithForm from './PopupWithForm';

function ConfirmPopup() {
  return (
    <PopupWithForm name={'confirm'} btnText={'Да'}>
      <>
        <button
          className="popup__close-icon popup__close-icon_type_profile opacity"
          type="button"></button>
        <h2 className="popup__heading">Вы уверены?</h2>
        <button
          className="popup__submit-button popup__submit-button_active opacity "
          type="submit">
          Да
        </button>
      </>
    </PopupWithForm>
  );
}

export default ConfirmPopup;
