(function() {
    'use strict';

    angular.module('upload')
        .config(['$stateProvider', '$urlRouterProvider', '$locationProvider', configRoutes])
        .run(['$state', function($state) {
            // include $state to kickstart the router
        }]);

    function configRoutes($stateProvider, $urlRouterProvider, $locationProvider) {
        $stateProvider
            .state('main', {
                url: '/:pageNum?key=:sort:category:sizes:min:max:colors',
                resolve: {
                    data: function($location, $q, DataService, $stateParams) {
                        var query = $location.search();
                        var deferred = $q.defer();
                        DataService.getData($stateParams.pageNum, query)
                            .then(function(data) {
                                deferred.resolve(data);
                            });
                        return deferred.promise;
                    }
                },
                views: {
                    "main": {
                        templateUrl: 'app/shell/galleryShell.html',
                        controller: 'GalleryShellController',
                        controllerAs: 'vm'
                    },
                    "gallery@main": {
                        templateUrl: 'app/gallery/gallery.html',
                        controller: 'GalleryController',
                        controllerAs: 'vm'
                    },
                    "sidebar@main": {
                        templateUrl: 'app/sidebar/sidebar.html',
                        controller: 'SidebarController',
                        controllerAs: 'vm'
                    }
                }
            })
            .state('detail', {
                url: '/:itemUid/detail',
                resolve: {
                    item: function($q, DataService, $stateParams) {
                        var deferred = $q.defer();
                        DataService.getItem($stateParams.itemUid)
                            .then(function(data) {
                                deferred.resolve(data);
                            });
                        return deferred.promise;
                    }
                },
                views: {
                    "main": {
                        templateUrl: 'app/detail/detail.html',
                        controller: 'DetailController',
                        controllerAs: 'vm'
                    }
                }
            })
            .state('thankyou', {
                url: '/thankyou',
                views: {
                    'main': {
                        templateUrl: 'app/thankyou/thankyou.html'
                    }
                }
            });

        $urlRouterProvider.otherwise('/1');
    }

}());

// (function() {
//     'use strict';

//     angular.module('upload')
//         .config(['$stateProvider', '$urlRouterProvider', '$locationProvider', configRoutes])
//         .run(['$state', function($state) {
//             // include $state to kickstart the router
//         }]);

//     function configRoutes($stateProvider, $urlRouterProvider, $locationProvider) {
//         $stateProvider
//             .state('gallery', {
//                 url: '/gallery',
//                 abstract: true,
//                 templateUrl: 'app/layout/mainShell.html',
//                 controller: 'MainShellController',
//                 controllerAs: 'vm'
//             })
//             .state('gallery.main', {
//                 url: '/:pageNum?key=:sort:type:size:min:max',
//                 resolve: {
//                     data: function($location, $q, DataService, $stateParams) {
//                         var query = $location.search();
//                         var deferred = $q.defer();
//                         DataService.getData($stateParams.pageNum, query)
//                             .then(function(data) {
//                                 deferred.resolve(data);
//                             });
//                         return deferred.promise;
//                     }
//                 },
//                 views: {
//                     "gallery-view": {
//                         templateUrl: 'app/gallery/gallery.html',
//                         controller: 'GalleryController',
//                         controllerAs: 'vm'
//                     },
//                     "sidebar-view": {
//                         templateUrl: 'app/sidebar/sidebar.html',
//                         controller: 'SidebarController',
//                         controllerAs: 'vm'
//                     }
//                 }
//             })
//             .state('gallery.detail', {
//                 url: '/:itemUid/detail',
//                 resolve: {
//                     item: function($q, DataService, $stateParams) {
//                         var deferred = $q.defer();
//                         DataService.getItem($stateParams.itemUid)
//                             .then(function(data) {
//                                 deferred.resolve(data);
//                             });
//                         return deferred.promise;
//                     }
//                 },
//                 views: {
//                     'detail-view': {
//                         templateUrl: 'app/detail/detail.html',
//                         controller: 'DetailController',
//                         controllerAs: 'vm'
//                     }
//                 }
//             })
//             .state('gallery.thankyou', {
//                 url: '/thankyou',
//                 views: {
//                     'thankyou-view': {
//                         templateUrl: 'app/shoppingCart/thankyou.html'
//                     }
//                 }
//             });

//         $urlRouterProvider.otherwise('/gallery/1');
//     }

// }());
