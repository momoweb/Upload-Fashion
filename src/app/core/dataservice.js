(function () {
    'use strict';
    angular
        .module('upload')
        .factory('dataservice', dataservice);

    /* @ngInject */
    function dataservice($http, $filter, sortOrders, $rootScope, dataEvents) {
        var database;
        var itemsPerPage = 6;
        var currentSortOrder = 0;

        var service = {
            getPageData: getPageData,
            getItem: getItem,
            getMetaData: getMetaData,
            getCurrentSortOrder: getCurrentSortOrder
        };

        return service;

        function getCurrentSortOrder() {
            return currentSortOrder;
        }

        // return items for the specified page
        function getPageData(pageNum, query) {
            return loadData()
                .then(complete);

            function complete(response) {
                database = response.data;
                sortData(query);
                filterData(query);
                var pageData = getPageItems(pageNum);
                return pageData;
            }
        }

        // return item with the specified itemUid
        function getItem(itemUid) {
            return loadData()
                .then(function(response) {
                    var item = $filter('filter')(response.data, itemUid)[0];
                    return item;
                });
        }

        // return meta data
        function getMetaData() {
            var metaData = {};
            metaData.pageTotal = getPageTotal();
            metaData.itemTotal = getItemTotal();
            metaData.itemsPerPage = getItemsPerPage();
            return metaData;
        }

        function getPageTotal() {
            return Math.ceil(database.length / itemsPerPage);
        }

        function getItemTotal() {
            return database.length;
        }

        function getItemsPerPage() {
            return itemsPerPage;
        }

        // return the items for the corresponding page number
        function getPageItems(pageNum) {
            var start = (pageNum - 1) * itemsPerPage;
            var end = pageNum * itemsPerPage;

            return database.slice(start, end);
        }

        function loadData() {
            return (database || $http.get('data/database.json'));
        }

        // sort database using currentSortOrder
        function sortData(query) {
            // if there is a sort order query passed in
            if (angular.isNumber(query.sort)) {
                currentSortOrder = query.sort;
            }
            database = $filter('orderBy')(database, sortOrders[currentSortOrder].value);
            $rootScope.$broadcast(dataEvents.dataChanged);
        }

        function filterData(query) {
            // type filter exist
            if (query.category) {
                database = $filter('inArray')(database, 'category', query.category);
                $rootScope.$broadcast(dataEvents.dataChanged);
            }
            // sizes filter exist
            if (query.sizes) {
                database = $filter('inArray')(database, 'sizes', query.sizes);
                $rootScope.$broadcast(dataEvents.dataChanged);
            }

            // price filter exist
            if ((query.min >= 0) && (query.max >= 0)) {
                database = $filter('range')(database, query.min, query.max);
                $rootScope.$broadcast(dataEvents.dataChanged);
            }

            // color filter exist
            if (query.colors) {
                database = $filter('inArray')(database, 'colors', query.colors);
                $rootScope.$broadcast(dataEvents.dataChanged);
            }
        }

    }

})();
