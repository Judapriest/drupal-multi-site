<?php

namespace Drupal\ecedi_test\Plugin\Block;

use Drupal\Core\Block\BlockBase;

/**
 * @file
 * Custom block to test front form display.
 */

/**
 * Class FrontFormBlock.
 *
 * @Block(
 *   id = "ecedi_test_front_form_block",
 *   admin_label = @Translation("Ecedi Test - Front Form Block")
 * )
 */
class FrontFormBlock extends BlockBase {

  /**
   * {@inheritdoc}
   */
  public function build() {
    return \Drupal::formBuilder()->getForm('\Drupal\ecedi_test\Form\FrontForm');
  }

}
