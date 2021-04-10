import { listFoodSection } from "./helper.js";
import { loaderContainer } from "./helper.js";
import { createFood } from "./createFood.js";

let displayNoresults;

export const listRecipes = (data) => {
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
