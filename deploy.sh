git pull
pip3 install -r ong_api/requirements.prod.txt
ln -s ./ong.nginx.conf /etc/nginx/sites-enabled/
cd ong_api
python manage.py migrate --noinput
python manage.py loaddata fixtures/auth_groups.json
python manage.py loaddata fixtures/users.json
python manage.py loaddata fixtures/phone_operators.json
python manage.py collectstatic --noinput
cd ..
servie nginx reload
servie nginx restart
