angular.module('app').controller('mvMainCtrl', ['$scope' , function($scope) {
    $scope.myVar =  "Hello Angular";
    $scope.courses =  [

        {name: 'Doctor Who', featured: false, published: new Date('01/02/2014')},
        {name: 'Doctor What', featured: true, published: new Date('01/01/2000')},
        {name: 'Doctor When', featured: true, published: new Date('04/07/1972')},
        {name: 'Doctor Where', featured: true, published: new Date('08/01/2000')},
        {name: 'Doctor How', featured: false, published: new Date('02/03/2013')},
        {name: 'Doctor Why', featured: true, published: new Date('04/01/2014')},
        {name: 'Practical Unit Testing', featured: true, published: new Date('10/10/2010')},
        {name: 'How to Lie to Everyone', featured: true, published: new Date('12/01/1942')},
        {name: 'The Wizard of Oswald', featured: false, published: new Date('09/10/2011')},
        {name: 'How to Eat Chicken', featured: true, published: new Date('02/20/2000')},
        {name: 'Why Women Should Stay Home', featured: true, published: new Date('03/03/2013')},
        {name: 'You Suck', featured: true, published: new Date('04/25/1974')},
        {name: 'Loser', featured: false, published: new Date('11/11/2011')},
        {name: 'Awesomeness', featured: false, published: new Date('08/08/2008')},
        {name: 'True Perfection', featured: true, published: new Date('12/12/2012')}
    ]
}]);