import {useState,useEffect,useContext} from 'react'
import {Menu} from 'antd'
import {useRouter} from 'next/router'
import Link from 'next/link'
import {AiOutlineUserAdd,AiOutlineHome,AiOutlineLogin,AiOutlineLogout} from 'react-icons/ai'
import {GiMicrochip} from 'react-icons/gi'
//https://ant.design/components/menu/
import {Context} from '../context/index'
import axios from 'axios'
import {toast} from 'react-toastify'



const TopNav=(setPath)=>{

    const [current,setCurrent]= useState('')
    const router = useRouter()
    //Dispatch Logout actions
    const {state, dispatch} = useContext(Context)
    //Conditionally render links in the navbar
    const {user}= state
    var items=[]
    if(user == null){
         items = [
            {
                label:(<Link href="/">Home</Link>),
                key: '/',
                icon:(<AiOutlineHome/>)
            },
             {
                label:(<Link href="/login">Login</Link>),
                key: '/login',
                icon:(<AiOutlineLogin/>)
            },
            {
                label:(<Link href="/register">Register</Link>),
                key: '/register',
                icon:(<AiOutlineUserAdd/>),
            },
           
        ]
    }else{
         items = [
            {
                label:(<Link href="/">Home</Link>),
                key: '/',
                icon:(<AiOutlineHome/>)
            },
            {
                label:(`Welcome, ${user.firstName}`), 
                icon:(<GiMicrochip/>),
                children: [{
                    label:("Logout"),
                    key:'logOut',
                    icon:(<AiOutlineLogout/>), 
                }]
            }
        ]
        console.log(user)
    }
    
    const logout = async() =>{
        dispatch({type:'LOGOUT'})
        window.localStorage.removeItem('user')
        console.log('logged out started')
        const {data} = await axios.get('/api/logout')
        console.log('messageData' + data.message)
        var temp = data.message
        toast.success(temp)
        router.push('/login')
    }

    //Changes the active link for the navbar
    useEffect(()=>{
        setCurrent(router.pathname)
    },[router.pathname])

    //Coditionally sets current location or runs logout based on which button is clicked in the navbar
    const menuClick = (e) =>{
        if(e.key == 'logOut'){
            logout()
            // setCurrent('/')
        }else{setCurrent(e.key)}
        
    }
    //Each individual item in the navbar
    // const items = [
    //     {
    //         label:(<Link href="/">Home</Link>),
    //         key: '/',
    //         icon:(<AiOutlineHome/>)
    //     },
    //     {
    //         label:(<Link href="/register">Register</Link>),
    //         key: '/register',
    //         icon:(<AiOutlineUserAdd/>),
    //     },
    //     {
    //         label:(<Link href="/login">Login</Link>),
    //         key: '/login',
    //         icon:(<AiOutlineLogin/>)
    //     },
    //     {
    //         label:("Logout"),
    //         key:'logOut',
    //         icon:(<AiOutlineLogout/>), 
    //     }
    // ];
    //Returns the menu with all the links renders from the items array
    return (
        <Menu 
            mode='horizontal'
            theme='dark'
            items={items} 
            onClick={menuClick} 
            selectedKeys={[current]}
            defaultSelectedKeys={['/']}
        />
    )
}

export default TopNav;

