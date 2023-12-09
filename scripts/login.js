import { ValidateForm } from "./validateForm.js";

const switchButton = document.querySelectorAll(".switch");
const checkBox = document.getElementById("checkboxTOS-js");
const signUpContainer = document.getElementById("signup-form-js");
const logInButton = document.getElementById("button-login-js");
const emailInput = document.getElementById("email-js");
const nameInput = document.getElementById("name-js");
const toggleImg = document.getElementById("toggleimg-js");
const toggleButton = document.getElementById("toggle-password");
const loginImg = document.getElementById("img-content-js");
const passwordInput = document.getElementById("password-js");
const headerLogText = document.getElementById("logscreen-header-text-js");
const validateForm = new ValidateForm();

let isUserOnLogScreen = false;
let isPasswordVisible = false;
let isUserLoggedIn = false;

function changeLogIn() {
  switchButton.forEach((button) => {
    button.addEventListener("click", () => {
      switchButton.forEach((btn) => {
        btn.classList.add("not-active");
      });

      const buttonID = parseInt(button.getAttribute("data-button"));

      toggleLogIn(buttonID);

      button.classList.remove("not-active");
    });
  });
}

function redirect(input, location) {
  input.addEventListener("click", () => {
    window.location.href = location;
  });
}

redirect(loginImg, "/index.html");

function toggleVisibility() {
  toggleButton.addEventListener("click", () => {
    if (!isPasswordVisible) {
      isPasswordVisible = true;
      toggleImg.src =
        "data:image/png;base64,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";
      passwordInput.type = "text";
    } else {
      isPasswordVisible = false;
      toggleImg.src =
        "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAACXBIWXMAAAsTAAALEwEAmpwYAAADAklEQVR4nO2X32vPURjHXxgtzLDRkHJnbGHyB1CKC7RdyMUWVtvNihuGCy2FK0tiVsLKd0JJojTyq02KG4VWSlYuFSNcYJu3js7qdHy2nfP13XfK56lTn87neb+f9/mc83me50BqqaWWWmqp/e8mWCLYLmgT3BO8EfQLBu0wz68FdwUnBbWCxRMtepHgoOC5QFmOZ4IDgrJ8Cq8QXLZfVjkaPwQZQfl4Cp8nOCsYShDwTXBb0CLYJFgmmCOYIiiwz2bhWwSH7FH6nsBjPkq7YG6uxdcI3icENMenXlCUBWexoEHQm8D7TrA5F8IL7E/nB3ggWP/XAfgdY5Jgo6AnIc5xs4vZEhfZrXYJTTbZmQvhIyykUfDJi9klmB5LNkvw2CO6lY9sIVgouOPF7hbMDCWYZnO5S3AmZCvtT1tjM8orwVc7zPMFQbVgcuDRPe9pMEliasgCznnAlsCFrxO8DEiZLwRrA4/UYQ/bPhao1gMcCxS/O7IuDAh2BXKf8LDbRnIsE3z0tizk2NR7AT7YXF8lmGFHlZ3r93x3BB4n90gbjvlJjpccpz5TfALIy72CdF9QMop/qfVxC+DSgDglgrcOLuM7rBT8dBxqxiK1uOsO5omgMABTKHjq4K4FxtrqYEw3UOm+vOq8fBhIuMBpK8z5Xx6Cs9gK558ZCk3PXrG74ubdATtpdmF1IFmjW2xCxTt4U6CG8Q2BmDVeA1hmJptjv74la3VwzVkswI3bGoHrdnB7zMSjmKzgEGUcXF0WC6hz8J0RODfr9WAr5XBuLo0ganOImrJYQJODb4vAlTpH/ouZOCL4bKpepID9joCOLBbQ4eD3RWKPGvGxmn2SKq+4FEdgZ3tFbRUTYd5l5FQE7rSD6x1flaMLqfZag72R2UfmmpkftSMLuugJuiFYkeBnqv1NzzczMar/bA38+8NwP9VlR1/Ce3PbG7P1yIuZi4Zte0Na6kF71y3gXzPb43R6bbmbqTIxPdNE70ilYIMdlUHXwdRSSy211FJLLTXyar8AvOYu/BUXraAAAAAASUVORK5CYII=";
      passwordInput.type = "password";
    }
  });
}

toggleVisibility();

