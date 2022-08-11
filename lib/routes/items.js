const { Router } = require('express');
const Item = require('../models/Item');
const authorizeItem = require('../middleware/authenticate');

module.exports = Router()
  .param('id', (req, res, next, id) => {
    req.id = id;
    next();
  })

  .post('/', async ({ body, user }, res, next) => {
    console.log(user, 'BODY');
    try {
      const item = await Item.insert({ ...body, user_id: user.id });
      res.json(item);
    } catch (e) {
      next(e);
    }
  })

  .get('/:id', authorizeItem, async ({ id }, res, next) => {
    try {
      const item = await Item.getById(id);
      res.json(item);
    } catch (e) {
      next(e);
    }
  });
