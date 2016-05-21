(function() {
  'use strict';

  angular
    .module('mastermindUi')
    .controller('MainController', MainController);

  /** @ngInject */
  function MainController(GameModel, SweetAlert, moment) {
    var vm = this;
    vm.phase = 'welcome';
    vm.start = start;
    vm.model = GameModel;
    vm.resetGuess = vm.model.resetGuess;
    vm.guessNext = vm.model.guessNext;
    vm.sendGuess = sendGuess;

    function start(name) {
      GameModel.start(name).then(function () {
        vm.phase = 'playing';
      });
    }

    function sendGuess() {
      vm.model.sendGuess().then(onSendGuessResponse);
    }

    function onSendGuessResponse(model) {
      if(model.win){
        var time = moment.duration(model.win.time, 'seconds').format('mm:ss'),
          message = ['You win with', model.win.num, 'guesses in', time, 'minutes'].join(' ');

        SweetAlert.swal('Congrats!', message, 'success');
      }
    }

  }
})();
