require('dotenv').config();
const app = require('./src/app');
const pool = require('./src/config/db');

const PORT = process.env.PORT || 3000;

const startServer = async () => {
  try {
    await pool.query('SELECT 1');
    console.log('Conexión a PostgreSQL verificada');

    app.listen(PORT, () => {
      console.log(`TechDesk backend corriendo en el puerto ${PORT}`);
    });
  } catch (error) {
    console.error('Error al iniciar el servidor:', error);
    process.exit(1);
  }
};

startServer();