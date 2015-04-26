(function() {
    'use strict';
    angular.module('rainforest')
        .directive('rgShoppingCart', rgShoppingCart);

    // rgShoppingCart.$inject = [];
    rgShoppingCart.$inject = ['ShoppingCart', '$modal', 'cartEvents'];
    // rgShoppingCart.$inject = ['ShoppingCart', '$scope', '$modal'];

    function rgShoppingCart(ShoppingCart, $modal, cartEvents) {
        return {
            restrict: 'E',
            templateUrl: 'app/shoppingCart/shoppingCart.html',
            controllerAs: 'vm',
            scope: {},
            controller: function($scope) {
                /*jshint validthis: true */
                var vm = this;
                vm.cartItemsTotal = ShoppingCart.getItemsTotal();
                vm.openShoppingCart = openShoppingCart;

                $scope.$on(cartEvents.contentChanged, function() {
                    vm.cartItemsTotal = ShoppingCart.getItemsTotal();
                });

                function openShoppingCart() {
                    var modalInstance = $modal.open({
                        templateUrl: 'app/shoppingCart/shoppingCartModal.html',
                        controller: 'ShoppingCartController',
                        controllerAs: 'vm'
                    });
                }
            }
        };
    }

}());
