iTunes Artwork Finder
=====================

A fork of the iTunes Artwork Finder


## About
The iTunes Artwork Finder is a tool to get Album Artworks from iTunes

## Changes/advantage to the original project
- Ready to use: Just upload the files and a jQuery version to an webserver
- No CDN providers: There's no unnecessary connection to a CDN because the jQuery library is on your server (and better privacy because it's not Google/Cloudflare).
- Improved UI: The UI looks (much) better than the original one. :)
- A german UI: There is also a german version available

## Requirements
- A webserver with PHP
- jQuery version 3.7.1
```
https://code.jquery.com/jquery-3.7.1.min.js
```

## How to run this on an linux server
1. Install a webserver and php
```
sudo apt install apache2 php -y
```
2. Create a directory
```
mkdir /var/www/html/itunes-artwork-finder
cd /var/www/html/itunes-artwork-finder
```
3. Get the jQuery version 3.7.1
```
wget https://code.jquery.com/jquery-3.7.1.min.js
```
4. Get the files from this project
```
wget
```
5. Access index file from a web browser
```
http://<IP-Adress/Domain of your server>/itunes-artwork-finder
```
