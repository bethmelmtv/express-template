const Item = require('../models/Item');

module.exports = async (req, res, next) => {
  try {
    const item = await Item.getById(req.params.id);
    if (!item || item.user_id !== req.user.id) {
      throw new Error('you dont have access to this page');
    }
    next();
  } catch (e) {
    e.status = 403; //what do all the codes mean
    next(e);
  }
};
