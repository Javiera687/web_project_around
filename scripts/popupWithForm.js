import Popup from "./popup.js";

export default class PopupWithForm extends Popup {
    constructor(popupSelector, handleFormSubmit) {
            super(popupSelector);
            this._handleFormSubmit = handleFormSubmit;
            this._form = this._popup.querySelector("form");
            this._inputList = this._form.querySelectorAll("input");
        }

        _getInputValues() {
            const formValues = {};
            this._inputList.forEach(input => {
                formValues[input.name] = input.value;

            });
            return formValues;
        }

        setEventListeners() {
            super.setEventListeners();
            this._form.addEventListener("submit", (evt) => {
                evt.preventDefault();
                this._handleFormSubmit(this._getInputValues());
            });
        }

        setLoading(isLoading, defaultText = "Guardar") {
            const button = this._form.querySelector(".popup__button_save");
            if (isLoading) {
                button.textContent = "Guardando...";
            } else {
                button.textContent = defaultText;
            }
        }

        close() {
            super.close();
            this._form.reset();
        }
    }
