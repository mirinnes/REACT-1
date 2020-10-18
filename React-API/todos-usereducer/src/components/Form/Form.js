import React, {useContext, useReducer, useState} from 'react';
import todosReducer, { TODO_ADD, TODO_EDIT, TODO_DELETE } from '../reducers/todosReducer';
import TodoContext from '../context/TodoContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit } from '@fortawesome/free-solid-svg-icons'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import './Form.scss';



const Form = () => {
    const {task, setTask, todos, dispatch} = useContext(TodoContext);
    const [displayModalEdit, setDisplayModalEdit] = useState(false)
    //const [selectedTodo, setSelectedTodo] = useState();

    const editTodo = (e) => { 
        //setSelectedTodo(e.target.id)
        setDisplayModalEdit(!displayModalEdit); 
    }

    const deleteTodo = (e) => {
        console.log("el id del target es", e.target.id) 
        dispatch({type: TODO_DELETE, payload: {id: e.target.id}})
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        dispatch({type: TODO_ADD, payload: {id: Date.now(), task, completed: false}}) //dispatch 'activa' siempre a la funcion reducer
        setTask('')
      }
    
    const handleEditTodo = (e) => {
        dispatch(
            {
            type: TODO_EDIT, 
            payload: {todos, newTask: e.target.value, editedId: e.target.id}
        });
        setDisplayModalEdit(false);
    }

    const _handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            handleEditTodo(e);
        }
      }

    

      //añadir otro modal que me permita a penas cuando entro a la pagina pedir el nombre de la persona
      //luego ese nombre usarlo para el title del contenedor de to do's
      //Todo:  => que se actualice con la info del input


    return (
        <React.Fragment>
            <section className="title-and-sub">
                <h1 className="title">To-do List</h1> {/*[1] TODO: agregar nombre para personalizar*/}
                <p className="sub">Track here the things that you need to do</p>
            </section>

            <div className="form">
                <form className="form-submit" >
                    <input type="text" placeholder = "Add a task" onChange={e => setTask(e.target.value)} />
                    <button onClick={handleSubmit} className="button-submit">Add</button>
                </form>
            </div>

            <div className="content-todos">
            {
                todos.map(todo => { 
                    return(
                        <div key={todo.id} className="todo-info">
                            {
                                displayModalEdit ? //de que forma hay que hacer que cambie este display para un determinado ID
                                    <input
                                        id={todo.id} 
                                        type="text" 
                                        defaultValue={todo.task} 
                                        onKeyDown={_handleKeyDown}
                                        ></input> 
                                    : 
                                    <p>{todo.task}</p>
                            }
                            <button id={todo.id} className="btn-edit" onClick={editTodo}><FontAwesomeIcon icon={faEdit} /></button>
                            <button id={todo.id} className="btn-delete" onClick={deleteTodo}><FontAwesomeIcon icon={faTrash} /></button>
                        </div>
                    )
                })
            }
            </div>
        </React.Fragment>
    )
}


export default Form;