import Card from "./card.js";
import FormValidator from "./formValidator.js";
import Section from "./section.js";
import PopupWithImage from "./popupWithImage.js";
import PopupWithForm from "./popupWithForm.js";
import UserInfo from "./userInfo.js";
import Api from "./api.js";
import PopupWithConfirmation from "./popupWithConfirmation.js";

const api = new Api({
  baseUrl: "https://around-api.es.tripleten-services.com/v1",
  headers: {
    authorization: "b93ac200-a3e4-4899-a46a-a4b198449e35",
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

// Info de usuario
const userInfo = new UserInfo({
  nameSelector: ".main__paragraph_name",
  aboutSelector: ".main__paragraph_about"
});


// Popups
const popupWithImage = new PopupWithImage("#popupPhoto");
popupWithImage.setEventListeners();

// Instancia popup con confirmación 
const popupDelete = new PopupWithConfirmation("#popupDelete");
popupDelete.setEventListeners();

// Función para crear tarjetas con confirmación de borrado
function createCard(data) {
  const card = new Card(
    {
      name: data.name,
      link:data.link,
      cardId: data._id
    },
    "#template-card",
    (name, link) => {
      popupWithImage.open(name, link);
    },
    (cardId, cardElement) => {
      popupDelete.setSubmitAction(() => {
        api.deleteCard(cardId)
        .then(() => {
          cardElement.remove();
          cardElement = null;
          popupDelete.close();
        })
        .catch((err) => console.log("X Error eliminando tarjeta:", err));
      }); 
      popupDelete.open();
    
    }
  );
  return card.generateCard();
}

// Instancia de Section (galería) 
let section;

Promise.all([api.getUserInfo(), api.getInitialCards()])
  .then(([userData, cards]) => {
    userInfo.setUserInfo({
      name: userData.name,
      about: userData.about,

    });


   section = new Section(
{
  items: cards,
    renderer: (item) => {
      const cardElement = createCard(item);
      section.addItem(cardElement);
        },
},
  ".main__gallery"
);

    
 section.renderItems(cards);
})
.catch((err) => {
  console.error("X Error cargando datos iniciales:", err);
}); 


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
  const cardElement = createCard(newCard);
  section.addItem(cardElement);
  popupAddPlace.close();
})
.catch((err) => console.log("X Error agregando tarjeta:", err))
.finally(() => popupAddPlace.setLoading(false, "Crear"));
});


popupAddPlace.setEventListeners();


// Popup editar avatar 
const avatarEditButton = document.querySelector(".main__profile-avatar");
const popupChangeAvatar = document.querySelector("#popupChangeAvatar");

//Abrir el popup al hacer click
avatarEditButton.addEventListener("click", () => {
  popupChangeAvatar.classList.add("popup_opened");
});

//Cerrar el popup con el botón X 
const closeChangeAvatarBtn = document.querySelector("#closeChangeAvatarBtn");
closeChangeAvatarBtn.addEventListener("click", () => {
  popupChangeAvatar.classList.remove("popup_opened");
});


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








