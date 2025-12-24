import JWT from "jsonwebtoken";

export default async (req, res, next) => {
  try {
    // Check if authorization header exists
    const authHeader = req.headers["authorization"];
    if (!authHeader) {
      return res.status(401).send({
        success: false,
        message: "No authorization header provided",
      });
    }

    // Extract token => Brearer token
    const token = authHeader.split(" ")[1];
    if (!token) {
      return res.status(401).send({
        success: false,
        message: "Token not provided",
      });
    }

    // Verify token
    JWT.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        return res.status(401).send({
          success: false,
          message: "Unauthorized user!",
        });
      }

      // Attach user ID to req for further use
      req.userId = decoded.id;
      next();
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in auth middleware",
      error,
    });
  }
};
