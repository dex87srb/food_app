import { alphaN } from "./main.js";
import { foodSearch } from "./helper.js";
import { loaderContainer } from "./helper.js";
import { getData } from "./getData.js";

export const loader_Data = () => {
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
