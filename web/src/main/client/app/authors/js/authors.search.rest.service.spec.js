describe('authors rest service', function () {
    'use strict';

    beforeEach(function () {
        module('app.main');
        module('flash');
        module('app.authors');
    });

    var $scope;
    
    beforeEach(inject(function ($rootScope) {
        $scope = $rootScope.$new();
    }));
    
    it('search is defined', inject(function (authorRestService) {
        // then
        expect(authorRestService.search).toBeDefined();
    }));
    
    it('search should send get request to http', inject(function ($httpBackend, authorRestService) {
        // given
    	var author = {id: 1, title: 'testTite', authors: []};
    	var httpBackend = $httpBackend;
    	httpBackend.expect('GET', '/context.html/rest/authors/').respond(200, author);
       
    	authorRestService.search().then(function(response) {
    		console.log(response.status);
    		expect(response.status).toEqual(200);
    		expect(response.data).toEqual(author);  		
    	});
    	
    	httpBackend.flush();
    }));
    
   
    
});