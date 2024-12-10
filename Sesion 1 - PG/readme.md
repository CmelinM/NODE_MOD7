# Primera conexion a DB

## Definición de bd

```sql
CREATE DATABASE primera_conexion;
```

```sql
CREATE TABLE usuarios( 
	nombre VARCHAR, 
	apellido VARCHAR, 
	email VARCHAR UNIQUE NOT NULL, 
	password VARCHAR NOT NULL, 
	id SERIAL PRIMARY KEY 
);
```

```sql
INSERT INTO usuarios (nombre, apellido, email, password) VALUES (
  'Juan Carlos',
  'Bodoque',
  'jbodoque@aplaplac.cl',
	'asd90182390'
);
```

```sql
CREATE TABLE animes(
    id SERIAL PRIMARY KEY,
    nombre VARCHAR NOT NULL,
    genero VARCHAR NOT NULL,
    year INT NOT NULL,
    autor VARCHAR NOT NULL
);

ALTER TABLE animes
ADD stock int NOT NULL DEFAULT 10;

ALTER TABLE animes
ADD CONSTRAINT check_stock_no_negativo CHECK (stock >= 0);

ALTER TABLE animes ADD CONSTRAINT unique_anime UNIQUE(nombre, autor);

INSERT INTO animes (nombre, genero, year, autor) VALUES 
('Naruto', 'Shounen', '2002', 'Masashi Kishimoto'),
('Attack on Titan', 'Shounen', '2013', 'Hajime Isayama'),
('Death Note', 'Thriller', '2006', 'Tsugumi Ohba'),
('Fullmetal Alchemist: Brotherhood', 'Shounen', '2009', 'Hiromu Arakawa'),
('Cowboy Bebop', 'Sci-Fi', '1998', 'Hajime Yatate'),
('One Piece', 'Shounen', '1999', 'Eiichiro Oda'),
('My Neighbor Totoro', 'Fantasy', '1988', 'Hayao Miyazaki'),
('Demon Slayer', 'Shounen', '2019', 'Koyoharu Gotouge'),
('Spirited Away', 'Fantasy', '2001', 'Hayao Miyazaki'),
('Your Name', 'Romance', '2016', 'Makoto Shinkai');
```