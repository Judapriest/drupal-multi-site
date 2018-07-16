/**
 * @file Demo script for customer theme
 * Uses Drupal.behaviors
 * @see customer/README.md
 * @see https://www.drupal.org/docs/8/api/javascript-api/javascript-api-overview
 */

'use strict';

(function ($, Drupal) {
  Drupal.behaviors.demo = {
    attach: function (context) {
      console.log('Ceci est un script de démo !');

      // Your code here.
      // The attach method is called for every ajax calls.

      // Use the jQuery once plugin to execute code once.
      // Give a unique identifier to it (here "once-identifier").
      $('selector', context).once('once-identifier').each(function () {
        // The code here is called once.

        // Example of how to use an helper function (they are defined in Ecedi theme)
        // Helpers.demoHelper('demo');
      });
    },
  };
}(jQuery, Drupal));
