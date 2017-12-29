(function commonServices() {
    //debugger;
    console.log('Inside commonServices method');
    angular
        .module('common.services', ['ngResource'])
        .constant('appSettings', { serverPath: 'http://localhost:23456/' });
}
)();