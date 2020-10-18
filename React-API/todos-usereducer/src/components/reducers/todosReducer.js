export const TODO_DELETE = 'TODOS_DELETE';
export const TODO_ADD = 'TODO_ADD';
export const TODO_EDIT = 'TODO_EDIT';

export default (state, action) => {
    switch(action.type) {
        case TODO_ADD:
            return [...state, action.payload];
        case TODO_EDIT:
            state.map(todo => {
                if(todo.id == action.payload.editedId) todo.task = action.payload.newTask;
            })
            return state;
            //recorrer los todos hasta encontrar todo.id
        case TODO_DELETE:
            console.log("antes del filter", state)
            console.log("el payload con el id:", action.payload.id)
            return state.filter(todo => todo.id == action.payload.id);; 
        default:
            return state;
    }
}
