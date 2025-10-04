import Popup from "./popup.js";

export default class PopupWithConfirmation extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
        this._form = this._popup.querySelector("form");
    }

    // permite pasar la acción que se ejecutará al confirmar
    setSubmitAction(action) {
        this._handleSubmit = action;
    }

    setEventListeners() {
        super.setEventListeners();
        this._form.addEventListener("submit", (evt) => {
            evt.preventDefault();
            if (this._handleSubmit) {
                this._handleSubmit();
            }
        });
    }
}