(function() {
    'use strict';
    angular
        .module('upload')
        .filter('range', function() {
            return function(items, min, max) {
                var filtered = [];
                // If time is with the range
                angular.forEach(items, function(item) {
                    if (item.price >= min && item.price <= max) {
                        filtered.push(item);
                    }
                });
                return filtered;
            };
        });
}());
