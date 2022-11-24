const test = await fetch("http://localhost:3000/api/products/");
const test2 = await test.json();
const productLocalStorage = JSON.parse(localStorage.getItem("Panier"));
let totalQuantity = 0;
let totalPrice = 0;
for (let i in productLocalStorage) {
  fetch(`http://localhost:3000/api/products/${productLocalStorage[i].id}`)
    .then((response) => response.json())
    .then((data) => {
      //Ajout des Element sur le DOM
      const sectionCard = document.querySelector("#cart__items");
      const canapArticle = document.createElement("article");
      const canapPhoto = document.createElement("img");
      const canapDivImg = document.createElement("div");
      const canapDivContent = document.createElement("div");
      const canapDivDescription = document.createElement("div");
      const canapName = document.createElement("h2");
      const canapColor = document.createElement("p");
      const canapPrice = document.createElement("p");
      const canapDivSettings = document.createElement("div");
      const canapDivQuantity = document.createElement("div");
      const canapPQ = document.createElement("p");
      const canapInput = document.createElement("input");
      const canapDivDelete = document.createElement("div");
      const canapPDelete = document.createElement("p");
      const canapSpanQuantity = document.querySelector("#totalQuantity");
      const canapSpanTotal = document.querySelector("#totalPrice");

      canapName.innerText = data.name;
      canapColor.innerText = productLocalStorage[i].color;
      canapPrice.innerText = `${data.price}€`;
      canapPQ.innerText = "Qté : ";
      canapPhoto.src = data.imageUrl;
      canapPhoto.alt = data.altTxt;
      canapArticle.className = "cart__item";
      canapDivImg.className = "cart__item__img";
      canapDivContent.className = "cart__item__content";
      canapDivDescription.className = "cart__item__content__description";
      canapDivSettings.className = "cart__item__content__settings";
      canapDivQuantity.className = "cart__item__content__settings__quantity";
      canapInput.className = "itemQuantity";
      canapInput.name = "itemQuantity";
      canapInput.type = "Number";
      canapInput.min = 1;
      canapInput.max = 100;
      canapInput.value = productLocalStorage[i].quantity;
      canapDivDelete.className = "cart__item__content__settings__delete";
      canapPDelete.className = "deleteItem";
      canapPDelete.innerText = "Supprimer";

      totalQuantity += productLocalStorage[i].quantity;
      totalPrice += data.price * totalQuantity;
      canapSpanQuantity.innerText = totalQuantity;
      canapSpanTotal.innerText = totalPrice;

      sectionCard.appendChild(canapArticle);
      canapArticle.appendChild(canapDivImg);
      canapDivImg.appendChild(canapPhoto);
      canapArticle.appendChild(canapDivContent);
      canapDivContent.appendChild(canapDivDescription);
      canapDivContent.appendChild(canapDivSettings);
      canapDivSettings.appendChild(canapDivQuantity);
      canapDivDescription.appendChild(canapName);
      canapDivDescription.appendChild(canapColor);
      canapDivDescription.appendChild(canapPrice);
      canapDivQuantity.appendChild(canapPQ);
      canapDivQuantity.appendChild(canapInput);
      canapDivSettings.appendChild(canapDivDelete);
      canapDivDelete.appendChild(canapPDelete);

      canapInput.addEventListener("change", function (event) {
        if (canapInput.value < productLocalStorage[i].quantity) {
          console.log("oui");
          console.log(productLocalStorage[i].quantity - 1);
        }
        // productLocalStorage[i].id;
      });

      canapPDelete.addEventListener("click", (e) => {
        const oldQuantity = e.target.closest(".cart__item__content__settings")
          .firstChild.lastChild.value;
        totalPrice -= data.price * oldQuantity;
        totalPrice.innerText = totalPrice;
        console.log(oldQuantity);
      });
    });
}

// let regex = new re();
