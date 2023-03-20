import { useContext } from "react";
import { useHistory, useLocation } from "react-router";
import Menu from "./Menu";
import Context from "../../context";
import logo from "../../../src/images/logo.png";

const Menus = () => {
  const {
    cometChat,
    selectedMenu,
    setSelectedMenu,
    setSelectedFriend,
    setSelectedChannel,
    setSelectedChannelType,
  } = useContext(Context);

  const history = useHistory();

  const list = [
    {
      id: 1,
      icon: <img src={logo} style={{ width: "6rem" }} alt="logo"></img>,
    },
    {
      id: 2,
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="40"
          width="40"
          fill="white"
          viewBox="3 0 45 45"
          style={{ marginTop: "5px", padding: "4px" }}
        >
          <path d="M12 28.05h15.65v-3H12Zm0-6.5h24v-3H12Zm0-6.5h24v-3H12ZM4 44V7q0-1.15.9-2.075Q5.8 4 7 4h34q1.15 0 2.075.925Q44 5.85 44 7v26q0 1.15-.925 2.075Q42.15 36 41 36H12Zm3-7.25L10.75 33H41V7H7ZM7 7v29.75Z" />
        </svg>
      ),
    },
    /*     {
      id: 3,
      icon: (
        <svg
          style={{ width: "2rem", height: "2rem" }}
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
          />
        </svg>
      ),
    }, */
  ];

  const logout = async () => {
    const isLogout = window.confirm("Do you want to logout?");
    if (isLogout) {
      await cometChat.logout();
      setSelectedMenu(4);
      setSelectedFriend(null);
      setSelectedChannel(null);
      setSelectedChannelType(null);
      localStorage.removeItem("auth");
      history.push("/login");
    }
  };

  const onItemSelected = (item) => () => {
    setSelectedMenu(() => item.id);
    if (item.id === 1) {
      history.push("/");
    } else if (item.id === 2) {
      history.push("/");
    } else if (item.id === 3) {
      logout();
    }
  };

  return (
    <div className="menu">
      {list.map((item) => (
        <Menu
          key={item.id}
          isActive={item.id === selectedMenu}
          onItemSelected={onItemSelected}
          item={item}
        />
      ))}
    </div>
  );
};
export default Menus;
