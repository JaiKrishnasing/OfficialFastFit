const userIcon = document.getElementById("user-icon-js");
const logOutButton = document.querySelectorAll(".logout");
const dropdown = document.getElementById("dropdown-js");
const userNameText = document.getElementById("user-name-js");
const userEmailText = document.getElementById("user-email-js");
const userName = localStorage.getItem("loggedUserName");
const greetingText = document.getElementById("greeting-text-js");
const userEmail = localStorage.getItem("loggedUserEmail");
const deleteAccountButton = document.getElementById("delete-account-js");
const usersString = localStorage.getItem("users");
const orderDetailsText = document.getElementById("order-details-js");
const orderString = localStorage.getItem("purchasedItems");
const order = JSON.parse(orderString);
const users = JSON.parse(usersString);

let isDropDownActive = false;

function toggleDropDown() {
  userIcon.addEventListener("click", () => {
    if (!isDropDownActive) {
      isDropDownActive = true;
      dropdown.style.visibility = "visible";
    } else {
      isDropDownActive = false;
      dropdown.style.visibility = "hidden";
    }
  });
}

function setOrderDetails() {
  if (!order) {
    orderDetailsText.innerText = "Uw heeft nog geen bestellingen geplaatst.";
    return;
  }

  const productDetails = [];

  for (let i = 0; i < order.length; i++) {
    const productName = order[i].productName;
    const productPrice = order[i].productPrice;
    const productType = order[i].productType;
    productDetails.push(`${productName}: €${productPrice} (${productType})`);
  }

  orderDetailsText.innerText = productDetails.join("\n");
}

setOrderDetails();

function deleteAccount() {
  deleteAccountButton.addEventListener("click", () => {
    for (let i = 0; i < users.length; i++) {
      if (userEmail === users[i].userEmail) {
        users.splice(i, 1);

        const usersString = JSON.stringify(users);
        localStorage.setItem("users", usersString);

        localStorage.removeItem("logStatus");
        localStorage.removeItem("storedProducts");
        localStorage.removeItem("loggedUserEmail");
        localStorage.removeItem("loggedUserName");
        localStorage.removeItem("purchasedItems");

        window.location.href = "/index.html";

        break;
      }
    }
  });
}

deleteAccount();

function clearLocalStorage() {
  logOutButton.forEach((button) => {
    button.addEventListener("click", () => {
      localStorage.removeItem("logStatus");
      localStorage.removeItem("purchasedItems");
      localStorage.removeItem("storedProducts");
    });
  });
}

clearLocalStorage();

function setUserInfo() {
  greetingText.innerText = userName;
  userNameText.innerText = userName;
  userEmailText.innerText = userEmail;
}

function redirect(input, location) {
  input.addEventListener("click", () => {
    window.location.href = location;
  });
}

const logo = document.getElementById("logo-js");

redirect(logo, "./index.html");

setUserInfo();

toggleDropDown();
