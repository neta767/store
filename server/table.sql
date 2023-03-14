CREATE TABLE customers (
	id serial NOT NULL,
	name VARCHAR(50) NOT NULL,
	password VARCHAR(50) NOT NULL,
	telephone int NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE prodacts (
	id serial NOT NULL,
	flavor VARCHAR(50) NOT NULL,
	price INT NOT NULL
)

CREATE TABLE purchases (
    id serial NOT NULL,
	amount INT NOT NULL,
    FOREIGN KEY (userID) REFERENCES customers(id),
    FOREIGN KEY (ProductID) REFERENCES prodacts(id)
)