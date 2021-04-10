import { buttonN } from "./getData.js";

buttonN;

//REST operator
export const createElementFood = (...food) => {
  const element = document.createElement(food[1]);
  element.classList.add("label");
  element.textContent = food[0].recipe[food[2]];

  return element;
};

//check if input is a combination of letter and numbers
export const alphaN = (inputtxt) => {
  let letterNumber = /^[0-9a-zA-Z]+$/;
  if (inputtxt.match(letterNumber)) {
    return true;
  } else {
    return false;
  }
};
