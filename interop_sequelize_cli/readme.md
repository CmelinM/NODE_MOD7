# Sequelize CLI

Pasos

1. Iniciamos proyecto Sequelize

    ```bash
    npx sequelize init
    ```

    Crea archivo `config/config.js`, y carpetas `models`, `migrations`, `seeds`

2. En config.js se definen variables de conexión

3. Crear base de datos:

    ```bash
    npx sequelize db:create
    ```

    Crea la base de datos en ambiente desarrollo

4. Definición del modelo con sequelize-cli

    ```bash
    npx sequelize model:generate --name User --attributes name:string,lastName:string,email:string
    ```

    Crea `migrations/timestamp-user.js` `models/user.js`, cambiamos extensión a `.cjs`

5. Verificabamos estructura de migración `migrations/timestamp-user.cjs`. 

> [!WARNING]
>
> (Acá modelos llevan el nombre de la tabla, lo mismo con las relacions y llaves foráneas)

6. Verificamos estructura del modelo `models/user.cjs`


    ```javascript
    class User extends Model {
      static associate(models) {
        // define association here
        const { Purchase } = models
        this.hasMany(Purchase)

        // this representa a User
      }

    }
    ```

7. Modificamos `models/index.js`, se cambia extensión `.cjs`

    ```javascript
    fs
      .readdirSync(__dirname)
      .filter(file => {
        return (
          // Eliminamos ultimas 2 condiciones del filtro
          file.indexOf('.') !== 0 &&
          file !== basename
        );
    ```

8. Usamos modelos en controladores

    ```javascript
      import * as db from '../models/index.cjs'

      // Destructuración de los modelos
      // Donde User es el modelo
      const { User } = db.default
    ```

9. Usamos controlador en enrutador de Usuarios

10. Registramos las rutas en index.js

11. Ejecutar migraciones

    ```bash
      npx sequelize db:migrate
    ```