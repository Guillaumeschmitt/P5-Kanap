// on recupere les donner de l'api via fetch
fetch("http://localhost:3000/api/products/")
  .then((test) => test.json())
  .then((data) => {
    for (let i in data) {
      //Ajout des attribut HTML
      let item = document.getElementById("items");
      let newLien = document.createElement("a");
      let newArticle = document.createElement("article");
      let newImg = document.createElement("img");
      let newTitle = document.createElement("h3");
      let newParagraph1 = document.createElement("p");
      //Ajout des classe
      newLien.className = "cart__item";

      //Ajout des enfant
      item.appendChild(newLien);
      newLien.appendChild(newArticle);
      newArticle.appendChild(newImg);
      newArticle.appendChild(newTitle);
      newArticle.appendChild(newParagraph1);

      // Ajout des element sur le DOM
      newTitle.innerHTML = data[i].name;
      newParagraph1.innerHTML = data[i].description;
      newImg.src = data[i].imageUrl;
      newImg.alt = data[i].altTxt;
      newLien.href = `http://127.0.0.1:5500/front/html/product.html?id=${data[i]._id}`;
    }
  })
  // message en cas indisponibiliter des produits
  .catch((err) => {
    let messErr = document.createElement("h3");
    let item = document.getElementById("items");

    item.appendChild(messErr);

    messErr.innerHTML = "Pas de produits disponible";
  });
