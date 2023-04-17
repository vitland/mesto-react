import React from 'react'

function Main() {
  return (
    <main className="main">
    <section className="profile content__profile">
      <div className="profile__avatar-container">
         <img alt="аватар" className="profile__avatar"/>
      </div>
      <div className="profile__info">
        <h1 className="profile__name">Жак</h1>
        <p className="profile__occupation">Исследователь</p>
        <button className="profile__button-change opacity" type="button">
        </button>
      </div>
      <button className="profile__button-add opacity" type="button"></button>
    </section>
    <section className="elements"></section>
  </main>
  )
}

export default Main