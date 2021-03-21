var key = "7ed34200a456b5963e9c2dfe236d8e0c";
var keyID = "d0b2e34f";

var foodSearch = document.querySelector("#food-form input");
var foodHealth = document.getElementById("health");
var foodDiet = document.getElementById("diet");
var listFoodSection = document.getElementById("recipes");
var buttonSearch = document.getElementById("button");
var countHitNumber = document.querySelector("span.recipe-count-number");
var labelContainer;
var loaderContainer = document.querySelector(".loader");

var selectedDiet;
var selectedHealth;
var urlImage;

var displayNoresults;

buttonSearch.addEventListener("click", function () {
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

function getData() {
  var newRequest = new XMLHttpRequest();

  selectedHealth = foodHealth.options[foodHealth.selectedIndex].value;
  selectedDiet = foodDiet.options[foodDiet.selectedIndex].value;

  urlImage = `https://api.edamam.com/search?q=${foodSearch.value}&app_id=${keyID}&app_key=${key}&diet=${selectedDiet}&health=${selectedHealth}&from=0&to=12`;

  foodSearch.value = "";
  foodHealth.selectedIndex = 0;
  foodDiet.selectedIndex = 0;

  newRequest.open("GET", urlImage);

  newRequest.onload = function () {
    if (newRequest.status === 200) {
      var url = JSON.parse(newRequest.responseText);

      listRecipes(url);
      countHits(url);
    }
  };
  newRequest.send();
}

function createFood(food) {
  var recipesElementContainer = document.createElement("div");
  recipesElementContainer.classList.add("recipe-element");
  listFoodSection.appendChild(recipesElementContainer);

  labelContainer = document.createElement("div");
  labelContainer.classList.add("labels");

  var image = document.createElement("img");
  image.setAttribute("src", food.recipe.image);
  recipesElementContainer.appendChild(image);

  recipesElementContainer.appendChild(createElementFood(food, "h3", "label"));
  recipesElementContainer.appendChild(labelContainer);

  createSeparateLabel(food, "p", "healthLabels");
}

function listRecipes(data) {
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
}

function createElementFood(food, type, property) {
  var element = document.createElement(type);
  element.classList.add("label");
  element.textContent = food.recipe[property];

  return element;
}

//Separate label for health array
function createSeparateLabel(data, type, property) {
  data.recipe[property].forEach((element) => {
    var elementLabel = document.createElement(type);
    elementLabel.classList.add("label");
    elementLabel.textContent = element;
    labelContainer.appendChild(elementLabel);
  });
}

//number of hits
function countHits(data) {
  countHitNumber.textContent = data.count;
}

//loader animation and data load function
function loader_Data() {
  if (alphaN(foodSearch.value) === false) {
    alert("You can only enter numbers and letters");
  } else {
    var loaderDisplay = document.createElement("img");
    loaderDisplay.setAttribute("src", "./img/loader.gif");
    loaderContainer.appendChild(loaderDisplay);

    setTimeout(function () {
      loaderContainer.removeChild(loaderDisplay);
      getData();
    }, 2000);
  }
}

//check if input is a combination of letter and numbers
var alphaN = function alphanumeric(inputtxt) {
  var letterNumber = /^[0-9a-zA-Z]+$/;
  if (inputtxt.match(letterNumber)) {
    return true;
  } else {
    return false;
  }
};
