const amountOfItemsText = document.getElementById("amount-header-items-js");
const itemContainer = document.getElementById("item-container-js");
const storedProducts = localStorage.getItem("storedProducts");
const removeButton = document.querySelectorAll(".item-remove-icon");
const itemContent = document.querySelectorAll(".item-content");
const totalText = document.getElementById("total-js");
const taxText = document.getElementById("tax-js");
const subtotalText = document.getElementById("subtotal-js");
const shippingText = document.getElementById("shipping-js");
const waitingContainer = document.getElementById("waiting-checkout-js");
const TAX_PERCENTAGE = 0.21;
const checkoutButton = document.getElementById("checkoutButton-js");
const SHIPPING_COST = 2;

let amountOfItems = 0;
let subtotal = 0;
let total = 0;
let tax = 0;
let productIdToRemove;

function removeItemFromLocalStorage(productID) {
  const cart = JSON.parse(localStorage.getItem("storedProducts"));

  let temp = cart.filter((item) => item.productID !== productID);

  localStorage.setItem("storedProducts", JSON.stringify(temp));
}

function addItem() {
  const storedProduct = JSON.parse(storedProducts) || [];

  for (let i = 0; i < storedProduct.length; i++) {
    amountOfItems++;
    const newItem = document.createElement("div");
    newItem.classList.add("item-content");
    newItem.innerHTML = `
      <div class="item" data-product-id="${storedProduct[i].productID}">
        <div>
          <img src="${storedProduct[i].productSrc}" class="item-img">
        </div>
        <div>
          <div class="item-name-top">${storedProduct[i].productType}</div>
          <div class="item-name-bottom">${storedProduct[i].productName}</div>
        </div>
        <div class="item-price">
          &euro; ${storedProduct[i].productPrice.toFixed(2)},-
        </div>
        <div class="item-remove-icon">
          <img src="/icons/icons8-close-30.png">
        </div>
      </div>
    `;
    itemContainer.appendChild(newItem);
    amountOfItemsText.innerText = amountOfItems;

    subtotal += storedProduct[i].productPrice;
    subtotalText.innerHTML = `€${subtotal.toFixed(2)}`;

    tax = subtotal.toFixed(2) * TAX_PERCENTAGE;
    taxText.innerText = `€${tax.toFixed(2)}`;

    shippingText.innerText = "€" + SHIPPING_COST;

    total = subtotal + tax + SHIPPING_COST;
    totalText.innerText = `€${total.toFixed(2)}`;

    checkOutWaitingImg();

    const removeIcon = newItem.querySelector(".item-remove-icon");

    removeIcon.addEventListener("click", (event) => {
      const clickedItem = event.target.closest(".item");
      if (clickedItem) {
        productIdToRemove = parseInt(
          clickedItem.getAttribute("data-product-id")
        );

        const removedProduct = storedProduct.find(
          (product) => product.productID === productIdToRemove
        );

        const removedProductPrice = removedProduct.productPrice;

        subtotal -= removedProductPrice;

        subtotalText.innerHTML = `€${subtotal.toFixed(2)}`;

        tax = subtotal.toFixed(2) * TAX_PERCENTAGE;
        taxText.innerText = `€${tax.toFixed(2)}`;

        shippingText.innerText = "€" + SHIPPING_COST;

        total = subtotal + tax + SHIPPING_COST;
        totalText.innerText = `€${total.toFixed(2)}`;

        amountOfItems--;

        removeItemFromLocalStorage(productIdToRemove);
        clickedItem.remove();
        amountOfItemsText.innerText = amountOfItems;

        checkOutWaitingImg();
      }
    });
  }
}

function checkOutWaitingImg() {
  if (amountOfItems < 1) {
    waitingContainer.style.visibility = "visible";
  } else {
    waitingContainer.style.visibility = "hidden";
  }
}

addItem();

function getItems() {
  const storedProduct = storedProducts;

  return storedProduct;
}

function checkOut() {
  const isUserLoggedIn = Boolean(localStorage.getItem("logStatus")) || false;

  if (!isUserLoggedIn) {
    redirect(checkoutButton, "login.html");
    return;
  }

  checkoutButton.addEventListener("click", () => {
    window.location.href = "order.html";
    const purchasedItems = getItems();
    localStorage.setItem("purchasedItems", purchasedItems);
  });
}

checkOut();

function redirect(input, location) {
  input.addEventListener("click", () => {
    window.location.href = location;
  });
}
