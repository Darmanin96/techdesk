const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');

const authRoutes = require('./routes/auth.routes');
const usuariosRoutes = require('./routes/usuarios.routes');
const clientesRoutes = require('./routes/clientes.routes');
const tecnicosRoutes = require('./routes/tecnicos.routes');
const dispositivosRoutes = require('./routes/dispositivos.routes');
const incidenciasRoutes = require('./routes/incidencias.routes');
const { errorHandler } = require('./middlewares/error.middleware');

const app = express();

app.use(helmet());
app.use(cors({ origin: process.env.FRONTEND_URL || '*', credentials: true }));
app.use(rateLimit({ windowMs: 15 * 60 * 1000, max: 200 }));
app.use(express.json());
app.use(morgan('dev'));

app.get('/health', (req, res) => res.json({ status: 'ok', timestamp: new Date() }));

app.use('/api/auth', authRoutes);
app.use('/api/usuarios', usuariosRoutes);
app.use('/api/clientes', clientesRoutes);
app.use('/api/tecnicos', tecnicosRoutes);
app.use('/api/dispositivos', dispositivosRoutes);
app.use('/api/incidencias', incidenciasRoutes);

app.use(errorHandler);

module.exports = app;