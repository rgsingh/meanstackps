angular.module('app').controller('mvNavBarLoginCtrl', ['$scope', '$http' , 'mvIdentity', 'mvNotifier', 'mvAuth', function($scope, $http, mvIdentity, mvNotifier, mvAuth){
    $scope.identity = mvIdentity;
    $scope.signin = function(username, password) {
        mvAuth.authenticateUser(username, password).then(function(success){
           if (success)  {
               mvNotifier.notify('You have successfully signed in, bro!')
           } else {
               mvNotifier.notify('Bummer. Your username/password combo is not right.')
           }
        });
    }
}]);