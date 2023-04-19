import { useState } from 'react';
import Footer from './Footer';
import Header from './Header';
import ImagePopup from './ImagePopup';
import Main from './Main';
import PopupWithForm from './PopupWithForm';

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({})

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  } 

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleCardClick(link, name) {
    setSelectedCard({link, name})
  }

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setSelectedCard({});
  }

  return (
    <div className="content">
      <Header />
      <Main
        onEditProfile={handleEditProfileClick}
        onEditAvatar={handleEditAvatarClick}
        onAddPlace={handleAddPlaceClick}
        onCardClick={handleCardClick}
      />
      <Footer />
      <PopupWithForm
        name={'profile'}
        title={'Редактировать профиль'}
        isOpened={isEditProfilePopupOpen}
        onClose={closeAllPopups}
        btnText={"Сохранить"}>
        <fieldset className="form__set">
          <input
            className="form__input form__input_type_name"
            name="name"
            type="text"
            placeholder="Имя"
            minLength="2"
            maxLength="40"
            required
          />
          <span className="form__input-error name-input-error"></span>
          <input
            className="form__input form__input_type_occupation"
            name="about"
            type="text"
            placeholder="О себе"
            minLength="2"
            maxLength="200"
            required
          />
          <span className="form__input-error about-input-error"></span>
        </fieldset>
      </PopupWithForm>
      <PopupWithForm
        name={'place'}
        title={'Новое место'}
        isOpened={isAddPlacePopupOpen}
        onClose={closeAllPopups}
        btnText={"Добавить"}>
        <fieldset className="form__set">
          <input
            className="form__input form__input_type_placeName"
            name="placeName"
            placeholder="Название места"
            type="text"
            minLength="2"
            maxLength="30"
            required
          />
          <span className="form__input-error placeName-input-error"></span>
          <input
            className="form__input form__input_type_placeImage"
            name="placeImage"
            placeholder="Ссылка на изображение"
            type="url"
            required
          />
          <span className="form__input-error placeImage-input-error"></span>
        </fieldset>
      </PopupWithForm>
      <PopupWithForm
        name={'avatar'}
        title={'Обновить аватар'}
        isOpened={isEditAvatarPopupOpen}
        onClose={closeAllPopups}
        btnText={"Сохранить"}>
        <fieldset className="form__set">
          <input
            className="form__input form__input_type_avatar"
            name="avatar"
            type="url"
            placeholder="Ссылка на изображение"
            required
          />
          <span className="form__input-error avatar-input-error"></span>
        </fieldset>
      </PopupWithForm>
      <PopupWithForm name={'confirm'} btnText={"Да"}>
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
      <ImagePopup card={selectedCard} onClose={closeAllPopups} />
      
    </div>
  );
}

export default App;
