# Sequelize CLI

```bash
npm install -D sequelize-cli
```

Comando inicialización

```bash
npx sequelize init # Levanta configuración inicial

npx sequelize model:generate --name NombreModelo --attributes campo:tipo,campo:tipo

npx sequelize db:create # Crea la base de datos de desarrollo
NODE_ENV=test npx sequelize db:create # crea db de ambiente "test"

npx sequelize db:migrate # Crea tabla de la última migración ambiente desarrollo
```

```js

// geters personalizados
    createdAt: {
      type: DataTypes.DATE,
      get() {
        const formatDate = this.getDataValue("createdAt")
        // TODO: terminar de formatear la fecha
        return formatDate.getFullYear()
      }
    }
```