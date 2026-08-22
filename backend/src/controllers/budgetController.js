const db = require('../config/db');

/**
 * GET /api/trips/:id/budget
 * Fetch budget summary and category cost breakdown for a trip
 */
async function getBudget(req, res, next) {
  try {
    const tripId = req.params.id;

    const budgetRes = await db.query(
      `SELECT * FROM budget WHERE trip_id = $1`,
      [tripId]
    );

    if (budgetRes.rows.length === 0) {
      return res.status(404).json({ error: 'Budget not found for this trip.' });
    }

    const breakdownRes = await db.query(
      `SELECT * FROM cost_breakdown WHERE trip_id = $1`,
      [tripId]
    );

    res.json({
      budget: budgetRes.rows[0],
      cost_breakdown: breakdownRes.rows,
    });
  } catch (error) {
    next(error);
  }
}

/**
 * PUT /api/trips/:id/budget
 * Update total budget or spent amount
 */
async function updateBudget(req, res, next) {
  try {
    const tripId = req.params.id;
    const { total_budget, spent_so_far, currency, cost_breakdown } = req.body;

    // Check budget existence
    const check = await db.query('SELECT id FROM budget WHERE trip_id = $1', [tripId]);

    let updatedBudget;
    if (check.rows.length === 0) {
      const insert = await db.query(
        `INSERT INTO budget (trip_id, total_budget, spent_so_far, currency)
         VALUES ($1, $2, $3, $4) RETURNING *`,
        [tripId, Number(total_budget) || 0, Number(spent_so_far) || 0, currency || '₹']
      );
      updatedBudget = insert.rows[0];
    } else {
      const update = await db.query(
        `UPDATE budget
         SET total_budget = COALESCE($1, total_budget),
             spent_so_far = COALESCE($2, spent_so_far),
             currency = COALESCE($3, currency)
         WHERE trip_id = $4 RETURNING *`,
        [total_budget, spent_so_far, currency, tripId]
      );
      updatedBudget = update.rows[0];
    }

    // Update cost breakdown if provided
    if (cost_breakdown && Array.isArray(cost_breakdown)) {
      await db.query('DELETE FROM cost_breakdown WHERE trip_id = $1', [tripId]);
      for (let item of cost_breakdown) {
        await db.query(
          `INSERT INTO cost_breakdown (trip_id, category, estimated_cost, actual_cost)
           VALUES ($1, $2, $3, $4)`,
          [tripId, item.category, Number(item.estimated_cost) || 0, Number(item.actual_cost) || 0]
        );
      }
    }

    const finalBreakdown = await db.query('SELECT * FROM cost_breakdown WHERE trip_id = $1', [tripId]);

    res.json({
      message: 'Budget updated successfully',
      budget: updatedBudget,
      cost_breakdown: finalBreakdown.rows,
    });
  } catch (error) {
    next(error);
  }
}

module.exports = { getBudget, updateBudget };
