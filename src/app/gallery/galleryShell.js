(function() {
    'use strict';

    angular
        .module('upload')
        .controller('GalleryShellController', GalleryShellController);

    GalleryShellController.$inject = ['$anchorScroll', '$location', 'DataService', '$scope', 'dataEvents'];

    function GalleryShellController($anchorScroll, $location, DataService, $scope, dataEvents) {
        /*jshint validthis: true */
        var vm = this;
        vm.isCollapsed = false;

        setNavOptions();

        $scope.$on(dataEvents.dataChanged, function() {
            setNavOptions();
        });

        function setNavOptions() {
            var metaData = DataService.getMetaData();
            vm.pageTotal = metaData.pageTotal;
            vm.itemTotal = metaData.itemTotal;
        }

    }
})();

// (function() {
//     'use strict';

//     angular
//         .module('upload')
//         .controller('GalleryShellController', GalleryShellController);

//     GalleryShellController.$inject = ['$anchorScroll', '$location', 'sortOrders', 'DataService', '$scope', 'dataEvents'];

//     function GalleryShellController($anchorScroll, $location, sortOrders, DataService, $scope, dataEvents) {
//         /*jshint validthis: true */
//         var vm = this;
//         vm.sortOrders = sortOrders;
//         vm.reSort = reSort;

//         setNavOptions();

//         $scope.$on(dataEvents.dataChanged, function() {
//             setNavOptions();
//         });

//         function setNavOptions() {
//             var metaData = DataService.getMetaData();
//             vm.pageTotal = metaData.pageTotal;
//             vm.itemTotal = metaData.itemTotal;
//             vm.currentSortValue = sortOrders[metaData.currentSortOrder].value;
//         }

//         function reSort() {
//             // find index of newSortValue in SORT_ORDER
//             var pos = sortOrders.map(function(e) {
//                 return e.value;
//             }).indexOf(vm.newSortValue);
//             $location.search('sort', pos);
//             $location.path("/1");
//         }
//     }
// })();
