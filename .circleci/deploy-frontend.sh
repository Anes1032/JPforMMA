#!/bin/sh

cd JPforMMA/app/frontend

git pull origin master

sudo docker-compose build

sudo docker-compose down

sudo docker-compose up -d