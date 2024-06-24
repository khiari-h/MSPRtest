<?php

// autoload_static.php @generated by Composer

namespace Composer\Autoload;

class ComposerStaticInitb1b72ee605b29f8edc7f195575ff8266
{
    public static $prefixLengthsPsr4 = array (
        'G' => 
        array (
            'GeoMashup\\' => 10,
        ),
    );

    public static $prefixDirsPsr4 = array (
        'GeoMashup\\' => 
        array (
            0 => __DIR__ . '/../..' . '/php',
        ),
    );

    public static function getInitializer(ClassLoader $loader)
    {
        return \Closure::bind(function () use ($loader) {
            $loader->prefixLengthsPsr4 = ComposerStaticInitb1b72ee605b29f8edc7f195575ff8266::$prefixLengthsPsr4;
            $loader->prefixDirsPsr4 = ComposerStaticInitb1b72ee605b29f8edc7f195575ff8266::$prefixDirsPsr4;

        }, null, ClassLoader::class);
    }
}