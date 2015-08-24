angular.module('app.books').factory('bookService', function (bookRestService) {
    'use strict';

    return {
        search: function (titlePrefix) {
            return bookRestService.search(titlePrefix);
        },
        deleteBook: function (bookId) {
            return bookRestService.deleteBook(bookId);
        },
        addNewBook: function (book) {
            return bookRestService.addNewBook(book);
        },
        editBook: function (book) {
            return bookRestService.editBook(book);
        }
    };
});
