const express = require("express");

const setGlobalMiddleware = (app) => {
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());
};

module.exports.setGlobalMiddleware = setGlobalMiddleware;
