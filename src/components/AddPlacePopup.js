import { useState } from 'react';
import PopupWithForm from './PopupWithForm';

function AddPlacePopup({ isOpened, onClose, onSubmit }) {
  const [placeName, setPlaceName] = useState('')
  const [placeImg, setPlaceImg] = useState('')

  function handleSubmit(evt) {
    evt.preventDefault();

    onSubmit({
      name: placeName,
      link: placeImg,
    });
    setPlaceImg('')
    setPlaceName('')
  }

  return (
    <PopupWithForm
      name={'place'}
      title={'Новое место'}
      isOpened={isOpened}
      onClose={onClose}
      onSubmit={handleSubmit}
      btnText={'Добавить'}>
      <fieldset className="form__set">
        <input
          className="form__input form__input_type_placeName"
          name="placeName"
          placeholder="Название места"
          type="text"
          minLength="2"
          maxLength="30"
          required
          value={placeName}
          onChange={(e) => setPlaceName(e.target.value)}
        />
        <span className="form__input-error placeName-input-error"></span>
        <input
          className="form__input form__input_type_placeImage"
          name="placeImage"
          placeholder="Ссылка на изображение"
          type="url"
          required
          value={placeImg}
          onChange={(e) => setPlaceImg(e.target.value)}
        />
        <span className="form__input-error placeImage-input-error"></span>
      </fieldset>
    </PopupWithForm>
  );
}

export default AddPlacePopup;
