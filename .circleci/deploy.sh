#!/bin/sh

cd JPforMMA/app/backend

git pull origin master

sudo docker-compose -f docker-compose.production.yml build

sudo docker-compose -f docker-compose.production.yml run --rm rails rails db:migrate  RAILS_ENV=production