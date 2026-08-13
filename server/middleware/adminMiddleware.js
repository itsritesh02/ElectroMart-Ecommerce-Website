// ==========================
// ADMIN MIDDLEWARE
// ==========================

const admin = (req, res, next) => {
  // ==========================
  // CHECK USER
  // ==========================

  if (!req.user) {
    return res.status(401).json({
      message: "Not authorized",
    });
  }

  // ==========================
  // CHECK ADMIN ROLE
  // ==========================

  if (req.user.role !== "admin") {
    return res.status(403).json({
      message: "Access denied. Admin only",
    });
  }

  // ==========================
  // NEXT
  // ==========================

  next();
};

export default admin;
