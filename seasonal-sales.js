"use strict";



$(document).ready(function() {
    $('select').material_select();
  });


var catRequest = new XMLHttpRequest();
var productRequest = new XMLHttpRequest();
var productView = document.getElementById("productView");
var seasonSelect = document.getElementById("seasonSelect");
var catArray;
var productArticles = [];


productRequest.addEventListener("load", printProducts);
catRequest.addEventListener("load", printCatRequest);
catRequest.addEventListener("error", requestError);
productRequest.addEventListener("error", requestError);
seasonSelect.addEventListener("change", handleSales);


function handleSales(e){
	var winterOriginals = document.getElementsByClassName("originalPrice1");
	var fallOriginals = document.getElementsByClassName("originalPrice2");
	var springOriginals = document.getElementsByClassName("originalPrice3");
	var winterSalePrices = document.getElementsByClassName("salePrice1");
	var fallSalePrices = document.getElementsByClassName("salePrice2");
	var springSalePrices = document.getElementsByClassName("salePrice3");
	//reset classes
	for (var i = 0; i < winterOriginals.length; i++) {
		winterOriginals[i].classList.remove("striked");
	};
	for (var i = 0; i < winterSalePrices.length; i++) {
		winterSalePrices[i].classList.add("hidden");
	};
	for (var i = 0; i < fallOriginals.length; i++) {
		fallOriginals[i].classList.remove("striked");
	};
	for (var i = 0; i < fallSalePrices.length; i++) {
		fallSalePrices[i].classList.add("hidden");
	};
	for (var i = 0; i < springOriginals.length; i++) {
		springOriginals[i].classList.remove("striked");
	};
	for (var i = 0; i < springSalePrices.length; i++) {
		springSalePrices[i].classList.add("hidden");
	};
	//print new prices
	var season = event.target.value;
	if (season == 1){
		console.log("Winter-trial")	
		for (var i = 0; i < winterOriginals.length; i++) {
			winterOriginals[i].classList.add("striked");
		};
		for (var i = 0; i < winterSalePrices.length; i++) {
			winterSalePrices[i].classList.remove("hidden");
		};
	}else if (season == 2){
		console.log("Fall")
		for (var i = 0; i < fallOriginals.length; i++) {
			fallOriginals[i].classList.add("striked");
		};
		for (var i = 0; i < fallSalePrices.length; i++) {
			fallSalePrices[i].classList.remove("hidden");
		};
	}else if (season == 3){
		console.log("Spring")
		for (var i = 0; i < springOriginals.length; i++) {
			springOriginals[i].classList.add("striked");
		};
		for (var i = 0; i < springSalePrices.length; i++) {
			springSalePrices[i].classList.remove("hidden");
		};
	};
};




function requestError(e){
	console.log("Error retrieving data!")
};

function printProducts(e){
	var productData = JSON.parse(event.target.responseText);
	var productObject = productData.products;
	productArticles = document.getElementsByClassName("catProducts");
	showProductData(productObject);
};

function showProductData(x){
	for(var k in x){
		var productInfo = ``;
		var product = x[k];
		var productCat = `${product.category_id}`;
		productInfo += `<h6 class="flow-text">${product.name}</h6><p class="originalPrice${productCat}">$${product.price}</p>`;
		if (productCat == 1) {
			var winterSalePrice = ``;
			winterSalePrice = `<p class="hidden saleColor salePrice${productCat}">$${product.price-(product.price*.10).toFixed(2)}</p>`;
			productInfo += winterSalePrice;
			productArticles[0].innerHTML += productInfo;
		} else if (productCat == 2) {
			var autumnSalePrice = ``;
			var fallItemSalePrice = `${product.price-(product.price*.25)}`;
			var fallItemSalePriceRounded = Math.round(fallItemSalePrice*100)/100;
			autumnSalePrice = `<p class="hidden saleColor salePrice${productCat}">$${fallItemSalePriceRounded}</p>`;
			productInfo += autumnSalePrice;
			productArticles[1].innerHTML += productInfo;
		} else if (productCat == 3) {
			var springSalePrice = ``;
			var springItemSalePrice = `${product.price-(product.price*.15)}`;
			var springItemSalePriceRounded = Math.round(springItemSalePrice*100)/100;
			springSalePrice = `<p class="hidden saleColor salePrice${productCat}">$${springItemSalePriceRounded}</p>`;
			productInfo += springSalePrice;
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
	for(var key in x){
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





