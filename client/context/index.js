//Documentation:  https://reactjs.org/docs/hooks-reference.html#usereducer
//https://reactjs.org/docs/hooks-reference.html#usecontext
import {useReducer, createContext,useContext,useEffect} from 'react';
import axios from 'axios';
import {useRouter} from 'next/router'

//Initial State
const initialState = {
    user: null,
}

//router 
const router = useRouter();

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

        //Axios Interceptors
        //Yes you can use the request option aswell please check out the documentation 
        axios.interceptors.response(
            function(response){
                //Any status code that is in the range of 2XX - successfull will cause this function to trigger
                return response;
            },
            function(error){
                //Any status codes that falls outside the range of 2XX will cause this function to trigger
                let res = error.response
                if(res.status === 401 && res.config && !res.config._isRetryRequest){
                    return new Promise((resolve, reject)=>{
                        //execute the loggout process, which will remove the user data saved in the client...etc
                        axios.get("/api/logout")
                        .then((data)=>{
                            console.log('/401 error > logout');
                            dispatch({type:'LOGOUT'});
                            window.localStorage.removeItem('user')
                            router.push('/')
                        })
                        .catch((err)=>{
                            console.log('AXIOS INTERCEPTOR ERR', err)
                            reject(error)
                        })
                    })
                }
                return Promise.reject(error)
            }
        )

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