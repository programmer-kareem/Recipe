//dearaing variables
let themeToggler = document.querySelector("#themeToggler");
let themeTogglerBox = document.querySelector("#themeTogglerBox")
let dishSearchInput = document.querySelector("#dishesInput");
let DishSearcherButton = document.querySelector("#searchButton");
let searchResultsDisplayer = document.querySelector("#searchedResults");
let searchedDishRecipeBox = document.querySelector("#dishRecipeBox");
let searchedDishImgDisplayer = document.querySelector("#dishImg");
let searchedDishNameDisplayer = document.querySelector("#selectedDishName");
let searchedDishCardCloseButton = document.querySelector("#closeButton");
let searchedDishDescriptionDisplayer = document.querySelector("#dishDiscriptionBox");
let dishIngredientsBox = document.querySelector("#dishIngredientsBox");
let dishTutorialLinkBox = document.querySelector("#dishTutorialLinkBox");
let tutorialLink = document.querySelector("#tutorialLink")
let recommendedDishesMenu = document.querySelector("#dishMenu");
let categorySelector = document.querySelector("#dishCategorySelector");
let category = "Vegetarian";
let i = 0;
let API = "https://www.themealdb.com/api/json/v1/1/search.php?s=";

//random dishes loading function 
function loadRandomDishes(category) {
  
  fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`)
    .then((response) => response.json())
    .then((data) => {
        let limit = Math.min(i + 10, data.meals.length);
        for (i; i < limit; i++){
        let newRecommededDishCard = document.createElement("div");
        newRecommededDishCard.classList.add("dishCard");
        newRecommededDishCard.dataset.id = data.meals[i].idMeal;
        recommendedDishesMenu.insertBefore(
          newRecommededDishCard,
          recommendedDishesMenu.lastElementChild
        );
        let newRecommendedDishImage = document.createElement("img");
        newRecommendedDishImage.src = data.meals[i].strMealThumb;
        newRecommendedDishImage.classList.add("recommendedDishImg");
        newRecommededDishCard.appendChild(newRecommendedDishImage);
        let newRecommededDishCardHeader = document.createElement("div");
        newRecommededDishCardHeader.innerText = data.meals[i].strMeal;
        newRecommededDishCardHeader.classList.add("dishCardHeader");
        newRecommededDishCard.appendChild(newRecommededDishCardHeader);
        let mealId = data.meals[i].idMeal;
        newRecommededDishCard.onclick = () => {
          displayChosenDishDescription(mealId);
        
        }
      }
    }).catch((error) => {
  displayNetworkError();
});
}

//load more dish function
function loadMoreDishes(category) {
  
}
//theme toggle function.. incomplete
//currently not in use
/*let theme = "light";

function toggleTheme() {
  
  if (theme === "light") {
    themeToggler.classList.remove("fa-sun");
    themeToggler.classList.add("fa-moon");
    theme = "dark";
  } else {
    themeToggler.classList.remove("fa-moon");
    themeToggler.classList.add("fa-sun");
    theme = "light";
  }
}
themeTogglerBox.onclick = () => {
  toggleTheme();
}*/
//search results displayer
searchResultsDisplayer.classList.add("hidden");

function searchFunction() {
  let searchedQuery = dishSearchInput.value.trim().toLowerCase();
  if (searchedQuery != "") {
    let searchedDishAPI = API + searchedQuery;
    fetch(searchedDishAPI)
      .then((response) => response.json())
      .then((data) => {
        console.log(data.meals);
        //clearing previous seach results..
        searchResultsDisplayer.innerHTML = '';
        //error detection 
        if (data.meals != null) {
          searchResultsDisplayer.classList.remove("hidden")
          searchedDishRecipeBox.classList.add("hidden");
          //dish list name header
          let searchedListDishNameDisplayer = document.createElement("div");
          searchedListDishNameDisplayer.classList.add("searchedDishName");
          searchedListDishNameDisplayer.innerText = searchedQuery[0].toUpperCase() + searchedQuery.slice(1) + ":";
          searchResultsDisplayer.appendChild(searchedListDishNameDisplayer);
          for (var i = 0; i < data.meals.length; i++) {
            let searchResultsDishCard = document.createElement("div");
            searchResultsDishCard.classList.add("listedDishCard");
            searchResultsDishCard.dataset.id = data.meals[i].idMeal;
            searchResultsDisplayer.appendChild(searchResultsDishCard);
            searchResultsDishCard.onclick = () => {
              displayChosenDishDescription(searchResultsDishCard.dataset.id);
            }
            
            //dish name header
            let listedDishName = document.createElement("div");
            listedDishName.classList.add("listedDishName");
            listedDishName.innerText = data.meals[i].strMeal;
            searchResultsDishCard.appendChild(listedDishName);
            
            //dish card image
            let listedDishImg = document.createElement("img");
            listedDishImg.classList.add("listedImgDish");
            listedDishImg.src = data.meals[i].strMealThumb;
            searchResultsDishCard.appendChild(listedDishImg);
          }
        } else {
          // error box if dish not found
          searchedDishRecipeBox.classList.remove("hidden");
          searchResultsDisplayer.classList.add("hidden")
          //dish name
          searchedDishNameDisplayer.innerText = "Error, the dish '" + searchedQuery[0].toUpperCase() + searchedQuery.slice(1) + "' not found";
          //dish description
          searchedDishDescriptionDisplayer.innerText = "Your requested dish could not be found. Please check for any typo or misspelling in your query. If everything is alright, our database may be lacking information about your requested dish. If so, sorry for the inconvenience. try searching for another dish.";
          //dish image
          searchedDishImgDisplayer.src = "/assets/ERROR_DISH_NOT_FOUND.png";
        }
      }).catch((error) => {
        displayNetworkError()
      });
  }
}

//chosen dish instructions 
function displayChosenDishDescription(idMeal) {
  let chosenDishIdAPI = "https://www.themealdb.com/api/json/v1/1/lookup.php?i=" + idMeal;
  fetch(chosenDishIdAPI)
    .then((response) => response.json())
    .then((data) => {
      //display chosen dish
      searchedDishRecipeBox.classList.remove("hidden");
      //dish name
      searchedDishNameDisplayer.innerText = data.meals[0].strMeal
      //dish description
      searchedDishDescriptionDisplayer.innerText = data.meals[0].strInstructions;
      //dish image
      searchedDishImgDisplayer.src = data.meals[0].strMealThumb;
      dishIngredientsBox.innerHTML = '<div id="dishIngredientsBoxHeader"> Ingredients:            </div>'
      //dish ingredients display
      for (var i = 1; i <= 25; i++) {
        if (data.meals[0]["strIngredient" + i] != "" && data.meals[0]["strMeasure" + i] != "" && data.meals[0]["strIngredient" + i] != null && data.meals[0]["strMeasure" + i] != null) {
          let IngredientBox = document.createElement("div");
          IngredientBox.classList.add("dishIngredientBox")
          IngredientBox.innerText = "• " + data.meals[0]["strIngredient" + i] + ": " +
            data.meals[0]["strMeasure" + i]
          dishIngredientsBox.appendChild(IngredientBox);
          //youtube tutorila link
          tutorialLink.href = data.meals[0].strYoutube;
          dishTutorialLinkBox.classList.remove("hidden");
        }
      }
      searchedDishRecipeBox.scrollIntoView({
        behavior: "smooth"
      });
    })
    .catch((error) => {
      displayNetworkError();
    });
}

//network error function
function displayNetworkError() {
  // error box if dish not found
  searchedDishRecipeBox.classList.remove("hidden");
  searchResultsDisplayer.classList.add("hidden")
  //dish name
  searchedDishNameDisplayer.innerText = "Error, Your network is disconnected";
  //dish description
  searchedDishDescriptionDisplayer.innerText = "You may not be connected to the internet. Please check whether your Wi-Fi or mobile data is turned on. also make sure that the airplane mode is turned off. If the issue still goes on, try refreshing the page or contact the developer";
  //dish image
  searchedDishImgDisplayer.src = "/assets/ERROR_NETWORK_DISCONNECTED.png";
}

//category function, load more function. (pending features..)
//category
categorySelector.onchange = () => {
  document.querySelectorAll(".dishCard").forEach((card) => {
    card.remove();
  });
  i = 0;
  category = categorySelector.value;
  loadRandomDishes(category)
}
//load more
document.querySelector("#loadMoreButtonBox").onclick = () => {
  
  loadRandomDishes(category);
}
//setting up dynamics

//search button and enter button dynamic to trigger search function
DishSearcherButton.onclick = searchFunction;
dishSearchInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    searchFunction();
  }
});

//removing searched dish card on clicking close button and also clearing search box
searchedDishCardCloseButton.onclick = () => {
  searchedDishRecipeBox.classList.add("hidden");
  dishSearchInput.value = "";
}

//initial state
window.onload = () => {
  loadRandomDishes(category)
}
//hiding tutorial link box
dishTutorialLinkBox.classList.add("hidden");
//hiding recipe box
searchedDishRecipeBox.classList.add("hidden");