describe('book controller', function () {
    'use strict';

    beforeEach(function () {
        module('app.main');
        module('flash');
        module('app.books');
    });

    var $scope;
    var fakeModal = {
    	    result: {
    	        then: function(confirmCallback, cancelCallback) {
    	            //Store the callbacks for later when the user clicks on the OK or Cancel button of the dialog
    	            this.confirmCallBack = confirmCallback;
    	            this.cancelCallback = cancelCallback;
    	        }
    	    },
    	    close: function( author ) {
    	        //The user clicked OK on the modal dialog, call the stored confirm callback with the selected item
    	        this.result.confirmCallBack( author );
    	    },
    	    dismiss: function(type) {
    	        //The user clicked cancel on the modal dialog, call the stored cancel callback
    	        this.result.cancelCallback(type);
    	    }
    	};
    
    beforeEach(inject(function ($rootScope) {
        $scope = $rootScope.$new();
    }));

    it('deleteBook is defined', inject(function ($controller) {
        // when
        $controller('BookSearchController', {$scope: $scope});
        // then
        expect($scope.deleteBook).toBeDefined();
    }));
    
    it('addBook is defined', inject(function ($controller) {
        // when
        $controller('BookSearchController', {$scope: $scope});
        // then
        expect($scope.addBook).toBeDefined();
    }));
    
    it('search is editBook', inject(function ($controller) {
        // when
        $controller('BookSearchController', {$scope: $scope});
        // then
        expect($scope.editBook).toBeDefined();
    }));
    

    it('delete book should call bookService.deleteBook', inject(function ($controller, $q, bookService, Flash) {
        // given
        $controller('BookSearchController', {$scope: $scope});

        var bookId = 1;
        $scope.books = [{id: bookId, title: 'test'}];
        var deleteDeferred = $q.defer();
        spyOn(bookService, 'deleteBook').and.returnValue(deleteDeferred.promise);
        spyOn(Flash, 'create');
        // when
        $scope.deleteBook(bookId);
        deleteDeferred.resolve();
        $scope.$digest();
        // then
        expect(bookService.deleteBook).toHaveBeenCalledWith(bookId);
        expect(Flash.create).toHaveBeenCalledWith('success', 'Książka została usunięta.', 'custom-class');
        expect($scope.books.length).toBe(0);
    }));
    
    it('edit book should call bookService.editBook', inject(function ($controller, $q, bookService, Flash, $modal) {
        // given
        $controller('BookSearchController', {$scope: $scope});

        var newTitle = 'newTitle';
        var book = {id: 1, title: 'test' , authors : [] };
        $scope.books = [book];
        var editDeferred = $q.defer();
        spyOn(bookService, 'editBook').and.returnValue(editDeferred.promise);
        spyOn(Flash, 'create');
        spyOn($modal, 'open').and.returnValue(fakeModal);
 	   // when
 	   	$scope.editBook(book);
 	   	fakeModal.close(newTitle);
 	   editDeferred.resolve();
        $scope.$digest();
        // then
        expect(bookService.editBook).toHaveBeenCalledWith(book);
        expect(Flash.create).toHaveBeenCalledWith('success', 'Edycja zakonczona powodzeniem!', 'custom-class');
        expect($scope.books.length).toBe(1);
        expect($scope.books[0].title).toBe(newTitle);
    }));
    
    it('edit book should call bookService.editBook -> error', inject(function ($controller, $q, bookService, Flash, $modal) {
        // given
        $controller('BookSearchController', {$scope: $scope});

        var newTitle = 'newTitle';
        var book = {id: 1, title: 'test' , authors : [] };
        $scope.books = [book];
        var editDeferred = $q.defer();
        spyOn(bookService, 'editBook').and.returnValue(editDeferred.promise);
        spyOn(Flash, 'create');
        spyOn($modal, 'open').and.returnValue(fakeModal);
 	   // when
 	   	$scope.editBook(book);
 	   	fakeModal.close(newTitle);
 	   	editDeferred.reject();
        $scope.$digest();
        // then
        expect(bookService.editBook).toHaveBeenCalledWith(book);
        expect(Flash.create).toHaveBeenCalledWith('danger', 'Wyjątek', 'custom-class');
        expect($scope.books.length).toBe(1);
    }));
    
    
    it('search should call bookService.search', inject(function ($controller, $q, bookService) {
        // given
        $controller('BookSearchController', {$scope: $scope});
        $scope.prefix = 't';
        var bookList = [{id: 1, title: 'test' , authors : [] }, {id: 1, title: 'test1' , authors : [] }];
        var searchDeferred = $q.defer();
        spyOn(bookService, 'search').and.returnValue(searchDeferred.promise);
 	   // when
 	   	$scope.search();
 	   	searchDeferred.resolve({data : bookList});
        $scope.$digest();
        // then
        expect(bookService.search).toHaveBeenCalledWith($scope.prefix);
        expect($scope.books.length).toBe(2);
    }));
    
    
    it('search should call bookService.search', inject(function ($controller, $q, bookService, Flash) {
        // given
        $controller('BookSearchController', {$scope: $scope});
        $scope.prefix = 't';
        var searchDeferred = $q.defer();
        spyOn(Flash, 'create');
        spyOn(bookService, 'search').and.returnValue(searchDeferred.promise);
 	   // when
 	   	$scope.search();
 	   	searchDeferred.reject();
        $scope.$digest();
        // then
        expect(bookService.search).toHaveBeenCalledWith($scope.prefix);
        expect(Flash.create).toHaveBeenCalledWith('danger', 'Wyjątek', 'custom-class');
    }));
    
    
   
});
