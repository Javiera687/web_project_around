import Card from "./card.js";
import FormValidator from "./formValidator.js";
import { openPopup, closePopup, setPopupListeners } from "./utils.js";


//Configuración para los formularios 
const validationConfig = { 
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button_save",
  inputErrorClass: "popup__input_type_error"

};

//Iniciar validaciones
const editProfileForm = document.getElementById("editProfileForm");
const addPlaceForm = document.getElementById("addPlaceForm");

const editProfileFormValidator = new FormValidator(validationConfig, editProfileForm);
const addPlaceValidator = new FormValidator(validationConfig, addPlaceForm);

editProfileFormValidator.enableValidation();
addPlaceValidator.enableValidation();

//Perfil
const mainParagraphName = document.querySelector(".main__paragraph_name");
const mainParagraphNameAbout = document.querySelector(".main__paragraph_about");
const popupInputName = document.getElementById("input-name-profile");
const popupInputAbout = document.getElementById("input-about-profile");

//Popups
const popupEditProfile = document.querySelector("#popupEditProfile");
const popupAddPlace = document.querySelector("#popupAddPlace");
const popupPhoto = document.querySelector("#popupPhoto");

//Botones
const mainButtonEdit = document.querySelector(".main__button_edit");
const closeEditProfileBtn = document.querySelector("#closeEditProfileBtn");
const popupAddPlaceOpenBtn = document.querySelector(".main__button_add")
const popupCloseAddPlaceBtn = document.querySelector("#closeAddPlaceBtn");
const popupExitPhoto = document.getElementById("popupExitPhoto");

//Galería

const sectionCards = document.querySelector(".main__gallery");
const templateCard = "#template-card";

//Funcíon para abrir imagen ampliada
function handleCardClick(name, link) {
  const popupImg = popupPhoto.querySelector(".popup__photo");
  const popupTitle = popupPhoto.querySelector(".popup__photo-title");

  popupImg.src = link;
  popupImg.alt = `Imagen de ${name}`;
  popupTitle.textContent = name;

  openPopup(popupPhoto);
}

//Render inicial de las tarjetas 
const initialCards = [
  { name: "Valle de Yosemite", link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/yosemite.jpg" },
  { name: "Lago Louise", link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/lake-louise.jpg" },
  { name: "Montañas Calvas",  link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/bald-mountains.jpg" },
  { name: "Latemar",  link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/latemar.jpg" },
  { name: "Parque Nacional de la Vanoise",  link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/vanoise.jpg" },
  {name: "Lago di Braies", link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/lago.jpg" }
];

initialCards.forEach((item) => {
  const card = new Card(item.name, item.link, "#template-card", handleCardClick);
  const cardElement = card.generateCard();
  sectionCards.append(cardElement);

//  document.querySelector(".main__gallery").append(cardElement);
//  sectionCards.prepend(card.generateCard());
});

//Event perfil
mainButtonEdit.addEventListener("click", () => {
  popupInputName.value = mainParagraphName.textContent;
  popupInputAbout.value = mainParagraphNameAbout.textContent;
  openPopup(popupEditProfile);
});

editProfileForm.addEventListener("submit", (e) => {
  e.preventDefault();
  mainParagraphName.textContent = popupInputName.value;
  mainParagraphNameAbout.textContent = popupInputAbout.value;
  closePopup(popupEditProfile);
});

//Eventos agregar lugar
popupAddPlaceOpenBtn.addEventListener("click", () => openPopup(popupAddPlace));


addPlaceForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const title = addPlaceForm.elements.place.value;
  const url = addPlaceForm.elements.url.value;

  /*const card = new Card({ name: title, link: url }, templateCard, handleImageClick);
  sectionCards.prepend(card.generateCard());*/

  const card = new Card(title, url, "#template-card", handleCardClick);
  sectionCards.prepend(card.generateCard());



  addPlaceForm.reset();
  closePopup(popupAddPlace);
});

//Eventos cerrar popups
closeEditProfileBtn.addEventListener("click", () => closePopup(popupEditProfile));
popupCloseAddPlaceBtn.addEventListener("click", () => closePopup(popupAddPlace));
popupExitPhoto.addEventListener("click", () => closePopup(popupPhoto));

//Activar listeners de overlay (se hace aquí, después de tener los popups )
setPopupListeners(popupEditProfile);
setPopupListeners(popupAddPlace);
setPopupListeners(popupPhoto);

