const mainButtonEdit = document.querySelector(".main__button_edit");
const popupEditProfile = document.querySelector(".popup--edit-profile");
const popupButtonClose = document.querySelector("#closeEditProfileBtn")
const popupContainer = popupEditProfile.querySelector(".popup__container");


const mainParagraphName = document.querySelector(".main__paragraph_name");
const mainParagraphAbout = document.querySelector(".main__paragraph_about");
const popupInputName = document.getElementById("input-name-profile");
const popupInputAbout = document.getElementById("input-about-profile");
const templateCard = document.querySelector("#template-card");
const sectionCards = document.querySelector(".main__gallery");
const popupImage = document.querySelector(".popup__Image");
const initialCards = [

  {
    name: "Valle de Yosemite",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/yosemite.jpg"
  },
  {
    name: "Lago Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/lake-louise.jpg"
  },
  {
    name: "Montañas Calvas",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/bald-mountains.jpg"
  },
  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/latemar.jpg"
  },
  {
    name: "Parque Nacional de la Vanoise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/vanoise.jpg"
  },
  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/lago.jpg"
  }
];

initialCards.forEach(function(item) {
    createCard(item.name, item.link);
});

function createCard(title, link) {
   const card = templateCard.content.querySelector(".main__gallery-card").cloneNode(true);

   const cardTitle = card.querySelector(".main__gallery-paragraph");
   cardTitle.textContent = title;

   const cardImage = card.querySelector(".main__gallery-image");
   cardImage.src = link;
   cardImage.alt = `Imagen de ${title}`;

   const likeButton = card.querySelector(".main__button_like");
   const likeIcon = card.querySelector(".main__gallery-like");

   likeButton.addEventListener("click", function () {
    likeButton.classList.toggle("main__button_like_active");

    if (likeButton.classList.contains("main__button_like_active")){
      likeIcon.src = "./images/likeblack.png";
    } else { 
      likeIcon.src = "./images/like.png";
    }

   });
   
   const removeButton = card.querySelector(".main__gallery-remove");
   removeButton.addEventListener("click", function () {
    const cardElement = removeButton.closest(".main__gallery-card");
    if (cardElement) { 
      cardElement.remove();

    }

   });

cardImage.addEventListener("click", function () {
const popup = document.getElementById("popupPhoto");
const popupImg = popup.querySelector(".popup__photo");
const popupTitle = popup.querySelector(".popup__photo-title");

popupImg.src = link;
popupImg.alt = `Imagen de ${title}`; 
popupTitle.textContent = title; 

popup.classList.add("popup_opened");

});

sectionCards.prepend(card);

  }


function handleOpenEdit() {
  popupInputName.value = mainParagraphName.textContent;
  popupInputAbout.value = mainParagraphAbout.textContent;
  popupEditProfile.classList.add("popup_opened");
}

mainButtonEdit.addEventListener("click", handleOpenEdit);

function saveChange(e) {
  e.preventDefault();
  mainParagraphName.textContent = popupInputName.value;
  mainParagraphAbout.textContent = popupInputAbout.value;
  popupEditProfile.classList.remove("popup_opened");
}

popupContainer.addEventListener("submit", saveChange);

let popupAddPlace = document.querySelector(".popup--add-place");
let popupAddPlaceOpenBtn = document.querySelector(".main__button_add");
const popupCloseAddPlaceBtn = document.querySelector("#closeAddPlaceBtn");

popupCloseAddPlaceBtn.addEventListener("click", () => {
popupAddPlace.classList.remove("popup_opened");

});

function handleOpenAddPlace() {
  popupAddPlace.classList.add("popup_opened");
}

// POP UP PARA AGREGAR UNA IMAGEN 
popupAddPlaceOpenBtn.addEventListener("click", handleOpenAddPlace);

const formAddPlace = document.querySelector(".popup__form_add");
const inputTitlePlace = document.getElementById("input-title-place");
const inputUrlPlace = document.getElementById("input-url-place");

formAddPlace.addEventListener("submit", function (e) {
  e.preventDefault();

  const title = inputTitlePlace.value;
  const url = inputUrlPlace.value;

  createCard(title, url); 

  formAddPlace.reset();
  popupAddPlace.classList.remove("popup_opened");

});


closeEditProfileBtn.addEventListener("click", () => {

  popupEditProfile.classList.remove("popup_opened");
}); 


const popupExitPhoto = document.getElementById("popupExitPhoto");
const popupPhoto = document.getElementById("popupPhoto");


popupExitPhoto.addEventListener("click", function () {
  popupPhoto.classList.remove("popup_opened");
});