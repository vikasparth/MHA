(function LoginCtrl()
{
    angular.module('mhaApp')
        .controller('LoginCtrl', ['userAccount', function LoginCtrl(userAccount) {
            var self = this;
            self.isLoggedIn = false;
            self.message = 'PlaceHolder Message';
            self.userData = {
                userName: '',
                email: '',
                password: '',
                confirmPassword: ''
            };

            self.registerUser = function registerUserInline() {
                self.userData.confirmPassword = self.userData.password;
                console.log('Inside register User method');

                userAccount.registration.registerUser(self.userData, function (data) {
                    self.confirmPassword = '';
                    self.message = 'Registration was successful';
                    self.login();
                },
                    function (response) {
                        self.isLoggedIn = false;
                        self.message = response.statusText + '\r\n';
                        if (response.data.exceptionMessage) {
                            self.message += response.data.exceptionMessage;
                        }
                        if (response.data.modelState) {
                            for (var key in response.data.modelState) {
                                self.message += response.data.modelState[key] + '\r\n';
                            }
                        }
                    });

            }
            self.login = function () {
                self.userData.grant_type = "password";
                self.userData.userName = self.userData.email

                userAccount.login.loginUser(self.userData, function (data) {
                    self.isLoggedIn = true;
                    self.message = "";
                    self.password = "";
                    self.token = data.access_token;
                },
                    function (response) {
                        self.isLoggedIn = false;
                        self.message = response.statusText+"\r\n";
                        self.password = "";
                        if (response.data.exceptionMessage)
                            self.message += response.data.exceptionMessage;
                        if (response.data.error)
                            self.message += response.data.error;
                    }
                )
            }
        }]);

  
})();