import  {Menu} from 'antd'
import Link from 'next/link'
import {AiOutlineUserAdd,AiOutlineHome,AiOutlineLogin} from 'react-icons/ai'
//https://ant.design/components/menu/

const {Item} = Menu;
const TopNav=()=>{
    const items = [
        {
            label:(<Link href="/">Home</Link>),
            key: 'Home',
            icon:(<AiOutlineHome/>)
        },
        {
            label:(<Link href="/login">Login</Link>),
            key: 'Login',
            icon:(<AiOutlineLogin/>)
        },
        {
            label:(<Link href="/register">Register</Link>),
            key: 'Register',
            icon:(<AiOutlineUserAdd/>),
        }
    ];
    
    return (
        <Menu mode='horizontal' items={items} defaultSelectedKeys={['Home']}/>
    )
}

export default TopNav;

