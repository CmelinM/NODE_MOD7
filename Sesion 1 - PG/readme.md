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