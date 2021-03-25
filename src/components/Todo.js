import React from "react";
import "../styles/Todo.css";

function Todo(props) {
    return (
        <div className="todo">
            <h4 className="todo__text">{props.text}</h4>
            <p className="todo__timestamp">{"⏰ " + props.due}</p>
        </div>
    );
}

export default Todo;
