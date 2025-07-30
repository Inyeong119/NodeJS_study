import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import TodoPage from "./pages/TodoPage";
import RegisterPage from "./pages/RegisterPage";
import { useState, useEffect } from "react";
import PrivateRoute from "./route/PrivateRoute";
import api from "./utils/api";

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const getUser = async() => {
    try{
      const storedToken = sessionStorage.getItem("token");
      if(storedToken){
        const response = await api.get("/user/me");
        setUser(response.data.user);
      } else {
        setUser(null);
      }
    } catch (error) {
      setUser(null);
      sessionStorage.removeItem("token");
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getUser();
  }, []);
       
  // 로딩 중일 때는 아무것도 렌더링하지 않음
  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Routes>
      {/* 메인 페이지 - 로그인 필요 */}
      <Route path="/" element={
        <PrivateRoute user={user}>
          <TodoPage setUser={setUser} user={user} />
        </PrivateRoute>
      } />
      
      {/* 로그인 페이지 */}
      <Route path="/login" element={<LoginPage user={user} setUser={setUser}/>} />
      
      {/* 회원가입 페이지 */}
      <Route path="/register" element={<RegisterPage />} />
    </Routes>
  );
}

export default App;
