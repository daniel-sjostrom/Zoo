#!/bin/bash

compose_files="-f docker-compose.base.yml -f docker-compose.dev.yml"

# Build the services
podman-compose $compose_files build

# Start the services
podman-compose $compose_files up