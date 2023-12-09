import { productInformation } from "./productInformation.js";
productInformation;

const amountOfItems = document.getElementById("amount-items-js");

let items = 0;
let index;

amountOfItems.addEventListener("click", () => {
  window.location.href = "/pages/checkout.html";
});

function setAmountItems() {
  const storedProducts = localStorage.getItem("storedProducts") || null;
  const storedProduct = JSON.parse(storedProducts) || [];

  for (let i = 0; i < storedProduct.length + 1; i++) {
    amountOfItems.innerText = i;
  }
}

setAmountItems();

function addItem() {
  const itemContainer = document.getElementById("item-container-js");
  const addButtons = document.querySelectorAll(".redirect");
  let ID = 0;

  const productArray = [];

  addButtons.forEach((button) => {
    button.addEventListener("click", () => {
      items++;
      ID++;
      index = button.getAttribute("data-redirect");

      const product = {
        productID: ID,
        productName: productInformation[index].productName,
        productDescription: productInformation[index].productDescription,
        productPrice: productInformation[index].productPrice,
        productSrc: productInformation[index].productLocationImg,
        productType: productInformation[index].productType,
      };

      productArray.push(product);

      amountOfItems.innerText = items;

      localStorage.setItem("storedProducts", JSON.stringify(productArray));
    });
  });
}

addItem();

function setHeight() {
  const pageHeight =
    (document.documentElement.scrollHeight, document.body.scrollHeight);
  hamburgerMenuCourses.style.height = pageHeight + "px";
}

window.addEventListener("resize", setHeight);
window.addEventListener("load", setHeight);

setHeight();
