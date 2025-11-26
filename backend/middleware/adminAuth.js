import jwt from "jsonwebtoken";

const adminAuth = async (req, res, next) => {
    try {
        const {token} = req.headers;
        if (!token) {
            return res.status(401).json({success:false, message:"Unauthorized: No token"});
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if (token !== process.env.ADMIN_EMAIL + process.env.ADMIN_PASSWORD) {
            return res.status(401).json({success:false, message:"Unauthorized: Invalid token"});
        }
        next();
    } catch (error) {
        console.log(error);
        return res.status(401).json({success:false, message:"Unauthorized: Invalid token"});    
    }
};

export default adminAuth;