import { Button } from "@material-ui/core";
import React from "react";
import "../styles/Todo.css";
import db from "../firebase";

function Todo(props) {
    return (
        <div className="todo__slot">
            <div className="todo">
                {/* <h1>{props.todo.id}</h1> */}
                <h4 className="todo__text">{props.todo.todo.input}</h4>
                <p className="todo__timestamp">{"⏰ " + props.todo.todo.due}</p>
            </div>
            <div className="delete__button">
                <button
                    className="del__btn"
                    onClick={(event) =>
                        db.collection("todos").doc(props.todo.id).delete()
                    }
                >
                    ❌
                </button>
            </div>
        </div>
    );
}

export default Todo;
