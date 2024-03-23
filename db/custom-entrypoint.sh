#!/bin/bash
set -e

# Function to run your SQL scripts
run_sql_scripts() {
    # Wait for PostgreSQL to start
    until pg_isready -h localhost -U "$POSTGRES_USER"; do
        echo "Waiting for PostgreSQL to start..."
        sleep 1
    done

    echo "PostgreSQL started, executing scripts..."
    # Execute your SQL scripts
    psql -U "$POSTGRES_USER" -d "$POSTGRES_DB" -a -f /docker-entrypoint-initdb.d/01_create_table.sql
}

# Run your scripts in the background to not block the container from starting
run_sql_scripts &

# Call the original entrypoint script
exec docker-entrypoint.sh postgres
