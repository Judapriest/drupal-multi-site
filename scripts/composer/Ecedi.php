<?php

/**
 * @file
 * Contains \DrupalProject\composer\Ecedi.
 */

namespace DrupalProject\composer;

use Composer\Script\Event;
use Symfony\Component\Filesystem\Filesystem;
use Twig_Environment;
use Twig_Loader_Filesystem;

/**
 * Class Ecedi.
 *
 * Define custom composer commands.
 *
 * @package DrupalProject\composer
 */
class Ecedi {

  /**
   * Generate a README file according to project infos.
   *
   * @param \Composer\Script\Event $event
   *   The composer event object use to get an IO instance and more.
   *
   * @throws \Twig_Error_Loader
   * @throws \Twig_Error_Runtime
   * @throws \Twig_Error_Syntax
   */
  public static function generateProjectReadme(Event $event) {
    $project_root = getcwd();
    // Require vendor autoloader to use twig.
    require_once $project_root . '/vendor/autoload.php';

    $io = $event->getIO();
    $fs = new Filesystem();

    $readme_path = "$project_root/README.md";
    $sk_readme_path = "$project_root/SK_README.md";
    $project_dir = basename($project_root);

    $args = $event->getArguments();
    if (empty($args) || count($args) == 1) {
      $io->error("generate-project-readme require 2 arguments.");
      $io->write("\nUsage: composer generate-project-readme [project name] [gitlab project path]\n");
      $io->write("Example: composer generate-project-readme StarterKit drupal/d8-dev-sk");
      return;
    }
    $project_name = $args[0];
    $gitlab_project_path = $args[1];

    if ($fs->exists($readme_path) && $fs->exists($sk_readme_path)) {
      $io->error('ERROR: This command should only be used once');
      return;
    }

    if (!$fs->exists($sk_readme_path)) {
      $fs->rename($readme_path, $sk_readme_path);
      $io->write("The original README file was moved:\n$readme_path => $sk_readme_path");
    }

    if (!$fs->exists($readme_path)) {
      $fs->touch($readme_path);
    }
    else {
      $fs->remove($readme_path);
      $fs->touch($readme_path);
    }
    $loader = new Twig_Loader_Filesystem("$project_root/scripts/composer/templates");
    $twig = new Twig_Environment($loader, []);
    $fs->appendToFile($readme_path, $twig->render('README.md', [
      'project_name' => $project_name,
      'project_dir' => $project_dir,
      'git_default' => 'git@gitlab.ecedi.fr',
      'gitlab_project_path' => $gitlab_project_path,
    ]));
    $io->write("Correctly generated README file.");
  }

}
