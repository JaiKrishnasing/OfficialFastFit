function calculateUserBMI() {
  const calculateButton = document.getElementById("bmi-button-js");
  const weightInput = document.getElementById("input-weight-js");
  const heightInput = document.getElementById("input-height-js");
  const userBMI = document.getElementById("result-BMI-js");
  const userFeedback = document.getElementById("result-weight-js");
  let weight;
  let height;

  weightInput.addEventListener("input", () => {
    weight = parseFloat(weightInput.value);
    if (isNaN(weight)) {
      alert("Enter a valid weight");
      weightInput.value = "";
    }
  });

  heightInput.addEventListener("input", () => {
    height = parseFloat(heightInput.value);
    if (isNaN(height)) {
      alert("Enter a valid height");
      heightInput.value = "";
    }
  });

  calculateButton.addEventListener("click", () => {
    if (
      isNaN(weight) ||
      isNaN(height) ||
      weight === undefined ||
      height === undefined ||
      weight <= 0 ||
      height <= 0
    ) {
      alert("Enter valid input");
      weightInput.value = "";
      heightInput.value = "";
      return;
    } else {
      const bmi = calculateUserBMIValue(weight, height);
      const feedbackUser = feedback(bmi);
      userBMI.innerText = `Uw BMI is: ${bmi.toFixed(1)}`;
      userFeedback.innerText = `Uw gewicht is: ${feedbackUser}`;
    }
  });

  function feedback(bmi) {
    if (bmi >= 18.5 && bmi <= 25) {
      return "normaal";
    } else if (bmi < 18.5) {
      return "ondergewicht";
    } else if (bmi > 25) {
      return "overgewicht";
    }
  }

  function calculateUserBMIValue(weight, height) {
    return weight / Math.pow(height / 100, 2);
  }
}

calculateUserBMI();
