import React, { useState } from "react";
import "../styles/Todo.css";
import db from "../firebase";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import { Button } from "@material-ui/core";

function rand() {
    return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
    const top = 50 + rand();
    const left = 50 + rand();

    return {
        top: `${top}%`,
        left: `${left}%`,
        transform: `translate(-${top}%, -${left}%)`,
    };
}

const useStyles = makeStyles((theme) => ({
    paper: {
        position: "absolute",
        // width: 400,
        backgroundColor: theme.palette.background.paper,
        border: "2px solid #000",
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
}));

function Todo(props) {
    const classes = useStyles();
    // getModalStyle is not a pure function, we roll the style only on the first render
    const [modalStyle] = React.useState(getModalStyle);
    const [open, setOpen] = useState(false);
    const [input, setInput] = useState();

    const handleOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    // update todo
    const updateTodo = () => {
        db.collection("todos")
            .doc(props.todo.id)
            .set(
                {
                    todo: {
                        input: input,
                    },
                },
                { merge: true }
            );

        setOpen(false); // close modal after update
    };

    return (
        <div className="todo__slot">
            <div className="todo">
                {/* <h1>{props.todo.id}</h1> */}
                <h4 className="todo__text">{props.todo.todo.input}</h4>
                <p className="todo__timestamp">{"⏰ " + props.todo.todo.due}</p>
            </div>
            {/* Edit Button */}
            <div className="edit__button">
                <button className="edit__btn" onClick={handleOpen}>
                    Edit
                </button>
                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="simple-modal-title"
                    aria-describedby="simple-modal-description"
                >
                    <div style={modalStyle} className={classes.paper}>
                        <h1>Editing...</h1>
                        <input
                            placeholder={props.todo.todo.input}
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                        />
                        <Button onClick={updateTodo}>Update</Button>
                    </div>
                </Modal>
            </div>
            {/* Delete Button */}
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
