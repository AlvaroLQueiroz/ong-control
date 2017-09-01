if [ "$MODE" = "prod" ]; then
    /usr/local/bin/uwsgi --ini /tmp/uwsgi-dev.ini --uid www-data --gid www-data
elif [ "$MODE" = "dev" ]; then
    python manage.py makemigrations
    python manage.py migrate
    python manage.py loaddata fixtures/auth_groups.json
    python manage.py loaddata fixtures/users.json
    python manage.py loaddata fixtures/phone_operators.json
    python manage.py runserver 0.0.0.0:8000
fi
