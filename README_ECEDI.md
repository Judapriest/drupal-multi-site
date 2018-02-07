# Drupal 8 Ecedi Starter Kit

## Installation

1. Requirements
    * composer:^1.6.3
    * drush:^9.0.0
2. Installation
    1. `git clone --recursive git@gitlab.ecedi.fr:drupal/d8-dev-sk.git`
        * OR change the URI to the URI of your project.
        * `--recursive` take into account the submodules. Equivalent to `git submodule init && git submodule update`.
    2. `composer install`
        * OR `docker-compose exec -u www-data php composer install`
    3. If you're on a server (like DUNCAN), create your database first.
    3. `drush si ecedi_starter_kit --db-url='mysql://<user>:<password>@<database_uri>/<database_name>' --site-name=STARTERKIT --account-name=<admin_name> --account-pass=<admin_password>`
        * Make sure to use **drush 9** or use the drush binary file in the `./bin` directory (example: `bin/drush si ...`).
        * `<user>` & `<password>` are for the database connection
        * if you're on a server (like DUNCAN), `<database_uri>` is `localhost`
        * `<admin_name>` & `<admin_password>` are for creating an admin account for Drupal
    4. Synchronize the database of the reference instance of your project if needed.
    5. If you're on a server (like DUNCAN), create the vhost, **pointing on the /web directory**, ex : `sudo bash /home/users/a2create_vhost -s drupal8sk-mah.grenoble70.ecedi.loc -d /home/users/mah/drupal8sk-mah.grenoble70.ecedi.loc/web -v 7.0 -u mah`


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

#### Branch component-based-theme

Uses the components libraries module to allow developers to create twig components.
The gulp stack takes into account the component files architecture.
You need to import your components SCSS files into the styles.scss main file.
