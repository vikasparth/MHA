(function groceryItemDetailsComponent() {
    angular
        .module('groceryItemDetailsMod')
        .component('groceryItemDetails', {
            //template: '<h1>Hello from Temp Template</h1>',
            templateUrl: '/app/groceryitem-details/groceryitem-details.template.html',
            controller: ['$routeParams', 'groceryItemsResource', function groceryItemDetailsController($routeParams,groceryItemsResource) {
                console.log('Inside the groceryItemDetailsController');
                var self = this
                self.groceryItem = {};
                self.id = $routeParams.id;                
                //groceryItemsResource.query({ $filter: "Id eq " + self.id }, function groceryItemsResourcequery(data) {
                groceryItemsResource.get({ id: self.id }, function groceryItemsResourcequery(data) {
                    console.log('Inside the groceryItemsResourcequery method    ' + self.id);
                    self.groceryItem = data;
                });
            }],
            controllerAs: 'gdc'
        });
})();