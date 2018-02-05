# Drupal 8 Ecedi Starter Kit

## Installation

1. Requirements:
    * composer:^1.6.3
    * drush:^9.0.0
2. Installation
    1. `composer install`
        * OU `docker-compose exec -u www-data php composer install`
    2. `drush si ecedi_starter_kit --db-url='mysql://<user>:<password>@<database_uri>/<database_name>' --site-name=STARTERKIT --account-name=<admin_name> --account-pass=<admin_password>`
    3. Synchronize the db of the reference instance of your project if needed.


## Contrib module installation

1. `composer require drupal/<contrib_module>`
    * OU `docker-compose exec -u www-data php composer require drupal/<contrib_module>`.
2. `drush en -y <contrib_module>`
    * OU `docker-compose exec -u www-data php drush en -y <contrib_module>`.

## Git submodules

### Gulp

https://gitlab.ecedi.fr/ecedi/front-end/tools/gulp-stack

Follow the drupal8-sk branch of the repository.

To update this submodule: `git submodule update --remote gulp`
