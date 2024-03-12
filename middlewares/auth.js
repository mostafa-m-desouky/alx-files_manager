const { Request, Response, NextFunction } = require('express');
const { getUserFromXToken, getUserFromAuthorization } = require('../utils/auth');

const basicAuthenticate = async (req, res, next) => {
    const user = await getUserFromAuthorization(req);
  
    if (!user) {
      res.status(401).json({ error: 'Unauthorized' });
      return;
    }
    req.user = user;
    next();
};

const xTokenAuthenticate = async (req, res, next) => {
    const user = await getUserFromXToken(req);
  
    if (!user) {
      res.status(401).json({ error: 'Unauthorized' });
      return;
    }
    req.user = user;
    next();
};

module.exports = {
    basicAuthenticate,
    xTokenAuthenticate
}