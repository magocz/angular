angular.module('app.books').factory('bookRestService', function ($http, currentContextPath) {
    'use strict';

    return {
        search: function (titlePrefix) {
            return $http.get(currentContextPath.get() + 'rest/books-by-title', {params: {titlePrefix: titlePrefix}});
        },
        deleteBook: function (bookId) {
            return $http.delete(currentContextPath.get() + 'rest/book/' + bookId);
        },
        addNewBook: function (book) {
            return $http.post(currentContextPath.get() + 'rest/book/', book);
        },
        editBook: function (book) {
            return $http.put(currentContextPath.get() + 'rest/book/', book);
        }
    };
});
