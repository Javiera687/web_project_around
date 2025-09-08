import Popup from "./popup.js";

export default class PopupWithImage extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
        this._image = this._popup.querySelector(".popup__photo");
        this._caption = this._popup.querySelector(".popup__photo-title");
}

open(name, link) {
    this._image.src = link;
    this._image.alt = `Imagen de ${name}`;
    this._caption.textContent = name;
    super.open();
}
}