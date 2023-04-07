import { isEscapeKey } from './util.js';
import { formIsValid, hideValidateMessages } from './photo-validate-form.js';
import { setScaleToStart } from './photo-scale-editor.js';
const imgUploadForm = document.querySelector('.img-upload__form');
const uploadFileElement = imgUploadForm.querySelector('#upload-file');
const imgUploadOverlayElement = imgUploadForm.querySelector('.img-upload__overlay');
const imgCloseElement = imgUploadOverlayElement.querySelector('.img-upload__cancel');
// const imgUploadTextElement = imgUploadOverlayElement.querySelector('.img-upload__text');
// const imgUploadButtonElement = imgUploadOverlayElement.querySelector('.img-upload__submit');

// Функция для закрытия окна редактирования по эвенту ESC
const onPopupEscKeydown = (evt) => {
  if (!isEscapeKey(evt)) {
    return;
  }
  evt.preventDefault();
  closePhotoModal();
};

const reloadForm = () => {
  // Убираем сообщение об ошибке при сбросе формы
  hideValidateMessages();
  // Сброс формы
  imgUploadForm.reset();
  // Сброс масштаба
  setScaleToStart();
};

// Функция для открытия окна редактирования
function closePhotoModal() {
  imgUploadOverlayElement.classList.add('hidden');
  document.body.classList.remove('modal-open');
  // Удалили листенер на ESC
  document.removeEventListener('keydown', onPopupEscKeydown);
  reloadForm();
}

// Функция для открытия окна редактирования
function openPhotoModal () {
  imgUploadOverlayElement.classList.remove('hidden');
  document.body.classList.add('modal-open');
  // Листенер на ESC
  document.addEventListener('keydown', onPopupEscKeydown);
}

// Загрузка изображения открывает окно редактирования
uploadFileElement.addEventListener('change', () => {
  openPhotoModal();
});

// Кнопка закрывает окно редактирования
imgCloseElement.addEventListener('click', (evt) => {
  evt.preventDefault();
  closePhotoModal();
});

/*
// Поменяли текст в форме
imgUploadTextElement.addEventListener('input', () => {
  imgUploadButtonElement.disabled = !formIsValid();
});
*/

// Отправка формы
imgUploadForm.addEventListener('submit', (evt) => {
  const isValid = formIsValid();
  if (!isValid) {
    evt.preventDefault();
    // return;
  }
});
