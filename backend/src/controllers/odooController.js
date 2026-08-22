const db = require('../config/db');
const { syncTripToOdoo, checkOdooConnection } = require('../services/odooClient');

/**
 * POST /api/trips/:id/sync-odoo
 * Export trip to Odoo
 */
async function syncTrip(req, res, next) {
  try {
    const tripId = req.params.id;

    // Fetch trip details
    const tripRes = await db.query(
      `SELECT t.*, b.total_budget, b.currency, u.name as user_name
       FROM trips t
       LEFT JOIN budget b ON b.trip_id = t.id
       LEFT JOIN users u ON u.id = t.user_id
       WHERE t.id = $1`,
      [tripId]
    );

    if (tripRes.rows.length === 0) {
      return res.status(404).json({ error: 'Trip not found.' });
    }

    const trip = tripRes.rows[0];

    // Fetch stops
    const stopsRes = await db.query('SELECT * FROM stops WHERE trip_id = $1 ORDER BY order_index ASC', [tripId]);
    trip.stops = stopsRes.rows;

    // Execute sync using isolated Odoo module
    const syncResult = await syncTripToOdoo(trip);

    // Save sync record in odoo_sync table
    const status = syncResult.success ? 'success' : 'failed';
    const errMsg = syncResult.error || null;
    const recordId = syncResult.odooRecordId || null;
    const recordType = syncResult.odooRecordType || 'crm.lead';

    const dbSyncRes = await db.query(
      `INSERT INTO odoo_sync (trip_id, odoo_record_id, odoo_record_type, sync_status, error_message)
       VALUES ($1, $2, $3, $4, $5) RETURNING *`,
      [tripId, recordId, recordType, status, errMsg]
    );

    if (!syncResult.success) {
      return res.status(502).json({
        error: 'Failed to sync trip to Odoo',
        details: syncResult.error,
        syncRecord: dbSyncRes.rows[0],
      });
    }

    res.json({
      message: syncResult.message,
      isStub: syncResult.isStub,
      sync: dbSyncRes.rows[0],
    });

  } catch (error) {
    next(error);
  }
}

/**
 * GET /api/odoo/status
 * Check Odoo connection health
 */
async function getStatus(req, res, next) {
  try {
    const health = await checkOdooConnection();
    res.json(health);
  } catch (error) {
    next(error);
  }
}

module.exports = { syncTrip, getStatus };
