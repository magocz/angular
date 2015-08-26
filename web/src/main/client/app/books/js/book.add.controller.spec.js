describe('book controller', function () {
    'use strict';

    beforeEach(function () {
        module('app.main');
        module('flash');
        module('ui.bootstrap');
        module('app.books');       
    });

    var $scope;
    var $window;
    var modalInstance;
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
        modalInstance = {
                close: jasmine.createSpy('modalInstance.close'),
                dismiss: jasmine.createSpy('modalInstance.dismiss')
            };
        $window = jasmine.createSpyObj('$window', ['alert']);
    }));
    
   
    
    it('addNewBook is defined', inject(function ($controller) {
        // when
        $controller('BookAddController', {$scope: $scope});
        // then
        expect($scope.addNewBook).toBeDefined();
    }));
    
    it('addAuthor is defined', inject(function ($controller) {
        // when
        $controller('BookAddController', {$scope: $scope});
        // then
        expect($scope.addAuthor).toBeDefined();
    }));
    
    it('deleteAuthor is defined', inject(function ($controller) {
        // when
        $controller('BookAddController', {$scope: $scope});
        // then
        expect($scope.deleteAuthor).toBeDefined();
    }));
    
    
    it('authors is defined', inject(function ($controller) {
        // when
        $controller('BookAddController', {$scope: $scope});
        // then
        expect($scope.authors).toBeDefined();
    }));
    
    
   it('delete author should call deleteAuthor', inject(function ($controller) {
        // given       
    	$controller('BookAddController', {$scope: $scope});       
        $scope.authors = [{id : 1, firstName : 'Jan' , lastName : 'Kowalski'}];
        var authorId = 1;
        // when
        $scope.deleteAuthor(authorId);
        // then
        expect($scope.authors.length).toBe(0);
    }));
   
   it('add author should  add author to authors', inject(function ($controller, $modal) {
	   // given
	   $controller('BookAddController', {$scope: $scope});	   
	   var author = {id : 1, firstName : 'Jan' , lastName : 'Kowalski'};
	   spyOn($modal, 'open').and.returnValue(fakeModal);
	   // when
	   $scope.addAuthor();
	   fakeModal.close(author);
	   // then
	   expect($scope.authors.length).toBe(1);
   }));
   
   it('add author should not add author to authors', inject(function ($controller, $modal) {
	   // given
	   $controller('BookAddController', {$scope: $scope});	   
	   spyOn($modal, 'open').and.returnValue(fakeModal);
	   // when
	   $scope.addAuthor();
	   modalInstance.dismiss();
	   // then
	   expect($scope.authors.length).toBe(0);
   }));
   
   it('save book should call window.confirm -> no authors', inject(function ($controller, $q, bookService, Flash) {
       // given
       $controller('BookAddController', {$scope: $scope, $window: $window});      
       $scope.title = 'test';
       $scope.authors = [];
       var saveDeferred = $q.defer();
       spyOn(bookService, 'addNewBook').and.returnValue(saveDeferred.promise);
       spyOn(Flash, 'create');
       // when
       $scope.addNewBook();
       saveDeferred.resolve();
       $scope.$digest();
       // then
       expect($window.alert).toHaveBeenCalled();
   }));
   
   it('save book should call window.confirm -> no title', inject(function ($controller, $q, bookService, Flash) {
       // given
       $controller('BookAddController', {$scope: $scope, $window: $window});      
       $scope.title = '';
       $scope.authors = [{}];
       var saveDeferred = $q.defer();
       spyOn(bookService, 'addNewBook').and.returnValue(saveDeferred.promise);
       spyOn(Flash, 'create');
       // when
       $scope.addNewBook();
       saveDeferred.resolve();
       $scope.$digest();
       // then
       expect($window.alert).toHaveBeenCalled();
   }));
   
   it('save book should call bookService.addNewBook', inject(function ($controller, $q, bookService, Flash) {
       // given
       $controller('BookAddController', {$scope: $scope});      
       $scope.title = 'test';
       $scope.authors = [{firstName : 'jan', lastName : 'kowalski'}];
       var book = {
    		   title : $scope.title,
       			authors :  $scope.authors
       };
       var saveDeferred = $q.defer();
       spyOn(bookService, 'addNewBook').and.returnValue(saveDeferred.promise);
       spyOn(Flash, 'create');
       // when
       $scope.addNewBook();
       saveDeferred.resolve();
       $scope.$digest();
       // then
       expect(bookService.addNewBook).toHaveBeenCalledWith(book);
       expect(Flash.create).toHaveBeenCalledWith('success', 'Książka została dodana.', 'custom-class');
   }));
   
});
