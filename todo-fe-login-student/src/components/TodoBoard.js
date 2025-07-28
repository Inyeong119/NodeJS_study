import React from "react";
import TodoItem from "./TodoItem";

const TodoBoard = ({ todoList, deleteItem, toggleComplete }) => {
  return (
    <div className="todo-board">
      <h2>Todo List</h2>
      {todoList.length > 0 ? (
        todoList.map((item, index) => (
          <TodoItem
            item={item}
            key={index}
            deleteItem={deleteItem}
            toggleComplete={toggleComplete}
          />
        ))
      ) : (
        <div className="empty-state">
          <p>할일이 없습니다.</p>
          <p>새로운 할일을 추가해보세요!</p>
        </div>
      )}
    </div>
  );
};

export default TodoBoard;
