describe('authors service', function () {
    'use strict';

    beforeEach(function () {
        module('app.main');
        module('app.authors');
    });
    
    var $scope;
    
    beforeEach(inject(function ($rootScope) {
        $scope = $rootScope.$new();
    }));
    
    it('search is defined', inject(function (authorService) {
        // then
        expect(authorService.search).toBeDefined();
    }));
    
    it('search book should call bookService.search', inject(function ($controller,authorService, authorRestService) {
        // given
    	spyOn(authorRestService, 'search').and.returnValue();
        // when    	
    	authorService.search();
        // then
        expect(authorRestService.search).toHaveBeenCalled();
    }));
    
    
    
});