(function() {
    'use strict';
    angular.module('upload')
        .config(['$stateProvider', '$urlRouterProvider', '$locationProvider', configRoutes])
        .run(['$state', function($state) {
            // include $state to kickstart the router
        }]);

    function configRoutes($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('main', {
                url: '/:pageNum?key=:sort:category:sizes:min:max:colors',
                resolve: {
                    data: function($location, dataservice, $stateParams) {
                        var query = $location.search();
                        return dataservice.getPageData($stateParams.pageNum, query);
                    }
                },
                views: {
                    'main': {
                        templateUrl: 'app/shell/galleryShell.html',
                        controller: 'GalleryShellController',
                        controllerAs: 'vm'
                    },
                    'gallery@main': {
                        templateUrl: 'app/gallery/gallery.html',
                        controller: 'GalleryController',
                        controllerAs: 'vm'
                    },
                    'sidebar@main': {
                        templateUrl: 'app/sidebar/sidebar.html',
                        controller: 'SidebarController',
                        controllerAs: 'vm'
                    }
                }
            })
            .state('detail', {
                url: '/:itemUid/detail',
                resolve: {
                    item: function($q, dataservice, $stateParams) {
                        var deferred = $q.defer();
                        dataservice.getItem($stateParams.itemUid)
                            .then(function(data) {
                                deferred.resolve(data);
                            });
                        return deferred.promise;
                    }
                },
                views: {
                    'main': {
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
