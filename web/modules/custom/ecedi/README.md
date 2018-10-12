# Ecedi

Provide generic tools and helpers to develop faster.

## EcediAbstractBlock

This class automatically take into account:

* If the block is used in a context.
* Cache context "url" if the block use a routeMatch service.

### Examples

```php
<?php

use \Drupal\ecedi\abstracts\Plugin\Block\EcediAbstractBlock;
use \Drupal\Core\Plugin\ContainerFactoryPluginInterface;
use \Symfony\Component\DependencyInjection\ContainerInterface;
use \Drupal\Core\Routing\RouteMatchInterface;

class MyBlock extends EcediAbstractBlock implements ContainerFactoryPluginInterface {

  /**
   * {@inheritdoc}
   */
  public function __construct(array $configuration,$plugin_id,$plugin_definition, RouteMatchInterface $route_match) {
    parent::__construct($configuration,$plugin_id,$plugin_definition);
    $this->routeMatch = $route_match; // Automatically add url cache context.
  }

  /**
   * {@inheritdoc}
   */
  public static function create(ContainerInterface $container, array $configuration, $plugin_id, $plugin_definition){
    return new static(
      $configuration, $plugin_id, $plugin_definition,
      $container->get('current_route_match')
    );
  }

  /**
   * {@inheritdoc}
   */
  public function build(){
    // Render the block content.
  }

}

```
