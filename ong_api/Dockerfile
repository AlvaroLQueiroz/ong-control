FROM python:3.5
LABEL Version="1.0"
RUN apt-get update && apt-get upgrade && apt-get install -y nginx
RUN mkdir /code
WORKDIR /code
ADD ["requirements.txt", "api_nginx.conf", "api_uwsgi.ini", "./"]
RUN pip install -r requirements.txt
RUN rm /etc/nginx/sites-enabled/default && cp api_nginx.conf /etc/nginx/sites-enabled && echo "daemon off;" >> /etc/nginx/nginx.conf
EXPOSE 80
CMD ["sh", "start_dev_srv.sh"]