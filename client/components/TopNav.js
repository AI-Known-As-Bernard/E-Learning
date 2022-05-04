import {useState,useEffect,useContext} from 'react'
import {Menu} from 'antd'
import {useRouter} from 'next/router'
import Link from 'next/link'
import {AiOutlineUserAdd,AiOutlineHome,AiOutlineLogin} from 'react-icons/ai'
//https://ant.design/components/menu/

const {Item} = Menu;
const TopNav=(setPath)=>{
    var router = useRouter()
    const [current,setCurrent]= useState('')
    useEffect(()=>{
        setCurrent(router.pathname)
    },[router.pathname])

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

