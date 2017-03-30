FROM python:3.5
LABEL Version="1.0"
RUN apt-get update && apt-get upgrade
RUN mkdir /code
RUN touch ong.sock
WORKDIR /code
ADD ["requirements.txt", "website_nginx.conf", "website_uwsgi.ini", "./"]
RUN pip install -r requirements.txt
RUN apt-get install -y nginx && ln -s website_nginx.conf /etc/nginx/sites-enabled
RUN echo "daemon off;" >> /etc/nginx/nginx.conf
CMD uwsgi --ini website_uwsgi.ini && /etc/init.d/nginx start