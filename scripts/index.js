import Card from "./card.js";
import FormValidator from "./formValidator.js";
import Section from "./section.js";
import PopupWithImage from "./popupWithImage.js";
import PopupWithForm from "./popupWithForm.js";
import UserInfo from "./userInfo.js";




//Configuración de validaciones
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

// User info 
const userInfo = new UserInfo ({
  nameSelector: ".main__paragraph_name",
  aboutSelector: ".main__paragraph_about"
});

//Instancia del popup con imagen
const popupWithImage = new PopupWithImage("#popupPhoto");
popupWithImage.setEventListeners();

//Render inicial de las tarjetas 
const initialCards = [
  { name: "Valle de Yosemite", link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/yosemite.jpg" },
  { name: "Lago Louise", link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/lake-louise.jpg" },
  { name: "Montañas Calvas",  link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/bald-mountains.jpg" },
  { name: "Latemar",  link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/latemar.jpg" },
  { name: "Parque Nacional de la Vanoise",  link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/vanoise.jpg" },
  {name: "Lago di Braies", link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/lago.jpg" }
];

// Instancia de Section (galería)

const section = new Section(
  {
    items: initialCards,
    renderer: (item) => {
      const card = new Card(item.name, item.link, "#template-card", (name, link) => {
        popupWithImage.open(name, link);
      });
      const cardElement = card.generateCard();
      section.addItem(cardElement);
    }
  },
  ".main__gallery"
);

section.renderItems();


//Popup editar perfil
const popupEditProfile = new PopupWithForm("#popupEditProfile", (formData) => {
  userInfo.setUserInfo({
    name: formData.name,
    about: formData.about

  });
  popupEditProfile.close();

});
popupEditProfile.setEventListeners();

//Popup agregar Lugar 
const popupAddPlace = new PopupWithForm("#popupAddPlace", (formData) => {
  const card = new Card(formData.place, formData.url, "#template-card", (name, link) => {
    popupWithImage.open(name, link);

  });
  const cardElement = card.generateCard();
  section.addItem(cardElement);
  popupAddPlace.close();
});
popupAddPlace.setEventListeners();

//Eventos para abrir los popups
document.querySelector(".main__button_edit").addEventListener("click", () => {
  const { name, about } = userInfo.getUserInfo();
  document.getElementById("input-name-profile").value = name;
  document.getElementById("input-about-profile").value = about;
  popupEditProfile.open();
});

document.querySelector(".main__button_add").addEventListener("click", () => {
  popupAddPlace.open();
});






