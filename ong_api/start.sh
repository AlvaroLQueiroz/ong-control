if [ "$MODE" = "prod" ]; then
elif [ "$MODE" = "dev" ]; then
    python manage.py makemigrations
    python manage.py migrate
fi
