<?php
/**
 * Environment constants
 *
 * User: szymon
 * Date: 10.11.15
 * Time: 22:41
 */

if (!defined('DS')) {
    define('DS', DIRECTORY_SEPARATOR);
}

if (!defined('ROOT_PATH')) {
    define('ROOT_PATH', realpath(__DIR__ . DS . '..'));
}
