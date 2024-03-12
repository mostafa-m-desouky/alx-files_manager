const { Request, Response, NextFunction } = require('express');

class APIError extends Error {
    constructor(code, message) {
      super();
      this.code = code || 500;
      this.message = message;
    }
  }

const errorResponse = (err, req, res, next) => {
  const defaultMsg = `Failed to process ${req.url}`;

  if (err instanceof APIError) {
    res.status(err.code).json({ error: err.message || defaultMsg });
    return;
  }
  res.status(500).json({
    error: err ? err.message || err.toString() : defaultMsg,
  });
};

module.exports = {
    APIError,
    errorResponse
}