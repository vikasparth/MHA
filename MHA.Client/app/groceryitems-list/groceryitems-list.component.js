//(
    //function groceryitemcomponent() {
    //debugger;
    console.log('Inside groceryitemcomponent method');
    angular
        .module('groceryItemsListMod')
        .component("groceryItemsList", {
            templateUrl: '/app/groceryitems-list/groceryitems-list.template.html',
            //template: '<h1>Hare Krishna</h1>',
            controller: ['groceryItemsResource', function GroceryListController(groceryItemsResource)
            {
                //debugger;
                console.log('Inside GroceryListController method');
                var self = this;
                groceryItemsResource.query({$skip:1,$top:2},function grcitemlist(data) {
                    console.log('Inside groceryItemsResource.query');
                    self.groceryItems = data;
                });
            }],
            controllerAs: 'glc'
        });

   // var GroceryListController =
   //     function GroceryListControllermeth(groceryItemsResource) {
   // debugger;
   // console.log('Inside GroceryListController method');
   // var self = this;
   // groceryItemsResource.query(function grcitemlist(data) {
   //     self.groceryItems = data;
   // });    
   //}
//})();