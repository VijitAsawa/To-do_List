import { useState,useEffect } from 'react'
import heroImg from './assets/hero.png'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import './App.css'
import Navbar from './Navbar'

function App() {
const [todos, setTodos] = useState([]);
const [todo, setTodo] = useState('');
const [finished, setfinished] = useState(false);
const [darkMode, setDarkMode] = useState(()=>{
  return localStorage.getItem('darkMode')==='true';
});
useEffect(() => {
  let todoList=localStorage.getItem('todos');
  if(todoList && todoList !== 'undefined'){
    let todos=JSON.parse(todoList)
    setTodos(todos);

  }

},[])
useEffect(() => {
  document.body.style.backgroundColor = darkMode
    ? "#111827"
    : "rgb(161, 192, 214)";
    localStorage.setItem('darkMode',darkMode);
}, [darkMode]);
const savetoLs = (todos) => {
localStorage.setItem('todos', JSON.stringify(todos));
}
const handleAdd = () => {
  if(todo.trim() !== ''){
   let newTodo = [
    ...todos,
    {
      id: Date.now(), 
      todo: todo,
      completed: false
    }
   ]
   setTodos(newTodo);
   
savetoLs(newTodo)
     setTodo('');
  }

}
const handleDelete = (e, id) => {
  const newtodos=todos.filter(item=>{
    return item.id !== id
  }
  )
  setTodos(newtodos);
  savetoLs(newtodos);
}
const handleEdit = (e, id) => {
  let t=todos.filter(item=>item.id==id);
  setTodo(t[0].todo);
  let newTodos = todos.filter(item => item.id !== id);
  setTodos(newTodos);
  savetoLs(newTodos);
}

const handleChange = (e) => { 
  setTodo(e.target.value);

}
const handlecheckbox = (e) => {
  let id = e.target.name;
  let index = todos.findIndex(item => item.id == id);
  let newTodos = [...todos];
  newTodos[index].completed = !newTodos[index].completed;
  setTodos(newTodos);
  savetoLs(newTodos);
}
const toddlefinished = (e) => {
  setfinished(!finished);
}
const toggleDarkMode=()=>{
  setDarkMode(!darkMode);
}
  return (
    <>
      <Navbar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
      
   <div
  className={`mx-3 md:container md:mx-auto my-5 rounded-xl p-5 min-h-[80vh] md:w-1/2 ${
    darkMode
      ? 'bg-gray-800 text-white'
      : 'bg-violet-100 text-black'
  }`}
>
      <h1 className='font-bold text-3xl text-center text-red-400'>iTask - Manage your all Tasks</h1>
     <div className="addTodo my-2 flex flex-col gap-3">
      <h2 className='text-2xl font-bold'>Add New Todo</h2>
      <div className="flex ">
      <input onChange={handleChange} value={todo} type="text" className={`rounded-full px-5 py-1 w-full border focus:outline-none focus:ring-2 focus:ring-blue-500 ${
  darkMode
    ? 'bg-gray-700 text-white border-gray-600'
    : 'bg-white text-black border-gray-300'
}`} />
      <button onClick={handleAdd} className='bg-violet-800 hover:bg-violet-950 hover: cursor-pointer text-white p-2 py-1 mx-2 rounded-full  text-sm font-bold '>Save</button>
      </div>
      </div>
          <h2 className="text-xl font-bold gap-1 mb-1" > Your Todos </h2>
          <input type="checkbox" onChange={toddlefinished} checked={finished} /> Show Finished Todos
      <div className="todos my-5 ">
       {todos.length === 0 && <div className='text-center text-gray-500 text-2xl'>  No todos yet. Add your first task!</div>}
       {todos.length > 0 && <div className=" text-gray-500 my-3 text-2xl">
  {todos.length} {todos.length === 1 ? "task" : "tasks"}
</div>}
        {todos.map(item => {
        
         
             
          
        
       return (finished || !item.completed) && (
        <div key ={item.id} className={`todo flex w-full my-3 justify-between items-center p-3 rounded-lg ${
  darkMode
    ? 'bg-gray-700 text-white'
    : 'bg-white text-black'
}`}>
        <div className='flex gap-2 items-center min-w-0'>
        <input name={item.id} onChange={handlecheckbox} type="checkbox" checked={item.completed} />
          <div className={item.completed?"line-through":""}>{item.todo}</div>
        </div>
          <div className="buttons flex  h-full gap-2"> 

          <button onClick={(e)=>handleEdit(e,item.id)} className='bg-blue-500 hover:bg-blue-600  text-white  p-2 py-1 rounded-md  text-sm font-bold'><FaEdit /></button>
          <button onClick={(e) => handleDelete(e,item.id)} className='bg-red-500 hover:bg-red-600 text-white p-2 py-1 rounded-md  text-sm font-bold' ><MdDelete /></button>
        </div>
        </div>
       );
        })}
      </div>
      </div>
    </>
  )
}

export default App
