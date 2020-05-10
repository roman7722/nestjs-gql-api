#!/bin/bash

NODE_ENV=$NODE_ENV COMPOSE_PROJECT_NAME=tlt docker-compose -f ./docker-compose.all.yml up -d --build node
