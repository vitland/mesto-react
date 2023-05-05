import { useRef, useContext } from 'react';
import PopupWithForm from './PopupWithForm';
import { FormValidationContext } from '../contexts/form/FormContext';

function EditAvatarPopup({ isOpened, onClose, onUpdateAvatar }) {
  const avatarInput = useRef();
  const { formErrors, setFormError, btnStatus, setButtonStatus } = useContext(
    FormValidationContext
  );

  function handleSubmit(evt) {
    evt.preventDefault();
    onUpdateAvatar({ avatar: avatarInput.current.value });
    onClose();
    avatarInput.current.value = '';
    setFormError(null)
    setButtonStatus(false)
  }

  return (
    <PopupWithForm
      name={'avatar'}
      title={'Обновить аватар'}
      isOpened={isOpened}
      onClose={onClose}
      onSubmit={handleSubmit}
      btnText={'Сохранить'}
      btnStatus={btnStatus}>
      <fieldset className="form__set">
        <input
          className={`form__input form__input_type_avatar ${
            formErrors?.avatarErrorMsg ? `form__input_error` : ''
          }`}
          name="avatar"
          type="url"
          placeholder="Ссылка на изображение"
          ref={avatarInput}
          onChange={() => {
            setFormError(
              avatarInput.current.validationMessage
            );
            setButtonStatus(avatarInput.current.validity.valid);
          }}
          required
        />
        <span
          className={`form__input-error avatar-input-error ${
            formErrors.avatarErrorMsg ? 'form__input-error_visible' : ''
          }`}>
          {formErrors.avatarErrorMsg}
        </span>
      </fieldset>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
