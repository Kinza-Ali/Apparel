export const admin = (req, res, next) => {
  if (req.user.role != 1) return res.status(403).send("Not Authorized ");
  next();
};
