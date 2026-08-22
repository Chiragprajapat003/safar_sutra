const bcrypt = require('bcryptjs');
const db = require('../config/db');

async function seed() {
  console.log('[Seed] Seeding database with demo data...');
  try {
    // 1. Clear existing data
    await db.query('TRUNCATE users, trips, stops, activities, budget, cost_breakdown, odoo_sync RESTART IDENTITY CASCADE');

    // 2. Demo User
    const passwordHash = await bcrypt.hash('demo1234', 10);
    const userRes = await db.query(
      `INSERT INTO users (name, email, password_hash, travel_preferences)
       VALUES ($1, $2, $3, $4) RETURNING id`,
      [
        'Raushan Kumar',
        'demo@safarsutra.com',
        passwordHash,
        JSON.stringify({ travelStyle: 'adventure', dreamDestinations: ['Kyoto', 'Bali'] })
      ]
    );
    const userId = userRes.rows[0].id;

    // 3. Demo Trip 1: Kyoto Autumn Journey
    const trip1Res = await db.query(
      `INSERT INTO trips (user_id, name, description, start_date, end_date, cover_photo_url, is_public, share_token, status)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING id`,
      [
        userId,
        'Kyoto Autumn Journey',
        'Temples, bamboo groves, and ancient tea ceremonies in autumn leaves.',
        '2026-10-15',
        '2026-10-19',
        'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e',
        true,
        'token_kyoto_demo_123',
        'confirmed'
      ]
    );
    const trip1Id = trip1Res.rows[0].id;

    // Stop for Trip 1
    const stop1Res = await db.query(
      `INSERT INTO stops (trip_id, city, country, lat, lng, start_date, end_date, order_index)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING id`,
      [trip1Id, 'Kyoto', 'Japan', 35.0116, 135.7681, '2026-10-15', '2026-10-19', 1]
    );
    const stop1Id = stop1Res.rows[0].id;

    // Activities for Stop 1
    const activities1 = [
      { name: 'Kiyomizu-dera Temple', desc: 'Historic temple with sweeping wooden stage over autumn maples', type: 'sightseeing', cost: 400, duration: '2h', time: '14:00', address: 'Higashiyama, Kyoto' },
      { name: 'Arashiyama Bamboo Grove', desc: 'Towering bamboo stalks glowing in morning sunlight', type: 'nature', cost: 0, duration: '1.5h', time: '07:00', address: 'Arashiyama, Kyoto' },
      { name: 'Nishiki Food Market', desc: 'Tasting local skewers, matcha sweets, and ramen', type: 'food', cost: 1500, duration: '2h', time: '12:00', address: 'Nakagyo Ward, Kyoto' },
      { name: 'Traditional Tea Ceremony', desc: 'Authentic matcha tea ceremony in Camellia Garden', type: 'culture', cost: 3500, duration: '1.5h', time: '09:00', address: 'Gion, Kyoto' }
    ];

    for (const act of activities1) {
      await db.query(
        `INSERT INTO activities (stop_id, name, description, type, cost, duration, time_slot, address)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`,
        [stop1Id, act.name, act.desc, act.type, act.cost, act.duration, act.time, act.address]
      );
    }

    // Budget for Trip 1
    await db.query(
      `INSERT INTO budget (trip_id, total_budget, spent_so_far, currency)
       VALUES ($1, $2, $3, $4)`,
      [trip1Id, 60000, 40400, '₹']
    );

    // Cost Breakdown for Trip 1
    const breakdowns1 = [
      { category: 'stay', estimated: 25000, actual: 22000 },
      { category: 'food', estimated: 15000, actual: 12000 },
      { category: 'activity', estimated: 10000, actual: 4800 },
      { category: 'transport', estimated: 10000, actual: 1600 }
    ];
    for (const cb of breakdowns1) {
      await db.query(
        `INSERT INTO cost_breakdown (trip_id, category, estimated_cost, actual_cost)
         VALUES ($1, $2, $3, $4)`,
        [trip1Id, cb.category, cb.estimated, cb.actual]
      );
    }

    // Demo Trip 2: Santorini Sunset Escape
    const trip2Res = await db.query(
      `INSERT INTO trips (user_id, name, description, start_date, end_date, cover_photo_url, is_public, share_token, status)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING id`,
      [
        userId,
        'Santorini Sunset Escape',
        'White-washed villages, cliffside villas, and Mediterranean sapphire waters.',
        '2026-11-01',
        '2026-11-05',
        'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff',
        false,
        'token_santorini_demo_456',
        'draft'
      ]
    );
    const trip2Id = trip2Res.rows[0].id;

    await db.query(
      `INSERT INTO budget (trip_id, total_budget, spent_so_far, currency)
       VALUES ($1, $2, $3, $4)`,
      [trip2Id, 120000, 35000, '₹']
    );

    console.log('[Seed] Database successfully seeded with 2 demo trips!');
  } catch (error) {
    console.error('[Seed Error]', error.message);
    process.exit(1);
  } finally {
    db.pool.end();
  }
}

if (require.main === module) {
  seed();
}

module.exports = seed;
