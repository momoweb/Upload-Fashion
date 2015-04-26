(function() {
    'use strict';

    angular
        .module('rainforest')
        .controller('GalleryController', GalleryController);

    GalleryController.$inject = ['data', 'DataService', '$location', '$anchorScroll', '$stateParams'];

    function GalleryController(data, DataService, $location, $anchorScroll, $stateParams) {
        /*jshint validthis: true */
        var vm = this;
        vm.items = data.items;
        vm.pageChanged = pageChanged;
        vm.currentPage = $stateParams.pageNum;

        setPaginationOptions();

        function setPaginationOptions() {
            var metaData = DataService.getMetaData();
            vm.itemTotal = metaData.itemTotal;
            vm.itemsPerPage = metaData.itemsPerPage;
            vm.maxSize = 5;
        }

        function pageChanged() {
            var oldPath = $location.path();
            var newPath = oldPath.replace(/[0-9]/g, '') + vm.currentPage;

            $location.path(newPath);
            $anchorScroll();
        }
    }
})();
// (function() {
//     'use strict';

//     angular
//         .module('rainforest')
//         .controller('GalleryController', GalleryController);

//     GalleryController.$inject = ['$anchorScroll', '$window', '$location', '$stateParams', '$state', 'sortOrders', 'data'];

//     function GalleryController($anchorScroll, $window, $location, $stateParams, $state, sortOrders, data) {
//         /*jshint validthis: true */
//         var vm = this;
//         vm.totalPages = data.totalPages;
//         vm.totalItems = data.totalItems;
//         vm.sortOrders = sortOrders;
//         vm.currentSortValue = sortOrders[data.currentSortOrder].value;
//         vm.items = data.items;
//         vm.reSort = reSort;
//         vm.currentPage = $stateParams.pageNum;
//         vm.maxSize = 5;
//         vm.itemsPerPage = data.itemsPerPage;
//         vm.pageChanged = pageChanged;

//         function pageChanged() {
//             var oldPath = $location.path();
//             var newPath = oldPath.replace(/[0-9]/g, '') + vm.currentPage;

//             $location.path(newPath);
//             $anchorScroll();
//         }

//          function reSort() {
//             // find index of newSortValue in SORT_ORDER
//             var pos = sortOrders.map(function(e) { return e.value; }).indexOf(vm.newSortValue);
//             $location.search('sort', pos);
//             $location.path("/1");
//         }         

//     }
// })();
