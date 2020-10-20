import React, {useState} from 'react';
import TodoPage from './components/pages/TodoPage'
import './App.scss';
import ModalUser from './components/ModalUser/ModalUser';
import UserTitleContext from './components/context/UserTitleContext';


function App() {
  const [modalUser, setModalUser] = useState(true);
  const [titleUser, setTitleUser] = useState("");

    //todo _ useState con modalUser 
    //todo _ useState con setTitleUser
  
  return (
     // reactFragment --> cambiar a ContextProvider con value = {{modalUser, setModalUser, titleUser, setTitleUser}}
    // modalUser ? <modalUsar : nuevo componente
                            //le paso todos los state de modalUser y setTitleUser si es true
                            // : si es false: le pasa null.

    <UserTitleContext.Provider>
    {
      modalUser ? 
      <ModalUser /> 
      :
      null
    }
   
    <TodoPage />
    </UserTitleContext.Provider>

  );
}

export default App;
