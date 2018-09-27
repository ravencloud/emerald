(function () {
  'use strict';

angular.module('NarrowItDownApp', [])
.controller('NarrowItDownController', NarrowItDownController)
.service('MenuSearchService', MenuSearchService)
.constant('ApiBasePath', "https://davids-restaurant.herokuapp.com")
.directive('foundItems', FoundDirective);

function FoundDirective() {
var ddo = {
  templateUrl: 'foundList.html',
  scope: {
    found: '<',
    title: '@title',
    onRemove: '&'
  },
  controller: FoundDirectiveController,
  controllerAs: 'list',
  bindToController: true
};

return ddo;
}

function FoundDirectiveController() {
var list = this;

list.nothingFound = function () {
  if (list.found != null) {
    if (list.found.length == 0) {
      return true;
    } else {
      return false;
    }
  } else {
    return false;
  }
};
}

NarrowItDownController.$inject = ['MenuSearchService'];
function NarrowItDownController(MenuSearchService) {
var list = this;
var initialTitle = "The following matched: ";

list.title = "";
list.itemName = "";

list.getMatchedMenuItems = function () {
  var promise = MenuSearchService.getMatchedMenuItems(list.searchTerm);
  promise
    .then(function (response) {
      list.found = response;
      list.title = initialTitle + " (" + list.found.length + " items)";
    })
    .catch(function (error) {
      console.log("Get matched menu item controller error");
    });
};

list.removeItem = function (itemIndex) {
  this.lastRemoved = "Removed " + this.found[itemIndex].name;
  list.found.splice(itemIndex, 1);
  this.title = initialTitle + " (" + list.found.length + " items )";
};
}

MenuSearchService.$inject = ['$http', 'ApiBasePath'];
function MenuSearchService($http, ApiBasePath) {
var service = this;

service.getMatchedMenuItems = function (searchTerm) {
  return $http({
    method: "GET",
    url: (ApiBasePath + "/menu_items.json")
  })
    .then(function (response) {
      var foundItems = response.data.menu_items;

      foundItems = foundItems.filter(function (foundItems) {
        return foundItems.description.includes(searchTerm)
      });

      return foundItems;
    })
    .catch(function (error) {
      console.log("Get matched menu service error");
    });
};
}

})();