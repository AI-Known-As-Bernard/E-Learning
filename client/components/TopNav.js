import {useState,useEffect,useContext} from 'react'
import {Menu} from 'antd'
import {useRouter} from 'next/router'
import Link from 'next/link'
import {AiOutlineUserAdd,AiOutlineHome,AiOutlineLogin,AiOutlineLogout} from 'react-icons/ai'
//https://ant.design/components/menu/
import {Context} from '../context/index'
import axios from 'axios'
import toast from 'react-toastify'


const TopNav=(setPath)=>{

    const [current,setCurrent]= useState('')
    const router = useRouter()
    //Dispatch Logout actions
    const {state, dispatch} = useContext(Context)
    
    const logout = async() =>{
        dispatch({type:'LOGOUT'})
        window.localStorage.removeItem('user')
        const {data} = await axios.get('/api/logout')
        toast(data.message)
        router.push('/login')
    }

    useEffect(()=>{
        setCurrent(router.pathname)
    },[router.pathname])

    const menuClick = (e) =>{
        setCurrent(e.key)
    }
    
    const items = [
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
        {
            label:(<Link href="/" onClick={logout}>Logout</Link>),
            icon:(<AiOutlineLogout/>),
            
        }
    ];
    
    return (
        <Menu 
            mode='horizontal' 
            items={items} 
            onClick={menuClick} 
            selectedKeys={[current]}
            defaultSelectedKeys={['/']}
        />
    )
}

export default TopNav;

