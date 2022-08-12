const { Router } = require('express');
const Item = require('../models/Item');
const authorizeItem = require('../middleware/authorizeItem.js');

module.exports = Router()
  .param('id', (req, res, next, id) => {
    req.id = id;
    next();
  })

  .post('/', async ({ body, user }, res, next) => {
    // console.log(user, 'BODY');
    try {
      const item = await Item.insert({ ...body, user_id: user.id });
      res.json(item);
    } catch (e) {
      next(e);
    }
  })

  .get('/', async (req, res, next) => {
    // console.log(res, 'RESSSSS');
    try {
      const item = await Item.getAll(req.user.id);
      res.json(item);
    } catch (e) {
      next(e);
    }
  })

  .get('/:id', authorizeItem, async ({ id }, res, next) => {
    // console.log(res, 'RESSSSS');
    try {
      const item = await Item.getById(id);
      res.json(item);
    } catch (e) {
      next(e);
    }
  })

  .delete('/:id', authorizeItem, async ({ id }, res, next) => {
    try {
      const item = await Item.delete(id);
      res.json(item);
    } catch (e) {
      next(e);
    }
  })

  .put('/:id', authorizeItem, async ({ id, user, body }, res, next) => {
    try {
      const item = await Item.updateById(id, user.id, body);
      res.json(item);
    } catch (error) {
      next(error);
    }
  });
