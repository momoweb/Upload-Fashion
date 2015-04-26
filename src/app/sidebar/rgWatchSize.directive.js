/*
 * sets isCollapse value on resize events
 */
(function() {
    'use strict';
    angular.module('upload')
        .directive('rgWatchResize', rgWatchResize);

    function rgWatchResize($window) {
        return {
            restrict: 'A',
            link: function(scope) {
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
