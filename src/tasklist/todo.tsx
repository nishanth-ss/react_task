import { useState } from 'react'
import styles from '../styles/todo.module.scss';

interface TodoList {
    id: number;
    todo: string;
    completed: boolean;
}

const TodoList = () => {

    const [todo,setTodo] = useState("");
    const [todoList,setTodoList] = useState<TodoList[]>([]);

    const handleTodo = (e: React.ChangeEvent<HTMLInputElement>)=>{
        setTodo(e.target.value);
    }

    const handleTodoList = ()=>{
        const newTodo: TodoList = {
            id: todoList.length,
            todo,
            completed: false
        }
        setTodoList([...todoList,newTodo]);
        setTodo("");
    }

    const handleTodoComplete = (todo: string,index: number)=>{
        const newTodoList = [...todoList]
        newTodoList[index].completed = !newTodoList[index].completed
        setTodoList(newTodoList);
    }

    const handleTodoDelete = (todo: TodoList,index: number)=>{
        if(todo.completed){
            setTodoList(todoList.filter((list,i)=>i !== index));
        }
    }

    return (
        <div className={styles.container}>
            <div className={styles.container_inner_wrapper}>
                <h1>Todo List</h1>
                <div className={styles.input_group}>
                    <input type="text" value={todo} onChange={handleTodo} />
                    <button onClick={handleTodoList}>Add Todo</button>
                </div>
                {
                    todoList?.map((list: any,index: number)=>(
                        <div key={index} className={styles.todo_container}>
                            <p>{index+1}</p>
                            <h5>{list.todo}</h5>
                            <input type="checkbox" checked={list.completed} onChange={()=>handleTodoComplete(todo,index)} />
                            <span className={list.completed ? styles.completed : styles.incomplete}>completed</span>
                            <button onClick={()=>handleTodoDelete(list,index)}>Delete</button>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default TodoList