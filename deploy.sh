git pull
cd ong_api
python manage.py migrate --noinput
python manage.py loaddata fixtures/auth_groups.json
python manage.py loaddata fixtures/users.json
python manage.py loaddata fixtures/phone_operators.json
python manage.py collectstatic --noinput
cd ..
ln -s ./ong.nginx.conf /etc/nginx/sites-enabled/
chmod 664 ong.sock
chmod 644 /etc/nginx/sites-enabled/ong.nginx.conf
uwsgi --ini uwsgi.ini