function toggleLogIn(buttonID) {
  if (!isUserOnLogScreen && buttonID === 1) {
    isUserOnLogScreen = true;
    headerLogText.innerText = "Welkom terug!";
    logInButton.innerText = `Aanmelden`;
    logInButton.style.marginLeft = "-180px";
    signUpContainer.innerHTML = "";
  } else if (isUserOnLogScreen && buttonID === 2) {
    isUserOnLogScreen = false;
    signUpContainer.innerHTML = `
        <div>
        <input
          type="text"
          id="name-js"
          name="name"
          placeholder="Naam"
          autocomplete="on"
          class="input-content signup"
        />
      </div>
      <div>
        <input
          type="radio"
          id="male-js"
          class="radiobutton signup"
          name="gender"
          value="man"
        />
        <label for="male-js" class="red signup">Man</label>
        <input
          type="radio"
          id="female-js"
          class="radiobutton signup"
          name="gender"
          value="female"
        />
        <label for="female-js" class="red signup">Vrouw</label>
        <input
          type="radio"
          id="anders-js"
          class="radiobutton signup"
          name="gender"
          value="anders"
        />
        <label for="anders-js" class="red signup">Anders</label>
      </div>
      <div>
        <input
          type="checkbox"
          id="checkboxTOS-js"
          name="terms-of-service"
          value="tos"
          class="checkbox signup"
        />
        <label for="checkboxTOS-js" class="red sm-text signup"
          >Akkoord</label
        >
        <div class="tos-container signup">
        <p class="tos-description signup">
          Door op 'Akkoord' te klikken, erkent en aanvaardt u onze
          Gebruiksvoorwaarden. Dit omvat het naleven van alle
          toepasselijke wetten, de verantwoordelijkheid voor de
          vertrouwelijkheid van uw account en het begrip dat de inhoud uw
          verantwoordelijkheid is. U stemt ook in met ons Privacybeleid en
          erkent ons recht om diensten te beëindigen of te wijzigen. Lees
          deze voorwaarden zorgvuldig door; als u het er niet mee eens
          bent, ga dan niet verder.
        </p>
      </div>
    `;
    headerLogText.innerText = " Word lid van onze community!";
    logInButton.innerText = `Verder als nieuwe klant`;
    logInButton.style.marginLeft = "-6rem";
  }
}

function signup() {
  logInButton.addEventListener("click", () => {
    if (isUserOnLogScreen) {
      return;
    }

    const nameInput = document.getElementById("name-js");
    const checkBox = document.getElementById("checkboxTOS-js");

    const inputFields = [nameInput, emailInput, passwordInput];

    if (
      validateForm.checkLength(1, 8, nameInput) &&
      validateForm.checkEmail(emailInput) &&
      validateForm.checkLength(1, 20, passwordInput) &&
      checkBox.checked
    ) {
      createAccount();
      inputFields.forEach((input) => validateForm.clearInput(input));
      checkBox.checked = false;
      switchButton.forEach((button) => {
        const buttonID = parseInt(button.getAttribute("data-button"));
        button.classList.remove("not-active");

        if (buttonID === 2) {
          button.classList.add("not-active");
        }
      });
      const buttonID = 1;
      toggleLogIn(buttonID);
      return;
    } else {
      if (inputFields.some((input) => input.value === "")) {
        alert("U heeft niet alle velden ingevuld.");
      } else if (!validateForm.checkEmail(emailInput)) {
        alert("Uw email is niet geldig.");
      } else if (!validateForm.checkLength(6, 20, passwordInput)) {
        alert("Uw wachtwoord moet tussen 6 en 20 karakters zijn.");
      } else if (!validateForm.checkLength(1, 8, nameInput)) {
        alert("Uw naam moet tussen 1 en 8 karakters zijn.");
      } else if (!checkBox.checked) {
        alert("U heeft niet op de akkoordknop geklikt.");
      }
    }
  });
}

function getInput(inputElement) {
  return inputElement.value;
}

const users = [];

function createAccount() {
  const nameInput = document.getElementById("name-js");

  const emailValue = emailInput.value;
  const passwordValue = passwordInput.value;
  const nameValue = nameInput.value;

  const existingUsersString = localStorage.getItem("users") || null;
  const existingUsers = JSON.parse(existingUsersString) || [];

  const user = {
    userName: nameValue,
    userEmail: emailValue,
    userPassword: passwordValue,
  };

  existingUsers.push(user);

  const usersString = JSON.stringify(existingUsers);

  localStorage.setItem("users", usersString);
}

function logIn() {
  logInButton.addEventListener("click", () => {
    if (!isUserOnLogScreen) {
      return;
    }

    const usersString = localStorage.getItem("users");

    const emailValue = getInput(emailInput);
    const passwordValue = getInput(passwordInput);

    const users = JSON.parse(usersString);

    if (users === null) {
      alert("U heeft niet alle velden ingevuld.");
      return;
    }

    for (let i = 0; i < users.length; i++) {
      const userEmail = users[i].userEmail;
      const userPassword = users[i].userPassword;
      const userName = users[i].userName;

      if (userEmail === emailValue && passwordValue === userPassword) {
        localStorage.setItem("loggedUserEmail", userEmail);
        localStorage.setItem("loggedUserName", userName);
        isUserLoggedIn = true;
        localStorage.setItem("logStatus", isUserLoggedIn);
        window.location.href = "summary.html";
        return;
      }
    }

    alert("Uw gegevens zijn niet juist");
  });
}

logIn();

signup();

changeLogIn();
