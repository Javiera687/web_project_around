export function openPopup(popup) {
    popup.classList.add("popup_opened");
    document.addEventListener("keydown", handleEscClose);
}

export function closePopup(popup) {
    popup.classList.remove("popup_opened");
    document.removeEventListener("keydown", handleEscClose);

}

export function setPopupListeners(popup) {
    popup.addEventListener("click", (evt) => {
        if (evt.target.classList.contains("popup")) {
            closePopup(popup);
        }

    });
}

function handleEscClose(evt) {
    if (evt.key === "Escape") {
        const openPopup = document.querySelector(".popup_opened");
        if (openPopup) closePopup(openPopup);
    }
}