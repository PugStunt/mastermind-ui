/* eslint  no-undef: 0*/
/* eslint  no-unused-expressions: 0*/
/* eslint  dot-notation: 0*/
/* eslint  vars-on-top: 0*/
/* eslint  no-magic-numbers: 0*/
describe('GameModel', function () {

  beforeEach(function () {
    module('mastermindUi');
  });

  it('should start a new game only if there is a name', function () {
    bard.inject(this, '$rootScope', '$q', 'GameApi', 'GameModel');

    var stub = sinon.stub(GameApi, 'start', function () {
      return $q.when({
        'game_key': 'KEY',
        colors: ['R', 'G', 'B']
      });
    });

    GameModel.start(); // no name
    $rootScope.$apply();
    stub.called.should.be.false;

    GameModel.start('FOO');
    $rootScope.$apply();
    stub.called.should.be.true;

    GameModel.key.should.be.equals('KEY');
    GameModel.guess.should.be.deep.equals([{css: 'white'}, {css: 'white'}, {css: 'white'}]);
    GameModel.guessComplete.should.be.false;
    GameModel.pastResults.should.be.deep.equals([]);

    GameModel.colors.should.be.deep.equals([
      {code: 'R', css: 'red'},
      {code: 'G', css: 'green'},
      {code: 'B', css: 'blue'}
    ]);
  });

  it('should send a guess', function () {
    bard.inject(this, '$rootScope', '$q', 'GameApi', 'GameModel');

    var stub = sinon.stub(GameApi, 'send', function () {
        return $q.when({
          'past_results': [{guess: 'R'}, {guess: 'G'}],
          colors: ['R', 'G', 'B']
        });
      }),
      guess = [
        {code: 'R', css: 'red'},
        {code: 'G', css: 'green'},
        {code: 'B', css: 'blue'}
      ];

    GameModel.key = 'KEY',
    GameModel.guess = guess;
    GameModel.sendGuess();
    $rootScope.$apply();

    stub.called.should.be.true;
    stub.lastCall.args.should.be.deep.equals(['KEY', 'RGB']);

    GameModel.pastResults.should.be.deep.equals([
      {guess: [{code: 'G', css: 'green'}]},
      {guess: [{code: 'R', css: 'red'}]}
    ]);
    GameModel.win.should.be.false;
    GameModel.guess.should.be.deep.equals([{css: 'white'}, {css: 'white'}, {css: 'white'}]);
    GameModel.guessComplete.should.be.false;
  });

  it('should send a guess - win case', function () {
    bard.inject(this, '$rootScope', '$q', 'GameApi', 'GameModel');

    var stub = sinon.stub(GameApi, 'send', function () {
      return $q.when({
        'past_results': [],
        solved: 'true',
        'time_taken': 123,
        'num_guesses': 12,
        'further_instructions': 'FOO',
        colors: ['R', 'G', 'B']
      });
    });

    GameModel.key = 'KEY',
    GameModel.guess = [];
    GameModel.sendGuess();
    $rootScope.$apply();

    stub.called.should.be.true;
    GameModel.win.should.be.deep.equals({
      time: 123,
      num: 12,
      message: 'FOO'
    });
  });

  it('should reset a tile', function () {
    bard.inject(this, 'GameModel');

    GameModel.guess = ['FOO'];
    GameModel.guessComplete = true;

    GameModel.resetGuess(0);
    GameModel.guess[0].css.should.be.equals('white');
    GameModel.guessComplete.should.be.false;
  });

  it('should fill the next tile', function () {
    bard.inject(this, 'GameModel');

    var foo = {code: 'F', css: 'FOO'},
      bar = {code: 'B', css: 'BAR'};

    GameModel.guess = [null, null];
    GameModel.resetGuess(0);
    GameModel.resetGuess(1);

    GameModel.guessNext(foo);
    GameModel.guess[0].should.be.deep.equals(foo);
    GameModel.guessComplete.should.be.false;

    GameModel.guessNext(bar);
    GameModel.guess[0].should.be.deep.equals(foo);
    GameModel.guess[1].should.be.deep.equals(bar);
    GameModel.guessComplete.should.be.true;

    GameModel.guessNext(foo);
    GameModel.guess[0].should.be.deep.equals(foo);
    GameModel.guess[1].should.be.deep.equals(bar);
    GameModel.guessComplete.should.be.true;
  });
});
