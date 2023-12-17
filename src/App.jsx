import React, { useEffect } from "react";
import "./App.css";
import { useState } from "react";
import { NewToDoForm } from "./NewToDoForm";
export default function App() {
  
  const [todos,setTodos] = useState(()=>{
    const localValue = localStorage.getItem("ITEMS")
    if(localValue==null)return []
    return JSON.parse(localValue);
  })
  useEffect(()=>{
    localStorage.setItem("ITEMS",JSON.stringify(todos))
  },[todos]) //anytime todos change
  function addTodo(title){
    setTodos((currentTodos)=>{
      return[
        ...currentTodos,{id: crypto.randomUUID(),title,completed: false}
      ]
    })
  }
  function toggleTodo(id,completed){
    setTodos(currentTodos=>{
      return currentTodos.map(todo=>{
        if(todo.id ===id){
          return{
            ...todo,completed
          }
        }
        return todo
      })
    })
  }
  function deleteTodo(id){
    setTodos(currentTodos=>{
      return currentTodos.filter(todo => todo.id !==id)
    })
  }
  console.log(todos);
  return (
    <>
      <NewToDoForm onSubmit={addTodo}></NewToDoForm>
      <h1 className="header">Todo List</h1>
      <ul className="list">
      {todos.length===0&& "No ToDos"}
      {todos.map(todo=>{
        return(
          <li key={todo.id}>
          <label>
            <input type="checkbox" checked={todo.completed} onChange={e=> toggleTodo(todo.id,e.target.checked)}/>
            {todo.title}
          </label>
          <button className="btn btn-danger" onClick={() =>deleteTodo(todo.id)}>Delete</button>
        </li>
        )
      })}
       
      </ul>
    </>
  );
}
