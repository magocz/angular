describe('modal controller', function() {
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

	it('firstName is defined', inject(function($controller) {
		// when
		$controller('BookModalController', {
			$scope : $scope,
			$modalInstance : modalInstance
		});
		// then
		expect($scope.firstName).toBeDefined();
	}));
	
	it('lastName is defined', inject(function($controller) {
		// when
		$controller('BookModalController', {
			$scope : $scope,
			$modalInstance : modalInstance
		});
		// then
		expect($scope.lastName).toBeDefined();
	}));

	it('add is defined', inject(function($controller) {
		// when
		$controller('BookModalController', {
			$scope : $scope,
			$modalInstance : modalInstance
		});
		// then
		expect($scope.add).toBeDefined();
	}));
	
	it('cancel is defined', inject(function($controller) {
		// when
		$controller('BookModalController', {
			$scope : $scope,
			$modalInstance : modalInstance
		});
		// then
		expect($scope.cancel).toBeDefined();
	}));
	
	

	it('add should call add', inject(function($controller) {
		// given
		$controller('BookModalController', {
			$scope : $scope,
			$modalInstance : modalInstance
		});
		$scope.firstName = 'Jan';
		$scope.lastName = 'Kowalski';
		var author = {				
				firstName : 'Jan',
				lastName : 'Kowalski'
		};
		// when
		$scope.add();
		// then
		expect(modalInstance.close).toHaveBeenCalledWith(author);
	}));
	
	it('cancel should call dismiss', inject(function($controller) {
		// given
		$controller('BookModalController', {
			$scope : $scope,
			$modalInstance : modalInstance
		});
		// when
		$scope.cancel();
		// then
		expect(modalInstance.dismiss).toHaveBeenCalledWith('cancel');
	}));

});