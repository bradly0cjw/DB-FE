# DB-FE
Database Final Project

## TOS_FE
Ticket Order System FrontEnd

### Project Structure

```
TOS_FE
├── src
│   ├── App.vue           # Main Vue component
│   ├── assets            # Static assets
│   ├── components        # Vue components
│   └── main.js           # Entry point of the application
├── Dockerfile            # Dockerfile for building the application image
├── docker-compose.yaml   # Docker Compose configuration
├──index.html             # Main HTML file
├── package.json          # npm configuration file
├── README.md             # Project documentation
└── vite.config.js        # Vite configuration
```

### Setup Instructions

1. **Clone the repository:**
   ```sh
   git clone <repository-url>
   cd TOS_FE
   ```

2. **Install dependencies:**
   ```sh
   npm install
   ```

3. **Build the Docker image:**
   ```sh
   docker build -t frontend-app .
   ```

4. **Run the application using Docker Compose:**
   ```sh
   docker-compose up
   ```

### Usage

- The application runs on `http://localhost:8080`.

## TOS_BE
Ticket Order System BackEnd

### Project Structure

```
TOS_BE
├── src
│   ├── index.js          # Entry point of the application
│   ├── controllers       # Contains business logic for routes
│   ├── routes            # Defines application routes
│   └── models            # Data models and schemas
├── Dockerfile            # Dockerfile for building the application image
├── docker-compose.yml    # Docker Compose configuration
├── package.json          # npm configuration file
└── README.md             # Project documentation
```

### Setup Instructions

1. **Clone the repository:**
   ```sh
   git clone <repository-url>
   cd TOS_BE
   ```

2. **Install dependencies:**
   ```sh
   npm install
   ```

3. **Build the Docker image:**
   ```sh
   docker build -t backend-app .
   ```

4. **Run the application using Docker Compose:**
   ```sh
   docker-compose up
   ```

### Usage

- The application runs on `http://localhost:3000`.
- You can access the following endpoints:
  - `GET /` - Redirects to the ticket service.
  - `GET /users` - Retrieves a list of users.
  - `POST /users` - Creates a new user.
  - `GET /ping` - Simple ping endpoint.

## TOS_DB
Ticket Order System DataBase

### Project Structure

```
TOS_DB
├── readme.md             # Project documentation
```

## License

<!-- This project is licensed under the MIT License. -->
