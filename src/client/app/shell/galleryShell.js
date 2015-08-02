(function() {
    'use strict';
    angular
        .module('upload')
        .controller('GalleryShellController', GalleryShellController);

    function GalleryShellController(dataservice, $scope, dataEvents) {
        /*jshint validthis: true */
        var vm = this;
        vm.isCollapsed = false;

        setNavOptions();

        $scope.$on(dataEvents.dataChanged, function() {
            setNavOptions();
        });

        function setNavOptions() {
            var metaData = dataservice.getMetaData();
            vm.pageTotal = metaData.pageTotal;
            vm.itemTotal = metaData.itemTotal;
        }

    }
})();
