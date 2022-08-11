const pool = require('../utils/pool');

module.exports = class Item {
  id;
  description;
  qty;
  user_id;
  bought;

  constructor(row) {
    this.id = row.id;
    this.description = row.description;
    this.qty = row.qty;
    this.user_id = row.user_id;
    this.bought = row.bought;
  }

  static async getById(id) {
    const { rows } = await pool.query(
      `
    SELECT * 
    FROM items 
    WHERE id=$1`,
      [id]
    );

    if (!rows[0]) {
      return null;
    }
    return new Item(rows[0]);
  }

  static async insert({ description, qty, user_id }) {
    const { rows } = await pool.query(
      `
      INSERT INTO items (description, qty, user_id)
      VALUES ($1, $2, $3)
      RETURNING *;
    `,
      [description, qty, user_id]
    );

    return new Item(rows[0]);
  }
};
