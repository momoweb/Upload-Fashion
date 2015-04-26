(function() {
    'use strict';
    angular
        .module('upload')
        .factory('ShoppingCart', ShoppingCart);

    /* @ngInject */
    function ShoppingCart($cookies, $rootScope, cartEvents) {
        var cartContents = [];
        var cartId = 'shoppingCart';
        var isReady = false;

        initCart();

        var service = {
            addItem: addItem,
            getItemsTotal: getItemsTotal,
            getCartContents: getCartContents,
            checkout: checkout
        };

        return service;

        // will only run once
        function initCart() {
            if (isReady) {
                return;
            }
            var cookie = $cookies.getObject(cartId);
            if (cookie) {
                cartContents = cookie;
                isReady = true;
                // $rootScope.$broadcast(cartEvents.contentChanged);
            }
        }

        function getItemsTotal() {
            var total = 0;
            angular.forEach(cartContents, function(item) {
                total += item.qty;
            });
            return total;
        }

        function addItem(item) {
            var index = containsItem(item.uid);
            if (index !== -1) {
                cartContents[index].qty++;
            } else {
                // item.qty = 1;
                // cartContents.push(item);
                var newItem = {};
                newItem.name = item.name;
                newItem.uid = item.uid;
                newItem.price = item.price;
                newItem.qty = 1;
                cartContents.push(newItem);
            }
            storeCookies();
            $rootScope.$broadcast(cartEvents.contentChanged);
        }

        function storeCookies() {
            var options = {
                expire: '10y'
            };
            $cookies.putObject(cartId, cartContents, options);
        }

        function getCartContents() {
            return cartContents;
        }

        function checkout() {
            cartContents = [];
            $rootScope.$broadcast(cartEvents.contentChanged);
            $cookies.remove(cartId);
            $rootScope.$broadcast(cartEvents.checkout);
        }

        function containsItem(uid) {
            var i;
            for (i = 0; i < cartContents.length; i++) {
                if (cartContents[i].uid === uid) {
                    return i;
                }
            }
            return -1;
        }
    }

}());
