let mainButtonEdit = document.querySelector(".main__button_edit");
let popup = document.querySelector(".popup");
let popupButtonClose = document.querySelector(".popup__button_close");
let popupContainer = document.querySelector(".popup__container");
let mainParagraphName = document.querySelector(".main__paragraph_name");
let mainParagraphAbout = document.querySelector(".main__paragraph_about");
let popupInputName = document.querySelector(".popup__input_name");
let popupInputAbout = document.querySelector(".popup__input_about");

function handleOpenEdit () {
 popupInputName.value = mainParagraphName.textContent;
 popupInputAbout.value = mainParagraphAbout.textContent;
 popup.classList.toggle("popup_opened");
console.log ("Debe abrir el popup!");
}

mainButtonEdit.addEventListener("click", handleOpenEdit);
popupButtonClose.addEventListener("click", handleOpenEdit);

function saveChange(e) { 
    e.preventDefault();
    mainParagraphName.textContent = popupInputName.value;
    mainParagraphAbout.textContent = popupInputAbout.value;
    popup.classList.remove("popup_opened");
}

popupContainer.addEventListener("submit", saveChange);
