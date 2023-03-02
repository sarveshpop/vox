import { useContext } from "react";
import { useHistory } from "react-router";
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
    /*  {
      id: 2,
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          style={{ width: "2rem", height: "2rem" }}
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01"
          />
        </svg>
      ),
    }, */
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
      /*  history.push("/server"); */
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
