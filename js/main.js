const key = "7ed34200a456b5963e9c2dfe236d8e0c";
const keyID = "d0b2e34f";

const foodSearch = document.querySelector("#food-form input");
const foodHealth = document.getElementById("health");
const foodDiet = document.getElementById("diet");
const listFoodSection = document.getElementById("recipes");
const buttonSearch = document.getElementById("button");
const countHitNumber = document.querySelector("span.recipe-count-number");
let labelContainer;
const loaderContainer = document.querySelector(".loader");

let selectedDiet;
let selectedHealth;
let urlImage;

let displayNoresults;

buttonSearch.addEventListener("click", () => {
  loaderContainer.innerHTML = "";
  if (
    foodHealth.selectedIndex === 0 ||
    foodDiet.selectedIndex === 0 ||
    foodSearch.value === ""
  )
    alert("Please enter food query and select health and diet");
  else {
    loader_Data();
  }
});

const getData = () => {
  const newRequest = new XMLHttpRequest();

  selectedHealth = foodHealth.options[foodHealth.selectedIndex].value;
  selectedDiet = foodDiet.options[foodDiet.selectedIndex].value;

  urlImage = `https://api.edamam.com/search?q=${foodSearch.value}&app_id=${keyID}&app_key=${key}&diet=${selectedDiet}&health=${selectedHealth}&from=0&to=12`;

  foodSearch.value = "";
  foodHealth.selectedIndex = 0;
  foodDiet.selectedIndex = 0;

  newRequest.open("GET", urlImage);

  newRequest.onload = () => {
    if (newRequest.status === 200) {
      let url = JSON.parse(newRequest.responseText);

      listRecipes(url);
      countHits(url);
    }
  };
  newRequest.send();
};

const createFood = (food) => {
  const recipesElementContainer = document.createElement("div");
  recipesElementContainer.classList.add("recipe-element");
  listFoodSection.appendChild(recipesElementContainer);

  labelContainer = document.createElement("div");
  labelContainer.classList.add("labels");

  const image = document.createElement("img");
  image.setAttribute("src", food.recipe.image);
  recipesElementContainer.appendChild(image);

  recipesElementContainer.appendChild(createElementFood(food, "h3", "label"));
  recipesElementContainer.appendChild(labelContainer);

  createSeparateLabel(food, "p", "healthLabels");
};

const listRecipes = (data) => {
  listFoodSection.innerHTML = "";

  if (data.hits.length === 0) {
    if (loaderContainer.hasChildNodes()) {
      loaderContainer.removeChild(displayNoresults);
    } else {
      displayNoresults = document.createElement("p");
      loaderContainer.appendChild(displayNoresults);

      displayNoresults.textContent = "No results";
    }
  } else {
    if (loaderContainer.hasChildNodes()) {
      loaderContainer.removeChild(displayNoresults);
      data.hits.forEach((element) => {
        createFood(element);
      });
    } else
      data.hits.forEach((element) => {
        createFood(element);
      });
  }
};

//REST operator
const createElementFood = (...food) => {
  const element = document.createElement(food[1]);
  element.classList.add("label");
  element.textContent = food[0].recipe[food[2]];

  return element;
};

//REST operator
//Separate label for health array
const createSeparateLabel = (...data) => {
  data[0].recipe[data[2]].forEach((element) => {
    let elementLabel = document.createElement(data[1]);
    elementLabel.classList.add("label");
    elementLabel.textContent = element;
    labelContainer.appendChild(elementLabel);
  });
};

//number of hits
const countHits = (data) => {
  countHitNumber.textContent = data.count;
};

//loader animation and data load function
const loader_Data = () => {
  if (alphaN(foodSearch.value) === false) {
    alert("You can only enter numbers and letters");
  } else {
    let loaderDisplay = document.createElement("img");
    loaderDisplay.setAttribute("src", "./img/loader.gif");
    loaderContainer.appendChild(loaderDisplay);

    setTimeout(() => {
      loaderContainer.removeChild(loaderDisplay);
      getData();
    }, 2000);
  }
};

//check if input is a combination of letter and numbers
const alphaN = (inputtxt) => {
  let letterNumber = /^[0-9a-zA-Z]+$/;
  if (inputtxt.match(letterNumber)) {
    return true;
  } else {
    return false;
  }
};
