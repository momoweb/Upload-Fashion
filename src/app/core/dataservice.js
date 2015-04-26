/* some of these data operations should be handle by the backend */
(function() {
    'use strict';

    angular
        .module('upload')
        .factory('DataService', DataService);

    DataService.$inject = ['inArrayFilter', 'filterFilter', 'orderByFilter', 'rangeFilter', '$http', '$q', 'sortOrders', '$rootScope', '$timeout', 'dataEvents'];

    /* @ngInject */
    function DataService(inArrayFilter, filterFilter, orderByFilter, rangeFilter, $http, $q, sortOrders, $rootScope, $timeout, dataEvents) {

        var database;
        var currentSortOrder = 0;
        var itemsPerPage = 6;
        var sorted = false;

        var service = {
            getItem: getItem,
            getData: getData,
            getMetaData: getMetaData,
            getCurrentSortOrder: getCurrentSortOrder
        };

        return service;

        function getMetaData() {
            var metaData = {};
            metaData.pageTotal = getTotalPages();
            metaData.itemTotal = getTotalItems();
            // metaData.currentSortOrder = getCurrentSortOrder();
            metaData.itemsPerPage = getItemsPerPage();
            return metaData;
        }

        function getData(pageNum, query) {
            var deferred = $q.defer();
            loadDatabase()
                .then(function(response) {
                    if (angular.isNumber(query.sort)) {
                        currentSortOrder = query.sort;
                    }
                    sortData(response.data, query);
                    filterData(query);
                    var pageData = prepareData(pageNum);
                    deferred.resolve(pageData);
                });
            return deferred.promise;
        }

        function getItem(itemUid) {
            var deferred = $q.defer();
            loadDatabase()
                .then(function(response) {
                    var item = filterFilter(response.data, itemUid)[0];
                    deferred.resolve(item);
                });
            return deferred.promise;

        }

        function filterData(query) {
            // type filter exist
            if (query.category) {
                database = inArrayFilter(database, 'category' ,query.category);
                $rootScope.$broadcast(dataEvents.dataChanged);
            }
            // sizes filter exist
            if (query.sizes) {
                database = inArrayFilter(database, 'sizes', query.sizes);
                $rootScope.$broadcast(dataEvents.dataChanged);
            }

            // price filter exist
            if ((query.min >= 0) && (query.max >= 0)) {
                database = rangeFilter(database, query.min, query.max);
                $rootScope.$broadcast(dataEvents.dataChanged);
            }

            // color filter exist
            if (query.colors) {
                database = inArrayFilter(database, 'colors', query.colors);
                $rootScope.$broadcast(dataEvents.dataChanged);
            }
        }

        function prepareData(pageNum) {
            var data = {};
            data.items = getCurrentPageItems(pageNum);
            return data;
        }

        function sortData(data) {
            database = orderByFilter(data, sortOrders[currentSortOrder].value);
            $rootScope.$broadcast(dataEvents.dataChanged);
        }

        function loadDatabase() {
            return $http.get('data/database.json');
        }

        function getItemsPerPage() {
            return itemsPerPage;
        }

        function getCurrentSortOrder() {
            return currentSortOrder;
        }

        function getTotalPages() {
            return Math.ceil(database.length / itemsPerPage);
        }

        function getTotalItems() {
            return database.length;
        }

        function getCurrentPageItems(pageNum) {
            var start = (pageNum - 1) * itemsPerPage;
            var end = pageNum * itemsPerPage;
            // if page 1, start index is 0
            if (pageNum === 1) {
                start = 0;
            }

            return database.slice(start, end);
        }
    }

}());
