import {useState,useEffect} from 'react'
import  {Menu} from 'antd'
import Link from 'next/link'
import {AiOutlineUserAdd,AiOutlineHome,AiOutlineLogin} from 'react-icons/ai'
//https://ant.design/components/menu/

const {Item} = Menu;
const TopNav=()=>{
    const [current,setCurrent]= useState('')
    
    useEffect(()=>{
        process.browser && setCurrent(window.location.pathname)
        consoel.log()
    },[])

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
        }
    ];
    
    return (
        <Menu 
            mode='horizontal' 
            items={items} 
            onClick={(e) =>setCurrent(e.key)} 
            selectedKeys={[current]}
            defaultSelectedKeys={['/']}
        />
    )
}

export default TopNav;

