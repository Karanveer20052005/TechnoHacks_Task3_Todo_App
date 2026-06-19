const express = require("express");

const app = express();

app.use(express.json());
app.use(express.static("public"));

let tasks = [];

// GET
app.get("/tasks", (req, res) => {
    res.json(tasks);
});

// POST
app.post("/tasks", (req, res) => {
    tasks.push(req.body);
    res.json({ message: "Task Added" });
});

// PUT
app.put("/tasks/:index", (req, res) => {
    tasks[req.params.index] = req.body;
    res.json({ message: "Task Updated" });
});

// DELETE
app.delete("/tasks/:index", (req, res) => {
    tasks.splice(req.params.index, 1);
    res.json({ message: "Task Deleted" });
});

app.listen(3000, () => {
    console.log("Todo Manager Running 🚀");
});