/* global malarkey:false, moment:false, gapi:false */
/*eslint id-length: 0*/
(function () {
  'use strict';

  angular
    .module('mastermindUi')
    .constant('malarkey', malarkey)
    .constant('moment', moment)
    .constant('gapi', gapi)
    .constant('api', '/api')
    .constant('colors', {
      R: 'red',
      B: 'blue',
      G: 'green',
      Y: 'yellow',
      O: 'orange',
      P: 'purple',
      C: 'cyan',
      M: 'pink'
    })
    .constant('GooglePlay', {
      attempts: 'CgkIyvG3x-YLEAIQAQ',
      bestTime: 'CgkIyvG3x-YLEAIQAg',

      winAGame:   {code: 'CgkIyvG3x-YLEAIQAw'},
      win50Moves: {code: 'CgkIyvG3x-YLEAIQBA'},
      win25Moves: {code: 'CgkIyvG3x-YLEAIQBQ'},
      win15Moves: {code: 'CgkIyvG3x-YLEAIQBg'},
      winIn10Min: {code: 'CgkIyvG3x-YLEAIQCQ'},
      winIn5Min:  {code: 'CgkIyvG3x-YLEAIQCg'},
      winIn3Min:  {code: 'CgkIyvG3x-YLEAIQCw'}
    });

})();
