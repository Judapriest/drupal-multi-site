DOCKER_COMPOSE         = docker-compose
CONTAINER_PHP          = php
CONTAINER_PHP_PATH     = /var/www/html
CONTAINER_PHP_PATH_WWW = $(CONTAINER_PHP_PATH)/web
EXEC_PHP               = docker-compose exec $(CONTAINER_PHP) sh -c "cd $(CONTAINER_PHP_PATH) &&
EXEC_PHP_WWW           = docker-compose exec -u www-data $(CONTAINER_PHP) sh -c "cd $(CONTAINER_PHP_PATH) &&

## PROJET

start: ## Installe l'environnement la premiere fois
start: up ins smd

build: ## Démarre et configure l'environnement
build: up cim smd

reset: ## Réinitialise l'environnement de travail et redémarre  le projet
reset: down build

.PHONY: start build reset

## DOCKER

up: ## Lance les conteneurs Docker
	$ sudo service apache2 stop
	$(DOCKER_COMPOSE) up -d --remove-orphans --no-recreate

stop: ## Stop les conteneurs Docker
	$(DOCKER_COMPOSE) stop

down: ## Arrête et supprime les conteneurs Docker
	$(DOCKER_COMPOSE) down -v --rmi local

.PHONY: up stop down

## DRUPAL

cr: ## Reconstruit le cache Drupal
	$(EXEC_PHP) bin/drush cr"

cim: ## Importe les configuration Drupal
	$(EXEC_PHP_WWW) bin/drush cim"

cex: ## Exporte les configuration Drupal
	$(EXEC_PHP_WWW) bin/drupal ce"

smd: ## Change la configuration de performance pour passer en mode développement
	$(EXEC_PHP_WWW) bin/drupal site:mode dev"

smp: ## Change la configuration de performance pour passer en mode Production
	$(EXEC_PHP_WWW) bin/drupal site:mode prod"

.PHONY: cr cim cex smd smp

## COMPOSER

ins: ## Install toute les dependences du projet
	$(EXEC_PHP_WWW) composer install"

updt: ## Mise à jour des dépendences du projet
	$(EXEC_PHP_WWW) composer update"

.PHONY: ins updt
