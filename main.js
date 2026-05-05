let themeToggler = document.querySelector("#themeToggler");
let dishSearchInput = document.querySelector("#dishesInput");
let DishSearcherButton = document.querySelector("#searchButton");
let searchedDishRecipeBox = document.querySelector("#dishRecipeBox");
let searchedDishImgDisplayer = document.querySelector("#dishImg");
let searchedDishNameDisplayer = document.querySelector("#selectedDishName");
let searchedDishCardCloseButton = document.querySelector("#closeButton");
let searchedDishDescriptionDisplayer = document.querySelector("#dishDiscriptionBox");
let recommendedDishesMenu= document.querySelector("#dishMenu");



const dishes = [{
  dish1: "biriyani",
  recipe: ["rice", "chicken", "spices"],
  discription: "tasty rice food",
  dishImgSrc: "/assets/biryani.png"
}]
searchedDishCardCloseButton.onclick=()=>{
  searchedDishRecipeBox.style.display="none";
  dishSearchInput.value="";
}
DishSearcherButton.onclick=()=>{
  searchedDishRecipeBox.style.display="";
}

//recalling all the functions againn sb bhul gya hun
let newRecommededDishCard = document.createElement("div");
newRecommededDishCard.classList.add("dishCard");
recommendedDishesMenu.appendChild(newRecommededDishCard);
let newRecommendedDishImage = document.createElement("img");
newRecommendedDishImage.src="/assets/biryani.png"
newRecommendedDishImage.classList.add("recommendedDishImg");
recommendedDishesMenu.appendChild(newRecommendedDishImage);
let newRecommededDishCardHeader = document.createElement("div");
newRecommededDishCardHeader.innerText="Chicken";
newRecommededDishCardHeader.classList.add("dishCardHeader");
newRecommededDishCard.appendChild(newRecommededDishCardHeader);