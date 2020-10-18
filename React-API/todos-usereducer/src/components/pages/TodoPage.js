import React, {useState, useReducer} from 'react';
import ContentContainer from '../ContentContainer/ContentContainer';
import TodoContext from '../context/TodoContext';
import todosReducer from '../reducers/todosReducer';
import Form from '../Form/Form';
  
  
  const TodoPage = () => {

    const [todos, dispatch] = useReducer(todosReducer, []) // le paso el nombre de la funcion que va a modificar 
    // 'todos', luego le paso el valor inicial de todos(en este caso un array vacio)
    const [task, setTask] = useState('');
  
    
    return(
        <TodoContext.Provider value={ {task, setTask, todos, dispatch}}>
            <ContentContainer>
                <Form />
            </ContentContainer>
        </TodoContext.Provider>
    )
  }

  export default TodoPage;