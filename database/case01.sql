CREATE DATABASE case01;
\c case01;

CREATE TABLE IF NOT EXISTS products (
	id SERIAL PRIMARY KEY, 
	name VARCHAR(50) NOT NULL, 
	description VARCHAR(255)
);

INSERT INTO products (name, description) VALUES ('Product 4', 'Description 4');

-- Insert multiple products
INSERT INTO products (name, description) VALUES 
('Laptop Pro', 'High-performance laptop with 16GB RAM and 512GB SSD'),
('Smartphone X', 'Latest smartphone with 5G capability and 128GB storage'),
('Wireless Earbuds', 'Noise-cancelling wireless earbuds with 24-hour battery life'),
('Smart Watch', 'Fitness tracker with heart rate monitor and GPS'),
('Gaming Console', 'Next-gen gaming console with 4K graphics support'),
('Bluetooth Speaker', 'Portable waterproof speaker with 360° sound'),
('Tablet Pro', '10-inch tablet with stylus support and 256GB storage'),
('Smart Home Hub', 'Central control for all your smart home devices'),
('Wireless Keyboard', 'Ergonomic keyboard with mechanical switches'),
('4K Monitor', '27-inch 4K display with HDR support');