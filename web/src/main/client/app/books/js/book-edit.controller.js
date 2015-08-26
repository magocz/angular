angular.module('app.books').controller(
		'BookEditController',
		function($scope, $location, bookService, Flash,
				$modalInstance) {
			'use strict';
			
			$scope.newTitle = '';

			$scope.edit = function() {
				$modalInstance.close($scope.newTitle);
			};

		});