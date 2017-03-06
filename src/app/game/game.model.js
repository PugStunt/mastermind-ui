(function () {
  'use strict';

  angular
    .module('mastermindUi')
    .service('GameModel', GameModel);

  function GameModel(GameApi, $q, colors, GoogleSignin, GooglePlay, $log, gapi, toastr) {
    var EMPTY_GUESS = {css: 'white'},
      _model = {
        pastResults: [],
        win: false,
        start: start,
        startWithGoogle: startWithGoogle,
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
        .then(onGameStart);
    }

    function startWithGoogle() {
      return GoogleSignin.signIn().then(function (user) {
        _model.user = user;
        return start(user.getBasicProfile().getName());

      });
    }

    function onGameStart(data) {
      _model.key = data.game_key;

      _model.guess = emptyGuesses(data.colors.length);
      _model.guessComplete = false;
      _model.pastResults = [];
      _model.colors = transformColors(data.colors);


      _model.win = {
        time: 3.5 * 60,
        num: 15
      };

      checkAchievements().forEach(function (item) {
        item.then(function (medal) {
         // if(medal.newlyUnlocked) {

            toastr.success(name, 'New achievement')
            console.log('New achievements', medal.name);
        //  }
        });
      });

      return data;
    }

    function sendGuess() {
      var key = _model.key,
        guess = _model.guess
          .map(getCode)
          .join('');

      return GameApi.send(key, guess)
        .then(onGuessSent);
    }

    function onGuessSent(data) {
      _model.pastResults = data.past_results.reverse();
      _model.win = getWinData(data);
      _model.guess = emptyGuesses(data.colors.length);
      _model.guessComplete = false;
      _model.pastResults.forEach(function (pastResult) {
        var guessAsArray = pastResult.guess.split('');

        pastResult.guess = transformColors(guessAsArray);
      });

      if(_model.win && _model.user) {
        return $q.all([
          updateAttempts(),
          updateBestTime(),
          checkAchievements(),
        ])
          .then(function () {
            return _model;
          });
      }

      return _model;
    }

    function checkAchievements() {
      var win = _model.win;
      win.achievements = [{name: 'winAGame'}];

      if(win.num <= 50) { win.achievements.push({code: 'win50Moves'}); }
      if(win.num <= 25) { win.achievements.push({code: 'win25Moves'}); }
      if(win.num <= 15) { win.achievements.push({code: 'win15Moves'}); }

      if(win.time <= 10 * 60) { win.achievements.push({code: 'winIn10Min'}); }
      if(win.time <=  5 * 60) { win.achievements.push({code: 'winIn5Min'}); }
      if(win.time <=  3 * 60) { win.achievements.push({code: 'winIn3Min'}); }

      return win.achievements.map(function (achievement) {
        var deferred = $q.defer();

        gapi.client.games.achievements.unlock(
          {
            achievementId: GooglePlay[achievement.code].code
          }
        ).execute(function (response) {
          achievement.newlyUnlocked = response.newlyUnlocked
          deferred.resolve(achievement);
        });

        return deferred.promise;
      });
    }

    function updateAttempts() {
      var deferred = $q.defer();

      gapi.client.games.scores.submit(
        {
          leaderboardId: GooglePlay.attempts,
          score: _model.win.num
        }
      ).execute(function (response) {
        deferred.resolve(response);
      });

      return deferred.promise;
    }

    function updateBestTime() {
      var deferred = $q.defer(),
        miliseconds = 1000;

      gapi.client.games.scores.submit(
        {
          leaderboardId: GooglePlay.bestTime,
          score: _model.win.time * miliseconds
        }
      ).execute(function (response) {
        deferred.resolve(response);
      });

      return deferred.promise;
    }

    function getWinData(data) {
      if(data.solved === 'true' || data.solved === true){ // workaround
        return {
          time: data.time_taken,
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
      var guess = [], index;

      for(index=0; index<size; index++){
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
