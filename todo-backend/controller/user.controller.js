const User = require('../model/User');
const bcrypt = require('bcryptjs');
const saltRounds = 10;
const userController ={}

userController.createUser = async(req,res)=>{
    try{
        const {username,email,password} = req.body;
        const user = await User.findOne({email});
        if(user){
            throw new Error('이미 가입된 이메일입니다.');
        };
        const salt = bcrypt.genSaltSync(saltRounds);
        const hash = bcrypt.hashSync(password,salt);
        const newUser = new User({username,email,password:hash});
        await newUser.save();
        res.status(200).json({status:'success',message:'회원가입 성공'});
        
} catch(error){
    res.status(400).json({status:'error',error:error.message});
}};

userController.loginWithEmail = async(req,res)=> {
    try{
        const {email, password} = req.body;
        const user = await User.findOne({email},"-createdAt -updatedAt -__v");
        if(!user){
            throw new Error('존재하지 않는 유저입니다.');
        };
        const isMatch = bcrypt.compareSync(password, user.password);
        if(!isMatch){
            throw new Error('패스워드가 일치하지 않습니다.');
        };
        const token = user.generateToken();
        res.status(200).json({status:'success',message:'로그인 성공',user, token});
    } catch(error){
        res.status(400).json({status:'fail',error:error.message});
    };
}

userController.getUser = async(req,res)=>{
    try{
        const user = User.findById(req.userId);
        if(!user){
            throw new Error('유저가 존재하지 않습니다.');
        };
        res.status(200).json({status:'success',user});
    } catch(error){
        res.status(400).json({status:'fail',error:error.message});
    };
}

module.exports = userController;