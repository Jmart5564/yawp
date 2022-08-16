-- Use this file to define your SQL tables
-- The SQL in this file will be executed when you run `npm run setup-db`
DROP TABLE IF EXISTS reviews;
DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS restaurants;

CREATE TABLE users (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  email TEXT NOT NULL,
  password_hash TEXT NOT NULL
);

INSERT INTO users (first_name, last_name, email, password_hash) VALUES
('Momo', 'Cat', 'Momo@cat.com', 'momothecat'),
('Oz', 'Dog', 'Oz@dog.com', 'ozthedog');

CREATE TABLE restaurants (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  name VARCHAR NOT NULL,
  cuisine VARCHAR,
  city VARCHAR NOT NULL
);

INSERT INTO restaurants (name, cuisine, city) VALUES
('Dizzy Hen', 'Brunch', 'Philomath, OR'),
('The Bier Library', 'French/Belgian', 'Corvallis, OR'),
('Ginger and Baker', 'Brunch Cafe', 'Fort Collins, CO'),
('Flavors of India', 'Indian', 'Sandy, OR'),
('High Water Mark', 'Vegan Bar', 'Portland, OR');

CREATE TABLE reviews (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  stars SMALLINT NOT NULL CONSTRAINT five_stars CHECK(stars >= 0 AND stars <= 5),
  description TEXT,
  restaurant_id BIGINT NOT NULL,
  user_id BIGINT NOT NULL,
  FOREIGN KEY (restaurant_id) REFERENCES restaurants(id),
  FOREIGN KEY (user_id) REFERENCES users(id)
);

INSERT INTO reviews (stars, description, restaurant_id, user_id) VALUES
(5, 'Best food cart in Sandy!!', 4, 2),
(3, 'Foods alright but they have amazing bands play!', 5, 1),
(5, 'The owners are so nice and the food is amazing! Best cappucinos in town!', 1, 1),
(4, 'Expensive but the food, coffee and cocktails are amazing, they have health meals for your pups as well', 3, 2),
(5, 'Amazing owners, great beer selection and a fun ambiance!', 2, 2),
(5, 'beer, vegan food, and bands! What more do you need?', 5, 2);