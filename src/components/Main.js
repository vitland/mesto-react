import { useContext} from 'react';
import Card from './Card';
import CurrentUserContext from '../contexts/user/CurrentUserContext';

function Main(props) {
  const { cards, onEditAvatar, onEditProfile, onAddPlace, onCardClick, onLikeClick, onDelClick } = props;
  const {avatar, name, description} = useContext(CurrentUserContext)

  return (
    <main className="main">
      <section className="profile content__profile">
        <div className="profile__avatar-container" onClick={onEditAvatar}>
          <img alt="аватар" className="profile__avatar" src={avatar} />
        </div>
        <div className="profile__info">
          <h1 className="profile__name">{name}</h1>
          <p className="profile__occupation">{description}</p>
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
        {cards.map((card) => (
          <Card key={card._id} {...card} onCardClick={onCardClick} onLikeClick={onLikeClick} onDelClick={onDelClick} />
        ))}
      </section>
    </main>
  );
}

export default Main;
