angular.module('app.books')
		.controller(
				'BookAddController',
				function($scope, $window, $location, bookService, Flash, $modal) {
					'use strict';
					$scope.title = 'title';
					$scope.authors = [];
					$scope.gridOptions = {
						data : 'authors'
					};

					$scope.addNewBook = function() {						
						if ($scope.title === '') {
							$window.alert('Musisz podac tytul ksiazki!');
							return;
						}						
						if ($scope.title.length > 50) {
							$window.alert('Tytul nie moze posiadac wiecej niz 50 znakow!');
							return;
						}
						if ($scope.authors.length === 0) {
							$window.alert('Lista autorow jest pusta!');
							return;
						}
						
						addBook();
					};

					var addBook = function() {
						var book = {
							title : $scope.title,
							authors : $scope.authors
						};
						bookService.addNewBook(book).then(
								function() {
									Flash.create('success',
											'Książka została dodana.',
											'custom-class');
									$scope.authors = [];
									$location.url('/books/book-list/');
								},
								function() {
									Flash.create('danger', 'Wyjątek',
											'custom-class');
								});
					};

					$scope.addAuthor = function() {
						$modal.open({
							templateUrl : 'books/html/book-modal.html',
							controller : 'BookModalController',
							size : 'lg'
						}).result.then(function(author) {
							$scope.authors.push(author);
						});
					};

					$scope.deleteAuthor = function(authorId) {
						deleteAuthor(authorId);
					};

					var deleteAuthor = function(authorId) {
						for (var i = 0; i < $scope.authors.length; i = i + 1) {
							if ($scope.authors[i].id === authorId) {
								$scope.authors.splice(i, 1);
								break;
							}
						}
					};

				});
