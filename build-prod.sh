#!/bin/bash

compose_files="-f docker-compose.base.yml -f docker-compose.prod.yml"

# Build the services
docker compose $compose_files build

# Start the services in detached mode
docker compose $compose_files up -d
