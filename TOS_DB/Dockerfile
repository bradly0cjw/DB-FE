FROM mariadb:latest

# Set environment variables for MariaDB
ENV MYSQL_ROOT_PASSWORD=rootpassword
ENV MYSQL_DATABASE=dbproj
ENV MYSQL_USER=dbuser
ENV MYSQL_PASSWORD=dbpassword

# Copy the SQL script to the Docker container
COPY createtable.sql /docker-entrypoint-initdb.d/

# Expose the default MariaDB port
EXPOSE 3306