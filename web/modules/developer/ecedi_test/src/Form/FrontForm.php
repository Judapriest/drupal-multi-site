<?php

namespace Drupal\ecedi_test\Form;

use Drupal\Core\Form\FormBase;
use Drupal\Core\Form\FormStateInterface;

/**
 * @file
 * Define a custom block to test a11y.
 */

/**
 * Class FrontForm.
 *
 * @package Drupal\ecedi_test\Form
 */
class FrontForm extends FormBase {

  /**
   * {@inheritdoc}
   */
  public function getFormId() {
    return 'ecedi_test_front_form';
  }

  /**
   * {@inheritdoc}
   */
  public function buildForm(array $form, FormStateInterface $form_state) {
    $form['button_type_button'] = [
      '#type' => 'button',
      '#value' => $this->t('Button type button'),
    ];
    $form['input_with_description'] = [
      '#type' => 'textfield',
      '#title' => $this->t('Input with description'),
      '#description' => $this->t('Description of the input field'),
    ];
    $form['button_type_submit'] = [
      '#type' => 'submit',
      '#value' => $this->t('Button type submit'),
    ];
    return $form;
  }

  /**
   * {@inheritdoc}
   */
  public function submitForm(array &$form, FormStateInterface $form_state) {}

}
