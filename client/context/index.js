//Documentation:  https://reactjs.org/docs/hooks-reference.html#usereducer
//https://reactjs.org/docs/hooks-reference.html#usecontext
import {useReducer, createContext,useContext,useEffect} from 'react';

//Initial State
const initialState = {
    user: null,
}

//Create Contexts
const Context = createContext();

//Root Reducer
const rootReducer = (state,action) => {
//Reducer Function: Responsible for updating the state as well accessing the data from the state
    switch(action.type){
    //Action has 2 fields: {payload}:(Actual data) and {type}:which is a string value Ex. login
    //The user data is what we are storing in the state
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
        //You also employ useState here as well but reducer is more efficient in this use case
        const [state,dispatch] =useReducer(rootReducer, initialState)
        //The dispatch function is used for all of the operations

        useEffect(()=>{
            dispatch({
                type: 'LOGIN',
                payload: JSON.parse(window.localStorage.getItem('user'))
            })
        },[])

        return(
            <Context.Provider value={{state,dispatch}}>
                {children}
            </Context.Provider>
        )
}

export {Context, Provider}
//This is an example of a more simplified replacement to employing Redux, 
//Which is better and larger scale and more efficient implementation, it just requires
//Intricate setup BUT ..... REDUX is an INDUSTRY STANDARD