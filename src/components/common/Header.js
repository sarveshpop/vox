import { useContext } from "react";
import { useHistory } from "react-router-dom";
import Context from "../../context";

const Header = (props) => {
  const { user, setUser, cometChat } = useContext(Context);
  const { onItemSelected, selectedOption } = props;

  const history = useHistory();
  const selectItem = (index) => () => {
    onItemSelected(index);
  };

  const logout = async () => {
    const isLogout = window.confirm("Do you want to log out ?");
    if (isLogout) {
      await cometChat.logout();
      setUser(null);
      localStorage.removeItem("auth");
      history.push("/login");
    }
  };

  return (
    <div className="friends__main-header">
      <div>
        <span
          onClick={selectItem(1)}
          className={`${
            selectedOption === 1 ? "friends__main-header--active" : ""
          }`}
        >
          Pending
        </span>
        <span onClick={selectItem(3)} className="friends__add-friend">
          Add Friend
        </span>
      </div>

      <div className="header__right">
        {user && (
          <div className="header__right">
            <img src={user.avatar} alt={user.email} />
            <span>Hello, {user.email}</span>
          </div>
        )}
      </div>
      <span className="header__logout" onClick={logout}>
        <span>Logout</span>
      </span>
    </div>
  );
};

export default Header;
