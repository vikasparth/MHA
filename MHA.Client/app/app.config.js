(function appconfig() {
    //debugger;
    console.log('Inside appconfig method');
    angular
        .module('mhaApp')
        .config(['$locationProvider', '$routeProvider', function appRoutingConfig($locationProvider,$routeProvider)
        {
            //debugger;
            console.log("Inside the appRoutingConfig method");
            $locationProvider.hashPrefix('!');
            $routeProvider
                .when('/', {
                    template: '<grocery-items-list></grocery-items-list>'
                })
                .when('/groceryList', { template: '<grocery-items-list></grocery-items-list>' })
                .when('/groceryList/:id', { template: '<grocery-item-details></grocery-item-details>' })
                .when('/groceryEdit/:id', { template: '<grocery-item-save></grocery-item-save>' })
                .otherwise('/');

    }
    ]);
} 
)();