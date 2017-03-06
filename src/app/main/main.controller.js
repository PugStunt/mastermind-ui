(function () {
  'use strict';

  angular
    .module('mastermindUi')
    .controller('MainController', MainController);

  /** @ngInject */
  function MainController(GameModel, SweetAlert, moment) {
    var vm = this;

    vm.phase = 'welcome';
    vm.start = start;
    vm.startWithGoogle = startWithGoogle;
    vm.model = GameModel;
    vm.resetGuess = vm.model.resetGuess;
    vm.guessNext = vm.model.guessNext;
    vm.sendGuess = sendGuess;

    function start(name) {
      GameModel.start(name).then(onGameStart);
    }

    function startWithGoogle() {
      GameModel.startWithGoogle().then(onGameStart);
    }

    function onGameStart() {
      vm.phase = 'playing';
    }

    function sendGuess() {
      vm.model.sendGuess().then(onSendGuessResponse);
    }

    function onSendGuessResponse(model) {
      var time, message;

      if(model.win){
        time = moment.duration(model.win.time, 'seconds').format('mm:ss');
        message = ['You won with', model.win.num, 'guesses in', time, 'minutes!'].join(' ');

        SweetAlert.swal('Congrats!', message, 'success');
      }
    }

  }
})();
