export default class Popup {
    constructor(popupSelector) {
        this._popup = document.querySelector(popupSelector);
        this._handleEscClose = this._handleEscClose.bind(this);
    }


    open() {
        this._popup.classList.add("popup_opened");
        document.addEventListener("keydown", this._handleEscClose);

    }

    close() {
        this._popup.classList.remove("popup_opened");
        document.removeEventListener("keydown", this._handleEscClose);

    }

    _handleEscClose(evt) {
        if (evt.key === "Escape") {
            this.close();
        }
    }

    setEventListeners() {
        this._popup.addEventListener("mousedown", (evt) => {
            const t = evt.target;
            const clickedOverlay = t.classList.contains("popup_opened");

            const clickedClose = 
            t.classList.contains("popup__button_close") ||
            t.classList.contains("popup__btn_close") ||
            t.closest(".popup__button_close") ||
            t.closest(".popup__btn_close");

            if (clickedOverlay || clickedClose) {
                this.close();
            }
        });
    }
}


