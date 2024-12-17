FROM mariadb:latest

# Set environment variables for MariaDB
ENV MYSQL_ROOT_PASSWORD=rootpassword
ENV MYSQL_DATABASE=dbproj
ENV MYSQL_USER=dbuser
ENV MYSQL_PASSWORD=dbpassword

# Copy the SQL script to the Docker container
COPY createtable.sql /docker-entrypoint-initdb.d/

# Copy the healthcheck script to the Docker container
COPY healthcheck.sh /usr/local/bin/healthcheck.sh

# Grant execute permission to the healthcheck script
RUN chmod +x /usr/local/bin/healthcheck.sh

# Expose the default MariaDB port
EXPOSE 3306

# Run the healthcheck script in the background
CMD ["sh", "-c", "/usr/local/bin/healthcheck.sh & docker-entrypoint.sh mysqld"]