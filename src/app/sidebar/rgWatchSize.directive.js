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
                var oldWidth = $window.innerWidth;
                angular.element($window).on('resize', function() {
                    scope.$apply(function() {
                        var newWidth = $window.innerWidth;
                        /*
                         * mobile browser can trigger a resize event when you scroll because the address bar
                         * will change the height of the browser.
                         * We need to make sure that we are dealing with a browser width change
                         */
                        if (newWidth === oldWidth) {
                            return;
                        }
                        //if window width is >= desktop
                        if (newWidth >= 992) {
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

//
///*
// * sets isCollapse value on resize events
// */
//(function() {
//    'use strict';
//    angular.module('upload')
//        .directive('rgWatchResize', rgWatchResize);
//
//    function rgWatchResize($window) {
//        return {
//            restrict: 'A',
//            link: function(scope) {
//                scope.$watch(function(){
//                    return $window.innerWidth;
//                }, function(value, oldVal) {
//                    console.log(value);
//                    console.log(oldVal);
//                });
//                //angular.element($window.innerWidth).on('resize', function() {
//                //    scope.$apply(function() {
//                //        //if window width is >= desktop
//                //        if ($window.innerWidth >= 992) {
//                //            scope.vm.isCollapsed = false;
//                //        } else {
//                //            scope.vm.isCollapsed = true;
//                //        }
//                //    });
//                //});
//            }
//        };
//    }
//}());
