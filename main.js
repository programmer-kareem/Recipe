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
let recommendedDishesMenu = document.querySelector("#dishMenu");
let API = "https://www.themealdb.com/api/json/v1/1/search.php?s=";

//removing searched dish card on clicking close button and also clearing search box
searchedDishCardCloseButton.onclick = () => {
  dishRecipeBox.classList.toggle("hidden");
  dishSearchInput.value = "";
}


//recalling all the functions againn sb bhul gya hun
fetch("https://www.themealdb.com/api/json/v1/1/filter.php?c=Vegetarian")
  .then((response) => response.json())
  .then((data) => {
    loadRandomDishes(data);
  });

function loadRandomDishes(data) {
  for (var i = 0; i < 10; i++) {
    
    let newRecommededDishCard = document.createElement("div");
    newRecommededDishCard.classList.add("listedDishCard");
    newRecommededDishCard.dataset.id = data.meals[i].idMeal;
    recommendedDishesMenu.appendChild(newRecommededDishCard);
    newRecommededDishCard.onclick = () => {
      displayChosenDishDescription(newRecommededDishCard.dataset.id);
    }
    let newRecommendedDishImage = document.createElement("img");
    newRecommendedDishImage.src = data.meals[i].strMealThumb;
    newRecommendedDishImage.classList.add("recommendedDishImg");
    newRecommededDishCard.appendChild(newRecommendedDishImage);
    let newRecommededDishCardHeader = document.createElement("div");
    newRecommededDishCardHeader.innerText = data.meals[i].strMeal;
    newRecommededDishCardHeader.classList.add("dishCardHeader");
    newRecommededDishCard.appendChild(newRecommededDishCardHeader);
  }
}
//theme toggle function.. incomplete
let theme = "light";

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
}
//search results displayer
searchResultsDisplayer.style.display = "none";

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
          searchResultsDisplayer.style.display = "";
          //dish list name header
          let searchedListDishNameDisplayer = document.createElement("div");
          searchedListDishNameDisplayer.classList.add("searchedDishName");
          searchedListDishNameDisplayer.innerText = searchedQuery[0].toUpperCase() + searchedQuery.slice(1);
          searchResultsDisplayer.appendChild(searchedListDishNameDisplayer);
          for (var i = 0; i < data.meals.length; i++) {
            let searchResultsDishCard = document.createElement("div");
            searchResultsDishCard.classList.add("dishCarddishCard");
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
          alert("hlowww")
          return;
        }
      });
  } else {
    return;
  }
}
DishSearcherButton.onclick = searchFunction;
//chosen dish instructions 
window.onload = () => {
  dishRecipeBox.classList.toggle("hidden");
}

function displayChosenDishDescription(idMeal) {
  let chosenDishIdAPI = "https://www.themealdb.com/api/json/v1/1/lookup.php?i=" + idMeal;
  fetch(chosenDishIdAPI)
    .then((response) => response.json())
    .then((data) => {
      //display chosen dish
      dishRecipeBox.classList.toggle("hidden");
      //dish name
      searchedDishNameDisplayer.innerText = data.meals[0].strMeal
      //dish description
      searchedDishDescriptionDisplayer.innerText = data.meals[0].strInstructions;
      //dish image
      searchedDishImgDisplayer.src = data.meals[0].strMealThumb;
    });
}