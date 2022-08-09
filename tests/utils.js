const pool = require('../lib/utils/pool.js');
const { readFileSync } = require('node:fs');
const sql = readFileSync('./sql/setup.sql', 'utf-8');

function setupDb() {
  return pool.query(sql);
}

function closeAll() {
  return pool.end();
}

afterAll(closeAll);

module.exports = {
  setupDb,
};
