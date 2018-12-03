/**
 * @file Script for skip links apparition
 * Uses Drupal.behaviors
 * @see customer/README.md
 * @see https://www.drupal.org/docs/8/api/javascript-api/javascript-api-overview
 */
'use strict';

(function ($, Drupal) {

  Drupal.behaviors.skipLink = {

    attach: function (context) {

      $('body', context).once('skip-link').each(function () {

        $('body').on('focusin', '.skip-link a', function(event) {
          $('.skip-link').addClass('is-visible');
        });

        $('body').on('focusout', '.skip-link a', function(event) {
          var $dest = $(event.relatedTarget);
          if ($dest.closest('.skip-link').length == 0) {
            $('.skip-link').removeClass('is-visible');
          }
        });

      });

    }
  };

}(jQuery, Drupal));
