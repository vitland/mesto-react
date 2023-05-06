import PopupWithForm from './PopupWithForm';

function ConfirmPopup({onLoading, onClose, onRemove, cardId }) {
  return (
    <PopupWithForm
      name={'confirm'}
      title={'Вы уверены?'}
      btnText={`${onLoading ? 'Удаление...' :'Да'}`}
      btnStatus={true}
      onClose={onClose}
      onSubmit={
        (evt) => {
        evt.preventDefault();
        onRemove(cardId);
      }}></PopupWithForm>
  );
}

export default ConfirmPopup;
