import { inputForm } from "./inputForm.js";

const userInputForm = new inputForm();
const isUserLoggedIn = Boolean(localStorage.getItem("logStatus")) || false;

let pageWidth = window.innerWidth;
let pageHeight = window.innerHeight;

userInputForm.recommendCourseOptions();
userInputForm.setQuestion();

function buttonAnimation(
  buttonInput,
  animationInput,
  animationIn,
  animationOut
) {
  const button = document.getElementById(`${buttonInput}`);
  const animation = document.getElementById(`${animationInput}`);

  if (button === null || animation === null) {
    return;
  }

  button.addEventListener("mouseover", () => {
    animation.style.animation = `${animationIn} 0.4s ease-in-out`;
    animation.style.animationFillMode = "forwards";
  });

  button.addEventListener("mouseout", () => {
    animation.style.animation = `${animationOut} 0.4s ease-in-out`;
    animation.style.animationFillMode = "forwards";
  });
}

function hamburgerMenuPopUp() {
  pageWidth = window.innerWidth;
  pageHeight = window.innerHeight;
  const nav = document.getElementById("nav-js");
  const hamburgerMenu = document.getElementById("hamburger-icon-js");
  const hamburgerContainer = document.getElementById("hamburger-container-js");
  const closeButton = document.getElementById("close-button-js");
  const content = document.getElementById("content-js");

  if (pageWidth <= 750) {
    nav.classList.add("visible");
    hamburgerMenu.style.visibility = "visible";

    hamburgerMenu.addEventListener("click", () => {
      hamburgerContainer.style.animation = "hamburgerIn 1.7s ease-in-out";
      hamburgerContainer.style.animationFillMode = "forwards";
      content.classList.remove("content");
      hamburgerContainer.style.zIndex = "20";
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    });

    closeButton.addEventListener("click", () => {
      nav.classList.remove("visible");
      hamburgerMenu.style.visibility = "hidden";
      hamburgerContainer.style.animation = "hamburgerOut 1.7s ease-in-out";
      hamburgerContainer.style.animationFillMode = "forwards";
      content.classList.add("content");
      hamburgerContainer.style.zIndex = "0";
    });
  } else if (pageWidth >= 750) {
    nav.classList.remove("visible");
    hamburgerMenu.style.visibility = "hidden";
  }
}

window.addEventListener("resize", hamburgerMenuPopUp);

function scrollToTop() {
  const logo = document.getElementById("landing-page-header-logo-js");

  logo.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });
}

function loading() {
  const startButton = document.getElementById("button-form-js");
  const formIntro = document.getElementById("input-form-intro-js");
  const loading = document.getElementById("loading-js");

  startButton.addEventListener("click", () => {
    formIntro.style.visibility = "hidden";
    loading.style.visibility = "visible";

    setTimeout(() => {
      loading.style.visibility = "hidden";
      userInputForm.visibility("visible");
    }, 6000);
  });
}

function redirect() {
  const buttons = document.querySelectorAll(".redirect");

  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      window.open("/pages/shop.html", "blank_");
    });
  });
}

redirect();
loading();
buttonAnimation(
  "button-landing-page-js",
  "button-animation-js",
  "buttonIn",
  "buttonOut"
);
buttonAnimation(
  "button-form-js",
  "button-animation-two-js",
  "buttonInForm",
  "buttonOutForm"
);
buttonAnimation(
  "recommend-button-js",
  "button-animation-three-js",
  "buttonInRecommend",
  "buttonOutRecommend"
);
scrollToTop();

function redirectUser() {
  const icon = document.getElementById("icon-js");

  icon.addEventListener("click", () => {
    if (!isUserLoggedIn) {
      window.location.href = "pages/login.html";
    } else {
      window.location.href = "pages/summary.html";
    }
  });
}

redirectUser();
