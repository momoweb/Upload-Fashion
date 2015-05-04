(function() {
    'use strict';
    angular
        .module('upload')
        .filter('inArray', function() {
            return function inArray(haystack, category, needle) {
                var result = [];
                // if filter list is empty
                if (needle.length < 1) {
                    return haystack;
                }
                var item, i, j;
                // cast single item into an array
                if (!(angular.isArray(needle))) {
                    needle = [needle];
                }
                // check if items in needle is in haystack
                var hl = haystack.length;
                var nl = needle.length;
                for (i = 0; i < hl; i++) {
                    item = haystack[i];
                    var inItem = false;
                    for (j = 0; j < nl; j++) {
                        if ((item[category].indexOf(needle[j]) !== -1)) {
                            inItem = true;
                        }
                    }
                    if (inItem) {
                        result.push(item);
                    }
                }
                return (result);
            };
        });
}());
