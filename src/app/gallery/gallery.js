(function() {
    'use strict';
    angular
        .module('upload')
        .controller('GalleryController', GalleryController);

    function GalleryController(data, dataservice, $location, $anchorScroll, $stateParams) {
        /*jshint validthis: true */
        var vm = this;
        vm.items = data;
        vm.pageChanged = pageChanged;
        vm.currentPage = $stateParams.pageNum;

        setPaginationOptions();

        function setPaginationOptions() {
            var metaData = dataservice.getMetaData();
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