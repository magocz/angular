describe('book service', function () {
    'use strict';

    beforeEach(function () {
        module('app.main');
        module('flash');
        module('app.books');
    });
    
    var $scope;
    
    beforeEach(inject(function ($rootScope) {
        $scope = $rootScope.$new();
    }));
    
    it('addNewBook is defined', inject(function (bookService) {
        // then
        expect(bookService.addNewBook).toBeDefined();
    }));
    
    it('editBook is defined', inject(function (bookService) {
        // then
        expect(bookService.editBook).toBeDefined();
    }));
    
    it('search is defined', inject(function (bookService) {
        // then
        expect(bookService.search).toBeDefined();
    }));
    
    it('deleteBook is defined', inject(function (bookService) {
        // then
        expect(bookService.deleteBook).toBeDefined();
    }));
    
    it('search book should call bookService.search', inject(function ($controller,bookService, bookRestService) {
        // given
    	var prefix = 't';
    	spyOn(bookRestService, 'search').and.returnValue();
        // when    	
    	bookService.search(prefix);
        // then
        expect(bookRestService.search).toHaveBeenCalledWith(prefix);
    }));
    
    it('delete book should call bookService.deleteBook', inject(function ($controller,bookService, bookRestService) {
        // given
    	var bookId = 1;
    	spyOn(bookRestService, 'deleteBook').and.returnValue();
        // when    	
    	bookService.deleteBook(bookId);
        // then
        expect(bookRestService.deleteBook).toHaveBeenCalledWith(bookId);
    }));
    
    it('addNewBook  should call bookService.addNewBook', inject(function ($controller,bookService, bookRestService) {
        // given
    	var book = {
    			title : 'loka',
    			authors : []
    	};
    	spyOn(bookRestService, 'addNewBook').and.returnValue();
        // when    	
    	bookService.addNewBook(book);
        // then
        expect(bookRestService.addNewBook).toHaveBeenCalledWith(book);
    }));
    
    
    it('editBook should call bookService.editBook', inject(function ($controller,bookService, bookRestService) {
        // given
    	var book = {
    			title : 'loka',
    			authors : []
    	};
    	spyOn(bookRestService, 'editBook').and.returnValue();
        // when    	
    	bookService.editBook(book);
        // then
        expect(bookRestService.editBook).toHaveBeenCalledWith(book);
    }));
    
    
});