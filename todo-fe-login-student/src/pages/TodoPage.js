import React, { useEffect, useState } from "react";
import TodoBoard from "../components/TodoBoard";
import api from "../utils/api";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import { useNavigate } from "react-router-dom";

const TodoPage = () => {
  const navigate = useNavigate();
  const [todoList, setTodoList] = useState([]);
  const [todoValue, setTodoValue] = useState("");
  const [user, setUser] = useState(null);

  const getTasks = async () => {
    const response = await api.get("/tasks");
    setTodoList(response.data.data);
  };
  useEffect(() => {
    // 로그인 상태 확인
    const token = sessionStorage.getItem("token");
    const userData = sessionStorage.getItem("user");
    
    if (token && userData) {
      setUser(JSON.parse(userData));
      getTasks();
    }
    // 로그인되지 않은 경우에도 페이지는 표시 (할일 목록은 로드하지 않음)
  }, []);
  const addTodo = async () => {
    if (!user) {
      alert("로그인이 필요합니다.");
      return;
    }
    
    if (!todoValue.trim()) {
      alert("할일을 입력해주세요.");
      return;
    }
    
    try {
      const response = await api.post("/tasks", {
        task: todoValue,
        isComplete: false,
      });
      if (response.status === 200) {
        getTasks();
      }
      setTodoValue("");
    } catch (error) {
      console.log("error:", error);
      alert("할일 추가 중 오류가 발생했습니다.");
    }
  };

  const deleteItem = async (id) => {
    try {
      console.log(id);
      const response = await api.delete(`/tasks/${id}`);
      if (response.status === 200) {
        getTasks();
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  const toggleComplete = async (id) => {
    try {
      const task = todoList.find((item) => item._id === id);
      const response = await api.put(`/tasks/${id}`, {
        isComplete: !task.isComplete,
      });
      if (response.status === 200) {
        getTasks();
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("user");
    setUser(null);
    setTodoList([]); // 할일 목록 초기화
  };

  const handleLogin = () => {
    navigate("/login");
  };

  return (
    <Container>
      {/* 사용자 정보 및 로그인/로그아웃 버튼 */}
      <Row className="user-info-row">
        <Col xs={12}>
          <div className="user-info">
            <div className="user-greeting">
              {user ? `${user.username}님, 안녕하세요!` : "할일을 관리해보세요!"}
            </div>
            {user ? (
              <button onClick={handleLogout} className="button-logout">
                로그아웃
              </button>
            ) : (
              <button onClick={handleLogin} className="button-login">
                로그인
              </button>
            )}
          </div>
        </Col>
      </Row>

      <Row className="add-item-row">
        <Col xs={12} sm={10}>
          <input
            type="text"
            placeholder="할일을 입력하세요"
            onChange={(event) => setTodoValue(event.target.value)}
            className="input-box"
            value={todoValue}
          />
        </Col>
        <Col xs={12} sm={2}>
          <button onClick={addTodo} className="button-add">
            추가
          </button>
        </Col>
      </Row>

      <TodoBoard
        todoList={todoList}
        deleteItem={deleteItem}
        toggleComplete={toggleComplete}
      />
    </Container>
  );
};

export default TodoPage;
