(function groceryItemDetailsMod() {
    console.log('Inside groceryItemDetailsMod method');
    angular
        .module("groceryItemDetailsMod", ['common.services', 'ngRoute', 'ngResource']);
})();