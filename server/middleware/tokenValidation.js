const jwt = require("jsonwebtoken");

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1]; // Extract token from "Bearer <token>"

  if (!token) {
    return res.status(401).json({ error: "Token is required for authentication." });
  }

  const secretKey = process.env.JWT_SECRET || "defaultSecret"; // Use the same secret key as in login

  jwt.verify(token, secretKey, (err, user) => {
    if (err) {
      return res.status(403).json({ error: "Invalid or expired token." });
    }
    req.user = user; // Attach the user data to the request object
    next();
  });
};

module.exports = authenticateToken;
