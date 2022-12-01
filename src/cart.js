let label = document.getElementById("label");
let shoppingCart = document.getElementById("shopping-cart");
let basket = JSON.parse(localStorage.getItem("data")) || [];
let calculations = () => {
  let cartIcon = document.getElementById("cartamount");
  cartIcon.innerHTML = basket.map((x) => x.item).reduce((x, y) => x + y, 0);
};
calculations();
let generateCartItems = () => {
  if (basket.length !== 0) {
    return (shoppingCart.innerHTML = basket
      .map((x) => {
        let { id, item } = x;
        let search = shopItemsdata.find((y) => y.id === id) || [];
        let { Image, name, price } = search;
        return `
            <div class = "cart-item">
            <img src="${Image}" alt="">
            <div class="details">

            <div class="title-price-x">
            <h4 class="title-price">
            <p>${name}</p>  
            <i onclick="removeItem(${id})"class="bi bi-x-lg"></i>
            </div>
            <p class="cart-item-price">${price} $ </p></h4>
            <img src="img/suit-heart-fill.svg" class="heart" >
            <div class="bottom-details">
            
            <h3 class="item-total-price">${item * price} $</h3>
            <div class="buttons">
                    <i onclick="decrement(${id})" class="bi bi-dash-lg"></i>                  
                    <div class="quantity" id=${id}>${item}</div>
                    <i onclick="increment(${id})" class="bi bi-plus-lg"></i>               
            </div>
            </div> 
            

            

            </div>

            </div> `;
      })
      .join(""));
  } else {
    shoppingCart.innerHTML = ``;
    label.innerHTML = `
        <h2 class="empty">Cart is empty</h2>
        <br>
        <a href="index.html"><button class="Homebtn">Go Back home</button></a> `;
  }
};
generateCartItems();
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
  generateCartItems();
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
  generateCartItems();
  localStorage.setItem("data", JSON.stringify(basket));
};
let update = (id) => {
  let search = basket.find((x) => x.id === id);
  //console.log(search.item);
  document.getElementById(id).innerHTML = search.item;
  calculations();
  totalAmount();
};
let removeItem = (id) => {
  let selectedItem = id;
  basket = basket.filter((x) => x.id !== selectedItem.id);
  localStorage.setItem("data", JSON.stringify(basket));
  generateCartItems();
  totalAmount();
  calculations();
};
let clearcart = () => {
  basket = [];
  generateCartItems();
  localStorage.setItem("data", JSON.stringify(basket));
  calculations();
};
let totalAmount = () => {
  if (basket.length !== 0) {
    let amount = basket
      .map((x) => {
        let { item, id } = x;
        let search = shopItemsdata.find((y) => y.id === id) || [];
        return item * search.price;
      })
      .reduce((x, y) => x + y, 0);
    label.innerHTML = `<h2 class="totalbill">Total bill : ${amount} $</h2>
    <br>
    <button class="checkout">Checkout</button>
    <button onclick="clearcart()" class="removeAll">Clear cart</button>
   
    `;
  } else return;
};
totalAmount();
