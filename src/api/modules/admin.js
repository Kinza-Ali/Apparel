export const admin = (req, res, next) => {
  if (req.user.role != "admin") return res.status(403).send("Not Authorized ");
  next();
};
