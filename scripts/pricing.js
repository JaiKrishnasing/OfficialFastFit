const buttons = document.querySelectorAll(".buttonCourse");
const animations = document.querySelectorAll(".button-animation");

function buttonAnimation() {
  buttons.forEach((button) => {
    button.addEventListener("mouseover", () => {
      const buttonID = button.getAttribute("data-button");

      animations.forEach((animation) => {
        const animationID = animation.getAttribute("data-animation");
        if (buttonID === animationID) {
          animation.style.animation = `buttonInPricing 0.4s ease-in-out`;
          animation.style.animationFillMode = "forwards";
        }
      });
    });

    button.addEventListener("mouseout", () => {
      const buttonID = button.getAttribute("data-button");

      animations.forEach((animation) => {
        const animationID = animation.getAttribute("data-animation");
        if (buttonID === animationID) {
          animation.style.animation = "buttonOutPricing 0.4s ease-in-out";
          animation.style.animationFillMode = "forwards";
        }
      });
    });
  });
}

function redirect() {
  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      window.location.href = "about.html#target";
    });
  });
}

redirect();

buttonAnimation();
