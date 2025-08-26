export default class Card {
    constructor(name, link, templateSelector, handleCardClick) {
        this._name = name;
        this._link = link;
        this._templateSelector = templateSelector;
        this._handleCardClick = handleCardClick
    }

    _getTemplate() {
        const cardElement = document
        .querySelector(this._templateSelector)
        .content.querySelector(".main__gallery-card")
        .cloneNode(true);


        return cardElement;

    }

    _setLikeEvent() {
        this._likeButton.addEventListener("click", () => {
            this._likeButton.classList.toggle("main__button_like-active");

            const likeIcon = this._likeButton.querySelector(".main__gallery-like");
            if (this._likeButton.classList.contains("main__button_like-active")) {
                likeIcon.src = "./images/likeblack.png";
            } else {
                likeIcon.src = "./images/like.png";

            }
            
        });
    }


          //  if (this._likeButton.classList.contains("main__button_like_active")) {
          //      this._likeIcon.src = "./images/likeblack.png";
          //  } else { 
          //      this._likeIcon.src = "./images/like.png";
          //  }

      //  });
  //  }

    _setRemoveEvent() { 
        this._removeButton.addEventListener("click", () => {
            this._element.remove();
            this._element = null;

        });
    }

    _setImageEvent() {
        this._imageElement.addEventListener("click", () => {
            this._handleCardClick(this._name, this._link);
        });
    }

    _setEventListeners() {
        this._setLikeEvent();
        this._setRemoveEvent();
        this._setImageEvent();
    }


    generateCard() {
     this._element = this._getTemplate();
    this._imageElement = this._element.querySelector(".main__gallery-image");
    this._titleElement = this._element.querySelector(".main__gallery-paragraph");
    this._likeButton = this._element.querySelector(".main__button_like");
    this._removeButton = this._element.querySelector(".main__button_remove");

    this._imageElement.src = this._link;
    this._imageElement.alt = this._name;
    this._titleElement.textContent = this._name;

    this._setEventListeners();

    return this._element;

    }
}

       /* this._cardTitle = this._element.querySelector(".main__gallery-paragraph");
        this._cardImage = this._element.querySelector(".main__gallery-image");
        this._likeButton = this._element.querySelector(".main__button_like");
        this._likeIcon = this._element.querySelector(".main__gallery-like");
        this._removeButton = this._element.querySelector(".main__gallery-remove");
        


        this._cardTitle.textContent = this._name; 
        this._cardImage.src = this._link;
        this._cardImage.alt = `Imagen de ${this._name}`;


        this._setLikeEvent();
        this._setRemoveEvent();
        this._setImageEvent();


        return this._element;
    } */