-- DROP DATABASE dbproj;
-- CREATE DATABASE dbproj;
CREATE DATABASE if not exists dbproj;

USE dbproj;

CREATE TABLE users (
    id INTEGER PRIMARY KEY AUTO_INCREMENT,
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
    id INTEGER PRIMARY KEY AUTO_INCREMENT,
    event_name VARCHAR(255) NOT NULL,
    event_start DATE NOT NULL,
    event_end DATE NOT NULL,
    status VARCHAR(50) NOT NULL,
    description TEXT,
    seller_id INTEGER,
    FOREIGN KEY (seller_id) REFERENCES sellers(user_id)
);

CREATE TABLE events_images (
    event_id INTEGER,
    image_path VARCHAR(255),
    PRIMARY KEY (event_id, image_path),
    FOREIGN KEY (event_id) REFERENCES events(id)
);

CREATE TABLE tickets (
    id INTEGER PRIMARY KEY AUTO_INCREMENT,
    event_id INTEGER,
    ticket_name VARCHAR(255) NOT NULL,
    ticket_start DATE NOT NULL,
    ticket_end DATE NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    status VARCHAR(50) NOT NULL,
    quantity INTEGER NOT NULL,
    description VARCHAR(255),
    image_path VARCHAR(255), 
    FOREIGN KEY (event_id) REFERENCES events(id)
);

CREATE TABLE discounts (
    id INTEGER PRIMARY KEY AUTO_INCREMENT,
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
    id INTEGER PRIMARY KEY AUTO_INCREMENT,
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


INSERT INTO users (id, username, email, password, created_at)
VALUES (1, 'admin', 'admin@admin.com', '$2a$10$pntkMe6lCT6.KCFqC6OVRumqyWz42NoIyeEJMM4iNeV33rqGhB1vi', '2024-12-29 18:40:02');

INSERT INTO admins (user_id)
VALUES (1);

INSERT INTO users (id,username, email, password, created_at)
VALUES (2, 'seller', 'seller@seller.com', '$2a$10$.ogu81/hk1Lmq7ypfUO1s.F3.A3mQtMQ/Hn..vDiXpfDxhEJUBtB.', '2024-12-30 08:32:01');
INSERT INTO users (id,username, email, password, created_at)
VALUES (3, 'user', 'user@user.com', '$2a$10$iooAYxzs2TU607eSS6eG9OapNp2JGcc8VxNgioPhA91P7h8gKlmNS', '2024-12-30 13:31:06');

INSERT INTO sellers (user_id, company_name)
VALUES (2, 'seller');

INSERT INTO events (event_name, event_start, event_end, status, description, seller_id)
VALUES ('event1', '2021-01-01', '2021-01-02', 'active', 'event1 description', 2);

INSERT INTO tickets (event_id, ticket_name, ticket_start, ticket_end, price, status, quantity, description, image_path)
VALUES (1, 'ticket1', '2021-01-01', '2021-01-02', 100, 'active', 100, 'ticket1 description', 'ticket1.jpg');

-- list all table
SELECT * FROM users;
SELECT * FROM sellers;
SELECT * FROM admins;
SELECT * FROM customers;
SELECT * FROM events;
SELECT * FROM events_images;
SELECT * FROM tickets;
SELECT * FROM discounts;
SELECT * FROM ticket_discounts;
SELECT * FROM orders;
SELECT * FROM order_discounts;
SELECT * FROM order_items;
