const fs = require('fs');
const path = require('path');
const db = require('../config/db');

async function migrate() {
  console.log('[Migration] Running database migrations...');
  try {
    const schemaPath = path.join(__dirname, 'schema.sql');
    const sql = fs.readFileSync(schemaPath, 'utf8');
    await db.query(sql);
    console.log('[Migration] Database tables created successfully!');
  } catch (error) {
    console.error('[Migration Error]', error.message);
    process.exit(1);
  } finally {
    db.pool.end();
  }
}

if (require.main === module) {
  migrate();
}

module.exports = migrate;
