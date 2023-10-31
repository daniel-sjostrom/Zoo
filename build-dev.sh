#!/bin/bash

compose_files="-f docker-compose.base.yml -f docker-compose.dev.yml"

# Build the services
docker-compose $compose_files build

# Start the services
docker-compose $compose_files up