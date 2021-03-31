import React, {useState}/* to create local state in functions*/ from 'react'
import { Menu } from 'antd';
import { MailOutlined, AppstoreOutlined, SettingOutlined } from '@ant-design/icons';

const { SubMenu } = Menu;  //{subMenu} = menu.subMenu

const Header = () => {
    const [current, setCurrent] = useState(''); // [stateName, function to setState] //useState import
    
    const handleClick = () => {

    }

    return(
        <Menu onClick={handleClick} selectedKeys={[current]} mode="horizontal">
        <Menu.Item key="mail" icon={<MailOutlined />}>
          Home
        </Menu.Item>
        <SubMenu key="SubMenu" icon={<SettingOutlined />} title="Register">
            <Menu.Item key="setting:1">Option 1</Menu.Item>
            <Menu.Item key="setting:2">Option 2</Menu.Item>
        </SubMenu>
      </Menu>
    );
}

export default Header