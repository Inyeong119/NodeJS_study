import { useState, useEffect } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

import TodoBoard from "./components/TodoBoard";

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import api from "./utils/api";

function App() {
  const [todoList, setTodoList] = useState([]);
  const [todoValue, setTodoValue] = useState("");

  //할일 가져오기
  const getTasks = async()=>{
    const response = await api.get("/tasks");
    console.log("rrrrr",response);
    setTodoList(response.data.data);
  };

  //할일 추가하기
  const addTask = async()=>{
    try{
      const response = await api.post("/tasks",{
        task : todoValue,
        isComplete : false,
      });
      if(response.status === 200){
        console.log("success")
        //todoList 업데이트
        getTasks();
        //input 초기화
        setTodoValue("");
      }else{
        throw new Error("task can not be added");
      }
    }catch(err){
      console.log("error",err);
    }
  };

  //할일 완료하기
  const toggleComplete = async(id)=>{
    console.log("toggleComplete id:", id);
    const task = todoList.find((item)=> String(item._id) === String(id));
    console.log("찾은 task:", task);
    if (!task) {
      console.error("task를 찾을 수 없습니다!", id);
      return;
    }
    try{
      const response = await api.put(`/tasks/${id}`,{
        isComplete : !task.isComplete,
      });
      if(response.status === 200){
        getTasks();
      }else{
        throw new Error("task can not be completed");
      }
    }catch(err){
      console.log("error",err);
    }
  }

  //할일 삭제하기
  const deleteTask = async(id) => {
    try {
      const response = await api.delete(`/tasks/${id}`);
      if(response.status === 200){
        getTasks();
      } else {
        throw new Error("task can not be deleted");
      }
    } catch(err) {
      console.log("error", err);
    }
  };

  useEffect(()=>{
    getTasks();
  },[]);

  return (
    <Container>
      <Row className="add-item-row">
        <Col xs={12} sm={10}>
          <input
            type="text"
            placeholder="할일을 입력하세요"
            className="input-box"
            value={todoValue}
            onChange={(event)=>setTodoValue(event.target.value)}
          />
        </Col>
        <Col xs={12} sm={2}>
          <button className="button-add" onClick={addTask}>추가</button>
        </Col>
      </Row>
      <TodoBoard todoList={todoList} toggleComplete={toggleComplete} deleteTask={deleteTask}/>
    </Container>
  );
}

export default App;
