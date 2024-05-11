const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

const requireAuth = async (req, res, next) => {
    const { authorization } = req.headers;
    if (!authorization) {
        return res.status(401).json({ error: "Authorization token required" });
    }

    // authorization = "Bearer " + token
    // verify the token
    const token = authorization.replace("Bearer ", "");
    try {
        const {_id} = jwt.verify(token, process.env.JWT_SECRET)

        req.user = await User.findById({ _id }).select('_id');
        next();
    } catch (err) {
        res.status(401).json({ error: "Invalid token: Request is not authorized" });
    }
    
}

module.exports = requireAuth;