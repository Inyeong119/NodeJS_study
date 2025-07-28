import React from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useState } from "react";
import api from "../utils/api";
import { useNavigate } from "react-router-dom";

const RegisterPage = () => {

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    // 필수 입력값 검증
    if (!username.trim()) {
      setErrorMessage("이름을 입력해주세요");
      return;
    }
    
    if (!email.trim()) {
      setErrorMessage("이메일을 입력해주세요");
      return;
    }
    
    if (!password.trim()) {
      setErrorMessage("비밀번호를 입력해주세요");
      return;
    }
    
    try {
      if (password !== confirmPassword) {
        throw new Error("비밀번호가 일치하지 않습니다. 다시 입력해주세요");
      }
      const response = await api.post("/user", {
        username, email, password});   
      if (response.status === 200) {
        alert("회원가입이 완료되었습니다!");
        navigate("/login");
      }
      else {
        throw new Error(response.data.error);
      }
    } catch (error) {
      console.log("Register error:", error);
      const errorMsg = error.error || error.message || "회원가입 중 오류가 발생했습니다.";
      
      if (errorMsg.includes("이미 가입된 이메일입니다")) {
        setErrorMessage("이미 가입된 유저입니다. 이메일 주소를 확인해주세요.");
      } else {
        setErrorMessage(errorMsg);
      }
    }
  };

  return (
    <div className="display-center">
      <Form className="login-box" onSubmit={handleSubmit}>
        <h1>회원가입</h1>
        {errorMessage && (
          <div className="alert alert-danger" role="alert">
            {errorMessage}
          </div>
        )}
        <Form.Group className="mb-3" controlId="formName">
          <Form.Label>Name</Form.Label>
          <Form.Control 
            type="string" 
            placeholder="Name" 
            value={username}
            onChange={(event) => setUsername(event.target.value)}
          />
        </Form.Group>

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

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>re-enter the password</Form.Label>
          <Form.Control 
            type="password" 
            placeholder="re-enter the password" 
            value={confirmPassword}
            onChange={(event) => setConfirmPassword(event.target.value)}
          />
        </Form.Group>

        <Button className="button-primary" type="submit">
          회원가입
        </Button>
      </Form>
    </div>
  );
};

export default RegisterPage;
