(function() {
    'use strict';
    angular
        .module('upload')
        .factory('UrlQueryService', UrlQueryService);

    /* @ngInject */
    function UrlQueryService($location, $state) {

        var service = {
            removeQuery: removeQuery,
            addQuery: addQuery,
            addPriceFilter: addPriceFilter
        };

        return service;

        function removeQuery(key, value) {
            var query = $location.search();
            // If query in url contains an array with only 1 value, e.g. $location.search(key, [value])
            // and a full page reload is triggered
            // location.search will return 'key': 'value' instead of 'key': ['value']
            // we need to cast it back to an array so we can push new value into it
            // Query with more than one values is not affected as location.search will return an array
            query[key] = [].concat(query[key]);

            var pos = query[key].indexOf(value);
            if (pos > -1) {
                query[key].splice(pos, 1);
                $location.search(key, query[key]);
                //$location.path('/1');
            }
        }

        function addQuery(key, value) {
            var query = $location.search();
            if (!(key in query)) {
                $location.search(key, [value]);
                //$location.path('/1');
            } else {
                var valueArray = query[key];
                // see removeQuery on why we need to use [].concat
                valueArray = [].concat(valueArray);

                valueArray.push(value);
                $location.search(key, valueArray);
                //$location.path('/1');
            }
        }

        function addPriceFilter(min, max) {
            $location.search('min', min);
            $location.search('max', max);
        }
    }

}());
