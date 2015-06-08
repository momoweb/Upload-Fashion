/*
 * sets isCollapse value on resize events
 */
(function () {
    'use strict';
    angular.module('upload')
        .directive('rgWatchResize', rgWatchResize);

    function rgWatchResize($window) {
        return {
            restrict: 'A',
            link: function (scope) {
                var oldWidth = $window.innerWidth;
                var newWidth;
                angular.element($window).on('resize', function () {
                    scope.$apply(function () {
                        newWidth = $window.innerWidth;
                        /*
                         * mobile browser can trigger a resize event when you scroll because the address bar
                         * will change the height of the browser.
                         * We need to make sure that we are dealing with a browser width change
                         */
                        if (newWidth === oldWidth) {
                            return;
                        }
                        oldWidth = newWidth;
                        //if window width is >= desktop
                        scope.vm.isCollapsed = (newWidth < 992);
                    });
                });
            }
        };
    }
}());
