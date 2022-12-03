//recuperation et affichage du numeros de commande
const urlId = new URLSearchParams(document.location.search);
const idUrl = urlId.get("id");
const orderId = document.querySelector("#orderId");
orderId.innerText = idUrl;
const cache = window.localStorage;
cache.clear();
