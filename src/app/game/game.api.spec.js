/* eslint  no-undef: 0*/
describe('GameApi', function () {

  beforeEach(function () {
    module('mastermindUi');
    module('ngMock');

    module(function ($provide) {
      $provide.constant('api', '/api');
    });

  });

  afterEach(function () {
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  });

  it('should start a new game', function () {
    bard.inject(this, '$httpBackend', 'GameApi');

    $httpBackend.expectPOST('/api/new_game').respond({});

    GameApi.start('FOO');

    $httpBackend.flush();
  });

  it('should send a guess', function () {
    bard.inject(this, '$httpBackend', 'GameApi');
    $httpBackend.expectPOST('/api/guess').respond({});

    GameApi.send('KEY', 'GUESS');

    $httpBackend.flush();
  });

});
