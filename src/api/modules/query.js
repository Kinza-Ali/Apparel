import merge from "lodash.merge";
import { notFoundResponse, successResponsePost } from "./apiResponses.js";

export const createOne = (model) => (req, res, next) => {
  let route = "post";

  return model
    .create(req.body)
    .then((doc) => {
      res.send(successResponsePost(doc, route));
    })
    .catch((error) => {
      next(error);
    });
};

export const updateOne = (model) => async (req, res, next) => {
  let route = "update";
  model.findOneAndUpdate(
    { _id: req.params.id },
    req.body,
    { new: true },
    function (err, doc) {
      console.log("error: " + err);
      if (err || !doc) res.status(404).send(notFoundResponse());
      res.send(successResponsePost(doc, route));
    }
  );
};

export const deleteOne = (model) => (req, res, next) => {
  let route = "delete";
  model.remove(
    {
      _id: req.params.id,
    },
    function (err, doc) {
      if (err || !doc) res.status(404).send(notFoundResponse());
      res.send(successResponsePost(doc, route));
    }
  );
};

export const getOne = (model) => (req, res, next) => {
  let route = "get";
  model.findById(req.params.id, function (err, doc) {
    if (err || !doc) return res.status(404).send(notFoundResponse());
    res.send(successResponsePost(doc, route));
  });
};

export const getAll = (model) => async (req, res, next) => {
  let route = "get";
  let page = Number(req.query.page ? req.query.page : 1);
  let perPage = Number(req.query.perPage ? req.query.perPage : 19);
  let skipRecords = perPage * (page - 1);
  let docs = await model.find({}).skip(skipRecords).limit(perPage);
  return res.send(successResponsePost(docs, route));
};

export const generateControllers = (model, overrides = {}) => {
  const defaults = {
    getAll: getAll(model),
    getOne: getOne(model),
    deleteOne: deleteOne(model),
    updateOne: updateOne(model),
    createOne: createOne(model),
  };

  return { ...defaults, ...overrides };
};
