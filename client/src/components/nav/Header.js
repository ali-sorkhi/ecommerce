import React, { useState /* to create local state in functions*/ } from "react";
import { Menu } from "antd";
import {
  HomeOutlined,
  SettingOutlined,
  UserOutlined,
  UserAddOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom"; //to make our nav links work
import firebase from "firebase";
import {
  useDispatch /* to update state */,
  useSelector /* to get data from state  */,
} from "react-redux";

//we can't access history like in RegisterComplete cuz Header is not a route so we should access it like this:
import { useHistory } from "react-router-dom";

const { SubMenu, Item } = Menu; //{subMenu} = menu.subMenu
/* above line means instead of using <Menu.Item> or <Menu.Submenu> 
we can use <Item> and <Submenu> */

const Header = () => {
  const [current, setCurrent] = useState("home"); // [stateName, function to setState]=useState('defult value') //useState import

  let dispatch = useDispatch();
  //to get user data from redux store
  let { user } = useSelector((state) => ({ ...state })); //let state = useSelector((state)=>state);

  let history = useHistory();

  const handleClick = (e) => {
    setCurrent(e.key); //e.key gets back the key of cliced menu
  };

  const logout = () => {
    firebase.auth().signOut();
    dispatch({
      type: "LOGOUT",
      payload: null,
    });
    history.push("/login");
  };

  return (
    <Menu onClick={handleClick} selectedKeys={[current]} mode="horizontal">
      <Item key="home" icon={<HomeOutlined />}>
        <Link to="/">Home</Link>
      </Item>

      {!user && (
        <Item key="register" icon={<UserAddOutlined />} className="float-right">
          <Link to="/register">Register</Link>
        </Item>
      )}

      {!user && (
        <Item key="login" icon={<UserOutlined />} className="float-right">
          <Link to="/login">Login</Link>
        </Item>
      )}

      {user && (
        <SubMenu
          icon={<SettingOutlined />}
          title={user.name && user.name.split("@")[0]}
          className="float-right"
        >
          {user && user.role === "subscriber" && (
            <Item>
              <Link to="/user/history">Dashboard</Link>
            </Item>
          )}

          {user && user.role === "admin" && (
            <Item>
              <Link to="/admin/dashboard">Dashboard</Link>
            </Item>
          )}

          <Item icon={<LogoutOutlined />} onClick={logout}>
            Logout
          </Item>
        </SubMenu>
      )}
    </Menu>
  );
};

export default Header;
