const form = document.querySelector("form");
const resultContainer = document.querySelector(".result-container");
const inputE1 = document.querySelector(".search-input");
const popUpContainer = document.querySelector(".popup-container");
const popUp = document.querySelector(".popup");
const closeBtn = document.querySelector(".close-btn");

// Role: Defines a click event handler for the closeBtn element.
// Function:
//      Removes the "show" class from the popUpContainer element when the close button is clicked.
closeBtn.onclick = function () {
  popUpContainer.classList.remove("show");
};

// Listening for a submit event on the form
// Role: Adds a submit event listener to the form.
// Function:
//     Prevents the default form submission behavior.
//     Sets focus on the input element with the class "search-input".
//     Retrieves the value entered in the input.
//     Clears the input field.
//     Calls the findDrinks function with the searched value.
//     Clears the content of the element with the class "result-container".
form.addEventListener("submit", (e) => {
  // When the form is submitted, do the following:

  // Prevent the default form submission behavior
  e.preventDefault();
  // console.log(e)
  inputE1.focus();
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
// Role: Defines an asynchronous function named findDrinks.
// Function: Fetches and displays cocktail data based on the provided cocktail name.
async function findDrinks(cocktail) {
  //   Role: Creates an object named header with information about the HTTP request.
  // Function: Specifies that the request is a GET method and expects JSON as the response.
  const header = {
    method: "GET",
    headers: {
      // "Content-Type": "application/json",
      Accept: "application/json",
    },
  };

  //   Role: Initiates a try block for error handling.
  // Function: Uses the fetch function to make an asynchronous GET request to the CocktailDB API based on the provided cocktail name.
  try {
    // for fetching data from the cocktail API
    let res = await fetch(
      `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${cocktail}`,
      header
    );

    //     Role: Retrieves the JSON data from the response and logs it to the console.
    // Function: Awaits the JSON parsing of the response, assigns it to the variable data, and logs the data.
    // to parse the response body as JSON
    let data = await res.json();
    console.log(data);

    //     Role: Initiates a loop to iterate through the drinks in the fetched data.
    // Function: Logs the name of each drink to the console.
    // Loop through each drink in the response data
    for (let i = 0; i < data.drinks.length; i++) {
      // comes from console idDrink / strDrink
      // Log the name of each drink to the console
      console.log(data.drinks[i].strDrink);

      //       Role: Creates a new HTML div element.
      // Function: Prepares a container for the information about a specific drink.
      // creating in html a div element and give a class to style it in css
      // Create a new div element and assign it to the variable drinkDiv
      let drinkDiv = document.createElement("div");

      //       Role: Assigns a click event handler to the drinkDiv.
      // Function: Displays the popup container, clears its content, and prepares it for new information when a drink is clicked.
      drinkDiv.onclick = function (e) {
        popUpContainer.classList.add("show");

        popUp.innerHTML = "";

        //         Role: Creates an image element for the popup with a class and source.
        // Function: Retrieves the image source from the clicked drink's data and sets it as the source for the popup image.
        let popUpImg = document.createElement("img");
        popUpImg.classList.add("popup-img");
        console.log(e.target.parentNode.getAttribute("data-img"));
        popUpImg.src = `${e.target.parentNode.getAttribute("data-img")}`;

        //         Role: Creates an h4 element for the popup with a class and text content.
        // Function: Retrieves the drink name from the clicked drink's data and sets it as the text content for the popup title.
        let h4Element = document.createElement("h4");
        h4Element.classList.add("popup-title");
        h4Element.textContent = `${e.target.parentNode.getAttribute(
          "data-name"
        )}`;

        //         Role: Creates a p element for the popup with a class and text content.
        // Function: Retrieves the drink instructions from the clicked drink's data and sets it as the text content for the popup description.
        let pElement = document.createElement("p");
        pElement.classList.add("popup-description");
        pElement.textContent = `${e.target.parentNode.getAttribute(
          "data-inst"
        )}`;

        //         Role: Creates a p element for the popup with a class and text content.
        // Function: Sets the text content for the popup ingredient section to "Ingredients."
        let pIngredient = document.createElement("p");
        pIngredient.classList.add("popup-ingredient");
        pIngredient.textContent = "Ingredients";
        // let popUpImg = document.createElement("div");
        // popUpImg.innerHTML = `
        //  <img class="popUp-img" src="${e.target.parentNode.getAttribute(
        //    "data-img"
        //  )}" >
        // `;

        //         Role: Appends the created elements to the popup container.
        // Function: Adds the image, title, description, ingredient list, ingredient section, and close button to the popup container.
        popUp.appendChild(popUpImg);
        popUp.appendChild(h4Element);
        popUp.appendChild(pElement);
        popUp.appendChild(olElement);
        popUp.appendChild(pIngredient);

        popUp.appendChild(closeBtn);
      };

      //       Role: Sets attributes on the drinkDiv to store data about the drink.
      // Function: Assigns the class and data attributes to the drinkDiv for later use.
      // Set the "class" attribute of the drinkDiv to "drink-card"
      drinkDiv.setAttribute("class", "drink-card");

      drinkDiv.setAttribute("data-img", `${data.drinks[i].strDrinkThumb}`);
      drinkDiv.setAttribute("data-name", `${data.drinks[i].strDrink}`);
      drinkDiv.setAttribute("data-inst", `${data.drinks[i].strInstructions}`);

      //       Role: Creates an ordered list (ol) element to display the ingredients.
      // Function: Iterates through the first 15 ingredients in the drink data, creates list items (li) for non-empty values, and appends them to the olElement.
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

      //       Role: Sets the HTML content of the drinkDiv.
      // Function: Includes an image and heading in the drinkDiv using the drink data.
      // here it is
      // Set the inner HTML of drinkDiv using a template literal (backticks)
      // It creates a structure with an image container and an h3 element, populated with data from the API response
      drinkDiv.innerHTML = `

      <img src="${data.drinks[i].strDrinkThumb}">
      <h3>${data.drinks[i].strDrink}</h3>
     
    `;

      //       Role: Appends the drinkDiv to the resultContainer.
      // Function: Displays the created drinkDiv for each drink in the fetched data.
      // Append the drinkDiv as a child to the resultContainer element in the DOM
      resultContainer.appendChild(drinkDiv);
    }

    //     Role: Handles errors that may occur during the execution of the try block.
    // Function: Displays an alert if there are no cocktails found with the provided name.
  } catch (er) {
    alert(`No cocktails found with the name: ${cocktail}`);
  }
  // if u want them all the way down not after
  // resultContainer.appendChild(drinkDiv);
}
