import {
  key,
  keyID,
  foodSearch,
  buttonSearch,
  loaderContainer,
  countHitNumber,
} from "./helper.js";
import { listRecipes } from "./listRecipes.js";
import { loader_Data } from "./loaderData.js";

let foodHealth = document.getElementById("health");
let foodDiet = document.getElementById("diet");
let selectedDiet;
let selectedHealth;
let urlImage;

const countHits = (data) => {
  countHitNumber.textContent = data.count;
};

export const buttonN = buttonSearch.addEventListener("click", () => {
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

export const getData = () => {
  selectedHealth = foodHealth.options[foodHealth.selectedIndex].value;
  selectedDiet = foodDiet.options[foodDiet.selectedIndex].value;

  urlImage = `https://api.edamam.com/search?q=${foodSearch.value}&app_id=${keyID}&app_key=${key}&diet=${selectedDiet}&health=${selectedHealth}&from=0&to=12`;

  foodSearch.value = "";
  foodHealth.selectedIndex = 0;
  foodDiet.selectedIndex = 0;

  fetch(urlImage, {
    method: "GET",
    headers: {
      apiKey: key,
    },
  })
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      listRecipes(data);
      countHits(data);
    })
    .catch((error) => console.error(error));
};
