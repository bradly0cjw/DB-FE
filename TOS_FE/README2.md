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
   git clone https://github.com/bradly0cjw/DB_FE.git
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
