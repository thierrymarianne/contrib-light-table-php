# PHP plugin for Light Table

## Demo

![PHP plugin for Light Table](https://raw.github.com/thierrymarianne/LightTable-PHP/master/php-light-table-demo.gif)

## Requirement

A php binary should be available in your `$PATH`.
After having copied the plugin to Light Table user plugin directory,
 * `View` menu > `Commands` > `App: Reload behaviors`

## Usage

 * `View` menu > `Commands` > `Connect: Show connect bar`
 * Add a PHP connection
 * Select a directory to serve as the root of your PHP project
 * Press [ctrl|cmd]+shift+enter to evaluate the current buffer.

## Development

Download composer

```
curl -sS https://getcomposer.org/installer | php
```

Install vendors (relied upon to connect to Light Table)

```
$(cd php-src && php ../composer.phar install --prefer-dist)
```

## TODO

 * Evaluate selected expression

