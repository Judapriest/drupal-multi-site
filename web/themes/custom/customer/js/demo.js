/**
 * @file Global scripts for customer theme
 * Normally you shouldn't need it, and use some Drupal.behaviors in each component instead
 * @see components/demo.js
 */
'use strict';

(function ($, Drupal) {

  Drupal.behaviors.demo = {
    attach: function (context) {
      console.log('Ceci est un script de démo !');
    }
  };

}(jQuery, Drupal));
