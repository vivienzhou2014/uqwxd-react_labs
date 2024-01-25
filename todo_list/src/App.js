import React, {useState,useEffect} from "react";
import "./App.css";
//React 广泛用于构建单页面应用程序（SPA)
//this is a function component, another type is class component
const App = () => {
  //getter setter, what in bracket of useState is initial state of todos
  //setTodos() 往括号里放todos的更新,一旦检查到更新就重新渲染
  const [todos, setTodos] = useState([])
  // useEffect to load todos from localStorage on component mount
useEffect(() => {
  // Get the stored JSON representation of todos from localStorage
  const json = localStorage.getItem("todos");

  // Parse the JSON string to convert it into an array
  const loadedTodos = JSON.parse(json);

  // Check if loadedTodos is not null (i.e., there are stored todos)
  if (loadedTodos) {
    // Update the state with the loaded todos
    setTodos(loadedTodos);
  }
}, []);
// useEffect to save todos to localStorage whenever todos change
useEffect(() => {
  // Check if there are todos in the current state
  if (todos.length > 0) {
    // Convert todos array to JSON string
    const json = JSON.stringify(todos);

    // Save the JSON string to localStorage with the key "todos"
    localStorage.setItem("todos", json);
  }
}, [todos]);

  //implement editing function
  const [todoEditing, setTodoEditing] = useState(null)
  
  // Add the handlesubmit code here to give the application the power to add a new task for the to-do list app
  /*The handleSubmit handler will prevent the default action that would normally 
  be taken on the form and add a new Task using the latest value that is in the input field. 
  The user input is validated to ensure the input is non-empty 
  and doesn’t have preceeding or succeeding spaces.*/
  function handleSubmit(e){
    e.preventDefault(); //override the default behavior

    let todo = document.getElementById('todoAdd').value //retrieve an HTML element
    const newTodo = {
      id: new Date().getTime(), //using current timestamp to generate unique id
      text: todo.trim(), //trim whitespace from string
      completed: false, 
    };
    if (newTodo.text.length > 0){ //if text not empty
      setTodos([...todos].concat(newTodo)); //append newTodo to exisiting todos[]
    }else{
      alert("Enter Valid Task")
    }
    document.getElementById('todoAdd').value = "" // clears the input field

  }

  // Add the deleteToDo code here
  // use filter to delete base on id
  function deleteToDo(id){
    let updatedTodos = [...todos].filter((todo) => todo.id !== id)
    setTodos(updatedTodos)
  }
  
  // Add the toggleComplete code here
  function toggleComplete(id) {
    let updatedTodos = [...todos].map((todo) => {
    if (todo.id === id) {
      todo.completed = !todo.completed
    }
    return todo
  })
  setTodos(updatedTodos)
}
  
  // Add the submitEdits code here
  function submitEdits(newtodo){
    const updatedTodos = [...todos].map((todo)=>{
      if(todo.id === newtodo.id){
        todo.text = document.getElementById(newtodo.id).value
      }
      return todo
    })
    setTodos(updatedTodos)
    setTodoEditing(null)
  }

  
  return(
    //layer1: container div with id todo-list
    <div id="todo-list"> 
      <h1>Todo List</h1>
      {/* layer2: form for adding todos */}
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            id="todoAdd"
            //onChange={(e) => setTodos(e.target.value)}
          />
          <button type="submit">Add Todo</button>
        </form>
        {/* layer2: mapping over todos and displaying todo items */}
        {todos.map((todo) => (//map to iterate over todos
          // layer3: todo item container
          <div className="todo" key={todo.id}> 
            {/* layer4: todo text and checkbox */}
            <div className="todo-text">
              {/* layer5: add checkbox for toggle complete */}  
            <input type="checkbox" id="completed" checked={todo.completed} onChange={()=>toggleComplete(todo.id)}/>
              {/* layer5: conditional rendering based on edit */}
              {/* if it is edit mode, display input box, else display text */}
              {todo.id === todoEditing ?
                (
                  <input
                    type = "text"
                    id={todo.id}
                    defaultValue={todo.text}
                  />
                ):
                //layer6: display text if not in edit mode
                (<div>{todo.text}</div>)
              }
              
            
            </div>
            {/* layer4: todo actions (edit and delete button) */}
            <div className="todo-actions">
              {
                todo.id === todoEditing ? 
                (
                  <button onClick={()=> submitEdits(todo)}>Submit Edits</button>
                ):(
                  <button onClick={()=> setTodoEditing(todo.id)}>Edit</button>
                )
              }

            
          <button onClick={() => deleteToDo(todo.id)}>Delete</button>
          </div>
          </div>))}
    </div>//className is like class in HTML, use key to track changes
          //div with class todo-text display text of each todo item
  )
}
export default App;
