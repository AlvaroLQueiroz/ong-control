git pull
python manage.py migrate --noinput
python manage.py loaddata fixtures/auth_groups.json
python manage.py loaddata fixtures/users.json
python manage.py loaddata fixtures/phone_operators.json
python manage.py collectstatic --noinput
cp ../apache/ong-control.conf /etc/apache2/sites-available/ong-control.conf
service apache2 restart
