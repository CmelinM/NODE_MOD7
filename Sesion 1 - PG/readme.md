# Primera conexion a DB

## Definición de bd



```sql
CREATE DATABASE primera_conexion;
```

```sql
CREATE TABLE usuarios (
nombre VARCHAR,
apellido VARCHAR,
email VARCHAR
);
```

```sql
INSERT INTO usuarios (nombre, apellido, email) VALUES (
  'Juan Carlos',
  'Bodoque',
  'jbodoque@aplaplac.cl'
);
```