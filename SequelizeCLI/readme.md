# Sequelize CLI

Comando inicialización

```bash
npx sequelize init

npx sequelize model:generate --name NombreModelo --attribures campo:tipo,campo:tipo

npx sequelize db:create # Crea la base de datos de desarrollo
NODE_ENV=test npx sequelize db:create # crea db de ambiente "test"

npx sequelize db:migrate # Crea tabla de la última migración ambiente desarrollo
```