export function checkAuth(req, res, next) {
  console.log(req.user);
  if (req.user) return next();
  return res.status(401).json({ msg: "Not Authorized" });
}
