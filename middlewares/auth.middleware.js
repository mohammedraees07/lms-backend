import jwt from "jsonwebtoken";

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;

  const token = authHeader?.split(" ")[1];

  if (!token) {
    return res.status(401).json({
      success: false,
      message: "Unauthorized User",
    });
  }

  try {
    const decodedInfo = jwt.verify(token, process.env.JWT_SECRET_KEY);

    req.userInfo = decodedInfo;

    next();
  } catch (error) {
    return res.status(403).json({
        success : false,
        message : 'Invlaid token'
    })
  }
};
