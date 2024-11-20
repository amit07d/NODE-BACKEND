const jwt = require("jsonwebtoken");

const jwtAuthMiddleware = (req, res, next) => {
    const token = req.headers.authorization.split(" ")[1]; 
  if (!token) return res.status(401).json({ error: "Unauthorized" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({ error: "Invalid Token" });
  }
};

const generateToken = (userData) => {
  return jwt.sign(userData, process.env.JWT_SECRET,{expiresIn:30});
};

module.exports = {jwtAuthMiddleware, generateToken};
