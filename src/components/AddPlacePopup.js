import { useState, useContext, useEffect } from 'react';
import PopupWithForm from './PopupWithForm';
import { FormValidationContext } from '../contexts/form/FormContext';

function AddPlacePopup({onLoading, onClose, onSubmit }) {
  const [placeName, setPlaceName] = useState('');
  const [placeImg, setPlaceImg] = useState('');
  const { formErrors, setFormError, btnStatus, setButtonStatus } = useContext(FormValidationContext);

  function handleSubmit(evt) {
    evt.preventDefault();
    onSubmit({
      name: placeName,
      link: placeImg,
    });

  }

useEffect(() => {
    setPlaceImg('');
    setPlaceName('');
    setFormError(null);
    setButtonStatus(false);
}, [])

  return (
    <PopupWithForm
      name={'place'}
      title={'Новое место'}
      onClose={onClose}
      onSubmit={handleSubmit}
      btnText={`${onLoading ? 'Добавление...' : 'Добавить'}`}
      btnStatus={btnStatus}>
      <fieldset className="form__set">
        <input
          className={`form__input form__input_type_placeName ${
            formErrors?.placeNameErrorMsg ? `form__input_error` : ''
          }`}
          name="placeName"
          placeholder="Название места"
          type="text"
          minLength="2"
          maxLength="30"
          required
          value={placeName}
          onChange={(evt) => {
            setPlaceName(evt.target.value);
            setFormError('placeNameErrorMsg', evt.target.validationMessage);
            // Если данные в текущем инпуте валидны и другом инпуте нет ошибок
            setButtonStatus(evt.target.validity.valid && !((formErrors.placeImgErrorMsg === undefined) || formErrors.placeImgErrorMsg))
          }}
        />
        <span
          className={`form__input-error placeName-input-error ${
            formErrors.placeNameErrorMsg ? 'form__input-error_visible' : ''
          }`}>
          {formErrors?.placeNameErrorMsg}
        </span>
        <input
          className={`form__input form__input_type_placeImage ${
            formErrors?.placeImgErrorMsg ? `form__input_error` : ''
          }`}
          name="placeImage"
          placeholder="Ссылка на изображение"
          type="url"
          required
          value={placeImg}
          onChange={(evt) => {
            setPlaceImg(evt.target.value);
            setFormError('placeImgErrorMsg', evt.target.validationMessage);
            setButtonStatus(evt.target.validity.valid && !((formErrors.placeNameErrorMsg === undefined) || formErrors.placeNameErrorMsg))
          }}
        />
        <span
          className={`form__input-error placeImage-input-error ${
            formErrors?.placeImgErrorMsg ? 'form__input-error_visible' : ''
          }`}>
          {formErrors?.placeImgErrorMsg}
        </span>
      </fieldset>
    </PopupWithForm>
  );
}

export default AddPlacePopup;
