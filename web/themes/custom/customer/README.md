# Customer Theme

## JavaScript

### How to load js files

Before to include your js into pages, you must create a library in the `customer.libraries.yml` file.

```yaml
my-library:
  version: 1.x
  js:
    path/to/my/js/file.js: {}
  dependencies: # All dependencies are optional. See web/core/core.libraries.yml for an example of what you can use.
    - core/jquery # Load jquery
    - core/drupal # Load Drupal js (Drupal.behaviors, Drupal.t, Drupal.url, etc...)
    - core/jquery.once # If you plan to use jQuery.once (recommended with behaviors)
```
If your js should be loaded on every pages, add it to the global-styling library.

After created the library, you can attach your library:
* to a render array:

```php
<?php
$my_element['#attached']['library'][] = 'customer/my-library';
```
* in a twig template (maybe best for component):

```twig
{{ attach_library('customer/my-library') }}
```

See https://www.drupal.org/node/2274843 for more examples.

### Component example

* `customer.libraries.yml`

```yaml
my-component:
  version: 1.x
  js:
    components/my_component/my_component.js: {}
  dependencies:
    - core/jquery
    - core/drupal
    - core/jquery.once
```
* `components/my_component/my_component.html.twig`

```twig
{{ attach_library('customer/my-component') }}
```
