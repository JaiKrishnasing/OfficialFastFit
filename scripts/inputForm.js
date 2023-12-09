const questions = [
  {
    question: "Hoe vaak sport u per week?",
    weight: 2,
  },
  {
    question: "U doet aan krachttraining naast uw sport",
    weight: 0.7,
  },
  {
    question: "U zet specifieke doelen die u wilt bereiken",
    weight: 1.3,
  },
  {
    question: "U raakt niet snel vermoeid tijdens trainingsmethoden",
    weight: 2,
  },
  {
    question: "U doet cardio-oefeningen in uw routine",
    weight: 0.5,
  },
  {
    question: "Hoe vaak gaat u naar de sportschool?",
    weight: 0.8,
  },
  {
    question: "U staat open voor het uitproberen van vechtsporten",
    weight: 1.8,
  },
  {
    question: "Hoe vaak probeert u nieuwe sporten uit?",
    weight: 1.2,
  },
  {
    question: "Hoe vaak probeert u nieuwe trainingsmethoden uit",
    weight: 1.2,
  },
  {
    question: "U bent gewend om te trainen met een vast schema",
    weight: 1.5,
  },
];

const recommendCourseOptions = [
  {
    courseName: "Yoga",
    value: 10,
  },
  {
    courseName: "Kettlebell",
    value: 15,
  },
  {
    courseName: "Training",
    value: 18,
  },
  {
    courseName: "Workout",
    value: 20,
  },
  {
    courseName: "Kickboxing",
    value: 24,
  },
  {
    courseName: "MMA",
    value: 27,
  },
];

export class inputForm {
  constructor() {
    this.increaseStepsBar = this.increaseStepsBar.bind(this);
    this.visibility = this.visibility.bind(this);
    this.recommendCourseOptions = this.recommendCourseOptions.bind(this);
    this.setQuestion = this.setQuestion.bind(this);
    this.getAttribute = this.getAttribute.bind(this);
    this.resetTest = this.resetTest.bind(this);
    this.loading = this.loading.bind(this);
    this.stepsBar = document.getElementById("line-js");
    this.squares = document.querySelectorAll("[data-square]");
    this.recommendContainer = document.getElementById("recommend-container-js");
    this.recommendCourse = document.getElementById("recommend-course-text");
    this.resetButton = document.getElementById("recommend-button-js");
    this.buttons = document.querySelectorAll("[data-button]");
    this.formIntro = document.getElementById("input-form-intro-js");
    this.QuestionTitle = document.getElementById("input-form-description-js");
    this.inputFormContent = document.getElementById("input-form-js");
    this.incrementStep = 10;
    this.increment = 10;
    this.points = 0;
    this.i = 0;
  }

  visibility(visibility) {
    this.inputFormContent.style.visibility = `${visibility}`;
  }

  increaseStepsBar() {
    this.increment += this.incrementStep;

    if (this.increment > 100) {
      return;
    }

    this.squares.forEach((square) => {
      const squareID = square.getAttribute("data-square");

      if (this.increment === 50 && squareID === "1") {
        square.style.backgroundColor = "red";
      } else if (this.increment === 100 && squareID === "2") {
        square.style.backgroundColor = "red";
      }
    });

    this.stepsBar.style.background = `linear-gradient(to right, red ${this.increment}%, white 0%)`;
  }

  setQuestion() {
    this.QuestionTitle.innerText = questions[this.i].question;

    this.resetButton.addEventListener("click", () => {
      this.QuestionTitle.innerText = questions[this.i].question;
      this.resetTest();
    });

    this.buttons.forEach((button) => {
      button.addEventListener("click", () => {
        if (this.i >= 9) {
          this.loading();
          this.recommendCourseOptions(this.points);
          return;
        }

        this.increaseStepsBar();

        this.points += this.getAttribute(button) * questions[this.i].weight;

        this.i += 1;

        this.QuestionTitle.innerText = questions[this.i].question;
      });
    });
  }

  getAttribute(button) {
    const buttonID = parseInt(button.getAttribute("data-button"));
    return buttonID;
  }

  loading() {
    const loading = document.getElementById("loading-js");
    this.visibility("hidden");
    loading.style.visibility = "visible";

    setTimeout(() => {
      loading.style.visibility = "hidden";
      this.recommendContainer.style.visibility = "visible";
    }, 6000);
  }

  recommendCourseOptions(points) {
    let recommendedCourseNames = "";
    let courses = [];

    for (let i = 0; i < recommendCourseOptions.length; i++) {
      if (recommendCourseOptions[i].value <= points) {
        courses.push(recommendCourseOptions[i]);
      }
    }

    courses.sort((a, b) => b.value - a.value);

    recommendedCourseNames = courses
      .slice(0, 2)
      .map((course) => course.courseName)
      .join(", ");

    this.recommendCourse.innerText = recommendedCourseNames;
  }

  resetTest() {
    this.points = 3;
    this.i = 0;
    this.increment = 10;
    this.recommendCourse.innerText = "";
    this.squares.forEach((square) => {
      square.style.backgroundColor = "white";
    });
    this.stepsBar.style.background = `linear-gradient(to right, red 10%, white 0%)`;
    this.QuestionTitle.innerText = questions[this.i].question;

    const loading = document.getElementById("loading-js");
    this.recommendContainer.style.visibility = "hidden";
    loading.style.visibility = "visible";

    setTimeout(() => {
      loading.style.visibility = "hidden";
      this.formIntro.style.visibility = "visible";
    }, 6000);
  }
}
