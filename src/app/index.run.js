(function () {
  'use strict';

  angular
    .module('mastermindUi')
    .run(runBlock);

  /** @ngInject */
  function runBlock(gapi, GooglePlay, $rootScope, $window) {

    $rootScope.$on('gapi:loaded', function () {
      gapi.client.load('games', 'v1', function () {
        gapi.client.games.achievementDefinitions.list({
          // nothing
        })
          .execute(function (result) {
            console.log(result)
          })

      });
    });

    if($window._startGoogleSignin) {
      var original = $window._startGoogleSignin;

      $window._startGoogleSignin = function () {
        $rootScope.$broadcast('gapi:loaded', gapi);
        original();
      }
    }


  }

})();
