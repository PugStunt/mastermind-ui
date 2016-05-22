(function () {
  'use strict';

  angular
    .module('mastermindUi')
    .service('GameApi', GameApi);

  function GameApi($http, api) {
    var service = {
      start: start,
      send: send
    };

    return service;

    function start(name) {
      return $http({
        method: 'post',
        headers: {
          'Content-Type': 'application/json'
        },
        url: api.concat('/new_game'),
        data: {
          user: name
        }
      })
      .then(function (response) {
        return response.data;
      });
    }

    function send(key, guess) {
      return $http({
        method: 'post',
        headers: {
          'Content-Type': 'application/json'
        },
        url: api.concat('/guess'),
        data: {
          code: guess,
          'game_key': key
        }
      })
      .then(function (response) {
        return response.data;
      });
    }
  }

})();
