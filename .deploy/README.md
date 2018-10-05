# Configurations initiales

Les playbooks et autres fichiers de configurations contiennent un certains nombre de _placeholders_ qui
doivent être modifiés en fonction du projet

- `[projet-ip]` : l'ip de production du projet
- `[project-path]` : utilisé pour le nom du dump SQL et pour le dossier du site sur le serveur de prod
- `[project-repo]` : au format`git@git.domaine.fr:chemin/du/repo.git`
- `[ansible-user]` : utilisé dans le fichier `hosts`


# pré-requis

- Ansible version 1.9.0 minimum
- l'arborescence du site décrite ci-dessous est en place
- connexion ssh possible vers le système cible et avec l'utilisateur spécifié (auth par clé, password etc ...)
- l'utilisateur spécifié peut cloner depuis le repo git
- drush est installé sur le système cible et dans le path de l'utilisateur.
- optionnel, npm, gulp, composer sont installés

# installer ansistrano

Ansistrano requiert Ansible version 1.9.0 minimum.
L'installation se fait sur la machine qui déploie.

```
sudo apt-get install ansible
sudo ansible-galaxy install carlosbuenosvinos.ansistrano-deploy
sudo ansible-galaxy install carlosbuenosvinos.ansistrano-rollback
```
# arborescence du site

```
└── www
    ├── current -> ./releases/20180213110043Z
    ├── releases
    ├── repo
    └── shared
```
- current est un lien symbolique vers la production actuelle.
- releases est le dossier où sont stockés N versions de la production.
- repo est le dossier où ansistrano fait son git clone.
- shared contient les dossiers et fichiers statiques de Drupal définis à l'avance dans le playbook deploy.yml.

# arborescence d'ansistrano

```
├── inventory
│   ├── group_vars
│   │   └── empty
│   ├── hosts
│   └── host_vars
│       └── empty
├── playbooks
│   └── production
│       ├── deploy.retry
│       ├── deploy.yml
│       ├── my-after-symlink-tasks.yml
│       ├── my-before-setup-tasks.yml
│       ├── rollback.retry
│       └── rollback.yml
└── README.md
```
- inventory/hosts : Le fichier qui définit les systèmes où se font les déploiements.
exemple :

```
[production]
193.70.36.216 ansible_connection=ssh ansible_user=arseg
```
Le host production, son adresse ip ou fqdn, le type de connexion (ssh) et l'utilisateur à utiliser (arseg)

- playbooks/production/deploy.yml

```
- name : Deployment for production
  hosts: "production"
  become: false
  vars:
    ansistrano_deploy_from: "{{ playbook_dir }}"
    ansistrano_deploy_to: "/home/www/www.arseg.asso.fr/www/"
    ansistrano_shared_paths: [ sites/default/files, .gulp/node_modules ]
    ansistrano_shared_files: [ sites/default/settings.php ]
    ansistrano_version_dir: "releases"
    ansistrano_current_dir: "current"
    ansistrano_current_via: "symlink"
    ansistrano_keep_releases: 3
    ansistrano_deploy_via: "git"
    ansistrano_allow_anonymous_stats: no
    ansistrano_git_repo: git@gitlab.ecedi.fr:arseg/www.arseg.asso.fr.git
    ansistrano_git_branch: master
    ansistrano_before_setup_tasks_file: "{{ playbook_dir }}/my-before-setup-tasks.yml"
    ansistrano_after_symlink_tasks_file: "{{ playbook_dir }}/my-after-symlink-tasks.yml"
  roles:
    - carlosbuenosvinos.ansistrano-deploy
```
Le fichier qui détermine toutes les variables nécessaires au déploiement (où, à partir d'où, comment, quoi faire).

Les points importants :

- ansistrano_deploy_to : Le chemin où se fait le déploiement sur le système distant.
- ansistrano_shared_paths : Les dossiers statiques communs à chaque mise en production (sites/default/files pour un drupal typiquement).
- ansistrano_shared_files : Les fichiers statiques communs à chaque mise en production (sites/default/settings.php pour un drupal typiquement).
- ansistrano_keep_releases : Combien de versions doivent être gardées.
- ansistrano_deploy_via : La méthode de déploiement (git ou rsync)
- ansistrano_git_repo : L'url pour le git.
- ansistrano_git_branch : La branche git à utiliser.
- ansistrano_before_setup_tasks_file : Le fichier listant les tâches à faire avant le déploiement.
- ansistrano_after_symlink_tasks_file : Le fichier listant les tâches à faire une fois les liens symboliques créés.

# Utilisation

- Sur le système qui déploie :

```
mkdir deploiement
git clone git@gitlab.ecedi.fr:ecedi/ops/ansistrano/drupal7.git ./deploiement/
cd déploiement/
```
- Adaptez inventory/hosts :

```
[production]
10.0.0.10 ansible_connection=ssh ansible_user=ecedi
```
changez 10.0.0.10 avec l'ip ou le FQDN du système cible.
changez ansible_user avec l'utilisateur du système distant.

- Adaptez playbooks/production/deploy.yml :

```
ansistrano_deploy_to: "CHANGEME/"
```
Changez CHANGEME/ avec le chemin complet sur le système cible.

```
ansistrano_git_repo: git@gitlab.ecedi.fr:CHANGEME.git
```
Le lien git à utiliser.

```
ansistrano_git_branch: master
```

La branche git à utiliser (master par défaut).

Vous pouvez regarder aussi les fichiers playbooks/production/my-before-setup-tasks.yml et playbooks/production/my-after-symlink-tasks.yml si vous voulez désactiver une tâche ou en rajouter une.

Actuellement, avant un début de déploiement, nous faisons :
- un dump de la base sur le système cible nommé save-dump.sql dans le dossier www/current.

Après l'opération de liens symboliques :
- suppression des fichiers et dossiers inutiles
```
    - "{{ ansistrano_deploy_to }}/current/.env.dist"
    - "{{ ansistrano_deploy_to }}/current/.editorconfig"
    - "{{ ansistrano_deploy_to }}/current/docker/"
    - "{{ ansistrano_deploy_to }}/current/.vscode/"
```
- drush cc all -y
- fix des permissions dossiers et fichiers dans current.

# sur le système cible

- création de l'arborescence

```
$ mkdir -p /home/www/monprojet/www/{current,shared,repo,releases}
# on rapporte ce qu'on a mis dans
#    ansistrano_shared_paths: [ sites/default/files ]
#    ansistrano_shared_files: [sites.default/settings.php ]
$ mkdir -p /home/www/monprojet/www/shared/sites/default/files
$ mkdir -p /home/www/monprojet/www/shared/.gulp/node_modules
$ touch /home/www/monprojet/www/shared/sites/default/settings.php
```

On remplit /home/www/monprojet/www/shared/sites/default/settings.php avec des données valides et /home/www/monprojet/www/shared/sites/default/files.

Dans current, on met en place le site drupal et on s'assure qu'il fonctionne (base mysql importée, settings.php renseigné etc ...).
Les liens symboliques vers shared seront mis en place eu premier déploiement.

# déploiement

```
$ cd deploiement
$ ansible-playbook -i inventory/hosts --connection=local playbooks/production/deploy.yml
```

# rollback

```
$ cd deploiement
$ ansible-playbook -i inventory/hosts playbooks/production/rollback.yml
```
