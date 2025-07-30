const authController = {};
const jwt = require('jsonwebtoken');
require('dotenv').config();
const User = require('../model/User');

authController.authenticate = async(req, res, next) => {
    try{
        const tokenString = req.headers.authorization;
        if (!tokenString) {
            return res.status(401).json({status:'fail', error: '토큰이 없습니다.'});
        };
        const token = tokenString.replace("Bearer ", "");
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        
        // 사용자 정보를 데이터베이스에서 가져와서 req.user에 저장
        const user = await User.findById(decoded._id);
        if (!user) {
            return res.status(401).json({status:'fail', error: '사용자를 찾을 수 없습니다.'});
        }
        
        req.user = user;
        next();
    } catch (error) {
        return res.status(401).json({status:'fail', error: error.message});
    }
}

module.exports = authController;