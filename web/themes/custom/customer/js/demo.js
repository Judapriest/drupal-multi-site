/**
 * @file Demo script for customer theme
 * Uses Drupal.behaviors
 * @see customer/README.md
 */
'use strict';

(function ($, Drupal) {

  Drupal.behaviors.demo = {
    attach: function (context) {
      console.log('Ceci est un script de démo !');

      // Your code here.
      // The attach method is called for every ajax calls.
      // Use the jQuery once plugin to execute code once.
      $('selector', context).once('class_name').each(function () {
        // The code here is called once.

        // Example of how to use an helper function
        // Helpers.equalHeight($('selector, other-selector', context));
      });
    }
  };

}(jQuery, Drupal));
