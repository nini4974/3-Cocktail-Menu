const form = document.querySelector("form");
const resultContainer = document.querySelector(".result-container");
const inputE1 = document.querySelector(".search-input");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  // inputE1.focus();

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
      // console.log(data.drinks[i].strDrink);

      let drinkDiv = document.createElement("div");
      drinkDiv.setAttribute("class", "drink-card");

      drinkDiv.innerHTML = `
    <div class="img-container">
      <img src="${data.drinks[i].strDrinkThumb}" />
    </div>
    <h3>${data.drinks[i].strDrink}</h3>
    `;

      resultContainer.appendChild(drinkDiv);
    }
  } catch (er) {
    alert(`No cocktails found with that ${cocktail} name!`);
  }
}
