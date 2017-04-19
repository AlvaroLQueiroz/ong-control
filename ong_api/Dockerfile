FROM python:3.5
LABEL Version="1.0"
RUN mkdir /code
WORKDIR /code
ADD ["requirements.txt", "./"]
RUN pip install -r requirements.txt
CMD ["/usr/local/bin/uwsgi", "--ini", "api_uwsgi.ini", "--uid", "www-data", "--gid", "www-data"]