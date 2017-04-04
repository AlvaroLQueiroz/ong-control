/etc/init.d/nginx start &
/usr/local/bin/uwsgi --ini api_uwsgi.ini --uid www-data --gid www-data