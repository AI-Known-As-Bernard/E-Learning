//Documentation:  https://reactjs.org/docs/hooks-reference.html#usereducer
//https://reactjs.org/docs/hooks-reference.html#usecontext
import {useReducer, createContext} from 'react-reducer';

//Initial State
const initialState = {
    user: null,
}

//Create Contexts
const Context = createContext();

//Root Reducer
const rootReducer = (state,action) => {
    //Responsible for updating the state as well accessing the data from the state
    switch(action.type){
        //Action has 2 fields: payload (Actual data) and type which is a string value Ex. login
        //The data is what we are storing in the state
        case 'LOGIN': 
            return {...state,user: action.payload}
        case 'LOGOUT': 
            return {...state,user: null}
        default: 
            return state

    }
}

//Context  Provider
//We are wrap the entire application in this component. As such all components inside will be consider children
const Provider = ({children}) => {
        const [state,dispatcher] =useReducer(rootReducer, initialState)
        //The dispatch function is used for all of the operations

        return(
            <Context.Provider value={{state,dispatch}}>
                {children}
            </Context.Provider>
        )
}