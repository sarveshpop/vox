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
    {
      id: 2,
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="48"
          width="48"
          fill="white"
          viewBox="2 0 45 45"
          style={{ marginTop: "5px", padding: "0 2px 8px 2px" }}
        >
          <path d="M0 36v-2.65q0-1.95 2.075-3.15T7.5 29q.65 0 1.2.025.55.025 1.1.125-.4.85-.6 1.75-.2.9-.2 1.85V36Zm12 0v-3.25q0-1.6.875-2.925.875-1.325 2.475-2.325 1.6-1 3.825-1.5T24 25.5q2.65 0 4.875.5t3.825 1.5q1.6 1 2.45 2.325.85 1.325.85 2.925V36Zm27 0v-3.25q0-1-.175-1.875t-.575-1.725q.55-.1 1.1-.125Q39.9 29 40.5 29q3.4 0 5.45 1.2Q48 31.4 48 33.35V36Zm-24-3h18v-.3q0-1.85-2.525-3.025Q27.95 28.5 24 28.5q-3.95 0-6.475 1.175Q15 30.85 15 32.75Zm-7.5-5.5q-1.45 0-2.475-1.025Q4 25.45 4 24q0-1.45 1.025-2.475Q6.05 20.5 7.5 20.5q1.45 0 2.475 1.025Q11 22.55 11 24q0 1.45-1.025 2.475Q8.95 27.5 7.5 27.5Zm33 0q-1.45 0-2.475-1.025Q37 25.45 37 24q0-1.45 1.025-2.475Q39.05 20.5 40.5 20.5q1.45 0 2.475 1.025Q44 22.55 44 24q0 1.45-1.025 2.475Q41.95 27.5 40.5 27.5ZM24 24q-2.5 0-4.25-1.75T18 18q0-2.55 1.75-4.275Q21.5 12 24 12q2.55 0 4.275 1.725Q30 15.45 30 18q0 2.5-1.725 4.25T24 24Zm0-3q1.3 0 2.15-.875Q27 19.25 27 18q0-1.3-.85-2.15Q25.3 15 24 15q-1.25 0-2.125.85T21 18q0 1.25.875 2.125T24 21Zm0 12Zm0-15Z" />
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
      history.push("/server");
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
