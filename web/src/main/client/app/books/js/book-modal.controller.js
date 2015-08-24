angular.module('app.books').controller('BookModalController', function ($scope,$location,$modalInstance) {
    'use strict';
    $scope.firstName = '';
	$scope.lastName = '';
    
    $scope.add = function () {
    	var author = {
    			firstName : $scope.firstName,
    			lastName : $scope.lastName
    	};
    	$modalInstance.close(author);    	
    };
   
});