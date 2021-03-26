import React, { useState, useEffect } from "react";
import "./App.css";
import Todo from "./components/Todo";
import Button from "@material-ui/core/Button";
import { FormControl, Input, InputLabel, TextField } from "@material-ui/core";
import moment from "moment";
import db from "./firebase";
import firebase from "firebase";

function App() {
    const [todos, setTodos] = useState([]);
    const [input, setInput] = useState("");
    const [due, setDue] = useState(moment().format("YYYY-MM-DD"));

    // fetch todo items from firebase and update the database as item added/removed
    useEffect(() => {
        db.collection("todos")
            .orderBy("timestamp", "desc")
            .onSnapshot((snapshot) => {
                setTodos(
                    snapshot.docs.map((doc) => ({
                        id: doc.id,
                        todo: doc.data().todo,
                    }))
                );
            });
    }, []);

    const addTodo = (e) => {
        e.preventDefault(); // stop the refresh
        // setTodos([...todos, { input: input, due: due }]);
        db.collection("todos").add({
            todo: {
                input: input,
                due: due,
            },
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        });
        setInput("");
        setDue(moment().format("YYYY-MM-DD"));
    };

    return (
        <div className="App">
            <h1>React Firebase Todo App 🚀</h1>
            {/* User Input Section */}
            <form>
                <FormControl>
                    <div className="user__input">
                        <div className="task_entry">
                            <InputLabel>👋 Write your task</InputLabel>
                            <Input
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                            />
                        </div>

                        <div className="due_entry">
                            <TextField
                                value={due}
                                onChange={(e) => setDue(e.target.value)}
                                id="date"
                                label="Due"
                                type="date"
                                defaultValue={moment().format("YYYY-MM-DD")}
                                className="date__picker"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                        </div>

                        <div className="add_button">
                            <Button
                                disabled={!input}
                                type="submit"
                                onClick={addTodo}
                                variant="contained"
                                color="primary"
                            >
                                Add
                            </Button>
                        </div>
                    </div>
                </FormControl>
            </form>

            {/* Todo Display Section */}
            <ul>
                {todos.map((todo) => (
                    <Todo todo={todo} />
                ))}
            </ul>
        </div>
    );
}

export default App;
