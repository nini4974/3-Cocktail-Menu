const form = document.querySelector("form");
const resultContainer = document.querySelector(".result-container");
const inputE1 = document.querySelector(".search-input");
const popUpContainer = document.querySelector(".popup-container");
const popUp = document.querySelector(".popup");
const closeBtn = document.querySelector(".close-btn");

closeBtn.onclick = function () {
  popUpContainer.classList.remove("show");
};

form.addEventListener("submit", (e) => {
  e.preventDefault();
  inputE1.focus();

  let searchedValue = inputE1.value;
  inputE1.value = "";
  findDrinks(searchedValue);

  resultContainer.innerHTML = "";
});

async function findDrinks(cocktail) {
  const header = {
    method: "GET",
    headers: {
      // "Content-Type": "application/json",
      Accept: "application/json",
    },
  };
  try {
    let res = await fetch(
      `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${cocktail}`,
      header
    );
    let data = await res.json();
    console.log(data);

    for (let i = 0; i < data.drinks.length; i++) {
      console.log(data.drinks[i].strDrink);

      let drinkDiv = document.createElement("div");

      drinkDiv.onclick = function (e) {
        popUpContainer.classList.add("show");

        popUp.innerHTML = "";

        let popUpImg = document.createElement("img");
        popUpImg.classList.add("popup-img");
        console.log(e.target.parentNode.getAttribute("data-img"));
        popUpImg.src = `${e.target.parentNode.getAttribute("data-img")}`;

        let h4Element = document.createElement("h4");
        h4Element.classList.add("popup-title");
        h4Element.textContent = `${e.target.parentNode.getAttribute(
          "data-name"
        )}`;

        let pElement = document.createElement("p");
        pElement.classList.add("popup-description");
        pElement.textContent = `${e.target.parentNode.getAttribute(
          "data-inst"
        )}`;

        let pIngredient = document.createElement("p");
        pIngredient.classList.add("popup-ingredient");
        pIngredient.textContent = "Ingredients";
        // let popUpImg = document.createElement("div");
        // popUpImg.innerHTML = `
        //  <img class="popUp-img" src="${e.target.parentNode.getAttribute(
        //    "data-img"
        //  )}" >
        // `;

        popUp.appendChild(popUpImg);
        popUp.appendChild(h4Element);
        popUp.appendChild(pElement);
        popUp.appendChild(olElement);
        popUp.appendChild(pIngredient);

        popUp.appendChild(closeBtn);
      };

      drinkDiv.setAttribute("class", "drink-card");

      drinkDiv.setAttribute("data-img", `${data.drinks[i].strDrinkThumb}`);
      drinkDiv.setAttribute("data-name", `${data.drinks[i].strDrink}`);
      drinkDiv.setAttribute("data-inst", `${data.drinks[i].strInstructions}`);

      let olElement = document.createElement("ol");
      for (let j = 1; j <= 15; j++) {
        const ingredientKey = `strIngredient${j}`;
        const ingredientValue = data.drinks[i][ingredientKey];

        if (ingredientValue && ingredientValue.trim() !== "") {
          let liElement = document.createElement("li");
          liElement.textContent = ingredientValue;
          olElement.appendChild(liElement);
        }
      }

      drinkDiv.innerHTML = `

      <img src="${data.drinks[i].strDrinkThumb}">
      <h3>${data.drinks[i].strDrink}</h3>
     
    `;

      resultContainer.appendChild(drinkDiv);
    }
  } catch (er) {
    alert(`No cocktails found with that ${cocktail} name!`);
  }
}
