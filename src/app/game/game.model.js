(function() {
  'use strict';

  angular
    .module('mastermindUi')
    .service('GameModel', GameModel);

  function GameModel(GameApi, $q, colors) {
    var EMPTY_GUESS = {css: 'white'},
      _model = {
        pastResults: [],
        win: false,
        start: start,
        resetGuess: resetGuess,
        guessNext: guessNext,
        sendGuess: sendGuess
      };

    return _model;

    function start(name) {
      if(!angular.isString(name) || name.lenght === 0) {
        return $q.reject();
      }

      return GameApi.start(name)
        .then(function (data) {
          _model.key = data.game_key;

          _model.guess = emptyGuesses(data.colors.length);
          _model.guessComplete = false;
          _model.colors = transformColors(data.colors);

          return data;
      });
    }

    function sendGuess() {
      var key = _model.key,
        guess = _model.guess
          .map(getCode)
          .join('');

      return GameApi.send(key, guess)
        .then(function (data) {
          _model.pastResults = data.past_results.reverse();
          _model.win = getWinData(data);
          _model.guess = emptyGuesses(data.colors.length);
          _model.guessComplete = false;
          _model.pastResults.forEach(function (pastResult) {
            var guessAsArray = pastResult.guess.split('');
            pastResult.guess = transformColors(guessAsArray);
          });

          return _model;
        });
    }

    function getWinData(data) {
      if(data.solved === "true" || data.solved === true){ // workaround
        return {
          time: data.time_taken.toFixed(0),
          num: data.num_guesses,
          message: data.further_instructions
        };
      }

      return false;
    }

    function getCode(color) {
      return color.code;
    }

    function guessNext(color) {
      var index = _model.guess.indexOf(EMPTY_GUESS);
      if(index === -1) {
        return;
      }

      _model.guess[index] = color;
      _model.guessComplete = _model.guess.indexOf(EMPTY_GUESS) === -1;

    }

    function resetGuess(index) {
      _model.guessComplete = false;
      _model.guess[index] = EMPTY_GUESS;
    }

    function emptyGuesses(size) {
      var guess = [];

      for(var i=0; i<size; i++){
        guess.push(EMPTY_GUESS);
      }

      return guess;
    }

    function transformColors(origin) {
      return origin.map(function (color) {
        return {
          code: color,
          css: colors[color]
        }
      });
    }
  }

})();
