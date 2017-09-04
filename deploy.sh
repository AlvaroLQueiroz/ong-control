git pull
cd ong_api
python manage.py migrate --noinput
python manage.py loaddata fixtures/auth_groups.json
python manage.py loaddata fixtures/users.json
python manage.py loaddata fixtures/phone_operators.json
python manage.py collectstatic --noinput
cd ..
chmod 664 ong.sock
ln -s ./nginx.conf /etc/nginx/sites-enabled/
uwsgi --ini uwsgi.ini
