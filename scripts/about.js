import { ValidateForm } from "./validateForm.js";

const counters = document.querySelectorAll(".count-up");
const nameInput = document.getElementById("fname-js");
const emailInput = document.getElementById("email-js");
const textInput = document.getElementById("comment-js");
const submitButton = document.getElementById("submit-js");
const contactButton = document.querySelector(".buttonCourse");

function redirect() {
  contactButton.addEventListener(
    "click",
    () => (window.location.href = "about.html#target")
  );
}

redirect();

function submit() {
  const validateForm = new ValidateForm();

  submitButton.addEventListener("click", (event) => {
    event.preventDefault();

    const isNameValid = validateForm.checkLength(5, 15, nameInput);
    const isTextValid = validateForm.checkLength(1, 200, textInput);
    const isEmailValid = validateForm.checkEmail(emailInput);

    if (!isNameValid || !isTextValid || !isEmailValid) {
      alert("Enter valid input");

      if (!isNameValid) {
        alert("Naam moet tussen 5 & 15 karakters zijn");
      }

      if (!isTextValid) {
        alert("Uw commentaar is niet volledig");
      }

      if (!isEmailValid) {
        alert("Uw e-mailadres is niet geldig");
      }

      return;
    }

    if (isNaN(nameInput.value)) {
      alert("Bedankt voor uw bericht");
    } else {
      alert("Naam mag niet met getallen beginnen");
    }

    validateForm.clearInput(emailInput);
    validateForm.clearInput(nameInput);
    validateForm.clearInput(textInput);
  });
}

submit();

counters.forEach((counter) => {
  const countToNumber = parseInt(counter.getAttribute("data-count"));
  counter.textContent = 0;
  let countSpeed;

  if (countToNumber < 100) {
    countSpeed = 75;
  } else {
    countSpeed = 10 / (countToNumber / 10);
  }

  countUp(counter, countToNumber, countSpeed);
});

function countUp(counter, countToNumber, countSpeed) {
  let count = 0;

  const countInterval = setInterval(() => {
    counter.textContent = count;

    if (count === countToNumber) {
      counter.textContent = count + "+";
      clearInterval(countInterval);
      return;
    }

    count++;
  }, countSpeed);
}

function buttonAnimation() {
  const button = document.querySelector(".buttonCourse");
  const animation = document.getElementById("button-animation-js");

  button.addEventListener("mouseover", () => {
    animation.style.animation = "buttonInAbout 0.4s ease-in-out";
    animation.style.animationFillMode = "forwards";
  });

  button.addEventListener("mouseout", () => {
    animation.style.animation = "buttonOutAbout 0.4s ease-in-out";
    animation.style.animationFillMode = "forwards";
  });
}

buttonAnimation();

function setHeight() {
  const pageHeight =
    (document.documentElement.scrollHeight, document.body.scrollHeight);

  hamburgerMenuCourses.style.height = pageHeight + "px";
}

window.addEventListener("resize", setHeight);
window.addEventListener("load", setHeight);

setHeight();
