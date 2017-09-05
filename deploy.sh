git pull
pip3 install -r ong_api/requirements.prod.txt

cp ./ong.nginx.conf /etc/nginx/sites-available
ln -s /etc/nginx/sites-available /etc/nginx/sites-enabled/ong.conf
service nginx reload
service nginx restart

mkdir /var/log/uwsgi

cd ong_api
python manage.py migrate --noinput
python manage.py loaddata fixtures/auth_groups.json
python manage.py loaddata fixtures/users.json
python manage.py loaddata fixtures/phone_operators.json
python manage.py collectstatic --noinput
cd ..
