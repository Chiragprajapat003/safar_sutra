const app = require('./app');
require('dotenv').config();

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => {
  console.log(`
=====================================================
  🧵 SafarSutra Backend Server Running!
  ---------------------------------------------------
  ➜ Port:       http://localhost:${PORT}
  ➜ Health:     http://localhost:${PORT}/api/health
  ➜ Environment: ${process.env.NODE_ENV || 'development'}
=====================================================
  `);
});

module.exports = server;
