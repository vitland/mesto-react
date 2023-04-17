import '../index.css';
import Footer from './Footer';
import Header from './Header';
import Main from './Main';

function App() {
  return (
    <div className="content">
  <Header />
  <Main />
  <Footer />

  <div className="popup popup_type_profile">
    <div className="popup__container">
      <button className="popup__close-icon popup__close-icon_type_profile opacity" type="button"></button>
      <h2 className="popup__heading">Редактировать профиль</h2>
      <form className="form form_type_profile" name="profile-form" novalidate>
        <fieldset className="form__set">
          <input
            className="form__input form__input_type_name"
            name="name"
            type="text"
            placeholder="Имя"
            minlength="2"
            maxlength="40"
            required
          />
          <span className="form__input-error name-input-error"></span>
          <input
            className="form__input form__input_type_occupation"
            name="about"
            type="text"
            placeholder="О себе"
            minlength="2"
            maxlength="200"
            required
          />
          <span className="form__input-error about-input-error"></span>
        </fieldset>
        <button className="popup__submit-button opacity popup__submit-button_active" type="submit" >
          Сохранить
        </button>
      </form>
    </div>
  </div>

  <div className="popup popup_type_place">
    <div className="popup__container">
      <button className="popup__close-icon popup__close-icon_type_place opacity" type="button"></button>
      <h2 className="popup__heading">Новое место</h2>
      <form className="form form_type_place" name="place-form" novalidate>
        <fieldset className="form__set">
          <input
            className="form__input form__input_type_placeName"
            name="placeName"
            placeholder="Название места"
            type="text"
            minlength="2"
            maxlength="30"
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
        <button className="popup__submit-button opacity" type="submit">
          Добавить
        </button>
      </form>
    </div>
  </div>
  <div className="popup popup_type_image">
    <figure className="popup__image-container">
      <button className="popup__close-icon popup__close-icon_type_image opacity" type="button"></button>
      <img alt="" className="popup__image" src=""/>
      <figcaption className="popup__image-caption"></figcaption>
    </figure>
  </div>
  <div className="popup popup_type_confirm">
    <div className="popup__container popup__container_type_confirm">
      <button className="popup__close-icon popup__close-icon_type_profile opacity" type="button"></button>
      <h2 className="popup__heading">Вы уверены?</h2>
      <button className="popup__submit-button popup__submit-button_active opacity " type="submit" >
        Да
      </button>
    </div>
  </div>
  <div className="popup popup_type_avatar">
    <div className="popup__container popup__container_type_avatar">
      <button className="popup__close-icon popup__close-icon_type_profile opacity" type="button"></button>
      <h2 className="popup__heading">Обновить аватар</h2>
      <form className="form form_type_avatar" name="avatar-form" novalidate>
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
        <button className="popup__submit-button opacity" type="submit" >
          Сохранить
        </button>
      </form>
    </div>
  </div>
  
  <template className="elements__template">
    <article className="element">
      <img alt="" className="element__image" src=""/>
      <button className="element__bin opacity disabled"></button>
      <div className="element__description">
        <h2 className="element__text">Место</h2>
        <div className="element__fav-container">
          <button className="element__fav opacity" type="button"></button>
          <p className="element__fav-counter">0</p>
        </div>
      </div>
    </article>
  </template>
</div>
  )
}

export default App;
