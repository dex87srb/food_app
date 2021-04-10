import { createElementFood } from "./main.js";

let listFoodSection = document.getElementById("recipes");
let labelContainer;

const createSeparateLabel = (...data) => {
  data[0].recipe[data[2]].forEach((element) => {
    let elementLabel = document.createElement(data[1]);
    elementLabel.classList.add("label");
    elementLabel.textContent = element;
    labelContainer.appendChild(elementLabel);
  });
};

export const createFood = (food) => {
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
