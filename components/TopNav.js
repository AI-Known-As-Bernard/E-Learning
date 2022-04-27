import  {Menu} from 'antd'
import Link from 'next/link'
import {AiOutlineUserAdd,AiOutlineHome,AiOutlineLogin} from 'react-icons/ai'
//https://ant.design/components/menu/

const {Item} = Menu;
const TopNav=()=>{

    return (
        <Menu mode='horizontal'>
            <Item>
                <AiOutlineHome/>&nbsp;&nbsp;
                <Link href='/'>
                    <a>Home</a>
                </Link>
            </Item>
            <Item>
                <AiOutlineLogin/>&nbsp;&nbsp;
                <Link href='/login'>
                    <a>Login</a>
                </Link>
            </Item>
            <Item>
                <AiOutlineUserAdd/>&nbsp;&nbsp;
                <Link href='/register'>
                    <a>Register</a>
                </Link>
            </Item>
        </Menu>
    )
}

export default TopNav;