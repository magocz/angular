angular.module('app.authors').controller('AuthorSearchController',
		function($scope, $window, $location, authorService, Flash) {
			'use strict';

			$scope.authors = [];
			/*$scope.gridOptions = {
				data : 'authors'
			};*/

			var search = function() {
				authorService.search().then(function(response) {
					angular.copy(response.data, $scope.authors);
				}, function() {
					Flash.create('danger', 'Wyjątek', 'custom-class');
				});
			};
			
			search();
			
			$scope.startsWith = function (actual, expected) {
			    var lowerStr = (actual + '').toLowerCase();
			    return lowerStr.indexOf(expected.toLowerCase()) === 0;
			};
		});
