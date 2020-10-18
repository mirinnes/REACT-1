import React, {useContext, useReducer} from 'react';
import todosReducer, { TODO_ADD, TODO_DELETE } from '../reducers/todosReducer';
import TodoContext from '../context/TodoContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit } from '@fortawesome/free-solid-svg-icons'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import './Form.scss';



const Form = () => {
    const {name, setName, todos, dispatch} = useContext(TodoContext);

    // const editTodo = (e) => { // hay que hacer el modal!
    //     dispatch({type: EDIT_ADD, payload: {id: Date.now(), name, completed: false}})
    // }

    // const deleteTodo = (e) => { 
    //     dispatch({type: TODO_DELETE, payload})
    // }

    const handleSubmit = (e) => {
        e.preventDefault()
        dispatch({type: TODO_ADD, payload: {id: Date.now(), name, completed: false}}) //dispatch 'activa' siempre a la funcion reducer
        setName('')
      }

      //añadir otro modal que me permita a penas cuando entro a la pagina pedir el nombre de la persona
      //luego ese nombre usarlo para el title del contenedor de to do's

    return (
        <React.Fragment>
            <section className="title-and-sub">
                <h1 className="title">To-do List</h1>
                <p className="sub">Track here the things that you need to do</p>
            </section>

            <div className="form">
                <form className="form-submit" >
                    <input type="text" value={name} placeholder = "Add a task" onChange={e => setName(e.target.value)} />
                    <button onClick={handleSubmit} className="button-submit">Add</button>
                </form>
            </div>

            <div className="content-todos">
            {
                todos.map(todo => { 
                    return(
                        <div className="todo-info">
                            <p>{todo.name}</p>
                            <button className="btn-edit" ><FontAwesomeIcon icon={faEdit} /></button>
                            <button className="btn-delete"><FontAwesomeIcon icon={faTrash} /></button>
                        </div>
                        // onClick={editTodo}
                        // onClick={deleteTodo}
                    )
                })
            }
            </div>
        </React.Fragment>
    )
}


export default Form;