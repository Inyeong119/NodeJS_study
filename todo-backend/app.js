const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const indexRouter = require('./routes/index');
require('dotenv').config();
const MONGO_DB_PROD = process.env.MONGO_DB_PROD;
console.log("MONGO_DB_PROD",MONGO_DB_PROD);
const app = express();
app.use(bodyParser.json());
app.use(cors());
app.use("/api",indexRouter);

const mongoURI = MONGO_DB_PROD;

mongoose.connect(mongoURI,{useNewURLParser:true}).then(()=>{
  console.log("mongoose connected");
})
  .catch((error)=>{
    console.log("DB Connection fail",err);
  });

app.listen(process.env.PORT || 5000,()=>{
  console.log("server on 5000");
})

//1.회원가입
//유저가 이메일,패스워드,유저이름 입력해서 보냄
//받은 정보를 저장함 (데이터베이스 모델 필요)
//패스워드를 암호화 시켜서 저장

//1) 라우터 만들기
//2) 모델
//3) 데이터 저장 (이미 가입된 유저 유무, 패스워드 암호화)
//4) 응답 보내기


//2.로그인
// 이메일 패스워드 입력해서 보냄
// DB에서 해당 이메일&패스워드를 가진 유저가 있는지 확인
// 없으면 로그인 실패
// 있으면 유저정보+토큰
// 프론트엔드에서는 이 정보를 저장

//1) 라우터 만들기
//2) 이메일/패스워드 정보 읽어오기
//3) 데이터베이스에서 이메일 갖고 유저 정보 찾기
//4) 패스워드 비교 (암호화된 패스워드 비교)
//5) 맞으면 토큰 생성 (jwt)
//6) 틀리면 에러 메세지
//7) 응답 보내기




