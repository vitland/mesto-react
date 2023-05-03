import { useContext, useState, useEffect } from 'react';
import CurrentUserContext from '../contexts/user/CurrentUserContext';
import PopupWithForm from './PopupWithForm';

function EditProfilePopup({ isOpened, onClose, onUpdateUser}) {
  const [name, setName] = useState('');
  const [about, setAbout] = useState('');
  const currentUser = useContext(CurrentUserContext);
  
  useEffect(() => {
    console.log('effect')
    setName(currentUser.name);
    setAbout(currentUser.about);
//isOpend сбрасывает инпуты к дефолтным значениям, если что-то вводили, но не сохранили.
  }, [currentUser, isOpened]);

  function handleSubmit(evt) {
    evt.preventDefault();
    onUpdateUser({
      name,
      about
    })
  }

  return (
    <PopupWithForm
      name={'profile'}
      title={'Редактировать профиль'}
      isOpened={isOpened}
      onClose={onClose}
      onSubmit={handleSubmit}
      btnText={'Сохранить'}
      submitButtonActive={true}
      >
      <fieldset className="form__set">
        <input
          className="form__input form__input_type_name"
          name="name"
          type="text"
          placeholder="Имя"
          minLength="2"
          maxLength="40"
// https://react.dev/reference/react-dom/components/input#im-getting-an-error-a-component-is-changing-an-uncontrolled-input-to-be-controlled
          value={name ?? ''}
          required
          onChange={(evt) => setName(evt.target.value)}
        />
        <span className="form__input-error name-input-error"></span>
        <input
          className="form__input form__input_type_occupation"
          name="about"
          type="text"
          placeholder="О себе"
          minLength="2"
          maxLength="200"
          value={about ?? ''}
          required
          onChange={(evt) => setAbout(evt.target.value)}
        />
        <span className="form__input-error about-input-error"></span>
      </fieldset>
    </PopupWithForm>
  );
}

export default EditProfilePopup;
