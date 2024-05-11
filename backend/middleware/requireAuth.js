const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

const requireAuth = async (req, res, next) => {
    console.log("checking for authorization")
    const { authorization } = req.headers;
    console.log("checking for authorization")
    if (!authorization) {
        console.log("there is no authorization")
        return res.status(401).json({ error: "Authorization token required" });
    }

    // authorization = "Bearer " + token
    // verify the token
    const token = authorization.replace("Bearer ", "");
    console.log("checking for token")
    try {
        const {_id} = jwt.verify(token, process.env.JWT_SECRET)

        req.user = await User.findById({ _id }).select('_id');
        console.log("token is valid")
        next();
    } catch (err) {
        console.log("token is invalid", err)
        res.status(401).json({ error: "Invalid token: Request is not authorized" });
    }
    
}

module.exports = requireAuth;