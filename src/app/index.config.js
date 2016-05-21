(function() {
  'use strict';

  angular
    .module('mastermindUi')
    .config(config);

  /** @ngInject */
  function config($logProvider) {
    // Enable log
    $logProvider.debugEnabled(true);
  }

})();
