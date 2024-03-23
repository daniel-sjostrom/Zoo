FROM postgres:16

# Copy the SQL script
COPY ./init-scripts/01_create_table.sql /docker-entrypoint-initdb.d/

# Copy and grant execution rights to your custom entrypoint script
COPY custom-entrypoint.sh /usr/local/bin/
RUN chmod +x /usr/local/bin/custom-entrypoint.sh

# Set your custom entrypoint script
ENTRYPOINT ["custom-entrypoint.sh"]
