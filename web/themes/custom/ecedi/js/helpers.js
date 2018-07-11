/**
 * @file Global Helpers object
 * @see JS module pattern explained :
 *     http://www.adequatelygood.com/JavaScript-Module-Pattern-In-Depth.html
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
  helpers.demoHelper = function (demoArg) {
    console.log('Ceci est un helper de démo "' + demoArg + '" !');
  };

  /**
   * A11y animated scroll to.
   *
   * @param {object} $target - A jquery element to scroll to.
   * @param {string} hash - The location hash used to works similarly to the
   *     native anchor navigation (optional).
   * @param {int} offset - Positive or negative offset (optional).
   */
  helpers.scrollTo = function ($target, hash, offset) {
    var _offset = offset || 0;
    return $('html, body').animate({
      scrollTop: $target.offset().top - _offset
    }, 500, function () {
      // after the animation, focus on the target
      $target.focus();

      // if the target doesn't get the focus by itself (= it isn't an
      // interactive element), force it with a tabindex -1
      if (!$target.is(':focus')) {
        $target.attr('tabindex', '-1');
        $target.focus();
      }

      // change the URL with the new hash so it works similarly to the native
      // anchor navigation
      if (hash) {
        location.hash = hash;
      }
    }).promise();
  }

  return helpers;
}(Helpers || {}, jQuery));
