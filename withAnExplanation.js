const form = document.querySelector("form");
const resultContainer = document.querySelector(".result-container");
const inputE1 = document.querySelector(".search-input");

// Listening for a submit event on the form
form.addEventListener("submit", (e) => {
  // When the form is submitted, do the following:

  // Prevent the default form submission behavior
  e.preventDefault();
  // console.log(e);

  // Get the value entered into the input field
  let searchedValue = inputE1.value;

  // Clear the input field
  inputE1.value = "";

  // not to add again when we search it again
  // Clear the result container content to avoid adding results again
  resultContainer.innerHTML = "";

  // findDrinks("finder");
  // Call the findDrinks function and pass the searched values
  findDrinks(searchedValue);
});

// async and await function
// Async function named findDrinks, takes a cocktail parameter
async function findDrinks(cocktail) {
  // Commented out section for potential header configuration
  // const header = {
  //   headers: {
  //     Accept: "application/json",
  //   },
  // };
  // console.log(drink);

  // for fetching data from the cocktail API
  let response = await fetch(
    // `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${cocktail}, header`s
    `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${cocktail}`
  );

  // let data = await response.json();
  // console.log(data);

  // to parse the response body as JSON
  let data = await response.json();
  // // .drinks to get each drink ("drinks" gotten from array when i console it)
  // console.log(data.drinks);
  // // to get one of them or the first one
  // // console.log(data.drinks[0]);

  // Loop through each drink in the response data
  for (i = 0; i < data.drinks.length; i++) {
    // comes from console idDrink / strDrink
    // Log the name of each drink to the console
    console.log(data.drinks[i].strDrink);

    // creating in html a div element and give a class to style it in css
    // Create a new div element and assign it to the variable drinkDiv
    let drinkDiv = document.createElement("div");

    // Set the "class" attribute of the drinkDiv to "drink-card"
    drinkDiv.setAttribute("class", "drink-card");

    // here it is
    // Set the inner HTML of drinkDiv using a template literal (backticks)
    // It creates a structure with an image container and an h3 element, populated with data from the API response
    drinkDiv.innerHTML = `
    <div class="img-container">
      <img src="${data.drinks[i].strDrinkThumb}">
    </div>
    <h3>${data.drinks[i].strDrink}</h3>
    `;
    // in order to put under result container DOM ways (otherwise will not appear)

    // Append the drinkDiv as a child to the resultContainer element in the DOM
    resultContainer.appendChild(drinkDiv);
  }
  // if u want them all the way down not after
  // resultContainer.appendChild(drinkDiv);
}
