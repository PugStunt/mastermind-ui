(function () {
  'use strict';

  angular
    .module('mastermindUi')
    .config(config);

  /** @ngInject */
  function config($logProvider, GoogleSigninProvider, toastrConfig) {
    // Enable log
    $logProvider.debugEnabled(true);

    GoogleSigninProvider.init({
      'client_id': '405487352010-1qorbj4kqr03ir3ch46it91oj409benr.apps.googleusercontent.com',
      scopes: 'https://www.googleapis.com/auth/games',
      'cookie_policiy': 'single_host_origin'
    });


    angular.extend(toastrConfig, {
      iconClasses: {
        success: 'falci'
      }
    });
  }

})();
