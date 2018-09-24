(function () {
'use strict';

angular.module('ShoppingListCheckOff', [])
.controller('AlreadyBoughtController', AlreadyBoughtController)
.controller('ToBuyController', ToBuyController)
.service('ShoppingListCheckOffService', ShoppingListCheckOffService)
.filter('total', TotalFilter);

AlreadyBoughtController.$inject = ['$scope', 'ShoppingListCheckOffService', 'totalFilter'];
//AlreadyBoughtController.$inject = ['$scope', 'ShoppingListCheckOffService'];

function AlreadyBoughtController($scope, ShoppingListCheckOffService, totalFilter) {
//function AlreadyBoughtController($scope, ShoppingListCheckOffService) {
   var boughtList = this;

    boughtList.items = ShoppingListCheckOffService.getItems();
    
    boughtList.getTotal = function () {
      return totalFilter();
    };
    //boughtList.getTotal = TotalPriceFilter("", item.quantity, item.pricePerItem);
}

ToBuyController.$inject = ['$scope', 'ShoppingListCheckOffService'];
function ToBuyController($scope, ShoppingListCheckOffService){
    var toBuyList = this;

    toBuyList.items = ShoppingListCheckOffService.getToBuyItems();

    toBuyList.boughtItem = function(index) {
      ShoppingListCheckOffService.boughtItem(index);
    };
}

function ShoppingListCheckOffService() {
    var service = this;
    
    var toBuyItems = [{
        name: "Pizzas",
        quantity: "3",
        pricePerItem: "15"
      },
      {
        name: "Cheerios",
        quantity: "2",
        pricePerItem: "3"
      },
      {
        name: "Party Favors",
        quantity: "10",
        pricePerItem: "5"
      },
      {
        name: "Chocolate Cake",
        quantity: "1",
        pricePerItem: "15"
      },
      {
        name: "Candles",
        quantity: "1",
        pricePerItem: "3"
      }
    ];
    
    var boughtItems = [];
    
    service.boughtItem = function(index) {
      boughtItems.push(toBuyItems[index]);
      toBuyItems.splice(index, 1);
    };
    
    service.getToBuyItems = function() {
      return toBuyItems;
    };
    
    service.getItems = function() {
      return boughtItems;
    };
    
}

function TotalFilter() {
    return function (input, quantity, pricePerItem) {
      input = input || "";
     // var input = ""
      input = "$$$" + Number(quantity * pricePerItem).toFixed(2);
      return input;
    }
  }

})();