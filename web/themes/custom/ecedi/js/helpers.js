/**
 * @file Global Helpers object
 * @see JS module pattern explained : http://www.adequatelygood.com/JavaScript-Module-Pattern-In-Depth.html
 * @example
 * Helpers.demoHelper(...);
 */

'use strict';

var Helpers = (function (helpers, $) {

  /**
   * @function Helpers.demoHelper
   * Demo helper
   * @param {string} demoArg - Whatever text you want
   */
  helpers.demoHelper = function(demoArg) {

    console.log('Ceci est un helper de démo "' + demoArg + '" !');
  };

  return helpers;

}(Helpers || {}, jQuery));
