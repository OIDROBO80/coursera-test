(function () {
'use strict';

angular.module('ShoppingListCheckOff', [])
.controller('ToBuyController', ToBuyController)
.controller('AlreadyBoughtController', AlreadyBoughtController)
.service('ShoppingListCheckOffService', ShoppingListCheckOffService);

ToBuyController.$inject = ['ShoppingListCheckOffService'];
function ToBuyController(ShoppingListCheckOffService) {
    var listToBuy= this;
    listToBuy.items= ShoppingListCheckOffService.getToBuy();
    listToBuy.buy = function (itemIndex) {
        ShoppingListCheckOffService.buy(itemIndex);
    }
    listToBuy.Empty=function(){
        return listEmpty(listToBuy.items.length);
    }
}

AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];
function AlreadyBoughtController(ShoppingListCheckOffService) {
  var listBought  = this;
  listBought.items = ShoppingListCheckOffService.getbought();
  listBought.Empty=function(){
    return listEmpty(listBought.items.length);
  }
}
function listEmpty(lengthList){
    if(lengthList==0){
        return true;
    }
    else{
        return false;
    }
}
function ShoppingListCheckOffService() {
  var service = this;

  // items to buy
  var toBuy = [{
    name: 'rice',
    quantity: 10
  },{
    name: 'onion',
    quantity: 1
  },{
    name: 'cereal',
    quantity: 9
  },{
    name: 'bread',
    quantity: 3
  },{
    name: 'apple',
    quantity: 10
  },{
    name: 'meal',
    quantity: 8
  }];
  var lengthToBuy=toBuy.length;
  var bought = [];
  

  service.buy = function (itemIndex) {
    bought.push(toBuy[itemIndex]);
    toBuy.splice(itemIndex, 1);
  };
  service.getToBuy= function () {
    return toBuy;
  };
  service.LengthListToBuy= function () {
    return lengthToBuy;
  };
  service.getbought= function () {
    return bought;
  };
 
}
    
})();
    