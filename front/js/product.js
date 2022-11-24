let params = new URLSearchParams(document.location.search);
let idUrl = params.get("id");

fetch(`http://localhost:3000/api/products/${idUrl}`)
  .then((response) => response.json())
  .then((res) => data(res));

function data(kanapData) {
  const kanapImg = document.querySelector(".item__img");
  const kanapPhoto = document.createElement("img");
  kanapPhoto.src = kanapData.imageUrl;
  kanapPhoto.alt = kanapData.altTxt;
  kanapImg.appendChild(kanapPhoto);
  name(kanapData);
}

function name(kanapData) {
  const kanapName = document.querySelector("#title");
  const kanapTitle = document.querySelector("title");
  kanapTitle.innerText = kanapData.name;
  kanapName.innerText = kanapData.name;
  price(kanapData);
}

function price(kanapData) {
  const kanapPrice = document.querySelector("#price");
  kanapPrice.innerText = kanapData.price;
  description(kanapData);
}

function description(kanapData) {
  const kanapDescription = document.querySelector("#description");
  kanapDescription.innerText = kanapData.description;
  color(kanapData);
}

function color(kanapData) {
  for (let i of kanapData.colors) {
    let newOption = document.createElement("option");
    let selectColor = document.querySelector("#colors");
    newOption.value = i;
    newOption.text = i;
    selectColor.appendChild(newOption);
  }
}

function addPanier(product, newProduct) {
  newProduct.push(product);
  localStorage.setItem("Panier", JSON.stringify(newProduct));
  return newProduct;
}

let button = document.querySelector("#addToCart");
button.addEventListener("click", () => {
  const color = document.querySelector("#colors").value;
  const quantity = document.querySelector("#quantity").value;

  if (color === "" || quantity == 0 || quantity > 100 || quantity < 0) {
    alert("Veuillez sélectionner une couleur et une quantité valide svp");
  } else {
    // On récupère le contenu du panier si celui-ci est plein dans le localstorage,
    // sinon on stocke un tableau vide dans la variable
    let cartProducts = localStorage.getItem("Panier")
      ? JSON.parse(localStorage.getItem("Panier"))
      : [];

    const products = {
      id: idUrl,
      color: color,
      quantity: parseInt(quantity),
    };

    let sameProductColor = false;

    cartProducts.forEach((cartProduct) => {
      // si le produit est déjà présent dans la même couleur, on modifie seulement la quantité
      if (cartProduct.id == idUrl && cartProduct.color == color) {
        sameProductColor = true;
        cartProduct.quantity += parseInt(quantity);
        localStorage.setItem("Panier", JSON.stringify(cartProducts));
      }
    });

    if (!sameProductColor) {
      cartProducts = addPanier(products, cartProducts);
    }
  }
});
