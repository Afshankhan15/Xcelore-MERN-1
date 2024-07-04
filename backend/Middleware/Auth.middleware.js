const jwt = require("jsonwebtoken");

const secret_key = process.env.JWT_SECRET;
console.log("JWT Secret Key:", secret_key); 

exports.authMiddleware = (req, res, next) => {
  const token = req.headers["x-access-token"]; // Get the token from the request headers

  if (!token) {
    return res.status(401).send("No token provided");
  }

  let decode; // Define a variable to store the decoded token

  try {
    decode = jwt.verify(token, secret_key); // Verify and store the decoded token
  } catch (err) {
    console.log("JWT Secret Key:", secret_key); 

    console.log("token", token);
    console.log("decode", decode);
    return res.status(401).send("Invalid token");
  }

  //   if token === valid && user === authorized

  req.user = decode; // Attach decoded user information to the request object
  next(); // Continue to the next middleware or route handler
};
