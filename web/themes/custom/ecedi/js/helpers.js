/**
 * @file Global Helpers object
 * @see JS module pattern explained : http://www.adequatelygood.com/JavaScript-Module-Pattern-In-Depth.html
 * @example
 * Helpers.equalHeight(...);
 */

'use strict';

var Helpers = (function (helpers, $) {

  /**
   * @function Helpers.equalHeight
   * Equalizes the height for all elements in a jQuery Object
   * @example
   * Helpers.equalHeight($('selector, other-selector', context));
   * @todo optimize function + add parameter for resize breakpoint
   */
  helpers.equalHeight = function($group) {

    if ($group.length > 0) {
      var tallest    = 0;
      var thisHeight = 0;

      $group.each(function() {
        thisHeight = $(this).outerHeight();

        if (thisHeight > tallest) {
          tallest = thisHeight;
        }
      });

      if (tallest > 0) {
        $group.height(tallest);
      }

      $(window).resize(function() {
        if ($(window).width() > 767) {
          $group.each(function() {
            $(this).height('auto');
            tallest = 0;
            thisHeight = $(this).outerHeight();

            if (thisHeight > tallest) {
              tallest = thisHeight;
            }
          });

          if (tallest > 0) {
            $group.height(tallest);
          }
        }
      });
    }
  };

  return helpers;

}(Helpers || {}, jQuery));
