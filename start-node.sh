#!/bin/bash

set -e

until PGPASSWORD=$POSTGRES_PASSWORD psql -h $DB_HOST -d $POSTGRES_DB -U $POSTGRES_USER -c '\q'; do
  >&2 echo "Postgres is unavailable - sleeping"
  sleep 1
done

>&2 echo "Postgres is up - executing command"

yarn start:prod
