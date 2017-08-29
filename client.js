var app = angular.module('myApp', []);

app.controller('myController', ['$http', function($http) {
    console.log('controller loaded');

    var self = this;

    var giphyKey = '7643338e572040db852a07882994e1f4'

    self.getSpecies = function(id) {

        $http.get('https://swapi.co/api/species/' + id).then(function(response) {
            console.log('response data: ', response.data);
            self.speciesResult = response.data;

            $http.get(self.speciesResult.films[0]).then(function(response) {
                console.log('film data: ', response.data);
                self.filmResult = response.data;
            });
        });
    }

    self.getTrendingGiphy = function() {

        var baseUrl = 'http://api.giphy.com/v1/gifs/random?';
        baseUrl += 'api_key=' + giphyKey;
        baseUrl += '&limit=5';

        console.log('baseUrl', baseUrl);

        $http.get(baseUrl).then(function(response) {
            self.giphyResult = response.data;
            console.log('trending giphys: ', response.data);

        })
    }

    self.getTrendingGiphy();

    self.searchGiphy = function(searchInput) {
        var baseUrl = 'http://api.giphy.com/v1/gifs/search?';
        baseUrl += 'q=' + searchInput;
        baseUrl += '&api_key=' + giphyKey;
        baseUrl += '&limit=10';

        console.log('baseUrl', baseUrl);
        $http.get(baseUrl).then(function(response) {
            console.log('response gifs', response.data);
            self.searchResult = response.data;

        })
    }
}]);