import { useEffect, useState } from 'react';
import api from '../utils/api';
import Card from './Card';

function Main(props) {
  const { onEditAvatar, onEditProfile, onAddPlace, onCardClick } = props;

  const [userName, setUserName] = useState('');
  const [userAvatar, setUserAvatar] = useState('');
  const [userDescription, setUserDescription] = useState('');
  const [cards, setCards] = useState([]);

  useEffect(() => {
    api.getUser()
      .then(({ name, about, avatar }) => {
        setUserAvatar(avatar);
        setUserDescription(about);
        setUserName(name);
      })
      .catch((err) => console.error(err));
  }, []);

  useEffect(() => {
    api.getCards()
      .then((cards) => setCards(cards))
      .catch((err) => console.error(err));
  }, []);

  return (
    <main className="main">
      <section className="profile content__profile">
        <div className="profile__avatar-container" onClick={onEditAvatar}>
          <img alt="аватар" className="profile__avatar" src={userAvatar} />
        </div>
        <div className="profile__info">
          <h1 className="profile__name">{userName}</h1>
          <p className="profile__occupation">{userDescription}</p>
          <button
            className="profile__button-change opacity"
            type="button"
            onClick={onEditProfile}></button>
        </div>
        <button
          className="profile__button-add opacity"
          type="button"
          onClick={onAddPlace}></button>
      </section>
      <section className="elements">
        {cards.map(({ _id, ...rest }) => (
          <Card key={_id} {...rest} onCardClick={onCardClick} />
        ))}
      </section>
    </main>
  );
}

export default Main;
