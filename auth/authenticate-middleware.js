/* 
  complete the middleware code to check if the user is logged in
  before granting access to the next middleware/route handler
*/

module.exports = (req, res, next) => {
	const token = req.headers.authorization;
	const secret = process.env.JWT_SECRET || "keep it a secret";
	console.log(token);
	if (token) {
		jwt.verify(token, secret, (err, decodedToken) => {
			if (err) {
				console.log(err),
					res.status(401).json({ you: "there was an error with your token" });
			} else {
        req.jwt = decodedToken;
        next();
      }
		});
	} else {
  res.status(401).json({ you: "shall not pass!" });
  }
};

