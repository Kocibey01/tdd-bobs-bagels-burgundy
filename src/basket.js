const MENU = require("./menu.js");
const Item = require("./item.js");
const fullMenu = MENU.GetMenu();
const smallBasket = 5;
const mediumBasket = 10;
const largeBasket = 15;

class Basket {

  constructor(capacity = smallBasket) {
    
    this.basket = [];
    this.basketSize = capacity;
  }

  getBasket() {

    return this.basket;
  }
  
  addItem(itemName, itemQuantity) {

    let itemFound = false;

    for (const item in fullMenu) {

      if (item === itemName) {

        const newItem = new Item(itemName, itemQuantity, fullMenu[item]);
        this.basket.push(newItem);
        itemFound = true;
        break;
      }
    }

    if (itemFound === false) return "this item does not exist";
  }

  removeItem(itemName) {

    const selectedItemIndex = this.basket.findIndex(
      (bagel) => bagel.name === itemName
    );

    if (selectedItemIndex === -1) return "This item is not in the basket.";
    this.basket.splice(selectedItemIndex, 1);
    return this.basket;
  }

  basketCapacity() {

    const totalCapacity = this.basket.reduce(
      (total, basketItem) => total + basketItem.quantity,
      0
    );
    if (totalCapacity >= this.basketSize)
      return "Basket full, Please choose a bigger basket.";
  }

  priceChecker(itemName) {

    for (const items in fullMenu)
      if (itemName === items) return fullMenu[items];
  }

  basketTotal() {

    let eachItem = [];
    for (let i = 0; i < this.basket.length; i++) {
      eachItem.push(this.basket[i].quantity * this.basket[i].price);
    }

    const totalPrice = eachItem.reduce(
      (total, quantity) => total + quantity,
      0
    );
    return "£" + totalPrice;
  }
}

module.exports = Basket;