const axios = require('axios');

/**
 * Isolated Odoo REST / JSON-RPC Service Module
 *
 * Environment Variables required for live sync:
 * - ODOO_URL (e.g. http://localhost:8069 or https://mycompany.odoo.com)
 * - ODOO_DB (database name)
 * - ODOO_USERNAME
 * - ODOO_API_KEY
 */

const getOdooConfig = () => ({
  url: process.env.ODOO_URL || 'http://localhost:8069',
  db: process.env.ODOO_DB || 'odoo_demo',
  username: process.env.ODOO_USERNAME || 'admin',
  apiKey: process.env.ODOO_API_KEY || 'admin',
  // Default target model: crm.lead or sale.order or custom model
  // TODO: needs Odoo credentials & target model selection from user
  model: process.env.ODOO_MODEL || 'crm.lead',
});

/**
 * Check connection health to Odoo instance
 */
async function checkOdooConnection() {
  const config = getOdooConfig();

  // If no credentials provided, return stub status
  if (!process.env.ODOO_URL || process.env.ODOO_URL.includes('localhost')) {
    return {
      connected: false,
      status: 'stubbed',
      message: 'Odoo credentials not configured in .env (TODO: needs Odoo instance details)',
      endpoint: config.url
    };
  }

  try {
    const res = await axios.post(`${config.url}/jsonrpc`, {
      jsonrpc: '2.0',
      method: 'call',
      params: {
        service: 'common',
        method: 'version',
        args: []
      },
      id: Date.now()
    }, { timeout: 4000 });

    if (res.data && res.data.result) {
      return {
        connected: true,
        status: 'active',
        version: res.data.result.server_version || 'Odoo Online',
        endpoint: config.url
      };
    }

    return {
      connected: false,
      status: 'error',
      message: 'Unexpected response from Odoo JSON-RPC',
      details: res.data
    };
  } catch (error) {
    return {
      connected: false,
      status: 'unreachable',
      message: error.message,
      endpoint: config.url
    };
  }
}

/**
 * Authenticate with Odoo JSON-RPC and get uid
 */
async function authenticateOdoo(config) {
  const payload = {
    jsonrpc: '2.0',
    method: 'call',
    params: {
      service: 'common',
      method: 'authenticate',
      args: [config.db, config.username, config.apiKey, {}]
    },
    id: Date.now()
  };

  const res = await axios.post(`${config.url}/jsonrpc`, payload, { timeout: 5000 });

  if (res.data && res.data.result) {
    return res.data.result; // uid
  }

  throw new Error(res.data.error ? res.data.error.data.message : 'Odoo authentication failed');
}

/**
 * Create a trip booking record in Odoo
 */
async function syncTripToOdoo(tripData) {
  const config = getOdooConfig();
  console.log(`[Odoo Sync] Attempting sync for Trip #${tripData.id}: "${tripData.name}"`);

  // Stub response if live credentials aren't set up yet
  if (!process.env.ODOO_API_KEY || process.env.ODOO_API_KEY === 'admin' || process.env.ODOO_URL.includes('localhost')) {
    console.log('[Odoo Sync] Running in Demo Stub Mode (No live Odoo connection configured).');
    const mockRecordId = `ODOO-REC-${Date.now()}`;
    return {
      success: true,
      isStub: true,
      odooRecordId: mockRecordId,
      odooRecordType: config.model,
      message: `[Demo Mode] Trip "${tripData.name}" synced to Odoo model ${config.model} (Record ID: ${mockRecordId}). // TODO: needs live Odoo credentials from user`,
      syncedAt: new Date().toISOString()
    };
  }

  try {
    const uid = await authenticateOdoo(config);

    if (!uid) {
      throw new Error('Odoo authentication returned invalid UID');
    }

    // Prepare fields for target model (e.g. crm.lead)
    const recordValues = {
      name: `SafarSutra Booking: ${tripData.name} (${tripData.destination || 'Multi-city'})`,
      contact_name: tripData.userName || 'SafarSutra Traveler',
      description: `Trip Dates: ${tripData.start_date} to ${tripData.end_date}\nTotal Budget: ${tripData.currency || '₹'}${tripData.total_budget}\nDescription: ${tripData.description || 'AI Travel Itinerary'}`,
      planned_revenue: Number(tripData.total_budget) || 0,
    };

    const payload = {
      jsonrpc: '2.0',
      method: 'call',
      params: {
        service: 'object',
        method: 'execute_kw',
        args: [
          config.db,
          uid,
          config.apiKey,
          config.model,
          'create',
          [recordValues]
        ]
      },
      id: Date.now()
    };

    const res = await axios.post(`${config.url}/jsonrpc`, payload, { timeout: 8000 });

    if (res.data && res.data.result) {
      const odooRecordId = String(res.data.result);
      return {
        success: true,
        isStub: false,
        odooRecordId,
        odooRecordType: config.model,
        message: `Successfully created Odoo record #${odooRecordId} in model ${config.model}`,
        syncedAt: new Date().toISOString()
      };
    }

    const errMsg = res.data.error ? (res.data.error.data?.message || res.data.error.message) : 'Unknown Odoo error';
    throw new Error(errMsg);

  } catch (error) {
    console.error('[Odoo Sync Error]', error.message);
    return {
      success: false,
      isStub: false,
      error: error.message,
      syncedAt: new Date().toISOString()
    };
  }
}

module.exports = {
  checkOdooConnection,
  syncTripToOdoo,
  getOdooConfig
};
