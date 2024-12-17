Database Final Project  

# [Click me to visit site status](https://status.cypone.dev/status/tos)
# [Click me to visit API document](https://api.cypone.dev)
# [Click me to visit site](https://ticket.cypone.dev)

## Project Overview

This repository contains the final project for the Database course. The project is a Ticket Order System, which includes a backend, frontend, and database components.

### Components

1. **Backend (TOS_BE)**:
   - Built with Node.js and Express.
   - Containerized using Docker and orchestrated with Docker Compose.
   - Provides RESTful API endpoints for managing users and tickets.
   - [Backend Documentation](TOS_BE/README.md)

2. **Frontend (TOS_FE)**:
   - Built with Vue.js and Vite.
   - Containerized using Docker and orchestrated with Docker Compose.
   - Provides a user interface for interacting with the Ticket Order System.
   - [Frontend Documentation](TOS_FE/README.md)

3. **Database (TOS_DB)**:
   - Contains the database schema and setup instructions.
   - [Database Documentation](TOS_DB/README.md)

### Project Structure

```
DB_FE/
├── TOS_BE/
│   ├── README.md
│   ├── src/
│   ├── package.json
│   └── ...
├── TOS_FE/
│   ├── README.md
│   ├── src/
│   ├── package.json
│   └── ...
├── TOS_DB/
│   ├── README.md
│   ├── schema.sql
│   └── ...
├── docker-compose.yml
└── README.md
```

### Setup Instructions

To set up the entire project, follow these steps:

1. **Clone the repository:**
   ```sh
   git clone https://github.com/bradly0cjw/DB_FE.git
   cd DB_FE
   ```

2. **Install dependencies for backend and frontend:**
   ```sh
   cd TOS_BE
   npm install
   cd ../TOS_FE
   npm install
   cd ..
   ```

3. **Build the Docker images:**
   ```sh
   docker-compose build
   ```

4. **Run the application using Docker Compose:**
   ```sh
   docker-compose up
   ```

### Usage

- The backend application runs on `http://localhost:3000`.
- The frontend application runs on `http://localhost:8080`.

### Additional Resources

- [Project Status](https://status.cypone.dev/status/tos)
- [API Documentation](https://api.cypone.dev)
- [Live Site](https://ticket.cypone.dev)