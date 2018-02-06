# Drupal 8 Ecedi Starter Kit

## Installation

1. Requirements:
    * composer:^1.6.3
    * drush:^9.0.0
2. Installation
    1. `git clone --recursive git@gitlab.ecedi.fr:drupal/d8-dev-sk.git`
        * OR change the URI to the URI of your project.
        * `--recursive` take into account of the submodules. Equivalent to `git submodule init && git submodule update`.
    2. `composer install`
        * OR `docker-compose exec -u www-data php composer install`
    3. `drush si ecedi_starter_kit --db-url='mysql://<user>:<password>@<database_uri>/<database_name>' --site-name=STARTERKIT --account-name=<admin_name> --account-pass=<admin_password>`
    4. Synchronize the db of the reference instance of your project if needed.


## Contrib module installation

1. `composer require drupal/<contrib_module>`
    * OR `docker-compose exec -u www-data php composer require drupal/<contrib_module>`.
2. `drush en -y <contrib_module>`
    * OR `docker-compose exec -u www-data php drush en -y <contrib_module>`.

## Git submodules

### Gulp

https://gitlab.ecedi.fr/ecedi/front-end/tools/gulp-stack

Follow the drupal8-sk branch of the repository.

To update this submodule: `git submodule update --remote gulp`

## Theme

### Ecedi - Starter kit base theme

Extend the classy theme (core theme).

Provide non project specific alter and template.

Override templates:

* `form--input.html.twig` => Use a button tag instead of a input tag for submit buttons.
* `form-element.html.twig` => Wrap the form element description with a P tag instead of a DIV tag.

### Customer - Project specific theme

Extend the ecedi theme.

#### Branch component-based-theme

Use the components libraries module to allow developers to create twig components.
The gulp stack take into account of the component file architecture.
You must need to import your component SCSS files into the styles.scss main file.
