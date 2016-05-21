/* global malarkey:false, moment:false */
(function() {
  'use strict';

  angular
    .module('mastermindUi')
    .constant('malarkey', malarkey)
    .constant('moment', moment)
    // .constant('api', 'https://192.168.100.10:8080/mastermind/v1')
    .constant('api', 'https://az-mastermind.herokuapp.com')
    .constant('colors', {
      R: 'red',
      B: 'blue',
      G: 'green',
      Y: 'yellow',
      O: 'orange',
      P: 'purple',
      C: 'cyan',
      M: 'pink'
    });

})();
