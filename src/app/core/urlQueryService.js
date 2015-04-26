(function() {
    'use strict';

    angular
        .module('rainforest')
        .factory('UrlQueryService', UrlQueryService);

    UrlQueryService.$inject = ['$location'];

    /* @ngInject */
    function UrlQueryService($location) {

        var service = {
            removeQuery: removeQuery,
            addQuery: addQuery,
            queryAsArrayFix: queryAsArrayFix,
            addPriceFilter: addPriceFilter
        };

        return service;

        function removeQuery(key, value) {
            var query = $location.search();
            query[key] = queryAsArrayFix(query[key]);

            var pos = query[key].indexOf(value);
            if (pos > -1) {
                query[key].splice(pos, 1);
                $location.search(key, query[key]);
                $location.path("/1");
            }
        }

        function addQuery(key, value) {
            var query = $location.search();
            if (!(key in query)) {
                $location.search(key, [value]);
                $location.path("/1");
            } else {
                var queryArray = query[key];
                queryArray = queryAsArrayFix(queryArray);

                queryArray.push(value);
                $location.search(key, queryArray);
                $location.path("/1");
            }
        }

        function addPriceFilter(min, max) {
            $location.search("min", min);
            $location.search("max", max);
            $location.path("/1");
        }

        // hack:
        // If query in url contains an array with only 1 value, e.g. $location.search(foo, [fooVal])
        // and a full page reload is triggered
        // location.search will return 'foo': 'fooVal' instead of 'foo': ['fooVal']
        // we need to cast it back to an array so we can push new value into it
        // 
        // Query with more than one values is not affected as location.search will return an array
        function queryAsArrayFix(obj) {
            return angular.isArray(obj) ? obj : [obj];
        }
    }

}());
