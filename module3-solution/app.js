(function () {
    'use strict';
    
    angular.module('NarrowItDownApp', [])
    .controller('NarrowItDownController', NarrowItDownController)
    .service('MenuSearchService', MenuSearchService)
    .constant('ApiBasePath', "https://davids-restaurant.herokuapp.com")
    .directive('foundItems', foundItems);
    
    function foundItems() {
        var ddo = {
          templateUrl: 'founditems.html',
          scope: {
            items: '<',
            //myTitle: '@title',
            //badRemove: '=',
            onRemove: '&'
          },
          controller: NarrowItDownController,
          controllerAs: 'menu',
          bindToController: true
        };
      
        return ddo;
    }

    NarrowItDownController.$inject = ['MenuSearchService'];
    function NarrowItDownController(MenuSearchService) {
      var menu = this;
      menu.searchTerm = "";
      menu.items= "";
      menu.getMenuCategories =  function () {
        console.log('check boton');
        var promise=  MenuSearchService.getMatchedMenuItems(menu.searchTerm);
        promise.then(function(result){menu.items=result;});
      };
      menu.removeItem = function (itemIndex) {
        //console.log("'this' is: ", this);
        //this.lastRemoved = "Last item removed was " + this.items[itemIndex].name;
        console.log("'the item will be remove ", menu.items[itemIndex]);
        menu.items.splice(itemIndex, 1);
      };
      menu.foundMenu = function () {
        if(menu.items.length>0)
        { return true; }
        else
        { return false; }
      };
       
    }
       
    MenuSearchService.$inject = ['$http', 'ApiBasePath'];
    function MenuSearchService($http, ApiBasePath) {
      var service = this;
    
      service.getMatchedMenuItems = function (searchTerm) {//searchTerm
        return $http({
          method: "GET",
          url: (ApiBasePath + "/menu_items.json")
        })
        .then(function (result) {
            // process result and only keep items that match
            var foundItems=[];
            var list=result.data.menu_items;
            console.log('length of menu', list.length)
            if(searchTerm)
            {
              list.forEach(element => {
                var description = element.description;
                //console.log('name of plate',name)
                if (description.toLowerCase().indexOf(searchTerm) !== -1) {
                   foundItems.push(element);
                }
            });

            }
            
            console.log('were found ',foundItems.length,'plates with word ',searchTerm)
            return foundItems;
        })
        .catch(function (error) {
            console.log("Something went terribly wrong whent get Matched Menu Items");
        });
       };
       
    }
    
    })();
    