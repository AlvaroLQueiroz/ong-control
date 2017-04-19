from ong.base_settings import *

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = True

ALLOWED_HOSTS = ['*']

# Database
# https://docs.djangoproject.com/en/1.10/ref/settings/#databases

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql_psycopg2',
        'NAME': 'ong-control',
        'USER': 'ong-api-user',
        'PASSWORD': 'ong-123',
        'HOST': '10.0.75.1',
        'PORT': '5432',
    }
}
