import React, {useState}/* to create local state in functions*/ from 'react'
import { Menu } from 'antd';
import { HomeOutlined, SettingOutlined, UserOutlined, UserAddOutlined } from '@ant-design/icons';
import { Link } from "react-router-dom"; //to make our nav links work

const { SubMenu, Item } = Menu;  //{subMenu} = menu.subMenu
/* above line means instead of using <Menu.Item> or <Menu.Submenu> 
we can use <Item> and <Submenu> */

const Header = () => {
    const [current, setCurrent] = useState('home'); // [stateName, function to setState]=useState('defult value') //useState import
    
    const handleClick = (e) => {
        setCurrent(e.key); //e.key gets back the key of cliced menu
    }

    return(
        <Menu onClick={handleClick} selectedKeys={[current]} mode="horizontal">
            <Item key="home" icon={<HomeOutlined />}>
                <Link to="/" >Home</Link>
            </Item>

            <Item key="register" icon={<UserAddOutlined />} className="float-right">
                <Link to="/register" >Register</Link>
            </Item>

            <Item key="login" icon={<UserOutlined />} className="float-right">
                <Link to="/login" >Login</Link>
            </Item>

            <SubMenu icon={<SettingOutlined />} title="Username">
                <Item key="setting:1">Option 1</Item>
                <Item key="setting:2">Option 2</Item>
            </SubMenu>
        </Menu>
    );
}

export default Header
