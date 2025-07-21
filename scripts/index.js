
let mainButtonEdit = document.querySelector(".main__button_edit");
let popupEditProfile = document.querySelector(".popup--edit-profile");
let popupContainer = popupEditProfile.querySelector(".popup__container");

let mainParagraphName = document.querySelector(".main__paragraph_name");
let mainParagraphAbout = document.querySelector(".main__paragraph_about");
let popupInputName = document.getElementById("input-name-profile");
let popupInputAbout = document.getElementById("input-about-profile");
const templateCard = document.querySelector("#template-card");
const sectionCards = document.querySelector(".cards");
const popupImage = document.querySelector(".popup__image");
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

function createCard(tittle, link) {
   const card = templateCard.content.querySelector(".card").cloneNode(true);
   const cardTitle = card.querySelector(".card__title");
   const cardImage = card.querySelector(".card__image");
   const trashIcon = card.querySelector(".card__trash-icon");
   cardImage.src = link;
   cardTitle.textContent = tittle;
   card.addEventListener("Click", function () {});
   cardImage.addEventListener("click", function () {});
   sectionCards.appened(card);

}

   trashIcon.addEventListener("click", function () {
    card.remove();
   }
);

likeButton.addEventListener("click", function () {
likeButton.classList.add("card__button_active");
}
);
  
   
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

function handleOpenAddPlace() {
  popupAddPlace.classList.add("popup_opened");
}

popupAddPlaceOpenBtn.addEventListener("click", handleOpenAddPlace);



let allCloseButtons = document.querySelectorAll(".popup__button_close");

allCloseButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    const popup = btn.closest(".popup");
    popup.classList.remove("popup_opened");
  });
});


const formAddPlace = popupAddPlace.querySelector(".popup__container");
const inputTitle = document.getElementById("input-title-place");
const inputUrl = document.getElementById("input-url-place");

// Contenedor de las tarjetas
const gallery = document.querySelector(".main__gallery");

// Función para crear tarjeta
function createCard(title, imageUrl) {
  const card = document.createElement("div");
  card.classList.add("main__gallery-card");

  card.innerHTML = `
    <img src="${imageUrl}" alt="${title}" class="main__gallery-image">
    <div class="main__gallery-info">
      <h3 class="main__gallery-title">${title}</h3>
      <button class="main__gallery-like" aria-label="Me gusta"></button>
    </div>
  `;

  // Activar botón me gusta
  const likeButton = card.querySelector(".main__gallery-like");
  likeButton.addEventListener("click", () => {
    likeButton.classList.toggle("main__gallery-like_active");
  });

  return card;
}

// Agregar tarjeta al enviar formulario
formAddPlace.addEventListener("submit", (e) => {
  e.preventDefault();

  const title = inputTitle.value;
  const url = inputUrl.value;

  const newCard = createCard(title, url);
  gallery.prepend(newCard); // Inserta arriba

  formAddPlace.reset();
  popupAddPlace.classList.remove("popup_opened");
});

function toggleLike(button) {
  const img = button.querySelector("img");
  const currentSrc = img.getAttribute("src");

  if (currentSrc.includes("like-black.png")) {
    img.setAttribute("src", "./images/like.png");
  } else {
    img.setAttribute("src", "./images/like-black.png");
  }
}

document.querySelectorAll(".main__button_like").forEach((button) => {
  button.addEventListener("click", () => toggleLike(button));
});

