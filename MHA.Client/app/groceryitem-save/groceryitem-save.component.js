(function groceryItemSaveModule() {
    angular
        .module('groceryItemSaveMod')
        .component('groceryItemSave', {
            templateUrl: '/app/groceryitem-save/groceryitem-save.template.html',
            controller: ['groceryItemsResource', function GrocerySaveController(groceryItemsResource)
            {
                console.log('Inside GrocerySaveController method');
                var self = this;
                self.groceyItems = {};

                groceryItemsResource.get({ id: 0 }, function grcitemsave(data) {
                    console.log('Inside grcitemsave method');
                    self.groceyItems = data;
                    self.originalItem = angular.copy(data);
                },
                    function (response) {
                        console.log(response.statusText)
                    });

                if (self.groceyItems && self.groceyItems.id)
                {
                    self.Title = "Edit Grocery Item";
                }
                else
                {
                    self.Title = "Create New Item";
                }
                //groceryItemsResource.query(function grcitemsave(data) {
                //    console.log('Inside grcitemsave method');
                //    self.groceyItems = data;
                //})

                self.submit = function submitInline()
                {
                    console.log('Inside Submit method');
                    if (self.groceyItems.id) {
                        self.groceyItems.$update({ id: self.groceyItems.id }, function (data) {
                            self.originalItem = angular.copy(data);
                            console.log('Saving Updated data Complete');
                        },
                            function (response) {
                                console.log(response.statusText);
                                if (response.data.exceptionMessage)
                                {
                                    console.log(response.data.exceptionMessage);
                                    console.log(response.data.stackTrace);
                                }
                                if (response.data.modelState)
                                {
                                    for (var key in response.data.modelState)
                                    {
                                        self.message += response.data.modelState[key] + '\r\n';
                                    }
                                    console.log(self.message);
                                    self.message = '';
                                }
                            })
                    }

                    else
                    {
                        self.groceyItems.$save(function (data) {
                            self.originalItem = angular.copy(data);
                            console.log('Saving newly cretaed data complete');
                        },
                            function (response) {
                                console.log(response.statusText)
                                if (response.data.exceptionMessage) {
                                    console.log(response.data.exceptionMessage);
                                    console.log(response.data.stackTrace);
                                }
                                if (response.data.modelState) {
                                    for (var key in response.data.modelState) {
                                        self.message += response.data.modelState[key] + '\r\n';
                                    }
                                    console.log(self.message);
                                    self.message = '';
                                }
                            })
                    }
                    
                }

                self.cancel = function cancelInline(itemsForm) {
                    debugger;
                    console.log('Inside cancel method');
                    itemsForm.$setPristine();
                    self.groceyItems = angular.copy(self.originalItem)
                }

            }],
            controllerAs: 'gcs'

        })
}
)();