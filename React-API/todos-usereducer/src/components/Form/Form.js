import React, {useContext, useReducer, useState} from 'react';
import todosReducer, { TODO_ADD, TODO_EDIT, TODO_DELETE } from '../reducers/todosReducer';
import TodoContext from '../context/TodoContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit } from '@fortawesome/free-solid-svg-icons'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import './Form.scss';


let displayModalEdit = [];

const Form = () => {
    const {task, setTask, todos, dispatch} = useContext(TodoContext);
    //op.a) const [displayModalEdit, setDisplayModalEdit] = useState([]);
    //const [selectedTodo, setSelectedTodo] = useState();
    
    const editTodo = (e) => { 
        displayModalEdit = displayModalEdit.map(itemDisplay => {

            //EDIT: EMPEZAR POR ACA. Cuando presionamos el paddding del boton el target es correcto, pero cuando presionamos el icono. no- ver
            console.log("el itemDisplay", itemDisplay.id, "\nEl event target", e.target);
            if (e.target.id === itemDisplay.id)
            {   
                console.log("enncontre el id buscado:", itemDisplay.id)
                itemDisplay.display=true;
            } 
            return itemDisplay;
        })
        //setSelectedTodo(e.target.id)
        //setDisplayModalEdit(!displayModalEdit); 
    }
    
    const deleteTodo = (e) => {
        console.log("el id del target es", e.target.id) 
        dispatch({type: TODO_DELETE, payload: {id: e.target.id}})
    }
    
    //Funcion que agrega un TODO al arreglo de [todos]
    const handleSubmit = async (e) => {
        e.preventDefault();
        let newTODO = {
            id: Date.now(), 
            task, 
            completed: false
        }

        //agregamos el display del newTODO a la lista de [displayModalEdit]:
        let newDisplay = {
            id: newTODO.id,
            display: false
        }
        //ap.a)setDisplayModalEdit ([...displayModalEdit, newDisplay]); //no funciona instantaneamente, aparece en la segunda
        displayModalEdit = [...displayModalEdit, newDisplay];
        console.log("El nuevo todo a agregar es:", newTODO, "El displaymodaledit es:", displayModalEdit)

        //agregamos el newTODO a la lista de [todos]
        await dispatch(
            {
                type: TODO_ADD, 
                payload: newTODO
            }) //dispatch 'activa' siempre a la funcion reducer
            

            setTask('')
        }
        
        const handleEditTodo = (e) => {
            dispatch(
                {
                    type: TODO_EDIT, 
                    payload: {todos, newTask: e.target.value, editedId: e.target.id}
                });
                //setDisplayModalEdit(false);
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
                todos.map((todo, indexTodo) => { 
                    return(
                        <div key={todo.id} className="todo-info">
                            {   
                                displayModalEdit[indexTodo].display ?
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
                            <button id={todo.id} className="btn-delete" onClick={deleteTodo}> <FontAwesomeIcon icon={faTrash} /></button>
                            {/* OJO !!! TODO: -------> cuando se borre un todo hay que actualizar tb la lista de displayModalEdit */}
                        </div>
                    )
                })
            }
            </div>
        </React.Fragment>
    )
}


export default Form;