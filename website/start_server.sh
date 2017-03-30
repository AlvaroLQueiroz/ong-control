#!/bin/bash
set -m

exec uwsgi --ini website_uwsgi.ini &
exec /etc/init.d/nginx start
