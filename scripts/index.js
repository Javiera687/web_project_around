import Card from "./card.js";
import FormValidator from "./formValidator.js";
import Section from "./section.js";
import PopupWithImage from "./popupWithImage.js";
import PopupWithForm from "./popupWithForm.js";
import UserInfo from "./userInfo.js";
import Api from "./api.js";

const api = new Api({
  baseUrl: "https://around-api.es.tripleten-services.com/v1/cohort-28",
  headers: {
    authorization: "c56e30dc-2883-4270-a59e-b2f7bae969c6",
    "Content-Type": "application/json"
  }
});


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


const userInfo = new UserInfo ({
  nameSelector: ".main__paragraph_name",
  aboutSelector: ".main__paragraph_about"
});



const popupWithImage = new PopupWithImage("#popupPhoto");
popupWithImage.setEventListeners();

/*Render inicial de las tarjetas 
const initialCards = [
  { name: "Valle de Yosemite", link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/yosemite.jpg" },
  { name: "Lago Louise", link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/lake-louise.jpg" },
  { name: "Montañas Calvas",  link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/bald-mountains.jpg" },
  { name: "Latemar",  link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/latemar.jpg" },
  { name: "Parque Nacional de la Vanoise",  link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/vanoise.jpg" },
  {name: "Lago di Braies", link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/lago.jpg" }
]; */

// Instancia de Section (galería)

const section = new Section(
  {
  
    renderer: (item) => {
      const card = new Card(item.name, item.link, "#template-card", (name, link) => {
        popupWithImage.open(name, link);
      });
      return card.generateCard();
    },
    },
  ".main__gallery"
);

// PRUEEEBAAAAA 
Promise.all([api.getUserInfo(), api.getInitialCards()])
  .then(([userData, cards]) => {
    console.log("✅ UserData recibido de la API:", userData);
    console.log("✅ Cards recibidas de la API:", cards);

    // actualizar perfil con los datos de la API
    userInfo.setUserInfo({
      name: userData.name,
      about: userData.about,
    });

    // renderizar las tarjetas en la galería
    section.renderItems(cards);
  })
  .catch((err) => {
    console.error("❌ Error cargando datos iniciales:", err);
  });


// PRUEBAAAAAA   BORRAR DESPUES  CODIGO ORIGINAL 
/*Promise.all([api.getUserInfo(), api.getInitialCards()])
.then(([userData, cards]) => {
  userInfo.setUserInfo({
    name: userData.name,
    about: userData.about,
  });

 section.renderItems(cards);
})
.catch((err) => {
  console.log("X Error cargando datos iniciales:", err);
});
*/

//Popup editar perfil
const popupEditProfile = new PopupWithForm("#popupEditProfile", (formData) => {
 popupEditProfile.setLoading(true);
 api.updateUserInfo({
  name: formData.name,
  about: formData.about
 })
.then((res) => {
  userInfo.setUserInfo({ name: res.name, about: res.about });
  popupEditProfile.close();
})
.catch((err) => console.log("X Error editando perfil:", err))
.finally(() => popupEditProfile.setLoading(false));

});

popupEditProfile.setEventListeners();

//Popup agregar Lugar 
const popupAddPlace = new PopupWithForm("#popupAddPlace", (formData) => {
 popupAddPlace.setLoading(true, "Crear");
api.addCard({
  name: formData.place,
  link: formData.url
})

.then((newCard) => { 
  const card = new Card(newCard.name, newCard.link, "#template-card", (name, link) => {
    popupWithImage.open(name, link);
  });
  const cardElement = card.generateCard();
  section.addItem(cardElement);
  popupAddPlace.close();
})

.catch((err) => console.log("X Error agregando tarjeta:", err))
.finally(() => popupAddPlace.setLoading(false, "Crear"));
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






