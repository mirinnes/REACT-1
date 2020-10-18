export const TODO_DELETE = 'TODOS_DELETE';
export const TODO_ADD = 'TODO_ADD';

export default (state, action) => {
    switch(action.type) {
        case TODO_ADD:
            return [...state, action.payload]
        case TODO_DELETE:
             return state.filter(todo => {
                if(todo.id === action.id) 
                return state;
            });
        default:
            return state;
    }
}
