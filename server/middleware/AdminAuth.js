const jwt = require('jsonwebtoken')
require('dotenv').config();
const authenticateAdmin = async(req,res,next)=>{
    const token = req.headers['x-access-token'];
    if (!token) {
        return res.status(403).json({ auth: false, message: 'No token provided.' });
    }

    jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
        if (err) {
            return res.status(500).json({ auth: false, message: 'Failed to authenticate token.',err });
        }

        if (decoded.role !== 'Admin') {
            return res.status(403).json({ auth: false, message: 'Requires admin role.' });
        }

        req.userId = decoded.id;
        next();
    });

}
module.exports = authenticateAdmin;