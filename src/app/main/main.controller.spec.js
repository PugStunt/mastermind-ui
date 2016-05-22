/* eslint  no-undef: 0*/
/* eslint  no-unused-expressions: 0*/
/* eslint  dot-notation: 0*/
/* eslint  vars-on-top: 0*/
describe('MainController', function (){

  beforeEach(module('mastermindUi'));

  it('smoke', function () {
    bard.inject(this, '$controller');

    var ctrl = $controller('MainController');

    ctrl.phase.should.be.equals('welcome');
  });

  it('should start a game', function () {
    bard.inject(this, '$q', '$rootScope', '$controller', 'GameModel');

    var ctrl = $controller('MainController');

    sinon.stub(GameModel, 'start', function () {
      return $q.when();
    });

    ctrl.start('FOO');
    $rootScope.$apply();

    ctrl.phase.should.be.equals('playing');
  });

  it('should send a guess', function () {
    bard.inject(this, '$q', '$rootScope', '$controller', 'GameModel', 'SweetAlert');

    var ctrl = $controller('MainController'),
      stub = sinon.stub(SweetAlert, 'swal');

    sinon.stub(GameModel, 'sendGuess', function () {
      return $q.when({win: false});
    });

    ctrl.sendGuess();
    $rootScope.$apply();

    stub.called.should.be.false;
  });

  it('should send a guess - win case', function () {
    bard.inject(this, '$q', '$rootScope', '$controller', 'GameModel', 'SweetAlert');

    var ctrl = $controller('MainController'),
      stub = sinon.stub(SweetAlert, 'swal');

    sinon.stub(GameModel, 'sendGuess', function () {
      return $q.when({
        win: {
          time: 123,
          num: 12
        }
      });
    });

    ctrl.sendGuess();
    $rootScope.$apply();

    stub.called.should.be.true;
    stub.lastCall.args[1]
      .should.be.equals('You won with 12 guesses in 02:03 minutes!');
  });

});
