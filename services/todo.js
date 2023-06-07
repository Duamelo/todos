
const { pool } = require("../db");

async function createTodo(data) {
    try {
        if (!data.title || !data.description || !data.completed)
            throw new Error("Some attribute are missing");
        const todo = await pool.query(
            "INSERT INTO todo (title, description, completed) VALUES ($1, $2, $3) returning *",
            [data.title, data.description, data.completed]
        );
        return todo["rows"]; 
    } catch (error) {
      console.error(error);
    }
  }

  async function getTodoById(id) {
    try {
        const todo = await pool.query("SELECT * FROM todo where id = $1", [id]);
        return todo["rows"];
    } catch (error) {
        console.error(error);
    }
  }

  async function deleteTodoById(id) {
    try {
        const isExist = await getTodoById(id);
        
        if (!isExist.length)
            throw new Error("This todo does not exist");

        const todoDeleted = await pool.query("DELETE FROM todo where id = $1 returning *", [id]);
        return todoDeleted["rows"];
    } catch (error) {
      console.error(error);
    }
  }
  
  async function getAllTodos() {
    try {
        const todos = await pool.query("SELECT * FROM todo");
        return todos["rows"];
    } catch (error) {
        console.error(error);
    }
  }

  async function updateTodo(id, data){
    try {
        if (!data.title || !data.description || !data.completed)
            throw new Error("Some attribute are missing");

        const todo = await pool.query("UPDATE todo SET title = $2, description = $3, completed = $4 WHERE id = $1 returning *", [
            id,
            data.title,
            data.description,
            data.completed
          ]);

        return todo["rows"];
    } catch (error) {
        console.error(error);
    }
  }
  
  module.exports = { createTodo, updateTodo, getAllTodos, getTodoById, deleteTodoById};