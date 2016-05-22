(function () {
  'use strict';

  angular
    .module('mastermindUi')
    .run(runBlock);

  /** @ngInject */
  function runBlock($log) {

    $log.debug('runBlock end');
  }

})();
