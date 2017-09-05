git pull
ln -s ./ong.nginx.conf /etc/nginx/sites-enabled/
chmod 644 /etc/nginx/sites-enabled/ong.nginx.conf
cd ong_api
python manage.py migrate --noinput
python manage.py loaddata fixtures/auth_groups.json
python manage.py loaddata fixtures/users.json
python manage.py loaddata fixtures/phone_operators.json
python manage.py collectstatic --noinput
python manage.py runserver
