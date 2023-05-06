import { useContext, useState, useEffect } from 'react';
import CurrentUserContext from '../contexts/user/CurrentUserContext';
import { FormValidationContext } from '../contexts/form/FormContext';

import PopupWithForm from './PopupWithForm';

function EditProfilePopup({ onLoading, isOpened, onClose, onUpdateUser }) {
  const [name, setName] = useState('');
  const [about, setAbout] = useState('');
  const currentUser = useContext(CurrentUserContext);
  const { formErrors, setFormError, btnStatus, setButtonStatus } = useContext(
    FormValidationContext
  );

  useEffect(() => {
    setButtonStatus(true);
    setFormError('nameErrorMsg', false);
    setFormError('aboutErrorMsg', false);
    // При анмаунте обнуляет кнопку
    return(() => { 
      setFormError(null)
      setButtonStatus(false);})
  }, []);

  useEffect(() => {
    setName(currentUser.name);
    setAbout(currentUser.about);
    //isOpend сбрасывает инпуты к дефолтным значениям, если что-то вводили, но не сохранили.
  }, [currentUser, isOpened]);


  function handleSubmit(evt) {
    evt.preventDefault();
    onUpdateUser({
      name,
      about,
    });
  }

  return (
    <PopupWithForm
      name={'profile'}
      title={'Редактировать профиль'}
      onClose={onClose}
      onSubmit={handleSubmit}
      btnText={`${onLoading ? 'Сохранение...' : 'Сохранить'}`}
      btnStatus={btnStatus}>
      <fieldset className="form__set">
        <input
          className={`form__input form__input_type_name ${
            formErrors?.nameErrorMsg ? `form__input_error` : ''
          }`}
          name="name"
          type="text"
          placeholder="Имя"
          minLength="2"
          maxLength="40"
          // https://react.dev/reference/react-dom/components/input#im-getting-an-error-a-component-is-changing-an-uncontrolled-input-to-be-controlled
          value={name ?? ''}
          required
          onChange={(evt) => {
            setName(evt.target.value);
            setFormError('nameErrorMsg', evt.target.validationMessage);
            setButtonStatus(
              evt.target.validity.valid &&
                !(
                  formErrors.aboutErrorMsg === undefined ||
                  formErrors.aboutErrorMsg
                )
            );
          }}
        />
        <span
          className={`form__input-error name-input-error ${
            formErrors.nameErrorMsg ? 'form__input-error_visible' : ''
          }`}>
          {formErrors?.nameErrorMsg}
        </span>
        <input
          className={`form__input form__input_type_occupation ${
            formErrors?.aboutErrorMsg ? `form__input_error` : ''
          }`}
          name="about"
          type="text"
          placeholder="О себе"
          minLength="2"
          maxLength="200"
          value={about ?? ''}
          required
          onChange={(evt) => {
            setAbout(evt.target.value);
            setFormError('aboutErrorMsg', evt.target.validationMessage);
            setButtonStatus(
              evt.target.validity.valid &&
                !(
                  formErrors.nameErrorMsg === undefined ||
                  formErrors.nameErrorMsg
                )
            );
          }}
        />
        <span
          className={`form__input-error about-input-error ${
            formErrors.aboutErrorMsg ? 'form__input-error_visible' : ''
          }`}>
          {formErrors?.aboutErrorMsg}
        </span>
      </fieldset>
    </PopupWithForm>
  );
}

export default EditProfilePopup;
