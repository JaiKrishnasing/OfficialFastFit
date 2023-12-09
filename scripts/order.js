const countdownText = document.getElementById("countdown-js");
const orderIDText = document.getElementById("purchase-ordernumber-js");
const numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
const deliveryText = document.getElementById("purchase-delivery-js");
const email = document.getElementById("purchase-confirmation-email-js");

let countdownAmount = 10;

function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

function setEmail() {
  const userEmail = localStorage.getItem("loggedUserEmail");

  email.innerText = userEmail;
}

setEmail();

function deliveryDate() {
  const date = new Date();
  const currentDate = date.getDate();
  const currentDay = date.getDay();
  const currentMonth = date.getMonth();
  const currentYear = date.getFullYear();

  const daysOfWeek = [
    "Zondag",
    "Maandag",
    "Dinsdag",
    "Woensdag",
    "Donderdag",
    "Vrijdag",
    "Zaterdag",
  ];
  const monthsOfYear = [
    "Jan",
    "Feb",
    "Mrt",
    "Apr",
    "Mei",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const secondDate = new Date(currentYear, currentMonth, currentDate + 4);
  const secondDay = secondDate.getDay();

  deliveryText.innerText = `${daysOfWeek[currentDay]}, ${
    monthsOfYear[currentMonth]
  } ${currentDate} - ${daysOfWeek[secondDay]}, ${
    monthsOfYear[secondDate.getMonth()]
  } ${secondDate.getDate()}`;
}

deliveryDate();

function generateID() {
  let ID = "";

  for (let i = 0; i < 5; i++) {
    ID += numbers[getRandomNumber(0, numbers.length)];
  }

  orderIDText.innerText = "#" + ID;
}

generateID();

function countdown() {
  countdownAmount -= 1;
  countdownText.innerText = countdownAmount;

  if (countdownAmount <= 0) {
    localStorage.removeItem("storedProducts");
    clearInterval(countdownInterval);
    window.location.href = "summary.html";
    return;
  }
}

const countdownInterval = setInterval(countdown, 1000);
