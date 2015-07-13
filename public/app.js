var app = angular.module('oneDay', []);

app.controller('ProfessionalsController',['$scope', '$http', function ($scope, $http) {
  $http.get('professionals').success(function(data){
    $scope.professionals = data;
  });
}]);