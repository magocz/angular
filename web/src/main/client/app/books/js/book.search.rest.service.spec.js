describe('book rest service', function () {
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

    it('addNewBook is defined', inject(function (bookRestService) {
        // then
        expect(bookRestService.addNewBook).toBeDefined();
    }));
    
    it('editBook is defined', inject(function (bookRestService) {
        // then
        expect(bookRestService.editBook).toBeDefined();
    }));
    
    
    it('search is defined', inject(function (bookRestService) {
        // then
        expect(bookRestService.search).toBeDefined();
    }));
    
    
    it('deleteBook is defined', inject(function (bookRestService) {
        // then
        expect(bookRestService.deleteBook).toBeDefined();
    }));

    
    it('addNewBook should send post request to http', inject(function ($httpBackend, bookRestService) {
        // given
    	var book = {id: 1, title: 'testTite', authors: []};
    	var httpBackend = $httpBackend;
    	httpBackend.expect('POST', '/context.html/rest/book/', book).respond(200, book);

       
    	bookRestService.addNewBook(book).then(function(response) {
    		console.log(response.status);
    		expect(response.status).toEqual(200);
    		expect(response.data).toEqual(book);  		
    	});
    	
    	httpBackend.flush();
    }));

    it('editBook should send put request to http', inject(function ($httpBackend, bookRestService) {
        // given
    	var book = {id: 1, title: 'testTite', authors: []};
    	var httpBackend = $httpBackend;
    	httpBackend.expect('PUT', '/context.html/rest/book/', book).respond(200, book);

       
    	bookRestService.editBook(book).then(function(response) {
    		console.log(response.status);
    		expect(response.status).toEqual(200);
    		expect(response.data).toEqual(book);  		
    	});
    	
    	httpBackend.flush();
    }));
    
    it('search should send get request to http', inject(function ($httpBackend, bookRestService) {
        // given
    	var book = {id: 1, title: 'testTite', authors: []};
    	var httpBackend = $httpBackend;
    	httpBackend.expect('GET', '/context.html/rest/books-by-title?titlePrefix=t').respond(200, book);
       
    	bookRestService.search('t').then(function(response) {
    		console.log(response.status);
    		expect(response.status).toEqual(200);
    		expect(response.data).toEqual(book);  		
    	});
    	
    	httpBackend.flush();
    }));
    
    it('delete should send delete request to http', inject(function ($httpBackend, bookRestService) {
        // given
    	var bookId = '1';
    	var httpBackend = $httpBackend;
    	httpBackend.expect('DELETE', '/context.html/rest/book/' + bookId).respond(200, bookId);
       
    	bookRestService.deleteBook(1).then(function(response) {
    		console.log(response.status);
    		expect(response.status).toEqual(200);
    		expect(response.data).toEqual(bookId);  		
    	});
    	
    	httpBackend.flush();
    }));
    
});