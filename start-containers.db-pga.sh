#!/bin/bash

docker stop tlt_node_1 || echo 'CONTAINER tlt_node_1 N/A FOR STOPPING'
docker rm tlt_node_1 || echo 'CONTAINER tlt_node_1 N/A FOR REMOVING'
NODE_ENV=$NODE_ENV COMPOSE_PROJECT_NAME=tlt docker-compose -f ./docker-compose.db-pga.yml up -d
