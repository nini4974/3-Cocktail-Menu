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
  try {
    let res = await fetch(
      `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${cocktail}`
    );
    let data = await res.json();

    for (i = 0; i < data.drinks.length; i++) {
      console.log(data.drinks[i].strDrink);

      let drinkDiv = document.createElement("div");

      drinkDiv.onclick = function (e) {
        popUpContainer.classList.add("show");
        let popUpImg = document.createElement("img");
        console.log(e.target.parentNode.getAttribute("data-img"));
        popUpImg.src = `${e.target.parentNode.getAttribute("data-img")}`;
        // let popUpImg = document.createElement("div");
        // popUpImg.innerHTML = `
        //  <img class="popUp-img" src="${e.target.parentNode.getAttribute(
        //    "data-img"
        //  )}" >
        // `;

        popUp.appendChild(popUpImg);
      };

      drinkDiv.setAttribute("class", "drink-card");

      drinkDiv.setAttribute("data-img", `${data.drinks[i].strDrinkThumb}`);
      drinkDiv.setAttribute("data-name", `${data.drinks[i].strDrink}`);
      drinkDiv.setAttribute("data-inst", `${data.drinks[i].strInstructions}`);

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
