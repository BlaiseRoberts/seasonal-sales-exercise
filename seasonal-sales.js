$(document).ready(function() {
    $('select').material_select();
  });


var catRequest = new XMLHttpRequest();
var productRequest = new XMLHttpRequest();
var productView = document.getElementById("productView");
var seasonSelect = document.getElementById("seasonSelect")
var catArray;
var productArticles = [];


productRequest.addEventListener("load", printProducts)
catRequest.addEventListener("load", printCatRequest)
catRequest.addEventListener("error", requestError)
productRequest.addEventListener("error", requestError)


function requestError(e){
	console.log("Error retrieving data!")
}

function printProducts(e){
	var productData = JSON.parse(event.target.responseText);
	productObject = productData.products;
	productArticles = document.getElementsByClassName("catProducts");
	showProductData(productObject);
}

function showProductData(x){
	for(k in x){
		var productInfo = ``
		var product = x[k];
		var productCat = `${product.category_id}`
		console.log(productCat)
		productInfo += `<h6 class="flow-text">${product.name}</h6><p>$${product.price}</p>`
		console.log(productInfo)
		console.log(productArticles[0])
		if (productCat == 1) {
			productArticles[0].innerHTML += productInfo;
		} else if (productCat == 2) {
			productArticles[1].innerHTML += productInfo;
		} else if (productCat == 3) {
			productArticles[2].innerHTML += productInfo;
		}
	}
}

function printCatRequest(e){
	var catData = JSON.parse(event.target.responseText);
	catArray = catData.categories;
	showCatData(catArray);
	productArticles = document.getElementsByClassName("catProducts");
}

function showCatData(x){
	for(key in x){
		var catNameSection = ``;
		var seasonOptions = ``;
		var catItem = x[key];
		catNameSection += `<section class="container"><h4>${catItem.name}</h4><article class="catProducts card-panel"></article></section>`;
		productView.innerHTML += catNameSection;
		seasonOptions += `<option value="${catItem.id}">${catItem.season_discount}</option>`;
		seasonSelect.innerHTML += seasonOptions;
	}
}

catRequest.open("GET", "categories.json");
catRequest.send();


productRequest.open("GET", "products.json");
productRequest.send();





