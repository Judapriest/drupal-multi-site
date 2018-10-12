<?php

namespace Drupal\ecedi\abstracts\Plugin\Block;

use Drupal\Core\Block\BlockBase;
use Drupal\Core\Cache\Cache;

/**
 * Class EcediAbstractBlock.
 *
 * Automatically take into account:
 * - If the block is used in a context.
 * - Cache context "url" if the block use a routeMatch service.
 *
 * @property \Drupal\Core\Routing\RouteMatchInterface routeMatch
 */
abstract class EcediAbstractBlock extends BlockBase {

  /**
   * {@inheritdoc}
   */
  public function getCacheContexts() {
    $contexts = [];
    if (!empty($this->routeMatch)) {
      $contexts[] = 'url';
    }
    return Cache::mergeContexts(parent::getCacheContexts(), $contexts);
  }

  /**
   * {@inheritdoc}
   */
  public function getCacheTags() {
    $tags = [];
    // Adding context configuration as a cache tag to invalidate block cache
    // when the context has been modified.
    if (isset($this->configuration['context_id'])) {
      $tags[] = 'config:context.context.' . $this->configuration['context_id'];
    }
    return Cache::mergeTags(parent::getCacheTags(), $tags);
  }

}
