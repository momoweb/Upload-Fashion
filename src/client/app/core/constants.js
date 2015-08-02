(function() {
    'use strict';

    var searchFilters = [{
        'category': 'category',
        'options': [
            'backless_dress',
            'jeans',
            'sweater',
            'jumper',
            'swim_suit',
            'sailor_dress',
            'tea_gown',
            'scarf',
            'legging',
            'jacket',
            't-shirt'
            ]
    }, {
        'category': 'sizes',
        'options': [
            'UK1',
            'UK2',
            'UK3',
            'UK4',
            'UK5',
            'UK6',
            'UK7',
            'UK8'
            ]
    }, {
        'category': 'colors',
        'options': [
            'blue',
            'red',
            'black',
            'pink',
            'yellow',
            'magenta',
            'green',
            'purple'
            ]
    }];

    var sortOrders = [{
        'text': 'New Arrivals',
        'value': '-stockDate'
    }, {
        'text': 'Price: Low to High',
        'value': '+price'
    }, {
        'text': 'Price: High to Low',
        'value': '-price'
    }];

    var cartEvents = {
        contentChanged: 'cart:contentChanged',
        checkout: 'cart:checkout'
    };

    var dataEvents = {
        dataChanged: 'data:dataChanged'
    };

    angular
        .module('upload')
        .constant('searchFilters', searchFilters)
        .constant('sortOrders', sortOrders)
        .constant('cartEvents', cartEvents)
        .constant('dataEvents', dataEvents);

})();
