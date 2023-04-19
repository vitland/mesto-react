import React from 'react';

function Card({ link, name, likes, onCardClick }) {
  
  function handleCardClick(){
    onCardClick(link, name) 
  }

  return (
    <article className="element">
      <img alt={name} className="element__image" src={link} onClick={handleCardClick}/>
      <button className="element__bin opacity disabled"></button>
      <div className="element__description">
        <h2 className="element__text">{name}</h2>
        <div className="element__fav-container">
          <button className="element__fav opacity" type="button"></button>
          <p className="element__fav-counter">{likes.length}</p>
        </div>
      </div>
    </article>
  );
}

export default Card;
