(function() {
    'use strict';

    angular
        .module('upload')
        .controller('DetailController', DetailController);

    DetailController.$inject = ['item', 'ShoppingCart'];

    function DetailController(item, ShoppingCart) {
        /*jshint validthis: true */
        var vm = this;

        vm.item = item;
        // vm.itemUid = $stateParams.itemUid;
        vm.addItem = addItem;

        function addItem() {
            ShoppingCart.addItem(vm.item);
        }

        }
})();