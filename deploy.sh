git pull
pip3 install -r ong_api/requirements.prod.txt

cp ./ong.nginx.conf /etc/nginx/sites-available
ln -s /etc/nginx/sites-available /etc/nginx/sites-enabled/ong.conf
service nginx reload
service nginx restart

mkdir /var/log/uwsgi

cd ong_api
python3 manage.py migrate --noinput
python3 manage.py loaddata fixtures/auth_groups.json
python3 manage.py loaddata fixtures/users.json
python3 manage.py loaddata fixtures/phone_operators.json
python3 manage.py collectstatic --noinput
cd ..
