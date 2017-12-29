(function GroceryItemsResource()
{
    //debugger;
    console.log('Inside GroceryItemsResource method');
    angular
        .module('common.services')
        .factory('groceryItemsResource', ['$resource','appSettings', groceryItemsResource]);

    function groceryItemsResource($resource, appSettings)
    {
        //debugger;
        console.log('Inside groceryItemsResource method');
        // For any value passed apart from URL hierarchy provided below, angular converts it into a query string
        //So below code does not need to change when needing to pass parameters as id
        //return $resource(appSettings.serverPath + '/api/GroceryItems/:id');
        //Added below parameter to provide update as an action which translates to PUT method
        // as $resource only supports POST method by default
        return $resource(appSettings.serverPath + '/api/GroceryItems/:id', null,
            { 'update': {method:'PUT'}}
        );
    }
})();

