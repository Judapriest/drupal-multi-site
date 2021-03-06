# Drupal 8 Ecedi Starter Kit

Initial README file from [drupal-composer/drupal-project](https://github.com/drupal-composer/drupal-project)

## Installation

1. Requirements
    * composer:\^1.6.3
    * drush:\^9.0.0
    * Docker
        * If you plan to use Docker you should use the `d8ecedi` application type (`APP_TYPE=d8ecedi`).
    * Duncan
        * If you're on a server (like DUNCAN), create the vhost, **pointing on the /web directory**, ex : `sudo bash /home/users/a2create_vhost -s drupal8sk-<trigram>.grenoble71.ecedi.loc -d /home/users/<trigram>/drupal8sk-<trigram>.grenoble71.ecedi.loc/web -v 7.1 -u <trigram>`
2. Installation
    1. `git clone --recursive git@gitlab.ecedi.fr:drupal/d8-dev-sk.git`
        * OR change the URI to the URI of your project.
        * `--recursive` take into account the submodules. Equivalent to `git submodule init && git submodule update`.
    2. `composer install`
        * OR `docker-compose exec -u www-data php composer install`
    3. If you're on a server (like DUNCAN), create your database first.
    4. Drupal installation
        * **With Drush**: `bin/drush si ecedi_starter_kit --db-url='mysql://<user>:<password>@<database_uri>/<database_name>' --site-name=<site_name> --account-name=<admin_name> --account-pass=<admin_password>`
        * **With Drupal Console**: `bin/drupal si ecedi_starter_kit --langcode=fr --site-mail=<site_email> --db-user=<user> --db-pass=<password> --db-name=<database_name> --site-name=<site_name> --account-name=<admin_name> --account-pass=<admin_password> --account-mail=<admin_email>`
        * Arguments:
            * `<user>` & `<password>` are for the database connection
            * if you're on a server (like DUNCAN), `<database_uri>` is `localhost`
            * if you use docker, `<database_uri>` is `db`
            * `<admin_name>` & `<admin_password>` are for creating an admin account for Drupal. It should be replaced after the next step.
    5. Synchronize the database of the reference instance of your project if needed.
    6. Synchronize files from the folder chewbacca "files" to its instance : `rsync -avz -e ssh ecedi@recette53:/home/www/<chewbacca url>/web/sites/default/files/ ./web/sites/default/files/`
        *`<site_name>`: ex. mtes-cigeo.71.ecedi.fr
        If you don't have permission to crate the file do this before : `chmod u+w web/sites/default`
    7. Initiate the theme styles via Gulp
        * `cd gulp`
        * `npm install` to install all the modules/dependencies
        * `gulp` to compile the necessary files (CSS for Ecedi & Customer themes)

## Installation prod vs dev

After the installation you can configure Drupal according to your environment needs.

* Prod:
  * Nothing to configure. The default services.yml and settings.php are ready to be used in prod.
* Dev:
  * As developer, you may want to disable all caches (especially for FE dev):
     1. Copy `web/sites/example.settings.local.php` to `web/sites/default/settings.local.php`
        (`cp sites/example.settings.local.php sites/default/settings.local.php`)
     2. In the settings.local.php:
         * Uncomment `$settings['cache']['bins']['render'] = 'cache.backend.null';` and `$settings['cache']['bins']['dynamic_page_cache'] = 'cache.backend.null';`
         * Add `$settings['cache']['bins']['page'] = 'cache.backend.null';`
     3. In the settings.php:
         * Uncomment `if (file_exists($app_root . '/' . $site_path . '/settings.local.php')) {...}` block.
     4. Clear the cache `bin/drupal cr all`.
  * [See more](https://www.drupal.org/node/2598914)

## Installation profile

Before to start the installation you may want to not enable some modules.

Check the `web/profiles/ecedi_starter_kit/ecedi_starter_kit.info.yml`, you can comment the following sections (without worries)

* developer section
    * /!\ enable devel AND kint (optional).
* multilingual section

Waiting for profile inheritance (Drupal 8.6 if all goes well).

## Update drupal

To update the drupal installation after a `composer update` use the following drupal command:

* `bin/drupal update:execute all`

## Composer

The `composer.lock` file has been deleted from the repository.
However it is good to version it during the initialization of a project based on the starterkit.

## Contrib module installation

1. `composer require drupal/<contrib_module>`
    * OR `docker-compose exec -u www-data php composer require drupal/<contrib_module>`.
2. `drush en -y <contrib_module>`
    * OR `docker-compose exec -u www-data php drush en -y <contrib_module>`.
    * Make sure to use **drush 9** or use the drush binary file in the `./bin` directory.

## Git submodules

### Gulp

https://gitlab.ecedi.fr/ecedi/front-end/tools/gulp-stack

Follows the drupal8-sk branch of the repository.

To update this submodule: `git submodule update --remote --merge gulp`

## Theme

### Ecedi - Starter kit base theme

Extends the classy theme (core theme).

Provides non project specific alter and templates.

Override templates:

* `form--input.html.twig` => Uses a button tag instead of a input tag for submit buttons.
* `form-element.html.twig` => Wraps the form element description with a P tag instead of a DIV tag.

### Customer - Project specific theme

Extends the ecedi theme.

See [`web/themes/custom/customer/README.md`](web/themes/custom/customer) file for specific info.

#### Branch component-based-theme

Uses the components libraries module to allow developers to create twig components.
The gulp stack takes into account the component files architecture.
You need to import your components SCSS files into the styles.scss main file.
