(function() {
    'use strict';
    angular
        .module('upload')
        .controller('DetailController', DetailController);

    function DetailController(item, ShoppingCart) {
        /*jshint validthis: true */
        var vm = this;
        vm.item = item;
        vm.addItem = addItem;

        function addItem() {
            ShoppingCart.addItem(vm.item);
        }

    }
})();
