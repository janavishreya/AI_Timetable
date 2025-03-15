// exports.isAuthenticated = (req, res, next) => {
//     if (req.session.user) {
//       return next();
//     }
//     res.status(401).json({ message: "Unauthorized" });
//   };
  
//   exports.isAdmin = (req, res, next) => {
//     if (req.session.user && req.session.user.role === "admin") {
//       return next();
//     }
//     res.status(403).json({ message: "Forbidden: Admin access required" });
//   };
  