describe('edit controller', function() {
	'use strict';

	beforeEach(function() {
		module('app.main');
		module('ui.bootstrap');
		module('app.books');
	});

	var $scope;
	var modalInstance;

	beforeEach(inject(function($rootScope) {
		$scope = $rootScope.$new();
		modalInstance = {
			close : jasmine.createSpy('modalInstance.close'),
			dismiss : jasmine.createSpy('modalInstance.dismiss')
		};
	}));

	it('newTitle is defined', inject(function($controller) {
		// when
		$controller('BookEditController', {
			$scope : $scope,
			$modalInstance : modalInstance
		});
		// then
		expect($scope.newTitle).toBeDefined();
	}));

	it('edit is defined', inject(function($controller) {
		// when
		$controller('BookEditController', {
			$scope : $scope,
			$modalInstance : modalInstance
		});
		// then
		expect($scope.edit).toBeDefined();
	}));

	it('edit  should call edit', inject(function($controller) {
		// given
		$controller('BookEditController', {
			$scope : $scope,
			$modalInstance : modalInstance
		});
		$scope.newTitle = 'newTitle';
		// when
		$scope.edit();
		// then
		expect(modalInstance.close).toHaveBeenCalledWith('newTitle');
	}));

});