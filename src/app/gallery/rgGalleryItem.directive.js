(function() {
    'use strict';
    angular.module('rainforest')
        .directive('rgGalleryItem', function() {
            return {
                restrict: 'E',
                templateUrl: 'app/gallery/rgGalleryItem.html',
                scope: {
                    item: '='
                },
                controllerAs: 'vm',
                bindToController: true,
                controller: function() {
                    /*jshint validthis: true */
                    var vm = this;
                }
            };
        });
}());
