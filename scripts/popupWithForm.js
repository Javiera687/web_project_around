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

    const popupChangeAvatar = new PopupWithForm("#popupChangeAvatar", (formData) => {
        popupChangeAvatar.setLoading(true);

        api.updateUserAvatar({ avatar: formData.avatar })
        .then((res) => {
            document.querySelector(".main__profile-image").src = res.avatar;
            popupChangeAvatar.close();
        })
        .catch((err) => console.log("X Error cambiando avatar:", err))
        .finally(() => popupChangeAvatar.setLoading(false));
    });

    popupChangeAvatar.setEventListeners();

    //Botón que abre el popup 
    const avatarEditButton = document.querySelector(".main__profile-avatar");
    avatarEditButton.addEventListener("click", () => {
        popupChangeAvatar.open();
    });
