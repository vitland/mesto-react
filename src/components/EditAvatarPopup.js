import { useRef } from 'react';
import PopupWithForm from './PopupWithForm';

function EditAvatarPopup({ isOpened, onClose, onUpdateAvatar }) {
  const avatarInput = useRef();

  function handleSubmit(evt) {
    evt.preventDefault();
    onUpdateAvatar({ avatar: avatarInput.current.value });
    onClose();
    avatarInput.current.value = '';
  }

  return (
    <PopupWithForm
      name={'avatar'}
      title={'Обновить аватар'}
      isOpened={isOpened}
      onClose={onClose}
      onSubmit={handleSubmit}
      btnText={'Сохранить'}>
      <fieldset className="form__set">
        <input
          className="form__input form__input_type_avatar"
          name="avatar"
          type="url"
          placeholder="Ссылка на изображение"
          ref={avatarInput}
          required
        />
        <span className="form__input-error avatar-input-error"></span>
      </fieldset>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
