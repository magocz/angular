angular.module('app.books').controller('BookModalController', function ($window,$scope,$location,$modalInstance) {
    'use strict';
    $scope.firstName = '';
	$scope.lastName = '';
    
    $scope.add = function () {
    	if($scope.firstName !== '' &&  $scope.lastName !== ''){
    		if($scope.firstName.length > 50){
    			$window.alert('Imie nie moze byc dluzsze niz 50 znakow!');
    			return;
    		}
    		
    		if($scope.lastName.length > 50){
    			$window.alert('Nazwisko nie moze byc dluzsze niz 50 znakow!');
    			return;
    		}
    		addAuthor();
    	}    	   	
    };
    
    var addAuthor = function () {
    	var author = {
    			firstName : $scope.firstName,
    			lastName : $scope.lastName
    	};
    	$modalInstance.close(author); 
    };
    
    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
      };
});