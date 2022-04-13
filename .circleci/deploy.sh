#!/bin/sh

cd JPforMMA/app/backend

git pull origin master

sudo docker-compose -f docker-compose.production.yml build

sudo docker-compose -f docker-compose.production.yml rails rails --rm db:migrate RAILS_ENV=production