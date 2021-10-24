import merge from "lodash.merge";

export const controllers = {
  createOne(model, body) {
    return model.create(body);
  },

  deleteOne(docToDelete) {
    return docToDelete.remove();
  },

  getOne(docToGet) {
    return Promise.resolve(docToGet);
  },

  findByParam(model, id) {
    return model.findById(id);
  },
};

export const createOne = (model) => (req, res, next) => {
  return controllers
    .createOne(model, req.body)
    .then((doc) => res.status(201).json(doc))
    .catch((error) => next(error));
};

export const updateOne = (model) => async (req, res, next) => {
  model.findOneAndUpdate(
    { _id: req.params.id },
    req.body,
    { new: true },
    function (err, doc) {
      if (err) res.send(err);
      res.json(doc);
    }
  );
};

export const deleteOne = (model) => (req, res, next) => {
  model.remove(
    {
      _id: req.params.id,
    },
    function (err, doc) {
      if (err) res.send(err);
      res.json({ message: " successfully deleted" });
    }
  );
};

export const getOne = (model) => (req, res, next) => {
  model.findById(req.params.id, function (err, doc) {
    if (err) res.send(err);
    res.json(doc);
  });
};

export const getAll = (model) => async (req, res, next) => {
  let page = Number(req.query.page ? req.query.page : 1);
  let perPage = Number(req.query.perPage ? req.query.perPage : 10);
  let skipRecords = perPage * (page - 1);
  let docs = await model.find({}).skip(skipRecords).limit(perPage);
  return res.send(docs);
};

export const findByParam = (model) => (req, res, next, id) => {
  return controllers
    .findByParam(model, id)
    .then((doc) => {
      if (!doc) {
        next(new Error("Not Found Error"));
      } else {
        req.docFromId;
        next();
      }
    })
    .catch((error) => {
      next(error);
    });
};

export const generateControllers = (model, overrides = {}) => {
  const defaults = {
    findByParam: findByParam(model),
    getAll: getAll(model),
    getOne: getOne(model),
    deleteOne: deleteOne(model),
    updateOne: updateOne(model),
    createOne: createOne(model),
  };

  return { ...defaults, ...overrides };
};
