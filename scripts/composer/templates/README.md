# {{ project_name }}

## Installation

1. Requirements
    * composer:\^1.6.3
    * drush:\^9.0.0
    * Docker
        * If you plan to use Docker : Define `APP_TYPE=d8ecedi` in the `.env` file.
    * Duncan
        * If you're on a server (like DUNCAN), create the vhost, **pointing on the /web directory**, ex : `sudo bash /home/users/a2create_vhost -s {{ project_dir }}-<TRIGRAM>.grenoble71.ecedi.loc -d /home/users/<TRIGRAM>/{{ project_dir }}-<TRIGRAM>.grenoble70.ecedi.loc/web -v 7.1 -u <TRIGRAM>`
2. Installation
    1. `git clone --recursive {{ git_default }}:{{ gitlab_project_path }}.git {{ project_dir }}`
    2. `composer install`
        * OR `docker-compose exec -u www-data php composer install` for docker users.
    3. If you're on a server (like DUNCAN), create your database first. With docker the database already exist (`db`).
    4. Drupal installation
        * **With Drush**: `bin/drush si ecedi_starter_kit --db-url='mysql://<user>:<password>@<database_uri>/<database_name>' --site-name=<site_name> --account-name=<admin_name> --account-pass=<admin_password>`
        * **With Drupal Console**: `bin/drupal si ecedi_starter_kit --langcode=fr --site-mail=<site_email> --db-user=<user> --db-pass=<password> --db-name=<database_name> --site-name=<site_name> --account-name=<admin_name> --account-pass=<admin_password> --account-mail=<admin_email>`
        * Arguments:
            * `<user>` & `<password>` are for the database connection
            * if you're on a server (like DUNCAN), `<database_uri>` is `localhost`
            * if you use docker, `<database_uri>` is `db`
            * `<admin_name>` & `<admin_password>` are for creating an admin account for Drupal. It should be replaced after the next step.
    5. Synchronize the database of the reference instance.
