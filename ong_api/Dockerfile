FROM python:3.5
LABEL Version="1.0"
RUN mkdir /code
WORKDIR /code
EXPOSE 8000
RUN apt-get update
RUN apt-get install -y gettext dos2unix netcat
ADD ["requirements.txt", "start.sh", "wait.sh", "./"]
RUN pip install -r requirements.txt
CMD dos2unix start.sh wait.sh && sh wait.sh && sh start.sh
