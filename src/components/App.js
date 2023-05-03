import { useEffect, useState } from 'react';
import Footer from './Footer';
import Header from './Header';
import ImagePopup from './ImagePopup';
import Main from './Main';
import api from '../utils/api';
import CurrentUserContext from '../contexts/user/CurrentUserContext';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import ConfirmPopup from './ConfirmPopup';

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);

  const [cards, setCards] = useState([]);
  const [selectedCard, setSelectedCard] = useState({});
  const [currentUser, setCurrentUser] = useState({});

  useEffect(() => {
    api.getUser()
      .then((user) => {
        setCurrentUser(user);
      })
      .catch((err) => console.error(err));
  }, []);

  useEffect(() => {
    api.getCards()
      .then((cards) => setCards(cards))
      .catch((err) => console.error(err));
  }, []);

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function hadleUpdateUser(userData) {
    api.editUser(userData).then((user) => setCurrentUser(user));
    closeAllPopups();
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleAvatarUpdate(avatarObj) {
    api.editUserAvatar(avatarObj).then((user) => setCurrentUser(user));
    closeAllPopups();
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }
  
  function handleAddPlaceSubmit(cardObj) {
    closeAllPopups();
    api.addCard(cardObj).then((newCard) => {
      setCards([newCard, ...cards]);
    });
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
    api.removeCard(cardId)
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

        <EditAvatarPopup
          isOpened={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleAvatarUpdate}></EditAvatarPopup>

        <EditProfilePopup
          isOpened={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={hadleUpdateUser}></EditProfilePopup>

        <AddPlacePopup
          isOpened={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onSubmit={handleAddPlaceSubmit}></AddPlacePopup>

        <ConfirmPopup></ConfirmPopup>
        <ImagePopup card={selectedCard} onClose={closeAllPopups} />
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
