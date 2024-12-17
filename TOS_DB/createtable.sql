-- DROP DATABASE dbproj;
-- CREATE DATABASE dbproj;

CREATE TABLE users (
    id INTEGER PRIMARY KEY,
    username VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP NOT NULL
);


CREATE TABLE sellers (
    user_id INTEGER PRIMARY KEY,
    company_name VARCHAR(255) NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE admins (
    user_id INTEGER PRIMARY KEY,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE customers (
    user_id INTEGER PRIMARY KEY,
    payment_info VARCHAR(255),
    birth_date DATE,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE events (
    id INTEGER PRIMARY KEY,
    event_name VARCHAR(255) NOT NULL,
    event_date DATE NOT NULL,
    status VARCHAR(50) NOT NULL,
    description TEXT,
    image_path VARCHAR(255),
    seller_id INTEGER,
    created_at TIMESTAMP NOT NULL,
    FOREIGN KEY (seller_id) REFERENCES sellers(user_id)
);

CREATE TABLE tickets (
    id INTEGER PRIMARY KEY,
    seller_id INTEGER,
    event_id INTEGER,
    ticket_name VARCHAR(255) NOT NULL,
    ticket_date DATE NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    status VARCHAR(50) NOT NULL,
    quantity INTEGER NOT NULL,
    description VARCHAR(255),
    image_path VARCHAR(255),
    created_at TIMESTAMP NOT NULL,
    FOREIGN KEY (seller_id) REFERENCES sellers(user_id),
    FOREIGN KEY (event_id) REFERENCES events(id)
);


CREATE TABLE discounts (
    id INTEGER PRIMARY KEY,
    seller_id INTEGER,
    discount_type VARCHAR(50) NOT NULL,
    discount_value DECIMAL(10, 2) NOT NULL,
    start_from TIMESTAMP NOT NULL,
    expired_at TIMESTAMP NOT NULL,
    FOREIGN KEY (seller_id) REFERENCES sellers(user_id)
);


CREATE TABLE ticket_discounts (
    discount_id INTEGER,
    ticket_id INTEGER,

    PRIMARY KEY (discount_id, ticket_id),
    FOREIGN KEY (discount_id) REFERENCES discounts(id),
    FOREIGN KEY (ticket_id) REFERENCES tickets(id)
);


CREATE TABLE orders (
    id INTEGER PRIMARY KEY,
    customer_id INTEGER,
    seller_id INTEGER,
    order_date TIMESTAMP NOT NULL,
    status VARCHAR(50) NOT NULL,
    FOREIGN KEY (customer_id) REFERENCES customers(user_id),
    FOREIGN KEY (seller_id) REFERENCES sellers(user_id)
);


CREATE TABLE order_discounts (
    discount_id INTEGER,
    order_id INTEGER,
    PRIMARY KEY (discount_id, order_id),
    FOREIGN KEY (discount_id) REFERENCES discounts(id),
    FOREIGN KEY (order_id) REFERENCES orders(id)
);

CREATE TABLE order_items (
    order_id INTEGER,
    ticket_id INTEGER,
    quantity INTEGER NOT NULL,
    PRIMARY KEY (order_id, ticket_id),
    FOREIGN KEY (order_id) REFERENCES orders(id),
    FOREIGN KEY (ticket_id) REFERENCES tickets(id)
);