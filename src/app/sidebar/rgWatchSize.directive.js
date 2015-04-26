/*
set isCollapse based on changes in screen size
 */
(function() {
    'use strict';
    angular.module('upload')
        .directive('rgWatchResize', rgWatchResize);

    rgWatchResize.$inject = ['$window'];

    function rgWatchResize($window) {
        return {
            restrict: 'A',
            link: function(scope, elem, attr) {
                angular.element($window).on('resize', function() {
                    scope.$apply(function() {
                        //if window width is >= desktop
                        if ($window.innerWidth >= 992) {
                            scope.vm.isCollapsed = false;
                        } else {
                            scope.vm.isCollapsed = true;
                        }
                    });
                });
            }
        };
    }
}());
