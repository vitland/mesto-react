import { useEffect, useState } from 'react';
import Footer from './Footer';
import Header from './Header';
import ImagePopup from './ImagePopup';
import Main from './Main';
import PopupWithForm from './PopupWithForm';
import api from '../utils/api';
import CurrentUserContext from '../contexts/user/CurrentUserContext';
import EditProfilePopup from './EditProfilePopup';

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);

  const [cards, setCards] = useState([]);
  const [selectedCard, setSelectedCard] = useState({});
  const [currentUser, setCurrentUser] = useState({});

  useEffect(() => {
    api
      .getUser()
      .then((user) => {
        setCurrentUser(user);
      })
      .catch((err) => console.error(err));
  }, []);

  useEffect(() => {
    api
      .getCards()
      .then((cards) => setCards(cards))
      .catch((err) => console.error(err));
  }, []);

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
    setSelectedCard({ link, name });
  }

  function handleLikeClick(card) {
    const isLiked = card.likes.some((like) => like._id === currentUser._id);

    isLiked
      ? api.removeLike(card._id).then((newCard) => {
          setCards((state) =>
            state.map((card) => (card._id === newCard._id ? newCard : card))
          );
        })
      : api.addLike(card._id).then((newCard) => {
          setCards((state) =>
            state.map((card) => (card._id === newCard._id ? newCard : card))
          );
        });
  }

  function handleDeleteCard(cardId) {
    api
      .removeCard(cardId)
      .then(() =>
        setCards((state) => state.filter((card) => card._id !== cardId))
      );
  }

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setSelectedCard({});
  }

  return (
    <div className="content">
      <CurrentUserContext.Provider value={currentUser}>
        <Header />
        <Main
          cards={cards}
          onEditProfile={handleEditProfileClick}
          onEditAvatar={handleEditAvatarClick}
          onAddPlace={handleAddPlaceClick}
          onCardClick={handleCardClick}
          onLikeClick={handleLikeClick}
          onDelClick={handleDeleteCard}
        />
        <Footer />

        <EditProfilePopup
          onClose={closeAllPopups}
          isOpened={isEditProfilePopupOpen}>
          </EditProfilePopup>

        <PopupWithForm
          name={'place'}
          title={'Новое место'}
          isOpened={isAddPlacePopupOpen}
          onClose={closeAllPopups}
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
          btnText={'Сохранить'}>
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
        <ImagePopup card={selectedCard} onClose={closeAllPopups} />
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
