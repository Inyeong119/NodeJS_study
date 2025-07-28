import React from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useState } from "react";
import api from "../utils/api";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();
    
    // 필수 입력값 검증
    if (!password.trim()) {
      setErrorMessage("비밀번호를 입력해주세요");
      return;    }    
    if (!email.trim()) {
      setErrorMessage("이메일을 입력해주세요");
      return;    }

    try {
      const response = await api.post("/user/login", {email, password});
      if (response.status === 200) {
        setUser(response.data.user);
        sessionStorage.setItem("token", response.data.token);
        sessionStorage.setItem("user", JSON.stringify(response.data.user));
        api.defaults.headers["Authorization"] = `Bearer ${response.data.token}`;
        setErrorMessage("");
        navigate("/");
      }
      else {
        throw new Error(response.data.error);
      }
    } catch (error) {
      console.log("Login error:", error);
      // 서버에서 오는 에러 메시지를 사용자 친화적으로 변경
      const errorMsg = error.error || error.message || "로그인 중 오류가 발생했습니다.";
      
      if (errorMsg.includes("패스워드가 일치하지 않습니다") || 
          errorMsg.includes("존재하지 않는 유저입니다")) {
        setErrorMessage("아이디 또는 비밀번호가 일치하지 않습니다.");
      } else {
        setErrorMessage(errorMsg);
      }
    }
  };

  return (
    <div className="display-center">
      <Form className="login-box" onSubmit={handleLogin}>
        <h1>로그인</h1>
        {errorMessage && (
          <div className="alert alert-danger" role="alert">
            {errorMessage}
          </div>
        )}
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control 
            type="email" 
            placeholder="Enter email" 
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control 
            type="password" 
            placeholder="Password" 
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </Form.Group>
        <div className="button-box">
          <Button type="submit" className="button-primary">
            Login
          </Button>
          <span>
            계정이 없다면? <Link to="/register">회원가입 하기</Link>
          </span>
        </div>
      </Form>
    </div>
  );
};

export default LoginPage;
