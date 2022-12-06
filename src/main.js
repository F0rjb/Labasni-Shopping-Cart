let shop = document.getElementById("shop");
let basket = JSON.parse(localStorage.getItem("data")) || [];
let generateshop = () => {
  return (shop.innerHTML = shopItemsdata
    .map((x) => {
      let { id, name, price, desc, Image, like } = x;
      let search = basket.find((x) => x.id === id) || [];
      return `<div class="item" id="${id}-product" >
        <img width="100%" length="1em" src="${Image}" alt="${name}">
        <div class="details">
            <h3>${name}</h3>
            <p>${desc}</p>
            
            <img id="img${id}" product-id="${id}" class="heart" onclick="changelike(event)" src="img/suit-heart.svg" >
          

            <div class="price-quantity">
                <h2>${price}$</h2>
                <div class="buttons">
                    <i onclick="decrement(${id})" class="bi bi-dash-lg"></i>                  
                    <div class="quantity" id=${id}>${
        search.item === undefined ? 0 : search.item
      }</div>
                    <i onclick="increment(${id})" class="bi bi-plus-lg"></i>               
                </div>
            </div>
        </div>
    
    </div>
    `;
    })
    .join(""));
};

generateshop();

let increment = (id) => {
  let selectedItem = id;
  let search = basket.find((x) => x.id === selectedItem.id);
  if (search === undefined) {
    basket.push({
      id: selectedItem.id,
      item: 1,
    });
  } else {
    search.item += 1;
  }
  //console.log(basket);
  update(selectedItem.id);
  localStorage.setItem("data", JSON.stringify(basket));
};

let decrement = (id) => {
  let selectedItem = id;
  let search = basket.find((x) => x.id === selectedItem.id);
  if (search === undefined) return;
  else if (search.item === 0) return;
  else {
    search.item -= 1;
  }

  update(selectedItem.id);
  basket = basket.filter((x) => x.item !== 0);
  //console.log(basket);
  localStorage.setItem("data", JSON.stringify(basket));
};

let update = (id) => {
  let search = basket.find((x) => x.id === id);
  //console.log(search.item);
  document.getElementById(id).innerHTML = search.item;
  calculations();
};
let calculations = () => {
  let cartIcon = document.getElementById("cartamount");
  cartIcon.innerHTML = basket.map((x) => x.item).reduce((x, y) => x + y, 0);
};
let changelike = (e) => {
  let iconElm = e.target;
  iconElm.src = iconElm.src.includes("img/suit-heart.svg")
    ? "img/suit-heart-fill.svg"
    : "img/suit-heart.svg";
  let product = shopItemsdata.find((item) => {
    return item.id == iconElm.getAttribute("product-id");
  });

  let currentFav = JSON.parse(localStorage.getItem("fav") || "[]");
  if (iconElm.src.includes("img/suit-heart.svg")) {
    let updated = currentFav.filter((item) => {
      return item.id != iconElm.getAttribute("product-id");
    });
    localStorage.setItem("fav", JSON.stringify(updated));
  } else {
    localStorage.setItem("fav", JSON.stringify([...currentFav, product]));
  }
};

calculations();

let currentFav = JSON.parse(localStorage.getItem("fav") || "[]");
currentFav.map((item) => {
  document.querySelector("[product-id='" + item.id + "']").src =
    "img/suit-heart-fill.svg";
});
