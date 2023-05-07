import { useEffect, useState } from 'react';
import Footer from './Footer';
import Header from './Header';
import ImagePopup from './ImagePopup';
import Main from './Main';
import api from '../utils/api';
import CurrentUserContext from '../contexts/user/CurrentUserContext';
import FormContextProvider from '../contexts/form/FormContext';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import ConfirmPopup from './ConfirmPopup';

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isConfirmPopupOpen, setIsConfirmPopupOpen] = useState(false);
  const [cardId, setCardId] = useState(null);
  const [cards, setCards] = useState([]);
  const [selectedCard, setSelectedCard] = useState({});
  const [currentUser, setCurrentUser] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    api
      .getUser()
      .then((user) => setCurrentUser(user))
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

  function hadleUpdateUser(userData) {
    setIsLoading(true);
    api
      .editUser(userData)
      .then((user) => {
        setCurrentUser(user);
        closeAllPopups();
      })
      .catch((err) => console.error(err))
      .finally(setIsLoading(false));
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleAvatarUpdate(avatarObj) {
    setIsLoading(true);
    api
      .editUserAvatar(avatarObj)
      .then((user) => {
        setCurrentUser(user);
        closeAllPopups();
      })
      .catch((err) => console.error(err))
      .finally(setIsLoading(false));
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleAddPlaceSubmit(cardObj) {
    setIsLoading(true);
    api
      .addCard(cardObj)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => console.error(err))
      .finally(setIsLoading(false));
  }

  function handleCardClick(link, name) {
    setSelectedCard({ link, name });
  }

  function handleLikeClick(card) {
    const isLiked = card.likes.some((like) => like._id === currentUser._id);

    api
      .toggleLikeStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((card) => (card._id === newCard._id ? newCard : card))
        );
      })
      .catch((err) => console.error(err));
  }

  function handleRemoveIconClick(cardId) {
    setCardId(cardId);
    setIsConfirmPopupOpen(true);
  }

  function handleDeleteCard(cardId) {
    setIsLoading(true);
    api
      .removeCard(cardId)
      .then(() => {
        setCards((state) => state.filter((card) => card._id !== cardId));
        closeAllPopups();
      })
      .catch((err) => console.error(err))
      .finally(setIsLoading(false));
  }

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsConfirmPopupOpen(false);
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
          onDelClick={handleRemoveIconClick}
        />
        <Footer />

        <FormContextProvider>
          {isEditAvatarPopupOpen ? (
            <EditAvatarPopup
              onLoading={isLoading}
              onClose={closeAllPopups}
              onUpdateAvatar={handleAvatarUpdate}></EditAvatarPopup>
          ) : null}

          {isEditProfilePopupOpen ? (
            <EditProfilePopup
              onLoading={isLoading}
              isOpened={isEditProfilePopupOpen}
              onClose={closeAllPopups}
              onUpdateUser={hadleUpdateUser}></EditProfilePopup>
          ) : null}

          {isAddPlacePopupOpen ? (
            <AddPlacePopup
              onLoading={isLoading}
              isOpened={isAddPlacePopupOpen}
              onClose={closeAllPopups}
              onSubmit={handleAddPlaceSubmit}></AddPlacePopup>
          ) : null}
        </FormContextProvider>

        {isConfirmPopupOpen ? (
          <ConfirmPopup
            onLoading={isLoading}
            cardId={cardId}
            onClose={closeAllPopups}
            onRemove={handleDeleteCard}></ConfirmPopup>
        ) : null}

        <ImagePopup card={selectedCard} onClose={closeAllPopups} />
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
