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
searchedDishCardCloseButton.onclick = () => {
  searchedDishRecipeBox.style.display = "none";
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
    newRecommededDishCard.classList.add("dishCard");
    newRecommededDishCard.dataset.id = data.meals[i].idMeal;
    recommendedDishesMenu.appendChild(newRecommededDishCard);
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
//search results
searchResultsDisplayer.style.display = "none";

function searchFunction() {
  let searchedQuery = dishSearchInput.value.trim().toLowerCase();
  let searchedDishAPI = API + searchedQuery;
  if (searchedQuery != "") {
    searchResultsDisplayer.style.display = "";
    fetch(searchedDishAPI)
      .then((response) => response.json())
      .then((data) => {
        console.log(data.meals);
        //error detection 
        if (data.meals != null) {
                    //dish list name header
          let searchedListDishNameDisplayer = document.createElement("div");
          searchedListDishNameDisplayer.classList.add("searchedDishName");
          searchedListDishNameDisplayer.innerText = searchedQuery[0].toUpperCase() + searchedQuery.slice(1);
          searchResultsDisplayer.appendChild(searchedListDishNameDisplayer);
          for (var i = 0; i < data.meals.length; i++) {
            let searchResultsDishCard = document.createElement("div");
            searchResultsDishCard.classList.add("listedDishCard");
            searchResultsDishCard.dataset.id = data.meals[i].idMeal;
            searchResultsDisplayer.appendChild(searchResultsDishCard);

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