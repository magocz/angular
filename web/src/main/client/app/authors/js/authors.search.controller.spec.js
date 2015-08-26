describe('author controller', function() {
	'use strict';

	beforeEach(function() {
		module('app.main');
		module('flash');
		module('app.authors');
	});

	var $scope;
	beforeEach(inject(function($rootScope) {
		$scope = $rootScope.$new();
	}));

	it('search is defined', inject(function($controller) {
		// when
		$controller('AuthorSearchController', {
			$scope : $scope
		});
		// then
		expect($scope.search).toBeDefined();
	}));

	it('startsWith is defined', inject(function($controller) {
		// when
		$controller('AuthorSearchController', {
			$scope : $scope
		});
		// then
		expect($scope.startsWith).toBeDefined();
	}));

	it('search should call authorService.search', inject(function($controller, $q, authorService,Flash) {
		// given
		var searchDeferred = $q.defer();
		var searchSpyCount = 0;
		spyOn(authorService, 'search').and.callFake(function() {
			searchSpyCount = searchSpyCount + 1;
			if (searchSpyCount === 1) {
				return {
					then : angular.noop
				};
			} else if (searchSpyCount === 2) {
				return searchDeferred.promise;
			}
		});
		$controller('AuthorSearchController', {
			$scope : $scope
		});
		var authorList = [{firstName : 'Jan', lastName : 'Kowalski'}];		
		spyOn(Flash, 'create');
		 // when
		$scope.search();
		searchDeferred.resolve({data : authorList});
        $scope.$digest();
        // then
        expect(authorService.search).toHaveBeenCalled();
        expect($scope.authors.length).toBe(1);

	}));
});
