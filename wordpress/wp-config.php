<?php
/**
 * The base configuration for WordPress
 *
 * The wp-config.php creation script uses this file during the
 * installation. You don't have to use the web site, you can
 * copy this file to "wp-config.php" and fill in the values.
 *
 * This file contains the following configurations:
 *
 * * MySQL settings
 * * Secret keys
 * * Database table prefix
 * * ABSPATH
 *
 * @link https://codex.wordpress.org/Editing_wp-config.php
 *
 * @package WordPress
 */

// ** MySQL settings - You can get this info from your web host ** //
/** The name of the database for WordPress */
define( 'WPCACHEHOME', '/home/clients/29b34468e0a7e82a56c11c5917b729ec/sites/nationsounds.online/wp-content/plugins/wp-super-cache/' );
define('WP_CACHE', true);
define('DB_NAME', '6s660_WP996811');

/** MySQL database username */
define('DB_USER', '6s660_WP996811');

/** MySQL database password */
define('DB_PASSWORD', '4dAHmzcGM3');

/** MySQL hostname */
define('DB_HOST', '6s660.myd.infomaniak.com');

/** Database Charset to use in creating database tables. */
define('DB_CHARSET', 'utf8');

/** The Database Collate type. Don't change this if in doubt. */
define('DB_COLLATE', '');

/**#@+
 * Authentication Unique Keys and Salts.
 *
 * Change these to different unique phrases!
 * You can generate these using the {@link https://api.wordpress.org/secret-key/1.1/salt/ WordPress.org secret-key service}
 * You can change these at any point in time to invalidate all existing cookies. This will force all users to have to log in again.
 *
 * @since 2.6.0
 */
define('AUTH_KEY',         'X3j|`Ycpw2trsxYEa/`t*1ljPObor:?;A@`fXh5f#qa#z(pgPNmwC_yfC&G!0rPJ');
define('SECURE_AUTH_KEY',  '=u_oWd_akNS{~!=wk*a^UbX:|ypP*R{,K;:K8Ng(tf=1uw4eC+E`N@=o_au2e0lR');
define('LOGGED_IN_KEY',    '7NQyV^.xj=b,cgV55s5CUAOqIJO*WQOkYNQXKvrGc%Qjk~t;{y:fMzOI6Ib3ZKRW');
define('NONCE_KEY',        'ZY%{#IQ5=P{q%eA(o+XjgiGPvpW>TSpM.}v9EX%i+gQNFw%Vf7&?~(JN67.E{>>~');
define('AUTH_SALT',        '_?L=bU(28@jp{pvem}kjdYf!uwy+#5QOxZZ0OfxX!CS^.4Y{*}CO^cn%?x@Vn~O,');
define('SECURE_AUTH_SALT', 'w^A0&PYs;JUHW>J=6lK2f<{<U%,sVt6SQGi9IA^*wrXkCI{5>ons5z~rqUKjbK}r');
define('LOGGED_IN_SALT',   'Yx:Lv;GxaL.Ab{!8#H0b*6q:.m6?G<lJ5a5:@rczk.KNIf5yQ+oT&.Zx%EoAY+ZT');
define('NONCE_SALT',       '|.=7(~Rq0mls!c|5477tN^T)B5iaVK=sr+!^O<.hBvbK~.OO75IbA1#/E6%!(Z@Q');

/**#@-*/

/**
 * WordPress Database Table prefix.
 *
 * You can have multiple installations in one database if you give each
 * a unique prefix. Only numbers, letters, and underscores please!
 */
$table_prefix  = 'wp_996811_';

/**
 * WordPress Localized Language, defaults to English.
 *
 * Change this to localize WordPress. A corresponding MO file for the chosen
 * language must be installed to wp-content/languages. For example, install
 * de_DE.mo to wp-content/languages and set WPLANG to 'de_DE' to enable German
 * language support.
 */
//define('WPLANG', 'fr_FR');

/**
 * For developers: WordPress debugging mode.
 *
 * Change this to true to enable the display of notices during development.
 * It is strongly recommended that plugin and theme developers use WP_DEBUG
 * in their development environments.
 *
 * For information on other constants that can be used for debugging,
 * visit the Codex.
 *
 * @link https://codex.wordpress.org/Debugging_in_WordPress
 */
define('WP_DEBUG',          false);
define('WP_DEBUG_LOG',      false);
define('WP_DEBUG_DISPLAY',  false);

/* That's all, stop editing! Happy blogging. */

/** Absolute path to the WordPress directory. */
if ( !defined('ABSPATH') )
	define('ABSPATH', dirname(__FILE__) . '/');

/** Sets up WordPress vars and included files. */
require_once(ABSPATH . 'wp-settings.php');
