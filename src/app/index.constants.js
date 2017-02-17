/* global malarkey:false, moment:false */
/*eslint id-length: 0*/
(function () {
  'use strict';

  var env = {};
  if (window) {
    Object.assign(env, window.__env);
  }

  angular
    .module('mastermindUi')
    .constant('malarkey', malarkey)
    .constant('moment', moment)
    .constant('api', __env.apiUrl)
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
