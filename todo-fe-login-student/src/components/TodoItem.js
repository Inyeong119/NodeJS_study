import React from "react";
import { Col, Row } from "react-bootstrap";

const TodoItem = ({ item, deleteItem, toggleComplete }) => {
  return (
    <Row>
      <Col xs={12}>
        <div className={`todo-item ${item.isComplete ? "item-complete" : ""}`}>
          <div className="todo-content">{item.task}</div>

          <div className="todo-actions">
            <button
              className={`button-toggle ${item.isComplete ? "button-undo" : "button-complete"}`}
              onClick={() => toggleComplete(item._id)}
            >
              {item.isComplete ? "되돌리기" : "완료"}
            </button>
            <button
              className="button-delete"
              onClick={() => deleteItem(item._id)}
            >
              삭제
            </button>
          </div>
        </div>
      </Col>
    </Row>
  );
};

export default TodoItem;
