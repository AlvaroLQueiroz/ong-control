FROM python:3.5
LABEL Version="1.0"
RUN mkdir /code
WORKDIR /code
EXPOSE 8000
RUN apt-get update
RUN apt-get install -y gettext
ADD ["requirements.txt", "/code"]
RUN pip install -r requirements.txt
CMD ["/usr/local/bin/uwsgi", "--ini", "/tmp/uwsgi-dev.ini", "--uid", "www-data", "--gid", "www-data"]
